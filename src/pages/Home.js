import React from 'react'
import Card from '../components/Card';


function Home({
   items,
   searchValue,
   setSearchValue,
   onChangeSearchInput,
   onAddToFavorite,
   onAddToCart,
   isLoading
}) {
   const renderItems = () => {

      const filtredItems = items.filter((item) =>
         item.title.toLowerCase().includes(searchValue.toLowerCase()),
      );

      return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
         <Card
            key={index}
            onFavorite={onAddToFavorite}
            onPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
            {...item}
         />
      ))
   }

   return (
      <div className="content p-40 " >
         {/* -- Title -- */}
         <div className="d-flex align-center justify-between mb-40 ">
            <h1> {searchValue ? `Поиск по запросу:${searchValue}` : 'Все Кроссовки'} </h1>
            <div className="search-block d-flex ">
               <img src="img/search-icon.svg" alt="search-icon" />
               {searchValue && (
                  <img
                     className='clear cu-p'
                     onClick={() => setSearchValue('')}
                     src="img/btn-remove.svg"
                     alt="Close"
                  />
               )}
               <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
            </div>
         </div>
         {/* -- Cards -- */}
         <div className='d-flex flex-wrap '>
            {renderItems()}
         </div>
      </div>
   )
}

export default Home