import { FC } from "react";
import Card from "../card/card";
import styles from "./section.module.css";


const Section: FC = () => {
  return (
    <section className={styles.section}>
      <Card 
        imageSrc='https://s00.yaplakal.com/pics/pics_original/5/0/6/17827605.jpg'
        name='Надежда Васильевна'
        title='Математика'
        price='от 1500 р'
        />
        <Card 
        imageSrc='https://s00.yaplakal.com/pics/pics_original/5/0/6/17827605.jpg'
        name='Надежда Васильевна'
        title='Математика'
        price='от 1500 р'
        />
        <Card 
        imageSrc='https://s00.yaplakal.com/pics/pics_original/5/0/6/17827605.jpg'
        name='Надежда Васильевна'
        title='Математика'
        price='от 1500 р'
        />
      <button className={styles.button}>Загрузить еще</button>
    </section>
  );
};

export default Section;
