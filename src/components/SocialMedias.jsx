import React, { useEffect, useState } from 'react';
import style from '../styles/socialMedias.module.scss'
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SocialMedias = ({ stylish }) => {


    const socialMediaStyle = {
        display: stylish ? "flex" : "none"
    }

    const location = useLocation();

    const [SocialName, setSocialName] = useState(null);

    const [SocialTitle, setSocialTitle] = useState(null);

    const [SocialPhoto, setSocialPhoto] = useState(null);

    const [mediaLink, setmediaLink] = useState(null);

    const [SelectedMedia, setSelectedMedia] = useState(null);


    const handleName = (e) => {
        setSocialName(e.target.value);
    }

    const handleTitle = (e) => {
        setSocialTitle(e.target.value);
    }

    const handleMediaLink = (e) => {
        setmediaLink(e.target.value)
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
            formData.append('mediaType', SelectedMedia)
            formData.append('imageFile', SocialPhoto)
            formData.append('mediaLink', mediaLink)

            const response = await axios.post(`https://localhost:7092/api/Admin/MediaCreater`, formData)

            if (response.status == 200) {
                console.log(response);
            }
        } catch {

        }
    }

    const [medias, setmedias] = useState([]);

    const [MediaTypes, setMediaTypes] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7092/api/Admin/GetSocialMedias`);

                const mediaType = await axios.get(`https://localhost:7092/api/Admin/GetMediaTypes`)
                console.log(response);

                if (response.status === 200) {
                    setmedias(response.data.media);
                    setMediaTypes(mediaType.data);
                } else {
                    throw new Error('Failed to fetch social media data');
                }
            } catch (error) {
                console.error('Error fetching social media data:', error);
            }
        };

        fetchData();
    }, []);

    console.log(MediaTypes);


    return (
        <>
            <div style={socialMediaStyle} className={style.container}>
                <input onChange={handleName} type="text" placeholder='Name' />
                <input onChange={handleTitle} type="text" placeholder='Title' />
                <input onChange={handleMediaLink} type="text" placeholder='MediaLink' />
                <select onChange={(e) => {setSelectedMedia(e.target.value)}}>
                    {MediaTypes && MediaTypes.map((mediaType, index) => (
                        <option value={mediaType.value} key={index}>{mediaType.name}</option>
                    ))}
                </select>
                <input onChange={handlePhoto} type="file" placeholder='Name' />
                <button onClick={acceptBtn}>Accept</button>

                {medias && medias.map((result, index) => (
                    <div className={style.socialImage} key={index}>
                        <p>Name: {result.name}</p>
                        <img src={result.imageDataUrl} alt="" />
                    </div>
                ))}


            </div>
        </>
    );
}

export default SocialMedias;
