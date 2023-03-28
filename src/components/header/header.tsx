import { ChangeEvent, FC, useState } from "react";
import styles from "./header.module.css";
import Select from "../select/select";
import { ISubjects, IAreas } from "../../App";

export interface IDistricts {
  id: number;
  name: string;
  metroLine: object;
  verbatimName: string;
  type: string;
  nameWithPrep: string;
  metroLineColor: string;
  cityName?: string;
}
interface IHeader {
  subjects: ISubjects[];
  areas: IAreas[];
}

const Header: FC<IHeader> = (props) => {
  const [districts, setDistricts] = useState<IDistricts[]>();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const city = props.areas.find(item => item.cityName === value);
    const id = city?.id;
    fetch(`http://api.repetit.ru/public/districts?AreaId=${id}`)
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }

  return (
    <header className={styles.header}>
      <form className={styles.list}>
        <Select
          name="subjects"
          title="Укажите предмет"
          subjects={props.subjects}
        />
        <Select 
          name="cities" 
          title="Укажите город" 
          subjects={props.areas}
          handleChange={handleChange}
        />
        <Select
          name="districts"
          title="Укажите район"
          subjects={districts}
        />
        <button className={styles.button}>Применить фильтр</button>
      </form>
    </header>
  );
};

export default Header;
