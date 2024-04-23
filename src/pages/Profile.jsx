import React, { useEffect, useRef, useState } from 'react';
import style from '../styles/profile.module.scss'
import bgImg from './../images/simpleBGPhoto.jpg'
import emptyUserImg from './../images/emptyUser.png'
import mailICon from './../images/mailIcon.png'

const Profile = () => {

    const [guestMail, setguestMail] = useState("");

    const inputGuestMail = (e) => {
        setguestMail(e.target.value)
    }

    const [guestText, setguestText] = useState("");

    const inputGuestMessage = (e) => {
        setguestText(e.target.value)
    }

    const [openSend, setopenSend] = useState(false);

    const sendClick = () => {
        setopenSend(true);
    }

    const cancelClick = () => {
        setopenSend(false);

        setguestMail("");
        setguestText("");
    }

    const ref = useRef();

    useEffect(() => {
        const handleClose = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setopenSend(false);
            }
        }

        document.addEventListener("mousedown", handleClose)
        return () => {
            document.removeEventListener("mousedown", handleClose)
        };
    }, [ref]);

    const sendStyle = {
        display: openSend ? "flex" : "none"
    }
    return (
        <>
            <div className={style.container}>
                <div className={style.userBox}>
                    <div className={style.backgroundImg}>
                        <img src={bgImg} alt="Simple background Image" />
                    </div>
                    <div className={style.userImg}>
                        <img src={emptyUserImg} alt='User image' />
                    </div>

                    <h3>Kanan</h3>
                    <div className={style.company}>
                        <p>Software Engineer</p>
                        <p>BP</p>
                    </div>

                    <div className={style.mediaCards}>
                        <div className={style.card}>
                            <div className={style.icon}>
                                <img src={mailICon} alt="" />
                            </div>
                            <div className={style.iconName}>
                                <p>Mail</p>
                            </div>
                        </div>
                    </div>
                    <div onClick={sendClick} className={style.send}>
                        <p>Send Email</p>
                    </div>
                </div>

                <div  style={sendStyle} className={style.sendContainer}>
                    <div ref={ref} className={style.sendBox}>
                        <div className={style.title}>
                            <h3>Send Email to <span>Username</span></h3>
                        </div>
                        <div className={style.inputs}>
                            <div>
                                <p>Your Email</p>
                                <div className={style.inputBox}>

                                    <input onChange={inputGuestMail} value={guestMail} type="text" />
                                </div>
                            </div>
                            <div>
                                <p>Add Text</p>
                                <div className={style.textArea}>

                                    <textarea onChange={inputGuestMessage} value={guestText} />
                                </div>
                            </div>
                        </div>
                        <div className={style.buttons}>
                            <button onClick={cancelClick} className={style.cancelBtn}>Cancel</button>
                            <button className={style.sendBtn}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
