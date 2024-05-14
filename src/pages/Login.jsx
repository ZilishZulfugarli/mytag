import React, { useState } from 'react'
import style from '../styles/login.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faEye } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Exception } from 'sass'

const Login = () => {

  const navigate = useNavigate();

  const registerClick = () => {
    navigate('register')
  }

  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);

  const inputEmail = (e) => {
    setemail(e.target.value);
  }

  const inputPassword = (e) => {
    setpassword(e.target.value);
  }

  console.log(email);


  const loginClick = async () => {
    try {
      const response = await axios.post('https://localhost:7092/api/Account/Login', {
        email: email,
        password: password
      })

      if (response.status == 200) {

        console.log(response);

        const token = response.data.token;
        const user = response.data.userId;
        const role = response.data.role;

        const expirationDate = new Date(Date.now() + 5000);

        Cookies.set('token', token, { expires: expirationDate });

        const userData = {
          user: user,
          expires: expirationDate.getTime(),
          role: role
        }

        console.log(userData);

        localStorage.setItem('user', JSON.stringify(userData));

       

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        navigate('/')

        window.location.reload();

        console.log(response);
        
      }
      else {
        throw new Exception(response.Exception)
      }
    }
    catch {

    }
  }

  


  return (
    <>
      <div className={style.container}>
        <div className={style.box}>
          <div className={style.upperSide}>
            <p>LOGO</p>
            <div className={style.line}></div>
            <p>Log In</p>
          </div>

          <div className={style.info}>
            <span>Email</span>
            <input onChange={inputEmail} type="text" placeholder='Email' />
            <span>Password</span>
            <input onChange={inputPassword} type="password" placeholder='Password'>
              {/* <FontAwesomeIcon icon={faEye} style={{ position: "absolute" }} /> */}
            </input>

            <p className={style.forgot}>Forgot password?</p>
          </div>

          <div onClick={loginClick} className={style.loginBtn}>Log in</div>

          <div style={{ cursor: "pointer" }}>
            <h4 onClick={registerClick}>New to POPL? <span style={{ color: "blue" }}>Create Account</span> </h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

