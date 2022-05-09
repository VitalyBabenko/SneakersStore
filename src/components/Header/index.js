import React from 'react';
import { Link } from 'react-router-dom';
import header from './header.module.scss';
import { useCart } from '../hooks/useCart';


function Header(props) {
   const { totalPrice } = useCart()
   return (
      <header className={header}>
         <Link to="">
            <div className="d-flex align-center">
               <img width={40} height={40} src="img/sneacers-logo.png" alt='sneacers-logo' />
               <div >
                  <h3 className="text-uppercase" >react sneacers</h3>
                  <p className='opacity-5' >Магазин лучших кроссовок</p>
               </div>
            </div>
         </Link>
         <ul className="d-flex" >
            <li onClick={props.onClickCart} className="mr-30 cu-p" >
               <img width={18} height={18} src="img/cart.svg" alt='cartIcon' />
               <span className='opacity-6 ml-15 '>{totalPrice} грн.</span>
            </li>
            <li className="cu-p">
               <Link to="favorites"> <img width={18} height={18} src="img/favorites-page-icon.svg" alt='favoritesIcon' /></Link>
            </li>
            <li className="cu-p">
               <Link to="orders"><img width={18} height={18} src="img/user.svg" alt='userIcon' /></Link>
            </li>
         </ul>
      </header>
   )
}

export default Header