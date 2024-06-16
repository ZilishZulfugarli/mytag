import React, { useEffect, useState } from 'react';
import style from '../styles/registerpagetexts.module.scss';
import axios from 'axios';

const RegisterPageTexts = ({ stylish, languages }) => {
    const mainStyle = {
        display: stylish ? "flex" : "none"
    };

    const [localization, setLocalization] = useState([]);
    const [data, setData] = useState();
    const [updateId, setUpdateId] = useState(null);
    const [updateLangId, setUpdateLangId] = useState(null);

    const initialAddLocalization = {
        homeMainId: 0,
        languageId: '',
        registerSteps: Array.from({ length: 4 }, (_, i) => ({
            id: '',
            languageId: '',
            registerId: '',
            stepName: '',
            stepNumber: i + 1,
            stepSubTitle: '',
            stepTitle: '',
            buttonText: '',
            registerInputs: [
                {
                    id: '',
                    inputName: ''
                }
            ]
        }))
    };

    const [addLocalization, setAddLocalization] = useState(initialAddLocalization);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`https://localhost:7092/api/Register`);

                if (response.status === 200) {
                    const result = response.data;
                    setData(result);

                    const transformedData = result.map(x => ({
                        homeMainId: x.id,
                        languageId: x.languageId,
                        registerSteps: x.registerSteps.map(y => ({
                            id: y.id,
                            languageId: y.languageId,
                            registerId: y.registerId,
                            stepName: y.stepName,
                            stepNumber: y.stepNumber,
                            stepSubTitle: y.stepSubTitle,
                            stepTitle: y.stepTitle,
                            buttonText: y.buttonText,
                            registerInputs: y.registerInputs.map(input => ({
                                id: input.id,
                                inputName: input.inputName
                            }))
                        }))
                    }));

                    setLocalization(transformedData);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetch();
    }, []);

    console.log(data);
    console.log(localization);

    const handleUpdate = async (id, langId) => {
        try {
            const formData = new FormData();
    
            // Find the specific localization to update
            const targetLocalization = localization.find(lang => lang.homeMainId === id && lang.languageId === langId);
    
            if (!targetLocalization) {
                console.error("Localization not found");
                return;
            }
    
            formData.append('id', targetLocalization.homeMainId);
            formData.append('languageId', targetLocalization.languageId);
    
            targetLocalization.registerSteps.forEach((step, stepIndex) => {
                formData.append(`RegisterSteps[${stepIndex}].Id`, step.id);
                formData.append(`RegisterSteps[${stepIndex}].languageId`, step.targetLocalization.languageId);
                formData.append(`RegisterSteps[${stepIndex}].registerId`, step.registerId);
                formData.append(`RegisterSteps[${stepIndex}].stepNumber`, step.stepNumber);
                formData.append(`RegisterSteps[${stepIndex}].stepName`, step.stepName);
                formData.append(`RegisterSteps[${stepIndex}].stepTitle`, step.stepTitle);
                formData.append(`RegisterSteps[${stepIndex}].stepSubTitle`, step.stepSubTitle);
                formData.append(`RegisterSteps[${stepIndex}].buttonText`, step.buttonText);
    
                step.registerInputs.forEach((input, inputIndex) => {
                    formData.append(`RegisterSteps[${stepIndex}].registerInputs[${inputIndex}].Id`, input.id);
                    formData.append(`RegisterSteps[${stepIndex}].registerInputs[${inputIndex}].inputName`, input.inputName);
                });
            });
    
            const response = await axios.put(`https://localhost:7092/api/Register/UpdateRegisterLanguage`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };
    

    const [add, setAdd] = useState(false);

    const addNew = () => {
        setAdd(true);
    };

    const handleAdd = (field, value, stepIndex = null, inputIndex = null) => {
        setAddLocalization(prev => {
            const updated = { ...prev };
            if (stepIndex !== null && inputIndex !== null) {
                updated.registerSteps[stepIndex].registerInputs[inputIndex][field] = value;
            } else if (stepIndex !== null) {
                updated.registerSteps[stepIndex][field] = value;
            } else {
                updated[field] = value;
            }
            return updated;
        });
    };

    const handleAddInput = (stepIndex) => {
        setAddLocalization(prev => {
            const updated = { ...prev };
            updated.registerSteps[stepIndex].registerInputs.push({ id: '', inputName: '' });
            return updated;
        });
    };

    const addStyle = {
        display: add ? "flex" : "none"
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        if (addLocalization.homeMainId) {
            formData.append('homeMainId', addLocalization.homeMainId);
        }

        if (addLocalization.languageId) {
            formData.append('languageId', addLocalization.languageId);
        }

        addLocalization.registerSteps.forEach((step, stepIndex) => {
            if (step.id) {
                formData.append(`RegisterSteps[${stepIndex}].Id`, step.id);
            }
            if (step.languageId) {
                formData.append(`RegisterSteps[${stepIndex}].languageId`, step.languageId);
            }
            if (step.registerId) {
                formData.append(`RegisterSteps[${stepIndex}].registerId`, step.registerId);
            }
            formData.append(`RegisterSteps[${stepIndex}].stepNumber`, step.stepNumber);
            formData.append(`RegisterSteps[${stepIndex}].stepName`, step.stepName);
            formData.append(`RegisterSteps[${stepIndex}].stepTitle`, step.stepTitle);
            formData.append(`RegisterSteps[${stepIndex}].stepSubTitle`, step.stepSubTitle);
            formData.append(`RegisterSteps[${stepIndex}].buttonText`, step.buttonText);

            step.registerInputs.forEach((input, inputIndex) => {
                if (input.id) {
                    formData.append(`RegisterSteps[${stepIndex}].registerInputs[${inputIndex}].Id`, input.id);
                }
                formData.append(`RegisterSteps[${stepIndex}].registerInputs[${inputIndex}].inputName`, input.inputName);
            });
        });

        const response = await axios.post('https://localhost:7092/api/Register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Response:', response.data);
    };

    const cancelBtn = () => {
        setAdd(false);
    };

    return (
        <div style={mainStyle} className={style.container}>
            <div className={style.registerInfos}>
                <button onClick={addNew} className={style.addBtn}>Add</button>
                {localization && localization.map((lang, langIndex) => (
                    <div key={langIndex} className={style.box}>
                        {lang.registerSteps && lang.registerSteps.map((step, stepIndex) => (
                            <div key={stepIndex} className={style.steps}>
                                <h1>Step {stepIndex + 1}</h1>
                                <div className={style.inputs}>
                                    <h3>Step Name</h3>
                                    <input
                                        type="text"
                                        value={localization[langIndex]?.registerSteps[stepIndex].stepName}
                                        onChange={(e) => {
                                            const newLocalization = [...localization];
                                            newLocalization[langIndex].registerSteps[stepIndex].stepName = e.target.value;
                                            setLocalization(newLocalization);
                                        }}
                                    />
                                    <h3>Step Title</h3>
                                    <input
                                        type="text"
                                        value={localization[langIndex]?.registerSteps[stepIndex].stepTitle}
                                        onChange={(e) => {
                                            const newLocalization = [...localization];
                                            newLocalization[langIndex].registerSteps[stepIndex].stepTitle = e.target.value;
                                            setLocalization(newLocalization);
                                        }}
                                    />
                                    <h3>Step Subtitle</h3>
                                    <textarea
                                        type="text"
                                        value={localization[langIndex]?.registerSteps[stepIndex].stepSubTitle}
                                        onChange={(e) => {
                                            const newLocalization = [...localization];
                                            newLocalization[langIndex].registerSteps[stepIndex].stepSubTitle = e.target.value;
                                            setLocalization(newLocalization);
                                        }}
                                    />
                                    <h3>Step Number</h3>
                                    <input
                                        type="number"
                                        value={localization[langIndex]?.registerSteps[stepIndex].stepNumber}
                                        onChange={(e) => {
                                            const newLocalization = [...localization];
                                            newLocalization[langIndex].registerSteps[stepIndex].stepNumber = e.target.value;
                                            setLocalization(newLocalization);
                                        }}
                                    />
                                    <h3>Button Text</h3>
                                    <input
                                        type="text"
                                        value={localization[langIndex]?.registerSteps[stepIndex].buttonText}
                                        onChange={(e) => {
                                            const newLocalization = [...localization];
                                            newLocalization[langIndex].registerSteps[stepIndex].buttonText = e.target.value;
                                            setLocalization(newLocalization);
                                        }}
                                    />
                                    {step.registerInputs && step.registerInputs.map((input, inputIndex) => (
                                        <div key={inputIndex} className="inputs">
                                            <h3>Input Name</h3>
                                            <input
                                                type="text"
                                                value={localization[langIndex]?.registerSteps[stepIndex].registerInputs[inputIndex].inputName}
                                                onChange={(e) => {
                                                    const newLocalization = [...localization];
                                                    newLocalization[langIndex].registerSteps[stepIndex].registerInputs[inputIndex].inputName = e.target.value;
                                                    setLocalization(newLocalization);
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <button onClick={() => handleAddInput(stepIndex)}>Add Input</button>
                                </div>
                            </div>
                        ))}
                        <button className={style.updateBtn} onClick={() => { handleUpdate(lang.homeMainId, lang.languageId) }}>Update</button>
                    </div>
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
                    {addLocalization.registerSteps.map((step, stepIndex) => (
                        <div key={stepIndex} className={style.stepContainer}>
                            <h2>Step {stepIndex + 1}</h2>
                            <div className={style.inputs}>
                                <h4>Step Name</h4>
                                <div className={style.inputContainer}>
                                    <input
                                        type="text"
                                        value={step.stepName}
                                        onChange={(e) => handleAdd('stepName', e.target.value, stepIndex)}
                                    />
                                </div>
                                <h4>Step Title</h4>
                                <div className={style.inputContainer}>
                                    <input
                                        type="text"
                                        value={step.stepTitle}
                                        onChange={(e) => handleAdd('stepTitle', e.target.value, stepIndex)}
                                    />
                                </div>
                                <h4>Step Subtitle</h4>
                                <div className={style.inputContainer}>
                                    <textarea
                                        type="text"
                                        value={step.stepSubTitle}
                                        onChange={(e) => handleAdd('stepSubTitle', e.target.value, stepIndex)}
                                    />
                                </div>
                                <h4>Step Number</h4>
                                <div className={style.inputContainer}>
                                    <input
                                        type="number"
                                        value={step.stepNumber}
                                        onChange={(e) => handleAdd('stepNumber', e.target.value, stepIndex)}
                                    />
                                </div>
                                <h4>Button Text</h4>
                                <div className={style.inputContainer}>
                                    <input
                                        type="text"
                                        value={step.buttonText}
                                        onChange={(e) => handleAdd('buttonText', e.target.value, stepIndex)}
                                    />
                                </div>
                                {step.registerInputs.map((input, inputIndex) => (
                                    <div key={inputIndex} className={style.inputContainer}>
                                        <h4>Input Name</h4>
                                        <input
                                            type="text"
                                            value={input.inputName}
                                            onChange={(e) => handleAdd('inputName', e.target.value, stepIndex, inputIndex)}
                                        />
                                    </div>
                                ))}
                                <button onClick={() => handleAddInput(stepIndex)}>Add Input</button>
                            </div>
                        </div>
                    ))}
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={cancelBtn}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPageTexts;
