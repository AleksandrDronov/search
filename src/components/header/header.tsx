import { ChangeEvent, FC, FormEvent } from "react";
import styles from "./header.module.css";
import Select from "../select/select";
import { ISubjects, IAreas, IDistricts, IParamID } from "../../App";


interface IHeader {
  subjects: ISubjects[];
  areas: IAreas[];
  districts: IDistricts[] | undefined;
  paramId: IParamID;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleClick: (e: FormEvent<HTMLFormElement>) => void;
}


const Header: FC<IHeader> = (props) => {

  const disableButton = props.paramId.cities && props.paramId.subjects ? false : true;

  return (
    <header className={styles.header}>
      <form className={styles.list} onSubmit={props.handleClick}>
        <Select
          name="subjects"
          title="Укажите предмет"
          subjects={props.subjects}
          handleChange={props.handleChange}
        />
        <Select 
          name="cities" 
          title="Укажите город" 
          subjects={props.areas}
          handleChange={props.handleChange}
        />
        <Select
          name="districts"
          title="Укажите район"
          subjects={props.districts}
          handleChange={props.handleChange}
        />
        <button className={disableButton ? styles.button_disable : styles.button} disabled={disableButton}>Применить фильтр</button>
      </form>
    </header>
  );
};

export default Header;
