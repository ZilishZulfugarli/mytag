import React, { useEffect, useRef, useState } from 'react';
import style from '../styles/userpanel.module.scss'
import emptyUser from './../images/emptyUser.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCopy, faPenToSquare, faShare } from '@fortawesome/free-solid-svg-icons'
import { json, useLocation, useNavigate } from 'react-router-dom';
import UseUserPanelModal from '../hooks/useUserPanelModal';
import { useSelector } from 'react-redux';
import axios from 'axios';
import backgroundPhoto from './../images/simpleBGPhoto.jpg'


const UserPanel = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const data = location.state?.userToken;

    // const user = location.state?.user;

    const [userData, setUserData] = useState(null);

    const [shareLinks, setshareLinks] = useState(null);

    // console.log(user);

    const localUser = localStorage.getItem('user')

    const userInfo = JSON.parse(localUser);

    const userId = userInfo?.user;

    console.log(userId);



    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log("1");
                const response = await axios.get(`https://localhost:7092/api/Account/GetProfile?id=${userId}`);
                console.log("2");
                if (response.status === 200) {
                    setUserData(response.data);
                    setshareLinks(response.data.actionResult.value);

                } else {

                    throw new Error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    console.log(userData);
    console.log(shareLinks);


    const cardClick = (user) => {
        navigate('/profile', { state: { data: user } })
    }

    const updateBtn = (event, user) => {
        event.stopPropagation();
        navigate('/userpanel/update', { state: { data: user.card.id } })
    }

    const [shareState, setShareState] = useState(false);
    const [shareLink, setshareLink] = useState(null);
    const [copy, setcopy] = useState("Copy");


    const shareButton = (event, user) => {
        event.stopPropagation();
        setshareLink(user.card.cardNumber)
        setShareState(true);
    }

    console.log(shareLink);

    const shareStyle = {
        display: shareState ? "flex" : "none"
    }

    const addNew = () => {
        if (userData.userProfile.categoryId == 1) {
            navigate('/subscribe')
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText('http://localhost:3000/usercard/' + shareLink).then(() => {
            setcopy("Copied")
        })
    }

    const linkStyle = {
        cursor: copy == "Copy" ? "pointer" : "default"
    }

    const ref = useRef();

    useEffect(() => {
        const handleClose = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setShareState(false);
                setcopy("Copy")
            }
        }

        document.addEventListener('mousedown', handleClose);
        return () => {
            document.removeEventListener('mousedown', handleClose);
        };
    }, []);


    const handleShare = (link) => {
        window.open(link+'http://localhost:3000/usercard/adsasda', '_blank')
    }


    return (
        <>
            {userData &&
                <div className={style.container}>
                    <div className={style.header}></div>
                    <div className={style.line}></div>
                    <div className={style.mainBox}>
                        <div className={style.title}>
                            <h1>My Cards</h1>
                        </div>

                        <div className={style.cardBox}>
                            {userData.profiles.map((user, index) => (
                                <div key={index} onClick={() => { cardClick(user) }} className={style.box}>
                                    <div className={style.backgroundImg}>
                                        <img src={user.coverDataUrl ? user.coverDataUrl : backgroundPhoto} alt="" />
                                    </div>
                                    <div className={style.profileImg}>
                                        <img src={user.imageDataUrl ? user.imageDataUrl : emptyUser} alt="" />
                                    </div>
                                    <div className={style.userName}>
                                        <h3>{user.card.name}</h3>
                                        <p>{user.card.company}</p>
                                        <p>{user.card.jobTitle}</p>
                                    </div>
                                    <div className={style.buttons}>
                                        <button onClick={(event) => { updateBtn(event, user) }} className={`${style.editBtn} ${style.btn}`}>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                            <p>Edit Card</p>
                                        </button>
                                        <button onClick={(event) => { shareButton(event, user) }} className={`${style.shareBtn} ${style.btn}`}>
                                            <FontAwesomeIcon icon={faShare} />
                                            <p>Share Card</p>
                                        </button>
                                    </div>
                                </div>
                            ))}


                            <div onClick={addNew} className={style.box}>
                                <div className={style.addBox}>
                                    <div className={style.addCircle}>
                                        <span>+</span>
                                    </div>
                                    <p>Create New Card</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div ref={ref} style={shareStyle} className={style.shareContainer}>
                        <h3>Share Card Link</h3>


                        <div className={style.linkContainer}>
                            <input type="text" value={'http://localhost:3000/usercard/' + shareLink} />
                            <div style={linkStyle} onClick={handleCopy} className={style.status}>
                                <FontAwesomeIcon icon={copy == "Copy" ? faCopy : faCheck} />
                                <p>{copy}</p>
                            </div>

                        </div>

                        <div className={style.line}></div>


                        <p>Share Card</p>


                        <div className={style.linksContainer}>
                            {shareLinks.media && shareLinks.media.map((media, index) => (
                                <div onClick={() => {handleShare(media.link)}} key={index} className={style.link}>
                                    <img src={media.imageDataUrl} alt="" />
                                    <p>{media.name}</p>
                                </div>
                            ))}
                        </div>




                    </div>

                </div>
            }
        </>
    );
}

export default UserPanel;
