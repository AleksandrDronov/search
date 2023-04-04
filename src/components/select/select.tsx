import { ChangeEvent, FC, MutableRefObject } from "react";
import styles from "./select.module.css";
import { ISubjects, IAreas } from "../../App";
import { IDistricts } from "../../App";

interface ISelect {
  name: string;
  title: string;
  subjects: ISubjects[] | IAreas[] | IDistricts[] | undefined;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FC<ISelect> = (props) => {
  return (
    <select
      name={props.name}
      defaultValue={0}
      required
      className={styles.select}
      onChange={props.handleChange}
    >
      <option disabled value={0}>
        {props.title}
      </option>
      {props.subjects?.map((item) => (
        <option value={item.id} key={item.id}>
          {item.cityName || item.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
