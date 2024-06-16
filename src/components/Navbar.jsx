import React, { useEffect, useRef, useState } from 'react'
import style from '../styles/navbar.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faArrowRightFromBracket, faCheck, faCircle, faCircleCheck, faCircleChevronDown, faDownLong } from '@fortawesome/free-solid-svg-icons'
import emptyUser from './../images/emptyUser.png'


export default function Navbar({ languages, defaultLang, setdefaultLang, fetchData }) {

  const country = localStorage.getItem('language');

  const location = useLocation();

  const user = localStorage.getItem('user');

  const [selectedLang, setselectedLang] = useState();
  // console.log(country);

  const [mainLanguages, setMainLanguages] = useState(null);

  if (languages != null) {
    const selector = languages.findIndex(x => x.langAbv.toLowerCase() == country);
    
    if (selector == 1) {
      // setselectedLang()
    }
  }






  const data = JSON.parse(user);

  const id = data?.user;

  const [language, setlanguage] = useState();



  const [userData, setuserData] = useState(null);

  useEffect(() => {
    console.log(languages);
    setMainLanguages(languages);
      
    
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7092/api/Account/GetProfile?id=${id}`);

        if (response.status === 200) {
          setuserData(response.data)
          
        }



      } catch (error) {

      }
    }

    fetchData();

  }, [id]);

  console.log(mainLanguages);

  console.log(userData);

  const navigate = useNavigate();

  const loginStyle = {
    display: userData ? "none" : "block"
  }

  const goLogin = () => {
    navigate('/login')
  }

  const goUserPanel = () => {
    navigate('/userpanel')
  }

  const [logoutHover, setlogoutHover] = useState(false);

  const logRef = useRef();

  useEffect(() => {

    const handleHover = (e) => {
      if (logRef.current && logRef.current.contains(e.target)) {
        setlogoutHover(true);
      } else {
        setlogoutHover(false);
      }
    };
    document.addEventListener('mouseover', handleHover);

    return () => {
      document.removeEventListener('mouseover', handleHover);
    };
  }, []);

  const logOutStyle = {
    display: logoutHover ? "flex" : "none"
  }

  const handleOut = () => {
    localStorage.removeItem('user', user)

    window.location.reload();
  }

  const [languageHover, setLanguageHover] = useState(false);

  const langRef = useRef();

  useEffect(() => {
    const handleHover = (e) => {
      if (langRef.current && langRef.current.contains(e.target)) {
        setLanguageHover(true);
      } else {
        setLanguageHover(false);
      }
    };
    document.addEventListener('mousedown', handleHover);

    return () => {
      document.removeEventListener('mouseover', handleHover);
    };
  }, []);

  const languageStyle = {
    display: languageHover ? "flex" : "none"
  }

  const changeLanguage = (language) => {
    if (language) {
      localStorage.setItem('language', language.langAbv);
      setdefaultLang(language.langAbv);
      fetchData();
      // window.location.reload();
    } else {
      console.log('No language provided');
    }
  };
  
  const addMainText = async () => {
    try {
      const formData = new FormData();
  
      // Sample localization data
      const localizations = [
        {
          HomeMainId: 0, // This will be ignored by the server as it's set on the server side
          LanguageId: 1002,
          Title: 'Sample Title 1',
          SubTitle: 'Sample SubTitle 1',
          ButtonText: 'Click Here 1',
          ImageFile: "",
        },
        {
          HomeMainId: 0, // This will be ignored by the server as it's set on the server side
          LanguageId: 2002,
          Title: 'Sample Title 2',
          SubTitle: 'Sample SubTitle 2',
          ButtonText: 'Click Here 2',
          ImageFile: "",
        }
      ];
  
      // Append each localization data to the formData
      localizations.forEach((localization, index) => {
        formData.append(`Localizations[${index}].HomeMainId`, localization.HomeMainId);
        formData.append(`Localizations[${index}].LanguageId`, localization.LanguageId);
        formData.append(`Localizations[${index}].Title`, localization.Title);
        formData.append(`Localizations[${index}].SubTitle`, localization.SubTitle);
        formData.append(`Localizations[${index}].ButtonText`, localization.ButtonText);
        formData.append(`Localizations[${index}].ImageFile`, localization.ImageFile);
      });
  
      const response = await axios.post('https://localhost:7092/api/Admin/AddMainText', formData, {
        headers: {
          
        },
      });
  
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className={style.container}>
      {/* <div className={sty}></div> */}
      <div className={style.logo}>LOGO</div>
      <div className={style.sections}>
        <ul>
          <li onClick={addMainText}>Test</li>
          <li>Home</li>
          <li>View Card</li>
          <li>Products</li>
        </ul>
      </div>
      <div className={style.rightSide}>
        <div ref={langRef} className={style.languageContainer}>
          <div className={style.language}>
            <p>{defaultLang}</p>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
          <div style={languageStyle} className={style.langDropdown}>
            {languages &&
              [...languages]
                .sort((a, b) => (a.langAbv.toLowerCase() === country.toLowerCase() ? -1 : 1))
                .map((language, index) => (
                  <div
                    key={index}
                    style={
                      language.langAbv.toLowerCase() === country.toLowerCase()
                        ? { backgroundColor: "red" }
                        : { backgroundColor: "white" }
                    }
                    className={style.languages}
                    onClick={() => changeLanguage(language)}
                  >
                    <div className={style.image}>
                      <img src={language.imageName} alt="" />
                    </div>
                    <p>{language.langAbv}</p>
                    <div style={
                      language.langAbv.toLowerCase() === country.toLowerCase()
                        ? { backgroundColor: "blue" }
                        : { backgroundColor: "white" }
                    } className={style.circle}></div>
                  </div>
                ))}
          </div>
        </div>

        <div style={loginStyle} className={style.log}>
          <button onClick={goLogin}>Log In</button>
        </div>

        {userData && (
          <>
            <div ref={logRef} className={style.profile}>
              <div onClick={goUserPanel} className={style.user}>
                <div className={style.image}>
                  {userData.profiles[0].imageDataUrl ? (
                    <img src={userData.profiles[0].imageDataUrl} alt="user image" />
                  ) : <img src={emptyUser} alt="user image" />}
                </div>
                <div className={style.text}>
                  {userData.userProfile.name}
                </div>
              </div>
              <div style={logOutStyle} className={style.dropdown}>
                <div onClick={handleOut} className={style.logOut}>
                  <p>Log Out</p>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </div>
              </div>
            </div>

          </>

        )}
      </div>

    </div>
  )
}
