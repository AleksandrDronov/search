const baseUrl = 'http://api.repetit.ru/public/';

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getSubjects = () => {
  return fetch(`${baseUrl}/subjects`)
    .then(checkResponse)
};

export const getAreas = () => {
  return fetch(`${baseUrl}/areas`)
    .then(checkResponse)
};

export const getDistricts = (value: string) => { 
  return fetch(`${baseUrl}/districts/?AreaId=${value}`)
    .then(checkResponse)
};

export const getTeacherIds = (subjects: string, cities: string, districts: string) => { 
  return fetch(`${baseUrl}/search/teacherIds/?SubjectId=${subjects}&AreaId=${cities}&DistrictId=${districts}}`)
    .then(checkResponse)
};

export const getTeachers = (query: string) => { 
  return fetch(`${baseUrl}/teachers/short/?${query}`)
    .then(checkResponse)
};

export const hadleClickButton = async (subjects: string, cities: string, districts: string, count: number) => { 
  const teacherIds = await getTeacherIds(subjects, cities, districts);
  const threeTeacherIds = teacherIds.slice(0, count);

  const filterParamsArr = Object.keys(threeTeacherIds).map(key => [key, threeTeacherIds[key]]);
  const params = new URLSearchParams();
  filterParamsArr.forEach((param: string[]) => (
    params.set(`Ids[${param[0]}]`, param[1])
  ));
  return params.toString();
};