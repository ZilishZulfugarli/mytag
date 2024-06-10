import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from '../styles/sharelink.module.scss';

const ShareLinks = ({ stylish }) => {
    const shareLinkStyle = {
        display: stylish ? "block" : "none"
    };

    const [addLink, setAddLink] = useState(false);
    const [shareLinks, setShareLinks] = useState([]);
    const [linkName, setLinkName] = useState('');
    const [linkHeader, setLinkHeader] = useState('');
    const [image, setImage] = useState(null);
    const [sendedImage, setSendedImage] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const req = await axios.get(`https://localhost:7092/api/Admin/GetShareLink`);
                if (req.status === 200) {
                    setShareLinks(req.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetch();
    }, []);

    const handleAdd = () => {
        setAddLink(true);
    };

    const addStyle = {
        display: addLink ? "flex" : "none"
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSendedImage(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (prevLinks) => {
        const formData = new FormData();
        formData.append('name', linkName);
        formData.append('link', linkHeader);
        formData.append('imageFile', sendedImage);

        try {
            const req = await axios.post(`https://localhost:7092/api/Admin/AddShareLink`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (req.status === 200) {
                setShareLinks(req.data);
                
                setAddLink(false);
                setLinkName(''); 
                setLinkHeader('');
                setImage(null);
                setSendedImage(null); 
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteLink = async (id) => {
        try {
            const req = await axios.delete(`https://localhost:7092/api/Admin/DeleteShareLink?id=${id}`)

            if(req.status == 200){
                setShareLinks(req.data)
            }
        } catch (error) {
            
        }
    }

    

    const enableLink = async (id) => {
        try {
            const req = await axios.put(`https://localhost:7092/api/Admin/ChangeEnable?id=${id}`)

            if(req.status == 200){
                setShareLinks(req.data)
            }
        } catch (error) {
            
        }
    }

    console.log(shareLinks);

    return (
        <>
            <div style={shareLinkStyle} className={style.container}>
                <div className={style.addLink}>
                    <p onClick={handleAdd}>Add New Link</p>
                </div>
                <div className={style.links}>
                    {shareLinks.media? (
                        shareLinks.media.map((media, index) => (
                            <div key={index} className={style.link}>
                                <img src={media.imageDataUrl} alt="" />
                                <p>{media.name}</p>
                                <div className={style.linkEdit}>
                                    <p>Edit</p>
                                    <p onClick={() => enableLink(media.id)}>{media.enable ? "Enable" : "Disable"}</p>
                                    <p onClick={() => deleteLink(media.id)}>Delete</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No share links available.</p>
                    )}
                </div>

                <div style={addStyle} className={style.addContainer}>
                    <div className={style.inputs}>
                        <h4>Link Name</h4>
                        <div className={style.inputContainer}>
                            <input onChange={(e) => setLinkName(e.target.value)} type="text" value={linkName} />
                        </div>
                    </div>
                    <div className={style.inputs}>
                        <h4>Link Header</h4>
                        <div className={style.inputContainer}>
                            <input onChange={(e) => setLinkHeader(e.target.value)} type="text" value={linkHeader} />
                        </div>
                    </div>
                    <div className={style.inputs}>
                        <h4>Link Image</h4>
                        <input onChange={handleImage} type="file" />
                        <img src={image} alt="" />
                    </div>

                    <div className={style.buttons}>
                        <button className={style.cancelBtn} onClick={() => setAddLink(false)}>Cancel</button>
                        <button onClick={handleSubmit} className={style.updateBtn}>Update</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShareLinks;
