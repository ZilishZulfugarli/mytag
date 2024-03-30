import React from 'react'
import style from '../assets/styles/login/login.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faEye } from '@fortawesome/free-solid-svg-icons'

const Login = () => {
  return (
    <>
      <div className='container'>
        <div className='box'>
          <div className='upperSide'>
            <p>LOGO</p>
            <div className='line'></div>
            <p>Log In</p>
          </div>

          <div className='info'>
            <span>Email</span>
            <input type="text" placeholder='Email' />
            <span>Password</span>
            <input type="password" placeholder='Password'>
              {/* <FontAwesomeIcon icon={faEye} style={{ position: "absolute" }} /> */}
            </input>

            <p className='forgot'>Forgot password?</p>
          </div>

          <div className='loginBtn'>Log in</div>

          <div style={{ cursor: "pointer" }}>
            <h4>New to POPL? <span style={{ color: "blue" }}>Create Account</span> </h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

