import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from '../styles/products.module.scss';
import bgImage from './../images/simpleBGPhoto.jpg';
import Slideshow from './Slideshow';

const Products = ({ stylish, languages }) => {
    const productStyle = {
        display: stylish ? "flex" : "none"
    };

    console.log(languages);

    const [productData, setProductData] = useState(null);
    const [addLink, setAddLink] = useState(false);
    const [update, setupdate] = useState(false);
    const [updateProduct, setupdateProduct] = useState(null);
    const [shareLinks, setShareLinks] = useState([]);
    const [productName, setproductName] = useState('');
    const [productDescription, setproductDescription] = useState('');
    const [images, setImages] = useState([]);
    const [sendedImages, setSendedImages] = useState([]);
    const [video, setVideo] = useState(null);
    const [sendedVideo, setSendedVideo] = useState(null);
    const [price, setPrice] = useState(null);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [sendedColors, setsendedColors] = useState([]);
    const [updateId, setupdateId] = useState(null);

    const [changeImage, setchangeImage] = useState(false);

    const [localizations, setLocalizations] = useState([]);

    const [localizationId, setLocalizationId] = useState(null);

    useEffect(() => {
        if (languages) {
            setLocalizations(languages.map(lang => ({
                languageId: lang.id,
                name: '',
                description: ''
            })));
        }
    }, [languages]);

    console.log(localizations.name);


    // const [newName, setNewName] = useState(null);
    // const [newDescription, setNewDescription] = useState(null);
    // const [newPrice, setNewPrice] = useState(null);
    // const [newDiscount, setNewDiscount] = useState(null);
    // const [newImages, setNewImages] = useState([]);
    // const [newSendedImages, setNewSendedImages] = useState([]);
    // const [newVideo, setNewVideo] = useState();

    useEffect(() => {
        const fetch = async () => {
            try {
                const req = await axios.get(`https://localhost:7092/api/Admin/GetProducts`);

                if (req.status === 200) {
                    setProductData(req.data);
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
        const files = Array.from(e.target.files);
        if (files.length) {
            setSendedImages(files);
            const fileReaders = files.map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve({ file, url: reader.result });
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });
            Promise.all(fileReaders)
                .then((results) => setImages(results))
                .catch((error) => console.error("Failed to read files", error));
        }
    };

    const handleUpdateImage = (e) => {
        setchangeImage(true);
        const files = Array.from(e.target.files);
        if (files.length) {
            setSendedImages(files);
            const fileReaders = files.map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve({ file, url: reader.result });
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });
            Promise.all(fileReaders)
                .then((results) => setImages(results))
                .catch((error) => console.error("Failed to read files", error));
        }
    }

    const handleVideo = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSendedVideo(file);
            const reader = new FileReader();
            reader.onload = () => {
                setVideo(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', productDescription);
        formData.append('price', price);
        formData.append('discount', discountPrice);

        // Append images and their colors
        images.forEach((image, index) => {
            formData.append(`Images[${index}].Color`, sendedColors[index]);
            formData.append(`Images[${index}].ImageFile`, sendedImages[index]);
        });

        localizations.forEach((loc, index) => {
            formData.append(`Localizations[${index}].LanguageId`, loc.languageId);
            formData.append(`Localizations[${index}].Name`, loc.name);
            formData.append(`Localizations[${index}].Description`, loc.description);
        });

        if (sendedVideo) {
            formData.append('videoFile', sendedVideo);
        }

        try {
            const req = await axios.post(`https://localhost:7092/api/Admin/AddPro`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (req.status === 200) {
                setShareLinks(req.data);
                setAddLink(false);
                setproductName('');
                setproductDescription('');
                setImages([]);
                setSendedImages([]);
                setVideo(null);
                setSendedVideo(null);
                setsendedColors([]);
                setPrice(null);
                setDiscountPrice(0);
                setLocalizations([]);

                setProductData(req.data);
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleCancel = () => {
        setAddLink(false);
        setupdate(false);
        setproductName('');
        setproductDescription('');
        setPrice('');
        setDiscountPrice(0);
        setImages([]);
        setSendedImages([]);
        setVideo(null);
        setSendedVideo(null);
        setchangeImage(false);
        setLocalizations([]);
    }

    const handleDelete = async (product) => {
        console.log(product);
        try {
            const req = await axios.delete(`https://localhost:7092/api/Admin/DeleteProduct?id=${product.id}`)

            if (req.status == 200) {
                setProductData(req.data);
            }
        } catch (error) {

        }
    };

    const handleEnable = async (product) => {
        console.log(product);
        try {
            const req = await axios.put(`https://localhost:7092/api/Admin/EnableProduct?id=${product.id}`)

            if (req.status == 200) {
                setProductData(req.data);
            }
        } catch (error) {

        }
    };


    const openUpdate = (product) => {
        setupdate(true);
        setupdateId(product.id);
        setupdateProduct(product);
        setproductName(product.name);
        setproductDescription(product.description);
        setPrice(product.price);
        setDiscountPrice(product.discount);
        // setImages(product.im);
    }

    console.log(updateProduct);

    const updateStyle = {
        display: update ? "flex" : "none"
    }

    useEffect(() => {
        if (updateProduct && updateProduct.localizations.length > 0) {
            setLocalizations(updateProduct.localizations.map(loc => ({
                localizationId: loc.id,
                languageId: loc.languageId,
                name: loc.name,
                description: loc.description
            })));
        }
    }, [updateProduct]);

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', productDescription);
        formData.append('price', price);
        formData.append('discount', discountPrice);
        formData.append('id', updateId)

        images.forEach((image, index) => {
            formData.append(`Images[${index}].Color`, sendedColors[index]);
            formData.append(`Images[${index}].ImageFile`, sendedImages[index]);
        });

        localizations.forEach((loc, index) => {
            formData.append(`Localizations[${index}].LocalizationId`, loc.localizationId);
            formData.append(`Localizations[${index}].LanguageId`, loc.languageId);
            formData.append(`Localizations[${index}].Name`, loc.name);
            formData.append(`Localizations[${index}].Description`, loc.description);
        });


        if (sendedVideo) {
            formData.append('videoFile', sendedVideo);
        }
        try {
            const req = await axios.put(`https://localhost:7092/api/Admin/UpdateProduct`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (req.status === 200) {
                setShareLinks(req.data);
                setAddLink(false);
                setproductName('');
                setproductDescription('');
                setImages([]);
                setSendedImages([]);
                setVideo(null);
                setSendedVideo(null);
                setsendedColors([]);
                setLocalizations([]);

                setProductData(req.data);
                setupdate(false);
            }
        } catch (error) {
            console.error(error);
        }

    }

    const handleImageDelete = async (product, image) => {
        const formData = new FormData();

        formData.append('id', product.id);
        formData.append('imageId', image.id);
        try {
            const req = await axios.delete(`https://localhost:7092/api/Admin/DeleteProductImage`, {
                data: formData
            });

            if (req.status == 200) {
                setProductData(req.data);
                setupdate(false);
            }
        } catch (error) {

        }
    }

    const handleNameChange = (index, value) => {
        const newLocalizations = [...localizations];
        newLocalizations[index].name = value;
        setLocalizations(newLocalizations);
        console.log("Updated localizations:", newLocalizations);
    };

    const handleDescriptionChange = (index, value) => {
        const newLocalizations = [...localizations];
        newLocalizations[index].description = value;
        setLocalizations(newLocalizations);
    };

    console.log(productData);
    return (
        <div style={productStyle} className={style.container}>
            <button onClick={handleAdd}>Add New Product</button>
            <div className={style.products}>
                {productData && productData.map((product, index) => (
                    <div key={index} className={style.product}>
                        <div className={style.imageContainer}>
                            {product.productImages.length > 1 ? (
                                <Slideshow images={product.productImages} />
                            ) : (
                                <div className={style.imageContainer}>
                                    <img src={product.productImages[0]?.imageName} alt="" />
                                </div>
                            )}
                        </div>


                        <h1>{product.name}</h1>

                        <div className={style.editContainer}>
                            <button onClick={() => { openUpdate(product) }}>Edit</button>
                            <button onClick={() => { handleEnable(product) }}>{product.enable == true ? "Enable" : "Disable"}</button>
                            <button onClick={() => { handleDelete(product) }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={addStyle} className={style.addContainer}>

                {languages && languages.map((lang, index) => (
                    <div key={lang.id}>
                        <div className={style.inputs}>
                            <h4>Product Name for {lang.language}</h4>
                            <div className={style.inputContainer}>
                                <input
                                    onChange={(e) => handleNameChange(index, e.target.value)}
                                    type="text"
                                    value={localizations[index]?.name || ""}
                                />
                            </div>
                        </div>
                        <div className={style.inputs}>
                            <h4>Product Description for {lang.language}</h4>
                            <div className={style.textareaContainer}>
                                <textarea
                                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                    value={localizations[index]?.description || ""}
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <div className={style.inputs}>
                    <h4>Product Price</h4>
                    <div className={style.inputContainer}>
                        <input onChange={(e) => setPrice(e.target.value)} value={price} />
                    </div>
                </div>
                <div className={style.inputs}>
                    <h4>Product Discount Price</h4>
                    <div className={style.inputContainer}>
                        <input onChange={(e) => setDiscountPrice(e.target.value)} value={discountPrice} />
                    </div>
                </div>

                <div className={style.inputs}>
                    <h4>Product Image</h4>
                    <input onChange={handleImage} type="file" multiple />
                    <div className={style.imagePreview}>
                        {images && images.map((image, index) => (
                            <div className={style.previewContainer} key={index}>
                                <img src={image.url} alt={`Product ${index + 1}`} />
                                <h4>{index + 1}'th Product's Color</h4>
                                <div className={style.inputContainer}>
                                    <input
                                        onChange={(e) => {
                                            const newColors = [...sendedColors];
                                            newColors[index] = e.target.value;
                                            setsendedColors(newColors);
                                        }}
                                        type="text"
                                        value={sendedColors[index] || ''}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                <div className={style.inputs}>
                    <h4>Product Video</h4>
                    <input onChange={handleVideo} type="file" />
                    {video && <video src={video} controls width="300" />}
                </div>

                <div className={style.buttons}>
                    <button className={style.cancelBtn} onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSubmit} className={style.updateBtn}>Create</button>
                </div>
            </div>

            {updateProduct && <div style={updateStyle} className={style.addContainer}>
                {updateProduct.localizations && updateProduct.localizations.map((lang, index) => (
                    <>
                        <div key={lang.id}>
                        <div className={style.inputs}>
                            <h4>Product Name for {lang.languages.language}</h4>
                            <div className={style.inputContainer}>
                                <input
                                    onChange={(e) => handleNameChange(index, e.target.value)}
                                    type="text"
                                    value={localizations[index]?.name ? localizations[index]?.name : lang.name}
                                />
                            </div>
                        </div>
                        <div className={style.inputs}>
                            <h4>Product Description for {lang.languages.language}</h4>
                            <div className={style.textareaContainer}>
                                <textarea
                                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                    value={localizations[index]?.description ? localizations[index]?.description : lang.description}
                                />
                            </div>
                        </div>
                    </div>

                    </>
                ))}

                <div className={style.inputs}>
                    <h4>Product Price</h4>
                    <div className={style.inputContainer}>
                        <input onChange={(e) => setPrice(e.target.value)} value={price} />
                    </div>
                </div>
                <div className={style.inputs}>
                    <h4>Product Discount Price</h4>
                    <div className={style.inputContainer}>
                        <input onChange={(e) => setDiscountPrice(e.target.value)} value={discountPrice} />
                    </div>
                </div>

                <div className={style.inputs}>
                    <h4>Product Image</h4>
                    <input onChange={handleUpdateImage} type="file" multiple />
                    <div className={style.imagePreview}>
                        {changeImage && images.map((image, index) => (
                            <div className={style.previewContainer} key={index}>
                                <img src={image.url} alt={`Product ${index + 1}`} />

                                <h4>{index + 1}'th Product's Color</h4>
                                <div className={style.inputContainer}>
                                    <input
                                        onChange={(e) => {
                                            const newColors = [...sendedColors];
                                            newColors[index] = e.target.value;
                                            setsendedColors(newColors);
                                        }}
                                        type="text"
                                        value={sendedColors[index] || ''}
                                    />
                                </div>
                            </div>
                        ))}
                        {!changeImage && updateProduct.productImages && updateProduct.productImages.map((image, index) => (
                            <div className={style.previewContainer} key={index}>
                                <img src={image.imageName} alt={`Product ${index + 1}`} />
                                <button onClick={() => { handleImageDelete(updateProduct, image) }}>Delete Image</button>
                                <h4>{index + 1}'th Product's Color</h4>
                                <div className={style.inputContainer}>
                                    <input
                                        onChange={(e) => {
                                            const newColors = [...sendedColors];
                                            newColors[index] = e.target.value;
                                            setsendedColors(newColors);
                                        }}
                                        type="text"
                                        value={image.color}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>


                </div>

                <div className={style.inputs}>
                    <h4>Product Video</h4>
                    <input onChange={handleVideo} type="file" />
                    {updateProduct.productVideos.length > 0 && <video src={updateProduct.productVideos.videoName} controls width="300" />}
                </div>

                <div className={style.buttons}>
                    <button className={style.cancelBtn} onClick={handleCancel}>Cancel</button>
                    <button onClick={handleUpdate} className={style.updateBtn}>Update</button>
                </div>
            </div>}

        </div>
    );
};

export default Products;
