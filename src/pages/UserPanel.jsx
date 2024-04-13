import React from 'react';
import style from '../styles/userpanel.module.scss'
import emptyUser from './../images/emptyUser.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faShare } from '@fortawesome/free-solid-svg-icons'


const UserPanel = () => {
    return (
        <>
            <div className={style.container}>
                <div className={style.header}></div>
                <div className={style.line}></div>
                <div className={style.mainBox}>
                    <div className={style.title}>
                        <h1>My Cards</h1>
                    </div>

                    <div className={style.cardBox}>
                        <div className={style.box}>
                            <div className={style.backgroundImg}></div>
                            <div className={style.profileImg}>
                                <img src={emptyUser} alt="" />
                            </div>
                            <div className={style.userName}>
                                <h3>User</h3>
                                <p>salam</p>
                            </div>
                            <div className={style.buttons}>
                                <button className={`${style.editBtn} ${style.btn}`}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                    <p>Edit Card</p>
                                </button>
                                <button className={`${style.shareBtn} ${style.btn}`}>
                                    <FontAwesomeIcon icon={faShare} />
                                    <p>Share Card</p>
                                </button>
                            </div>
                        </div>

                        <div className={style.box}>
                            <div className={style.addBox}>
                                <div className={style.addCircle}>
                                    <span>+</span>
                                </div>
                                <p>Create New Card</p>
                            </div>


                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default UserPanel;
