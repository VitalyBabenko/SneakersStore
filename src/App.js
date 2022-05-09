import axios from 'axios'
import Header from './components/Header'
import Drawer from './components/Drawer'
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context'
import Orders from './pages/Orders';

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      try {
        const cartResponse = await axios.get(`https://6273f31a345e1821b224d416.mockapi.io/cart`);
        setCartItems(cartResponse.data);
      } catch {
        setCartItems([]);
      }

      try {
        const favoritesResponse = await axios.get(`https://6273f31a345e1821b224d416.mockapi.io/favorites`);
        setFavorites(favoritesResponse.data);
      } catch {
        setFavorites([]);
      }
      const itemsResponse = await axios.get(`https://6273f31a345e1821b224d416.mockapi.io/items`);
      setIsLoading(false)
      setItems(itemsResponse.data);
    }
    fetchData()
  }, []);

  // Add item to cart
  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems(prev => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://6273f31a345e1821b224d416.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(`https://6273f31a345e1821b224d416.mockapi.io/cart`, obj);
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          } else {
            return item
          }
        }));
      }
    } catch (error) {
      alert('Не уалось добавить в корзину');
    }
  }


  // Remove item from cart
  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://6273f31a345e1821b224d416.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert('Не удалось уздалить из корзины');
    }
  }

  // Add / Remove like
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://6273f31a345e1821b224d416.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(`https://6273f31a345e1821b224d416.mockapi.io/favorites`, obj);
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в избранное')
    }
  }

  // Take input 
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isLoading,
        isItemAdded,
        setCartOpened,
        setCartItems,
        onAddToCart
      }}>

      <div className="wrapper clear ">


        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header
          onClickCart={() => setCartOpened(true)}
        />
        <Routes>
          <Route path="" element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />}
          />
          <Route path="favorites" element={
            <Favorites
              onAddToFavorite={onAddToFavorite}
            />}
          />
          <Route path="orders" element={
            <Orders
            />}
          />
        </Routes>
      </div >
    </AppContext.Provider>
  )
}
export default App;
