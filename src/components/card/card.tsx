import { FC } from "react";
import styles from "./card.module.css";

interface ICard {
  title: string,
  name: string,
  price: string,
  imageSrc: string,
}

const Card: FC<ICard> = (props) => {
  return (
    <div className={styles.card}>
      <img src={props.imageSrc} alt="" className={styles.image}/>
     <div className={styles.container}>
        <h2 className={styles.name}>{props.name}</h2>
        <h1 className={styles.title}>{props.title}</h1>
        <h2 className={styles.price}>{props.price}</h2>
     </div >
    </div>
  );
};

export default Card;
