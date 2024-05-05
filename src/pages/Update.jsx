import React, { useState } from 'react';
import style from '../styles/update.module.scss'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { cat } from 'fontawesome';

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


    const acceptBtn = async () => {
        try {

            const formData = new FormData();
            formData.append('userId', user.user.id);
            formData.append('imageFile', SendedImage);
            const response = await axios.post(`https://localhost:7092/api/UpdateFile`, formData);

            if(response.status == 200){
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


        </>
    );
}

export default Update;
