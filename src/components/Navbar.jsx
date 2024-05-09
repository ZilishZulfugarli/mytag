import React, { useEffect, useRef, useState } from 'react'
import style from '../styles/navbar.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {

  const location = useLocation();

  const user = localStorage.getItem('user');

  const data = JSON.parse(user);

  const id = data?.user



  // console.log(id);

  const [userData, setuserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7092/api/Account/GetProfile?id=${id}`);

        if (response.status === 200) {
          setuserData(response.data)

          console.log(response.data);
        }

      } catch (error) {

      }
    }

    fetchData();

  }, [id]);

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
  return (
    <div className={style.container}>
      {/* <div className={sty}></div> */}
      <div className={style.logo}>LOGO</div>
      <div className={style.sections}>
        <ul>
          <li>First</li>
          <li>Second</li>
          <li>Third</li>
        </ul>
      </div>
      <div style={loginStyle} className={style.log}>
        <button onClick={goLogin}>Log In</button>
      </div>

      {userData && (
        <>
          <div ref={logRef} className={style.profile}>
            <div onClick={goUserPanel} className={style.user}>
              <div className={style.image}>
                <img src={userData.imageDataUrl} alt="user image" />
              </div>
              <div className={style.text}>
                {userData.user.name}
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
  )
}
