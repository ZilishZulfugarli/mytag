import React, { useEffect, useRef, useState } from 'react';
import style from '../styles/update.module.scss'
import bgImg from './../images/simpleBGPhoto.jpg'
import emptyUserImg from './../images/emptyUser.png'
import mailICon from './../images/mailIcon.png'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare, faTableList, faUser } from '@fortawesome/free-solid-svg-icons'
import UpdateContent from '../components/UpdateContent';
import View from '../components/View'
import AboutComponent from '../components/AboutComponent';

const Update = ({viewInfos}) => {

    console.log(viewInfos);

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

    

    const [selectComponent, setselectComponent] = useState("UpdateContent");

    console.log(selectComponent);

    const contentLi = {
        backgroundColor: selectComponent === "UpdateContent" ? 'rgb(100, 100, 100)' : 'transparent'
    }

    const aboutLi = {
        backgroundColor: selectComponent === "AboutComponent" ? 'rgb(100, 100, 100)' : 'transparent'
    }

    const [name, setname] = useState("");
    const [job, setjob] = useState("");
    const [company, setcompany] = useState("");
    const [userlocation, setuserlocation] = useState("");
    const [bio, setbio] = useState("");
    const [profilePhoto, setprofilePhoto] = useState("");
    const [coverPhoto, setcoverPhoto] = useState("");

    console.log(name);

    return (
        <>
            <div className={style.container}>
                <div className={style.upper}>
                    <div className={style.userInfo}>
                        <div className={style.userImage}></div>
                        <div className={style.userName}>
                            <p className={style.name}>Zilis</p>
                            <p className={style.mail}>2002zilis@gmail.com</p>
                        </div>
                    </div>
                    <div className={style.share}>
                        <button>
                            <FontAwesomeIcon icon={faShare} />
                            Share Your Card</button>
                    </div>
                </div>

                <div className={style.updateContainer}>
                    <div className={style.updateNavbar}>
                        <ul>
                            <li
                                className={selectComponent === "AboutComponent" ? "active" : ""}
                                onClick={() => { setselectComponent("AboutComponent") }}
                                style={aboutLi}
                            >
                                <FontAwesomeIcon icon={faUser} />
                                About
                            </li>
                            <li
                                className={selectComponent === "UpdateContent" ? "active" : ""}
                                onClick={() => { setselectComponent("UpdateContent") }}
                                style={contentLi}
                            >
                                <FontAwesomeIcon icon={faTableList} />
                                Content
                            </li>
                        </ul>
                    </div>

                    <div className={style.line}></div>

                    <div className={style.updateMain}>
                        {selectComponent === "UpdateContent" && <UpdateContent />}
                        {selectComponent === "AboutComponent" && <AboutComponent 
                        
                        user={user} 
                        viewName={setname}
                        viewJob={setjob}
                        viewCompany={setcompany}
                        viewLocation={setuserlocation}
                        viewBio={setbio}
                        viewImage={setprofilePhoto}
                        viewCover={setcoverPhoto}
                        />}
                    </div>

                    <div className={style.line}></div>

                    <div className={style.updateView}>
                        <View user={user} 
                        inputName={name ? name : user.user.name}
                        inputJob={job ? job : user.user.jobTitle}
                        inputCompany={company ? company : user.user.company}
                        profilePhoto={profilePhoto ? profilePhoto : user.imageDataUrl}
                        coverPhoto={coverPhoto ? coverPhoto : user.coverDataUrl}
                        location={userlocation ? userlocation : user.user.location}
                        />
                    </div>
                </div>
            </div>


        </>
    );
}

export default Update;
