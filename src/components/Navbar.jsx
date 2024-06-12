import React, { useEffect, useRef, useState } from 'react'
import style from '../styles/navbar.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faArrowRightFromBracket, faCheck, faCircle, faCircleCheck, faCircleChevronDown, faDownLong } from '@fortawesome/free-solid-svg-icons'
import emptyUser from './../images/emptyUser.png'


export default function Navbar({ languages, country, fetch }) {

  const location = useLocation();

  const user = localStorage.getItem('user');

  const [selectedLang, setselectedLang] = useState();
  console.log(country);

  if (languages != null) {
    const selector = languages.findIndex(x => x.langAbv.toLowerCase() == country)
    if (selector == 1) {
      // setselectedLang()
    }
  }




  const data = JSON.parse(user);

  const id = data?.user;

  const [language, setlanguage] = useState(null);



  const [userData, setuserData] = useState(null);

  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const langRes = await axios.get(`https://localhost:7092/api/Admin/GetLanguage`);

  //       if (langRes.status === 200) {
  //         const data = langRes.data;

  //         setlanguage(langRes.data);

  //         const language = localStorage.getItem('language');

  //         let last = data.findIndex(lang => lang.abvLang.toLowerCase() === language.toLowerCase());
  //         setselectedLang(last);

  //       }

  //     } catch (error) {

  //     }
  //   }

  //   fetch();
  // }, []);

  useEffect(() => {
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

  console.log(selectedLang);

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

  const testBtn = async () => {
    try {
      const formData = new FormData();
      formData.append("Name", "Pettag");
      formData.append("Description", "Pettag des");
      formData.append("Price", 12);
      formData.append("Discount", 10);

      formData.append("Localizations[0].LanguageId", 2002);
      formData.append("Localizations[0].Name", "Heyvantag");
      formData.append("Localizations[0].Description", "Heyvantag des");

      const res = await axios.post(`https://localhost:7092/api/Admin/AddPro`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const changeLanguage = (language) => {
    if (language) {
      localStorage.setItem('language', language.langAbv);
      fetch(language.langAbv);
    } else {
      console.log('No language provided');
    }
  };
  
  



  return (
    <div className={style.container}>
      {/* <div className={sty}></div> */}
      <div className={style.logo}>LOGO</div>
      <div className={style.sections}>
        <ul>
          <li onClick={testBtn}>Button</li>
          <li>Home</li>
          <li>View Card</li>
          <li>Products</li>
        </ul>
      </div>
      <div className={style.rightSide}>
        <div className={style.languageContainer}>
          <div className={style.language}>
            <p>En</p>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
          <div className={style.langDropdown}>
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
