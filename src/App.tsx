import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Header from "./components/header/header";
import Section from "./components/section/section";
import styles from "./app.module.css";
import { getSubjects, getAreas, getDistricts, getTeacherIds, getTeachers } from "./utils/api";

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
  const [count, setCount] = useState(3);
  const [isLoad, setIsLoad] = useState(false);
  const [subject, setSubject] = useState<{ name: string }>();


  useEffect(() => {
    getSubjects()
      .then((data: ISubjects[]) => setLessons(data))
      .catch((err) => console.log(err));
    getAreas()
      .then((data: IAreas[]) => setAreas(data))
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

  const handleClick = async (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoad(true);
    const { subjects, cities, districts } = paramId;
    const teacherIds = await getTeacherIds(subjects, cities, districts);
    const threeTeacherIds = teacherIds.slice(0, count);

    const filterParamsArr = Object.keys(threeTeacherIds).map(key => [key, threeTeacherIds[key]]);
    const params = new URLSearchParams();
    filterParamsArr.forEach((param: string[]) => (
      params.set(`Ids[${param[0]}]`, param[1])
    ));
    const query = params.toString();

    await getTeachers(query)
      .then((data) => setTeachers(data))
      .catch((err) => console.log(err));

      const subjectName = lessons?.find((item) => item.id === +subjects);
      setSubject(subjectName)
      setIsLoad(false);
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
        <Section teachers={teachers} subject={subject?.name} handleClick={handleClick}/>
      ) : isLoad ? (
        <p className={styles.title}>Загрузка данных...</p>
      ) : (
        <p className={styles.title}>Выберите фильтры</p>
      )}
    </>
  );
}

export default App;
