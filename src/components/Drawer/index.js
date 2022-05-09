import styles from './Drawer.module.scss';
import React from 'react';
import axios from 'axios'
import Info from '../Info';
import { useCart } from '../hooks/useCart';


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
   const { cartItems, setCartItems, totalPrice, } = useCart()
   const [OdrerId, setOrderId] = React.useState(null);
   const [isOdrerComplite, setOrderCoplite] = React.useState(false);
   const [isLoading, setIsLoading] = React.useState(false);


   const onClickOrder = async () => {
      try {
         setIsLoading(true)
         const { data } = await axios.post(`https://6273f31a345e1821b224d416.mockapi.io/orders`, {
            items: cartItems,
         });
         setOrderId(data.id);
         setOrderCoplite(true);
         setCartItems([]);

         for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i]
            await axios.delete(`https://6273f31a345e1821b224d416.mockapi.io/cart/` + item.id);
            await delay(1000);
         }
      } catch (error) {
         alert('Не удалось создать заказ')
      }
      setIsLoading(false)
   };

   return (
      <div className={`${styles.overlay} ${opened ? `${styles.overlayVisible}` : ""}`}>
         <div className={styles.drawer}>
            <h2>
               Корзина
               <img onClick={onClose} className={styles.removeBtn} src="img/btn-remove.svg" alt="Remove" />
            </h2>

            {items.length > 0 ? (
               <div className='d-flex flex-column flex' >
                  <div className={styles.cartItems}  >
                     {items.map((obj) => (
                        <div key={obj.id} className={styles.cartItem} >
                           <div
                              style={{ backgroundImage: `url(${obj.imageUrl})` }}
                              className={styles.cartItemImg}>
                           </div>
                           <div className="mr-20 flex" >
                              <p className="mb-5" >{obj.title}</p>
                              <b>{obj.price}грн.</b>
                           </div>
                           <img
                              onClick={() => onRemove(obj.id)}
                              className={styles.removeBtn}
                              src="img/btn-remove.svg"
                              alt="Remove" />
                        </div>
                     ))}
                  </div>
                  <div className={styles.cartTotalBlock} >
                     <ul >
                        <li >
                           <span>Итого:</span>
                           <div>
                           </div>
                           <b>{totalPrice} грн.</b>
                        </li>
                        <li>
                           <span >Налог 5%:</span>
                           <div></div>
                           <b> {totalPrice / 100 * 5} грн. </b>
                        </li>
                     </ul>
                     <button disabled={isLoading} onClick={onClickOrder} className={styles.greenButton}>
                        Оформить заказ
                        <img src='img/arrow.svg' alt="arrow" />
                     </button>
                  </div>

               </div>
            ) : (
               <Info
                  image={isOdrerComplite ? 'img/complited-order.jpg' : 'img/empty-cart.png'}
                  title={isOdrerComplite ? 'Заказ оформлен!' : 'Корзина пустая'}
                  discription={isOdrerComplite ? `Ваш заказ №${OdrerId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}

               />
            )}
         </div>
      </div >
   );
}

export default Drawer;