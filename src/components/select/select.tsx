import React, { FC } from "react";
import styles from "./select.module.css";

interface ISelect {
  title: string,
  name: string
}

const Select: FC<ISelect> = (props) => {
  return (
    <select name={props.name} required className={styles.select}>
      <option disabled selected className={styles.option}>{props.title}</option>
      <option value="Чебурашка">Чебурашка</option>
      <option value="Крокодил Гена">Крокодил Гена</option>
      <option value="Шапокляк">Шапокляк</option>
      <option value="Крыса Лариса">Крыса Лариса</option>
    </select>
  );
};

export default Select;
