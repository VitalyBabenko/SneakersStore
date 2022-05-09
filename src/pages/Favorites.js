import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';
import { Link } from "react-router-dom"




function Favorites({ onAddToFavorite, onAddToCart }) {
   const { favorites } = React.useContext(AppContext);

   return (
      <div className="content p-40 " >
         {/* -- Title Of Favorites -- */}
         <div className="d-flex align-center justify-between mb-40 ">
            <h1> Избранное </h1>
         </div>
         {/* -- Favorite Cards -- */}
         <div className='d-flex flex-wrap '>
            {favorites.length > 0 ? favorites.map((item, index) => (
               <Card
                  key={index}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  onFavorite={onAddToFavorite}
                  onPlus={(obj) => onAddToCart(obj)}
                  favorited={true}
               />
            )) : (
               <div className="d-flex flex align-center justify-center flex-column" >
                  <img
                     className='m-40'
                     src="img/favorites-empty.png"
                     alt="Empty" />
                  <h2>В избранных ничего нет</h2>
                  <p className='opacity-6 text-center mb-40'>
                     Добавте сюда пару кроссовок,которые вам понравятся
                  </p>
                  <Link to="">
                     <button className="greenbutton__back-home mb-50 ">
                        <img src='img/arrow.svg' alt='Arrow' className='mr-15' />
                        Вернуться назад
                     </button>
                  </Link>
               </div>
            )
            }
         </div>
      </div>
   )
}

export default Favorites