import React from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { Link } from 'react-router-dom'


function Orders() {
   const [isLoading, setIsLoading] = React.useState(true)
   const [orders, setOrders] = React.useState([])
   React.useEffect(() => {
      (async () => {
         try {
            const { data } = await axios.get(`https://6273f31a345e1821b224d416.mockapi.io/orders`)
            setOrders(data.map(obj => obj.items).flat())
            setIsLoading(false)
         } catch (error) {

            console.log(error);
         }
      })();
   }, []);

   return (
      <div className="content p-40 " >
         <div className="d-flex align-center justify-between mb-40 ">
            <h1> Заказы </h1>
         </div>
         {orders.length > 0 ? (
            <div className='d-flex flex-wrap '>
               {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                  <Card
                     key={index}
                     loading={isLoading}
                     {...item}
                  />
               ))}
            </div>
         ) : (
            <div className="d-flex flex align-center justify-center flex-column" >
               <img
                  className='m-40'
                  src="img/empty-orders.png"
                  alt="Empty" />
               <h2>У вас нет заказов</h2>
               <p className='opacity-6 text-center mb-40'>
                  После выбора нужных кроссовок, добавьте их в корзину и протвердите заказ
               </p>
               <Link to="">
                  <button className="greenbutton__back-home  mb-50 ">
                     <img src='img/arrow.svg' alt='Arrow' className='mr-15' />
                     Вернуться назад
                  </button>
               </Link>
            </div>)}
      </div>
   )
}

export default Orders