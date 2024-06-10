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

const Update = ({ viewInfos }) => {

    const location = useLocation();

    const navigate = useNavigate();

    const comesUser = location.state?.data;

    const [user, setuser] = useState();

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`https://localhost:7092/api/Account/GetCard?cardId=${comesUser}`);
            if (response.status === 200) {
                setuser(response.data);
                console.log(response.data);
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        if (comesUser) {
            fetchUserData();
        }
    }, [comesUser]);

    

    console.log(comesUser);

    


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
    const [video, setvideo] = useState("");

    console.log(name);

    return (
        (user && (
            <>
                    <div className={style.container}>
                        <div className={style.upper}>
                            <div className={style.userInfo}>
                                <div className={style.userImage}>
                                    <img src={user.imageDataUrl} alt="" />
                                </div>
                                <div className={style.userName}>
                                    <p className={style.name}>{user.card.name}</p>
                                    {/* <p className={style.mail}>{user.email}</p> */}
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
                                {selectComponent === "UpdateContent" && <UpdateContent
                                    user={user}
                                    fetchUserData={fetchUserData}
                                />}
                                {selectComponent === "AboutComponent" && <AboutComponent

                                    user={user}
                                    fetchUserData={fetchUserData}
                                    viewName={setname}
                                    viewJob={setjob}
                                    viewCompany={setcompany}
                                    viewLocation={setuserlocation}
                                    viewBio={setbio}
                                    viewImage={setprofilePhoto}
                                    viewCover={setcoverPhoto}
                                    viewVideo={setvideo}
                                />}
                            </div>

                            <div className={style.line}></div>

                            <div className={style.updateView}>
                                <View
                                    user={user}
                                    inputName={name ? name : user.card.name}
                                    inputJob={job ? job : user.card.jobTitle}
                                    inputCompany={company ? company : user.card.company}
                                    profilePhoto={profilePhoto ? profilePhoto : user.imageDataUrl}
                                    coverPhoto={coverPhoto ? coverPhoto : user.coverDataUrl}
                                    location={userlocation ? userlocation : user.card.location}
                                    updateView={user.socialMedias}
                                    profileVideo={video ? video : user.videoDataUrl}
                                    bio={bio ? bio : user.card.bio}
                                />
                            </div>
                        </div>
                    </div>

            </>
        ))

    );
}

export default Update;
