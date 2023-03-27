import React, { FC } from "react";
import styles from './header.module.css';
import Select from "../select/select";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <form className={styles.list}>
        <Select name='name1' title='Укажите предмет' />
        <Select name='name2' title='Укажите город' />
        <Select name='name3' title='Укажите район' />
        <button className={styles.button}>Применить фильтр</button>
      </form>
    </header>
  )
};

export default Header;
