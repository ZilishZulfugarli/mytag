import React, { useEffect, useState } from 'react';
import style from '../styles/mainpagetexts.module.scss'
import bgImg from './../images/simpleBGPhoto.jpg'
import axios from 'axios';

const MainPageTexts = ({ stylish, languages }) => {

    const mainStyle = {
        display: stylish ? "flex" : "none"
    }

    const [localizations, setLocalizations] = useState([]);

    const [updateId, setUpdateId] = useState(null);

    const [addLocalization, setAddLocalization] = useState({
        homeMainId: '1003',
        languageId: '',
        title: '',
        subTitle: '',
        buttonText: '',
        imageFile: '',
        productTitle: '',
        productSubTitle: '',
        productButtonText: '',
        aboutTitle: '',
        aboutSubTitle: '',
        aboutButtonText: '',
        aboutImageName: '',
        aboutImageFile: '',
    });

    const handleAdd = (field, value) => {
        setAddLocalization(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileChange = (field, file) => {
        setAddLocalization(prevState => ({
            ...prevState,
            [field]: file
        }));
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        Object.keys(addLocalization).forEach(key => {
            if(addLocalization[key]){
                formData.append(key, addLocalization[key]);
            }
        });

        const response = await axios.post('https://localhost:7092/api/Admin/PostNewMain', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Response:', response.data);
    }

    console.log(localizations);
    console.log(languages);

    const [data, setData] = useState(null);




    useEffect(() => {
        const fetch = async () => {
            try {
                const request = await axios.get(`https://localhost:7092/api/Admin/GetMainText`);

                if (request.status == 200) {
                    const fetchedData = request.data[0].homeMainLocalizations
                    setData(request.data[0].homeMainLocalizations);
                    setUpdateId(request.data[0].homeMainLocalizations[0].homeMainId)
                    setLocalizations(
                        fetchedData.map(item => ({
                            languageId: item.languageId,
                            title: item.title,
                            subTitle: item.subTitle,
                            buttonText: item.buttonText,
                            id: item.id,
                            productTitle: item.productTitle,
                            productSubTitle: item.productSubTitle,
                            productButtonText: item.productButtonText,
                            aboutTitle: item.aboutTitle,
                            aboutSubTitle: item.aboutSubTitle,
                            aboutButtonText: item.aboutButtonText,
                            languages: item.language,
                            homeMain: item.homeMain
                        }))
                    )
                }
            } catch (error) {

            }
        }
        fetch();
    }, []);
    console.log(updateId);

    const handleFieldChange = (index, field, value) => {
        const newLocalization = [...localizations];
        newLocalization[index][field] = value;
        setLocalizations(newLocalization);
    };

    const updateMainText = async () => {
        try {
            const formData = new FormData();
            formData.append("id", updateId);

            localizations.forEach((localization, index) => {
                formData.append(`Localizations[${index}].Id`, localization.id);
                formData.append(`Localizations[${index}].Title`, localization.title);
                formData.append(`Localizations[${index}].SubTitle`, localization.subTitle);
                formData.append(`Localizations[${index}].ButtonText`, localization.buttonText);
                formData.append(`Localizations[${index}].ProductTitle`, localization.productTitle);
                formData.append(`Localizations[${index}].ProductSubTitle`, localization.productSubTitle);
                formData.append(`Localizations[${index}].ProductButtonText`, localization.productButtonText);
                formData.append(`Localizations[${index}].AboutTitle`, localization.aboutTitle);
                formData.append(`Localizations[${index}].AboutSubTitle`, localization.aboutSubTitle);
                formData.append(`Localizations[${index}].AboutButtonText`, localization.aboutButtonText);
                if (localization.ImageFile) {
                    formData.append(`Localizations[${index}].ImageFile`, localization.ImageFile);
                }
            });

            const response = await axios.put('https://localhost:7092/api/Admin/UpdateMainText', formData, {
                headers: {
                },
            });

            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    console.log(addLocalization);

    const [add, setadd] = useState(false);

    const addNew =  () => {
        setadd(true);
    }

    const cancelBtn = () => {
        setadd(false);
    }

    const addStyle = {
        display: add ? "flex" : "none"
    }

    return (
        <div style={mainStyle} className={style.container}>
            <button onClick={addNew}>Add New Language</button>
            {data && data.map((lang, index) => (
                <>
                    <div className={style.box} key={index}>
                        <div className={style.input}>
                            <div className={style.inputs}>
                                <p>Main title in {lang.languages.language}</p>
                                <textarea
                                    onChange={(e) => { handleFieldChange(index, 'title', e.target.value) }}
                                    value={localizations[index]?.title}></textarea>
                            </div>
                            <div className={style.inputs}>
                                <p>Main subtitle in {lang.languages.language}</p>
                                <textarea
                                    onChange={(e) => { handleFieldChange(index, 'subTitle', e.target.value) }}
                                    value={localizations[index]?.subTitle}></textarea>
                            </div>
                            <div className={style.inputs}>
                                <p>Main button in {lang.languages.language}</p>
                                <textarea
                                    onChange={(e) => { handleFieldChange(index, 'buttonText', e.target.value) }}
                                    value={localizations[index]?.buttonText}></textarea>
                            </div>
                            <div className={style.inputs}>
                                <p>Main image in {lang.languages.language}</p>
                                <input type="file" />
                            </div>
                        </div>

                        <div className={style.image}>
                            <img src={lang.imageName} alt="image" />
                            <button>Delete Image</button>
                        </div>
                    </div>

                </>
            ))}

            {data && data.map((lang, index) => (
                <>
                    <div className={style.box} key={index}>
                        <div className={style.input}>
                            <div className={style.inputs}>
                                <p>Product title in {lang.languages.language}</p>
                                <textarea
                                    onChange={(e) => { handleFieldChange(index, 'productTitle', e.target.value) }}
                                    value={localizations[index]?.productTitle}></textarea>
                            </div>
                            <div className={style.inputs}>
                                <p>Product subtitle in {lang.languages.language}</p>
                                <textarea
                                    onChange={(e) => { handleFieldChange(index, 'productSubTitle', e.target.value) }}
                                    value={localizations[index]?.productSubTitle}></textarea>
                            </div>
                            <div className={style.inputs}>
                                <p>Product button in {lang.languages.language}</p>
                                <textarea
                                    onChange={(e) => { handleFieldChange(index, 'productButtonText', e.target.value) }}
                                    value={localizations[index]?.productButtonText}></textarea>
                            </div>
                        </div>
                    </div>

                </>
            ))}

            {data && data.map((lang, index) => (
                <>
                    <div className={style.box} key={index}>
                        <div className={style.input}>
                            <div className={style.inputs}>
                                <p>About title in {lang.languages.language}</p>
                                <textarea
                                    onChange={(e) => { handleFieldChange(index, 'aboutTitle', e.target.value) }}
                                    value={localizations[index]?.aboutTitle}></textarea>
                            </div>
                            <div className={style.inputs}>
                                <p>About subtitle in {lang.languages.language}</p>
                                <textarea
                                    onChange={(e) => { handleFieldChange(index, 'aboutSubTitle', e.target.value) }}
                                    value={localizations[index]?.aboutSubTitle}></textarea>
                            </div>
                            <div className={style.inputs}>
                                <p>About button in {lang.languages.language}</p>
                                <textarea
                                    onChange={(e) => { handleFieldChange(index, 'aboutButtonText', e.target.value) }}
                                    value={localizations[index]?.aboutButtonText}></textarea>
                            </div>
                            <div className={style.inputs}>
                                <p>About image in {lang.languages.language}</p>
                                <input type="file" />
                            </div>
                        </div>

                        <div className={style.image}>
                            <img src={lang.aboutImageName} alt="image" />
                            <button>Delete Image</button>
                        </div>
                    </div>

                </>
            ))}

            <div style={addStyle} className={style.addContainer}>
                <div className={style.inputs}>
                    <h4>Set Language</h4>
                    {languages && (
                        <select
                            value={addLocalization.languageId}
                            onChange={(e) => handleAdd('languageId', e.target.value)}
                        >
                            <option value="">Select Language</option>
                            {languages.map(lang => (
                                <option key={lang.id} value={lang.id}>{lang.language}</option>
                            ))}
                        </select>
                    )}
                </div>
                <div className={style.inputs}>
                    <h4>Main Title</h4>
                    <div className={style.inputContainer}>
                        <input
                            type="text"
                            value={addLocalization.title}
                            onChange={(e) => handleAdd('title', e.target.value)}
                        />
                    </div>
                </div>
                <div className={style.inputs}>
                    <h4>SubTitle</h4>
                    <div className={style.inputContainer}>
                        <input
                            type="text"
                            value={addLocalization.subTitle}
                            onChange={(e) => handleAdd('subTitle', e.target.value)}
                        />
                    </div>
                </div>
                <div className={style.inputs}>
                    <h4>Button Text</h4>
                    <div className={style.inputContainer}>
                        <input
                            type="text"
                            value={addLocalization.buttonText}
                            onChange={(e) => handleAdd('buttonText', e.target.value)}
                        />
                    </div>
                </div>
                <div className={style.inputs}>
                    <h4>Image File</h4>
                    <div className={style.inputContainer}>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange('imageFile', e.target.files[0])}
                        />
                    </div>
                </div>
                <div className={style.inputs}>
                    <h4>Product Title</h4>
                    <div className={style.inputContainer}>
                        <input
                            type="text"
                            value={addLocalization.productTitle}
                            onChange={(e) => handleAdd('productTitle', e.target.value)}
                        />
                    </div>
                </div>
                <div className={style.inputs}>
                    <h4>Product SubTitle</h4>
                    <div className={style.inputContainer}>
                        <input
                            type="text"
                            value={addLocalization.productSubTitle}
                            onChange={(e) => handleAdd('productSubTitle', e.target.value)}
                        />
                    </div>
                </div>
                <div className={style.inputs}>
                    <h4>Product Button Text</h4>
                    <div className={style.inputContainer}>
                        <input
                            type="text"
                            value={addLocalization.productButtonText}
                            onChange={(e) => handleAdd('productButtonText', e.target.value)}
                        />
                    </div>
                </div>
                <div className={style.inputs}>
                    <h4>About Title</h4>
                    <div className={style.inputContainer}>
                        <input
                            type="text"
                            value={addLocalization.aboutTitle}
                            onChange={(e) => handleAdd('aboutTitle', e.target.value)}
                        />
                    </div>
                </div>
                <div className={style.inputs}>
                    <h4>About SubTitle</h4>
                    <div className={style.inputContainer}>
                        <input
                            type="text"
                            value={addLocalization.aboutSubTitle}
                            onChange={(e) => handleAdd('aboutSubTitle', e.target.value)}
                        />
                    </div>
                </div>
                <div className={style.inputs}>
                    <h4>About Button Text</h4>
                    <div className={style.inputContainer}>
                        <input
                            type="text"
                            value={addLocalization.aboutButtonText}
                            onChange={(e) => handleAdd('aboutButtonText', e.target.value)}
                        />
                    </div>
                </div>
                <div className={style.inputs}>
                    <h4>About Image File</h4>
                    <div className={style.inputContainer}>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange('aboutImageFile', e.target.files[0])}
                        />
                    </div>
                </div>
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={cancelBtn}>Cancel</button>
            </div>

            <button onClick={updateMainText}>Update</button>

        </div>
    );
}

export default MainPageTexts;
