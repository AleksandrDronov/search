import { useEffect, useState, ChangeEvent, FormEvent, SyntheticEvent } from "react";
import Header from "./components/header/header";
import Section from "./components/section/section";
import styles from "./app.module.css";
import { getSubjects, getAreas, getDistricts, getTeachers, hadleClickButton } from "./utils/api";

export interface ISubjects {
  id: number;
  name: string;
  namePrep: string;
  nameGen: string;
  cityName?: string;
}

export interface IAreas {
  id: number;
  name: string;
  cityName: string;
  namePrep: string;
  nameGen: string;
}

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

export interface IParamID {
  subjects: string;
  cities: string;
  districts: string;
}

function App() {
  const [lessons, setLessons] = useState<ISubjects[]>();
  const [areas, setAreas] = useState<IAreas[]>();
  const [districts, setDistricts] = useState<IDistricts[]>();
  const [paramId, setParamId] = useState<IParamID>({
    subjects: "",
    cities: "",
    districts: "",
  });
  const [teachers, setTeachers] = useState();
  const [count, setCount] = useState(6);
  const [isLoad, setIsLoad] = useState(false);
  const [subject, setSubject] = useState<{ name: string }>();


  useEffect(() => {
    Promise.all([getSubjects(), getAreas()])
      .then(([subjects, cities]) => { setLessons(subjects); setAreas(cities) })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParamId({ ...paramId, [name]: value });
    if (name === "cities") {
      getDistricts(value)
        .then((data: IDistricts[]) => setDistricts(data))
        .catch((err) => console.log(err));
    }
  };

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoad(true);
    const { subjects, cities, districts } = paramId;
    const query = await hadleClickButton(subjects, cities, districts, 3)
    await getTeachers(query)
      .then((data) => setTeachers(data))
      .catch((err) => console.log(err));
    const subject = lessons?.find((item) => item.id === +subjects);
    setSubject(subject)
    setIsLoad(false);
    };

    const handleClickMore = async () => {
      const { subjects, cities, districts } = paramId;
      const query = await hadleClickButton(subjects, cities, districts, count)
      await getTeachers(query)
        .then((data) => setTeachers(data))
        .catch((err) => console.log(err));
      const subject = lessons?.find((item) => item.id === +subjects);
      setCount((prev) => prev + 3);
      setSubject(subject)
      };
    
  if (!lessons || !areas) return null;

  return (
    <>
      <Header
        subjects={lessons}
        areas={areas}
        districts={districts}
        handleChange={handleChange}
        handleClick={handleClick}
        paramId={paramId}
      />
      {teachers ? (
        <Section teachers={teachers} subject={subject?.name} handleClickMore={handleClickMore}/>
      ) : isLoad ? (
        <p className={styles.title}>Загрузка данных...</p>
      ) : (
        <p className={styles.title}>Выберите фильтры</p>
      )}
    </>
  );
}

export default App;
