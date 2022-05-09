
import React from 'react';
import ContentLoader from "react-content-loader";
import styles from './Card.module.scss';
import AppContext from '../../context'

function Card({
   title,
   price,
   onFavorite,
   favorited = false,
   onPlus,
   imageUrl,
   id,
   loading = false
}) {
   const { isItemAdded } = React.useContext(AppContext)
   const [isFavorite, setIsFavorite] = React.useState(favorited);
   const obj = { id, parentId: id, title, price, imageUrl }

   const onClickPlus = () => {
      onPlus(obj)
   }
   const onClickLike = () => {
      onFavorite(obj);
      setIsFavorite(!isFavorite)
   }


   return (
      <div className={styles.card} >
         {
            loading ? <ContentLoader
               speed={2}
               width={210}
               height={265}
               viewBox="0 0 210 265"
               backgroundColor="#f3f3f3"
               foregroundColor="#ecebeb"
            >
               <rect x="0" y="0" rx="10" ry="10" width="150" height="155" />
               <rect x="-1" y="167" rx="5" ry="5" width="150" height="15" />
               <rect x="0" y="188" rx="5" ry="5" width="100" height="15" />
               <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
               <rect x="118" y="234" rx="10" ry="10" width="32" height="32" />
            </ContentLoader> :
               <>
                  <div className={styles.favorite} >
                     {onFavorite && <img
                        onClick={onClickLike}
                        src={isFavorite ? "img/heart-liked.svg" : "img/heart-unliked.svg"}
                        alt="Unliked" />}
                  </div>
                  <img width={133} height={112} src={imageUrl} alt="sneakers" />
                  <h5>{title}</h5>
                  <div className="d-flex justify-between" >
                     <div className="d-flex flex-column " >
                        <span>Цена:</span>
                        <b>{price} грн.</b>
                     </div>
                     {onPlus && <img
                        className={styles.plus}
                        onClick={onClickPlus}
                        src={isItemAdded(id) ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
                        alt="plusIcon" />}
                  </div>
               </>
         }
      </div>
   );
}

export default Card;