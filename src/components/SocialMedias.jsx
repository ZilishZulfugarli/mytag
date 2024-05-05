import React, { useEffect, useState } from 'react';
import style from '../styles/socialMedias.module.scss'
import axios from 'axios';

const SocialMedias = ({ stylish }) => {


    const socialMediaStyle = {
        display: stylish ? "flex" : "none"
    }

    const [SocialName, setSocialName] = useState(null);

    const [SocialTitle, setSocialTitle] = useState(null);

    const [SocialPhoto, setSocialPhoto] = useState(null);

    const handleName = (e) => {
        setSocialName(e.target.value);
    }

    const handleTitle = (e) => {
        setSocialTitle(e.target.value);
    }

    const handlePhoto = (e) => {
        setSocialPhoto(e.target.files[0]);
    }


    console.log(SocialName);

    console.log(SocialPhoto);

    const acceptBtn = async () => {
        try {
            const formData = new FormData();
            formData.append('name', SocialName);
            formData.append('title', SocialTitle);
            formData.append('imageFile', SocialPhoto)

            const response = await axios.post(`https://localhost:7092/api/Admin/MediaCreater`, formData)

            if (response.status == 200) {
                console.log(response);
            }
        } catch {

        }
    }

    const [medias, setmedias] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7092/api/Admin/GetSocialMedias`);
                console.log(response);

                if (response.status === 200) {
                    setmedias(response.data.media); // Set the response data, not the response itself
                } else {
                    throw new Error('Failed to fetch social media data');
                }
            } catch (error) {
                console.error('Error fetching social media data:', error);
            }
        };

        fetchData(); // Call the fetchData function
    }, []);

    console.log(medias);


    return (
        <>
            <div style={socialMediaStyle} className={style.container}>
                <input onChange={handleName} type="text" placeholder='Name' />
                <input onChange={handleTitle} type="text" placeholder='Title' />
                <input onChange={handlePhoto} type="file" placeholder='Name' />
                <button onClick={acceptBtn}>Accept</button>

                {medias && medias.map((result, index) => (
                    <div key={index}>
                        <p>Name: {result.name}</p>
                        <img src={result.imageDataUrl} alt="" />
                    </div>
                ))}


            </div>
        </>
    );
}

export default SocialMedias;
