import { FC, FormEvent } from "react";
import Card from "../card/card";
import styles from "./section.module.css";

interface ITeacher {
  id: string;
  photoPath: string;
  firstName: string;
  lastName: string;
  minPricePerHour: string;
  teachingSubjects: { subject: { name: string } }[]
}

interface ISection {
  teachers: ITeacher[] | undefined;
  subject: string | undefined;
  handleClick: (e: FormEvent<HTMLButtonElement>) => void;
}


const Section: FC<ISection> = (props) => {
  return (
    <section className={styles.section}>
      {props.teachers?.map(item => (
        <Card 
          imageSrc={item.photoPath}
          name={`${item.firstName} ${item.lastName}`}
          title={item.teachingSubjects.find(({ subject }) => subject.name === props.subject)}
          price={`от ${item.minPricePerHour} р`}
          key={item.id}
        />
      ))}
      <button className={styles.button} onClick={props.handleClick}>Загрузить еще</button>
    </section>
  );
};

export default Section;
