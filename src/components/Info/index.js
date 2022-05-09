import styles from './Info.module.scss';
import React from 'react';
import AppContext from '../../context';


const Info = ({ image, title, discription }) => {
   const { setCartOpened } = React.useContext(AppContext)


   return (

      <div className={styles.cartEmpty} >
         <img
            className='mb-20'
            src={image}
            alt="Empty" />
         <h2>{title}</h2>
         <p className='opacity-6 text-center mb-40'>
            {discription}
         </p>
         <button onClick={() => setCartOpened(false)} className={styles.greenButton}>
            <img src='img/arrow.svg' alt='Arrow' className='mr-15' />
            Вернуться назад
         </button>
      </div>
   )
}

export default Info;


