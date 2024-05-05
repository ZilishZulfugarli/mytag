import React, { useState } from 'react';
import style from '../styles/adminpanel.module.scss'
import AllUsers from '../components/AllUsers';
import axios from 'axios';
import SocialMedias from '../components/SocialMedias';

const AdminPanel = () => {

    const [allUsers, setallUsers] = useState(null);

    const [allUserPage, setallUserPage] = useState(false);

    const [socialMediasPage, setsocialMediasPage] = useState(false);

    const socialMediaStyle = {
        display: socialMediasPage ? "flex" : "none"
    }



    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:7092/api/Admin');

            if (response.status === 200) {
                setallUsers(response.data)
            }
            else {
                throw new Error('Failed to fetch user data');
            }
        }
        catch (error) {
            console.error('Error fetching user data:', error);
            // Handle error here (e.g., display error message to the user)
        }
    };

    return (
        <>
            <div className={style.container}>
                <div className={style.navbar}>
                    <ul>
                        <li onClick={() => {setallUserPage(true) ; setsocialMediasPage(false); fetchData()}}>All Users</li>
                        <li onClick={() => {setsocialMediasPage(true); setallUserPage(false)}}>Social Medias</li>
                        <li>Statistics</li>
                        {/* <li>Users</li> */}
                    </ul>
                </div>

                <div className={style.main}>
                    <AllUsers users={allUsers} fetchData={fetchData} stylish={allUserPage} />
                    <SocialMedias stylish={socialMediasPage}/>
                </div>
            </div>
        </>
    );
}

export default AdminPanel;
