import React, { useEffect, useRef, useState } from 'react';
import style from '../styles/profile.module.scss'
import bgImg from './../images/simpleBGPhoto.jpg'
import emptyUserImg from './../images/emptyUser.png'
import mailICon from './../images/mailIcon.png'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {

    const location = useLocation();

    const user = location.state?.data;

    const [chosenImage, setchosenImage] = useState(null);

    const [SendedImage, setSendedImage] = useState();

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {

            setSendedImage(file)

            const reader = new FileReader();

            reader.onload = () => {
                setchosenImage(reader.result);
            };

            reader.readAsDataURL(file);
        }
    }

    console.log(chosenImage);

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


    const acceptBtn = async () => {
        try {

            const formData = new FormData();
            formData.append('userId', user.user.id);
            formData.append('imageFile', SendedImage);
            const response = await axios.post(`https://localhost:7092/api/UpdateFile`, formData);

            if (response.status == 200) {
            }
        }
        catch {

        }

    }

    return (
        <>
            <div className={style.container}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept='image/*'
                />

                {chosenImage && (
                    <div className={style.chosenImage}>
                        <img src={chosenImage} alt="" />
                    </div>
                )}

                <button onClick={acceptBtn}>Accept</button>
            </div>

            {data &&
                <div className={style.container}>
                    <div className={style.userBox}>
                        <div className={style.backgroundImg}>
                            <img src={bgImg} alt="Simple background Image" />
                        </div>
                        <div className={style.userImg}>
                            <img className={style.editPP} src={data.imageDataUrl ? data.imageDataUrl : emptyUserImg} alt='User image' />
                            <div class={style.editText}>Edit Photo</div>
                        </div>

                        <h3>{data.user.name}</h3>
                        <div className={style.company}>
                            <p>{data.user.company}</p>
                            <p>{data.user.jobTitle}</p>
                        </div>


                        <div className={style.mediaCards}>
                            {data.socialMedias.map((socialMedia, index) => (
                                <a href={'https://' + socialMedia.mediaLink} target='_blank' className={style.card} key={index}>
                                    <div className={style.icon}>
                                        <img src={socialMedia.imageName} alt="" />
                                    </div>
                                    <div className={style.iconName}>
                                        <p>{socialMedia.mediaTitle}</p>
                                    </div>
                                </a>
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

export default Update;