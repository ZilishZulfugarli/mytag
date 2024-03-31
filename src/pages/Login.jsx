import React from 'react'
import style from '../styles/login.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faEye } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate();

  const registerClick = () => {
    navigate('/register');
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
            <input type="text" placeholder='Email' />
            <span>Password</span>
            <input type="password" placeholder='Password'>
              {/* <FontAwesomeIcon icon={faEye} style={{ position: "absolute" }} /> */}
            </input>

            <p className={style.forgot}>Forgot password?</p>
          </div>

          <div className={style.loginBtn}>Log in</div>

          <div style={{ cursor: "pointer" }}>
            <h4 onClick={registerClick}>New to POPL? <span style={{ color: "blue" }}>Create Account</span> </h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

