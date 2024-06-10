import React, { useEffect, useState } from 'react';
import style from '../styles/socialMedias.module.scss';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SocialMedias = ({ stylish }) => {
    const socialMediaStyle = {
        display: stylish ? "flex" : "none"
    };

    const location = useLocation();

    const [selectedId, setSelectedId] = useState('');
    const [SocialName, setSocialName] = useState('');
    const [SocialTitle, setSocialTitle] = useState('');
    const [SocialPhoto, setSocialPhoto] = useState(null);
    const [mediaLink, setMediaLink] = useState('');
    const [SelectedMedia, setSelectedMedia] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [edit, setEdit] = useState(false);
    const [editedSocial, setEditedSocial] = useState(null);
    const [selectedName, setSelectedName] = useState('');
    const [selectedTitle, setSelectedTitle] = useState('');
    const [selectedLink, setSelectedLink] = useState('');
    const [chosenCategory, setChosenCategory] = useState('');
    const [selectedMediaType, setSelectedMediaType] = useState('');
    const [changeImage, setChangeImage] = useState(false);
    const [SelectedImage, setSelectedImage] = useState(null);
    const [showImage, setShowImage] = useState([]);
    const [medias, setMedias] = useState([]);
    const [MediaTypes, setMediaTypes] = useState([]);

    const handleName = (e) => {
        setSocialName(e.target.value);
    };

    const handleTitle = (e) => {
        setSocialTitle(e.target.value);
    };

    const handleMediaLink = (e) => {
        setMediaLink(e.target.value);
    };

    const handlePhoto = (e) => {
        setSocialPhoto(e.target.files[0]);
    };

    const acceptBtn = async () => {
        try {
            const formData = new FormData();
            formData.append('name', SocialName);
            formData.append('title', SocialTitle);
            formData.append('mediaType', SelectedMedia);
            formData.append('imageFile', SocialPhoto);
            formData.append('mediaLink', mediaLink || '');
            formData.append('category', selectedCategory);

            const response = await axios.post(`https://localhost:7092/api/Admin/MediaCreater`, formData);

            if (response.status === 200) {
                setMedias(response.data.media)
                console.log(response);
            }
        } catch (error) {
            console.error('Error creating media:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7092/api/Admin/GetSocialMedias`);
                const mediaTypeResponse = await axios.get(`https://localhost:7092/api/Admin/GetMediaTypes`);
                const categoryResponse = await axios.get(`https://localhost:7092/api/Admin/GetCategory`);
                console.log(response);

                if (response.status === 200) {
                    setMedias(response.data.media);
                    setMediaTypes(mediaTypeResponse.data);
                    setCategories(categoryResponse.data);
                } else {
                    throw new Error('Failed to fetch social media data');
                }
            } catch (error) {
                console.error('Error fetching social media data:', error);
            }
        };

        fetchData();
    }, []);

    const editFunction = (res) => {
        setEdit(true);
        setSelectedName(res.name);
        setSelectedTitle(res.title);
        setSelectedLink(res.mediaLink);
        if (res.categories) {
            setChosenCategory(res.categories.categoryName);
        }
        if (res.mediaType) {
            setSelectedMediaType(res.mediaType.name);
        }
        setSelectedImage(res.imageDataUrl);
        setSelectedId(res.id)
    };

    const updateStyle = {
        display: edit ? "flex" : "none"
    };

    const handleCancel = () => {
        setEdit(false);
    };

    const handleUpdateImage = (e) => {
        setChangeImage(true);
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onload = () => setShowImage([{ file, url: reader.result }]);
            reader.readAsDataURL(file);
        }
    };

    console.log(medias);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();

            formData.append('id', selectedId);
            formData.append('name', selectedName);
            formData.append('title', selectedTitle);
            formData.append('mediaLink', selectedLink);
            formData.append('category', chosenCategory);
            formData.append('mediaType', selectedMediaType);
            formData.append('imageFile', SelectedImage)

            const res = await axios.put(`https://localhost:7092/api/Admin/UpdateSocialMedia`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.status === 200) {
                setMedias(res.data.media);
                setEdit(false);
                setChangeImage(false);
            }
        } catch (error) {
            console.error('Error updating media:', error);
        }
    }

    const handleDelete = async (result) => {
        try {
            const req = await axios.delete(`https://localhost:7092/api/Admin/DeleteSocialMedia?id=${result.id}`);

            if(req.status == 200){
                setMedias(req.data.media);
            }
        } catch (error) {
            alert(error);
        }
    }

    const handleEnable = async (result) => {
        try {
            const req = await axios.put(`https://localhost:7092/api/Admin/EnableSocialMedia?id=${result.id}`);

            if(req.status == 200){
                setMedias(req.data.media);
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <>
            <div style={socialMediaStyle} className={style.container}>
                <input onChange={handleName} type="text" placeholder='Name' />
                <input onChange={handleTitle} type="text" placeholder='Title' />
                <input onChange={handleMediaLink} type="text" placeholder='MediaLink' />
                <select value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value) }}>
                    {categories && categories.map((category, index) => (
                        <option value={category.categoryName} key={index}>{category.categoryName}</option>
                    ))}
                </select>
                <select value={SelectedMedia} onChange={(e) => { setSelectedMedia(e.target.value) }}>
                    {MediaTypes && MediaTypes.map((mediaType, index) => (
                        <option value={mediaType.value} key={index}>{mediaType.name}</option>
                    ))}
                </select>
                <input onChange={handlePhoto} type="file" placeholder='Name' />
                <button onClick={acceptBtn}>Accept</button>

                {medias && medias.map((result, index) => (
                    <div className={style.socialImage} key={index}>
                        <div className={style.leftSide}>
                            <p>Name: {result.name}</p>
                            <img src={result.imageDataUrl} alt="" />
                        </div>
                        <div className={style.edit}>
                            <p onClick={() => { editFunction(result); setEditedSocial(result) }}>Edit</p>
                            <p onClick={() => {handleEnable(result)}}>{result.enable == true ? "Enable" : "Disable"}</p>
                            <p onClick={() => {handleDelete(result)}}>Delete</p>
                        </div>
                    </div>
                ))}

                {editedSocial && (
                    <div style={updateStyle} className={style.addContainer}>
                        <div className={style.inputs}>
                            <h4>Media Name</h4>
                            <div className={style.inputContainer}>
                                <input onChange={(e) => { setSelectedName(e.target.value) }} type="text" value={selectedName} />
                            </div>
                        </div>
                        <div className={style.inputs}>
                            <h4>Media Title</h4>
                            <div className={style.inputContainer}>
                                <input onChange={(e) => { setSelectedTitle(e.target.value) }} type="text" value={selectedTitle} />
                            </div>
                        </div>
                        <div className={style.inputs}>
                            <h4>Media Link</h4>
                            <div className={style.inputContainer}>
                                <input onChange={(e) => { setSelectedLink(e.target.value) }} type="text" value={selectedLink} />
                            </div>
                        </div>
                        <div className={style.inputs}>
                            <h4>Media Category</h4>
                            <div className={style.inputContainer}>
                                <select value={chosenCategory} onChange={(e) => { setChosenCategory(e.target.value) }}>
                                    {categories && categories.map((category, index) => (
                                        <option value={category.categoryName} key={index}>{category.categoryName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={style.inputs}>
                            <h4>Media Type</h4>
                            <div className={style.inputContainer}>
                                <select value={selectedMediaType} onChange={(e) => { setSelectedMediaType(e.target.value) }}>
                                    {MediaTypes && MediaTypes.map((mediaType, index) => (
                                        <option value={mediaType.value} key={index}>{mediaType.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={style.inputs}>
                            <h4>Product Image</h4>
                            <input onChange={handleUpdateImage} type="file" multiple />
                            <div className={style.imagePreview}>
                                {changeImage && showImage.map((image, index) => (
                                    <div className={style.previewContainer} key={index}>
                                        <img src={image.url} alt={`Product ${index + 1}`} />
                                    </div>
                                ))}
                                {!changeImage && (
                                    <div className={style.previewContainer}>
                                        <img src={SelectedImage} alt="Selected" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={style.buttons}>
                            <button className={style.cancelBtn} onClick={handleCancel}>Cancel</button>
                            <button className={style.updateBtn} onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SocialMedias;
