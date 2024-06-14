import React, { useEffect, useState } from 'react';
import style from '../styles/adminpanel.module.scss'
import AllUsers from '../components/AllUsers';
import axios from 'axios';
import SocialMedias from '../components/SocialMedias';
import ShareLinks from '../components/ShareLinks';
import Products from '../components/Products';
import MainPageTexts from '../components/MainPageTexts';

const AdminPanel = () => {

    const [allUsers, setallUsers] = useState(null);

    const [allUserPage, setallUserPage] = useState(false);

    const [socialMediasPage, setsocialMediasPage] = useState(false);

    const [ShareLink, setShareLinks] = useState(false);

    const [productsPage, setproductsPage] = useState(null);

    const [languages, setLanguages] = useState(null);

    const [mainPage, setMainPage] = useState(false);

    const socialMediaStyle = {
        display: socialMediasPage ? "flex" : "none"
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const req = await axios.get(`https://localhost:7092/api/Admin/GetLanguage`);

                if(req.status == 200){
                    setLanguages(req.data)
                }
            } catch (error) {
                
            }
        }

        fetch();
    }, []);

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
                        <li onClick={() => { setallUserPage(true); setsocialMediasPage(false); fetchData(); setShareLinks(false); setproductsPage(false); setMainPage(false);}}>All Users</li>
                        <li onClick={() => { setallUserPage(false); setShareLinks(false); setsocialMediasPage(true); setproductsPage(false); setMainPage(false);}}>Social Medias</li>
                        <li>Statistics</li>
                        <li onClick={() => {
                            setShareLinks(true);
                            setallUserPage(false);
                            setsocialMediasPage(false);
                            setproductsPage(false);
                            setMainPage(false);
                        }}>Share Links</li>
                        <li onClick={() => {
                            setShareLinks(false);
                            setallUserPage(false);
                            setsocialMediasPage(false);
                            setMainPage(false);
                            setproductsPage(true);
                        }}>Products</li>
                        <li onClick={() => {
                            setShareLinks(false);
                            setallUserPage(false);
                            setsocialMediasPage(false);
                            setproductsPage(false);
                            setMainPage(true);
                        }}>Main Page</li>
                    </ul>
                </div>

                <div className={style.main}>
                    <AllUsers users={allUsers} fetchData={fetchData} stylish={allUserPage} />
                    <SocialMedias stylish={socialMediasPage} />
                    <ShareLinks stylish={ShareLink} />
                    <Products stylish={productsPage} languages={languages} />
                    <MainPageTexts stylish={mainPage} languages={languages}/>
                </div>
            </div>
        </>
    );
}

export default AdminPanel;
