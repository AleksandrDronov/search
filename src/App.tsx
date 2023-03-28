import { useEffect, useState } from "react";
import Header from "./components/header/header";
import Section from "./components/section/section";

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

function App() {
  const [subjects, setSubjects] = useState<ISubjects[]>();
  const [areas, setAreas] = useState<IAreas[]>();

  useEffect(() => {
    fetch("http://api.repetit.ru/public/subjects")
      .then((res) => res.json())
      .then((data) => setSubjects(data));
    fetch("http://api.repetit.ru/public/areas")
      .then((res) => res.json())
      .then((data) => setAreas(data));
  }, []);
  
  if(!subjects || !areas) return null;

  return (
    <>
      <Header subjects={subjects} areas={areas} />
      <Section />
    </>
  );
}

export default App;
