import React, { useEffect, useState } from 'react';
import style from '../styles/userpanel.module.scss'
import emptyUser from './../images/emptyUser.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faShare } from '@fortawesome/free-solid-svg-icons'
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




    const cardClick = () => {
        navigate('/profile', { state: { data: userData } })
    }

    const updateBtn = (event) => {
        event.stopPropagation();
        navigate('/userpanel/update', { state: { data: userData } })
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
                            <div onClick={cardClick} className={style.box}>
                                <div className={style.backgroundImg}>
                                    <img src={userData.coverDataUrl ? userData.coverDataUrl : backgroundPhoto} alt="" />
                                </div>
                                <div className={style.profileImg}>
                                    <img src={userData.imageDataUrl ? userData.imageDataUrl : emptyUser} alt="" />
                                </div>
                                <div className={style.userName}>
                                    <h3>{userData.user.name}</h3>
                                    <p>{userData.user.company}</p>
                                    <p>{userData.user.jobTitle}</p>
                                </div>
                                <div className={style.buttons}>
                                    <button onClick={updateBtn} className={`${style.editBtn} ${style.btn}`}>
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
            }
        </>
    );
}

export default UserPanel;
