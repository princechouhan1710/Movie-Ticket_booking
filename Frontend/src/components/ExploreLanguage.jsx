import { useEffect, useState } from "react";
import CategoryNavigator from "./CategoryNavigator.jsx";
import axios from "axios";

function ExLAng() {
  const [lang, setLang] = useState([]);
  const getlanguage = async () => {
    const { data } = await axios(' /api/movie/getlanguage');
        setLang(data.data);
  };
  useEffect(() => {
    getlanguage();
  }, []);
    return (
    <>
    <CategoryNavigator
      category="Language"
      redirecturl="langauage"
      data={lang}/>
    </>
  );
}

export default ExLAng;

