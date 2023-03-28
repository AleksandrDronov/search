import { ChangeEvent, FC } from "react";
import styles from "./select.module.css";
import { ISubjects, IAreas } from "../../App";
import { IDistricts } from "../header/header";

interface ISelect {
  name: string;
  title: string;
  subjects: ISubjects[] | IAreas[] | IDistricts[] | undefined;
  handleChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FC<ISelect> = (props) => {
  return (
    <select
      name={props.name}
      defaultValue={props.title}
      required
      className={styles.select}
      onChange={props.handleChange}
    >
      <option disabled value={props.title}>
        {props.title}
      </option>
      {props.subjects?.map((item) => (
        <option value={item.cityName || item.name} key={item.id}>
          {item.cityName || item.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
