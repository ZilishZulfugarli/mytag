import React, { useEffect, useRef, useState } from 'react';
import style from '../styles/profile.module.scss'
import bgImg from './../images/simpleBGPhoto.jpg'
import emptyUserImg from './../images/emptyUser.png'
import mailICon from './../images/mailIcon.png'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {

    const location = useLocation();

    const data = location.state?.data;

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

    console.log(data);

    const [UserData, setUserData] = useState();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://localhost:7092/api/Account/GetCard?cardId=${data.card.id}`);
                if (response.status === 200) {
                    setUserData(response.data);
                    console.log(response.data);

                } else {

                    throw new Error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (data.card.id) {
            fetchUserData();
        }
    }, [data.card.id]);

    return (
        <>
            {UserData &&
                <div className={style.container}>
                    <div className={style.userBox}>
                        <div className={style.backgroundImg}>
                            <img src={UserData.coverDataUrl ? UserData.coverDataUrl : bgImg} alt="Simple background Image" />

                        </div>
                        <div className={style.userImg}>
                            <img src={UserData.imageDataUrl ? UserData.imageDataUrl : emptyUserImg} alt='User image' />
                        </div>

                        <h3>{UserData.card.name}</h3>
                        <div className={style.company}>
                            <p>{UserData.card.company}</p>
                            <p>{UserData.card.jobTitle}</p>
                        </div>

                        {UserData.videoDataUrl && (
                            <div className={style.videoContainer}>
                                <video autoPlay controls loop >
                                    <source src={UserData.videoDataUrl} type="video/mp4" />
                                </video>
                            </div>
                        )}



                        <div className={style.mediaCards}>
                            {UserData.socialMedias.map((socialMedia, index) => (
                                (socialMedia.show && (
                                    <a href={'https://' + socialMedia.mediaLink} target='_blank' className={style.card} key={index}>
                                        <div className={style.icon}>
                                            <img src={socialMedia.imageName} alt="" />
                                        </div>
                                        <div className={style.iconName}>
                                            <p>{socialMedia.mediaTitle ? socialMedia.mediaTitle : socialMedia.mediaName}</p>
                                        </div>
                                    </a>
                                ))
                            ))}
                        </div>


                        <div onClick={sendClick} className={style.send}>
                            <p>Send Email</p>
                        </div>
                    </div>

                    <div style={sendStyle} className={style.sendContainer}>
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
            }

        </>
    );
}

export default Profile;
