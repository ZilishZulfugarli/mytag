import React, { useRef, useState } from 'react';
import style from '../styles/aboutcomponent.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import View from './View';
import { useLocation } from 'react-router-dom';
import UserPanel from '../pages/UserPanel'
import { video } from 'fontawesome';


const AboutComponent = ({ user, fetchUserData, viewName, viewJob, viewCompany, viewLocation, viewBio, viewImage, viewCover, viewVideo }) => {

    const fileRef = useRef(null);

    const coverRef = useRef(null);

    const videoRef = useRef(null);

    const clickProfileImage = () => {
        if (fileRef.current) {
            fileRef.current.click()
        }
    }

    console.log(user);


    const clickCoverPhoto = () => {
        if (coverRef.current) {
            coverRef.current.click();
        }
    }

    const clickVideo = () => {
        if (videoRef.current) {
            videoRef.current.click();
        }
    }
    const [sendProfileImage, setsendProfileImage] = useState(null);

    const [profileImage, setprofileImage] = useState(user.imageDataUrl);


    const handleProfileImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            setsendProfileImage(file);

            const reader = new FileReader();

            reader.onload = () => {
                setprofileImage(reader.result);
            }

            reader.readAsDataURL(file)
        }
    }

    const [sendCoverPhoto, setsendCoverPhoto] = useState(null);

    const [coverPhoto, setcoverPhoto] = useState(user.coverDataUrl);

    const handleCoverPhoto = (e) => {
        const file = e.target.files[0];

        if (file) {
            setsendCoverPhoto(file);

            const reader = new FileReader();

            reader.onload = () => {
                setcoverPhoto(reader.result);
            }

            reader.readAsDataURL(file)
        }
    }

    const [sendVideo, setsendVideo] = useState(null);

    const [video, setvideo] = useState(user.videoDataUrl);

    const handleVideo = (e) => {
        const file = e.target.files[0];

        if (file) {
            setsendVideo(file);

            const reader = new FileReader();

            reader.onload = () => {
                setvideo(reader.result);
            }

            reader.readAsDataURL(file)
        }
    }

    const [name, setname] = useState(user.card.name);

    const handleName = (e) => {
        setname(e.target.value);

    }



    const [location, setlocation] = useState(user.card.location);

    const handleLocation = (e) => {
        setlocation(e.target.value)
    }

    const [job, setjob] = useState(user.card.jobTitle);

    const handleJob = (e) => {
        setjob(e.target.value);
    }

    const [company, setcompany] = useState(user.card.company);

    const handleCompany = (e) => {
        setcompany(e.target.value)
    }

    const [bio, setbio] = useState(user.card.bio);

    const handleBio = (e) => {
        setbio(e.target.value);
    }


    const handleSubmit = async () => {

        const formData = new FormData();
        formData.append('id', user.card.id)
        formData.append('imageFile', sendProfileImage);
        formData.append('coverFile', sendCoverPhoto);
        formData.append('name', name);
        formData.append('jobTitle', job);
        formData.append('company', company);
        formData.append('location', location);
        formData.append('bio', bio);
        formData.append('videoFile', sendVideo);

        console.log(formData);

        const response = await axios.put(`https://localhost:7092/api/Account/AccountUpdate`, formData);

        if (response.status == 200) {
            console.log(response);
            fetchUserData();
        }
    }

    viewName(name);
    viewJob(job);
    viewBio(bio);
    viewCompany(company);
    viewLocation(location);
    viewImage(profileImage);
    viewCover(coverPhoto);
    viewVideo(video);

    const noneImage = {
        // pointerEvents: profileImage != null ? "none" : "",
        cursor: profileImage != null ? "not-allowed" : "pointer"
    }

    const noneCover = {
        pointerEvents: coverPhoto != null ? "none" : "",
        cursor: coverPhoto != null ? "not-allowed" : "pointer"
    }

    const noneVideo = {
        pointerEvents: video != null ? "none" : "",
        cursor: video != null ? "not-allowed" : "pointer"
    }



    return (
        <>
            {user && (
                <div className={style.container}>
                    <div className={style.title}>
                        <p>Card Title:</p>

                        <div className={style.inputContainer}>
                            <p>mm</p>
                        </div>
                    </div>

                    <div className={style.images}>
                        <div className={style.profileImage}>
                            <p>Profile Picture</p>
                            <div style={noneImage} onClick={clickProfileImage} className={style.inputs}>
                                <input
                                    onChange={handleProfileImage}
                                    ref={fileRef}
                                    type="file" />
                                <div className={style.imagePicture}>

                                    {profileImage ? (
                                        <img src={profileImage} alt="" />
                                    ) :
                                        <>
                                            <FontAwesomeIcon icon={faUser} />
                                            <p><span>Select</span> file or drag and drop one here</p>
                                        </>
                                    }
                                </div>
                            </div>

                            <div className={style.remove}>
                                remove
                            </div>

                        </div>

                        <div className={style.profileImage}>
                            <p>Cover Photo</p>
                            <div style={noneCover} onClick={clickCoverPhoto} className={style.inputs}>
                                <input
                                    onChange={handleCoverPhoto}
                                    ref={coverRef}
                                    type="file" />
                                <div className={style.imageCover}>

                                    {coverPhoto ? (
                                        <img src={coverPhoto} alt="" />
                                    ) :
                                        <>
                                            <FontAwesomeIcon icon={faUser} />
                                            <p><span>Select</span> file or drag and drop one here</p>
                                        </>
                                    }
                                </div>
                            </div>

                            <div className={style.remove}>
                                remove
                            </div>

                        </div>


                    </div>

                    <div className={style.userInfos}>
                        <div>
                            <p>Name</p>
                            <div className={style.inputContainer}>
                                <input value={name != "null" ? name : ''} onChange={handleName} type="text" placeholder='Name' />
                            </div>
                        </div>
                        <div>
                            <p>Location</p>
                            <div className={style.inputContainer}>
                                <input value={location != "null" ? location : ''} onChange={handleLocation} type="text" placeholder='Location' />
                            </div>
                        </div>
                        <div>
                            <p>Job Title</p>
                            <div className={style.inputContainer}>
                                <input value={job != "null" ? job : ''} onChange={handleJob} type="text" placeholder='Job Title' />
                            </div>
                        </div>
                        <div>
                            <p>Company</p>
                            <div className={style.inputContainer}>
                                <input value={company != "null" ? company : ''} onChange={handleCompany} type="text" placeholder='Company' />
                            </div>
                        </div>
                        <div className={style.bio}>
                            <p>Bio</p>
                            <div className={style.inputContainer}>
                                <textarea value={bio != "null" ? bio : ''} onChange={handleBio} type="text" placeholder='Bio' />
                            </div>
                        </div>
                    </div>

                    <div className={style.images}>
                        <div className={style.profileImage}>
                            <p>Video</p>
                            <div style={noneVideo} onClick={clickVideo} className={style.inputs}>
                                <input
                                    onChange={handleVideo}
                                    ref={videoRef}
                                    type="file"
                                    accept="video/*" />
                                <div className={style.imageCover}>

                                    {video ? (
                                        <video width="100%" height="100%" loop autoPlay controls muted>
                                            <source src={video} />
                                        </video>
                                    ) :
                                        <>
                                            <FontAwesomeIcon icon={faUser} />
                                            <p><span>Select</span> video or drag and drop one here</p>
                                        </>
                                    }
                                </div>
                            </div>

                            <div className={style.remove}>
                                remove
                            </div>

                        </div>
                    </div>


                    <div className={style.buttons}>
                        <button className={style.cancelBtn}>Cancel</button>
                        <button onClick={handleSubmit} className={style.updateBtn}>Update</button>
                    </div>
                </div>
            )}

        </>
    );
}

export default AboutComponent;
