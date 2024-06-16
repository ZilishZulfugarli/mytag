import React, { useEffect, useRef, useState } from 'react';
import style from '../styles/register.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faL, faLink, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import backgroundPhoto from './../images/simpleBGPhoto.jpg'
import emptyUser from './../images/emptyUser.png'
import mailIcon from './../images/mailIcon.png'
import callIcon from './../images/callIcon.png'
import defaultSections from '../sections/section'
import View from '../components/View'
import { cookie, synagogue } from 'fontawesome';
import savedLinks from '../sections/user'
import { array } from 'yup';
import sections from '../sections/section';
import UseRegisterModal from '../hooks/useRegisterModal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {


    const [sendedSocial, setsendedSocial] = useState([]);

    const [savedLinks, setSavedLinks] = useState([]);

    const { registerFormik } = UseRegisterModal({ sendedSocial });
    // const dispatch = useDispatch();

    console.log(defaultSections);

    const [inputName, setinputName] = useState(null);
    const [inputJob, setinputJob] = useState(null);
    const [inputCompany, setinputCompany] = useState("");

    const name = (event) => {
        const value = event.target.value;
        setinputName(value !== "" ? value : null)
    }

    const job = (event) => {
        const value = event.target.value;
        setinputJob(value !== "" ? value : null)
    }

    const company = (event) => {
        setinputCompany(event.target.value)
    }



    const btnStyle = {
        backgroundColor: inputName !== null ? "#29AEF8" : "#93d8fc",
        cursor: inputName !== null ? "pointer" : "not-allowed",
        userSelect: inputName !== null ? "auto" : "none"
    }

    const [openedStep1, setopenedStep1] = useState(false);
    const [openedStep2, setopenedStep2] = useState(false);
    const [openedStep3, setopenedStep3] = useState(false);
    const [openedStep4, setopenedStep4] = useState(false);

    const [firstMain, setfirstMain] = useState(false);
    const [secondMain, setsecondMain] = useState(false);
    const [thirdMain, setthirdMain] = useState(false);
    const [fourthMain, setfourthMain] = useState(false);

    const [openLink, setOpenLink] = useState(false);
    const [allLinks, setallLinks] = useState(false);

    const [SelectedName, setSelectedName] = useState("");
    const [inputLinkTitle, setinputLinkTitle] = useState("");

    const inputSelectedName = (e) => {
        setSelectedName(e.target.value)
    }

    const SelectedTitle = (e) => {
        setinputLinkTitle(e.target.value)
    }



    useEffect(() => {

        setopenedStep1(true);
        setfirstMain(true)

    }, []);


    const step1 = () => {
        setopenedStep2(false);
        setopenedStep3(false);
        setopenedStep4(false);

        setfirstMain(true);
        setsecondMain(false)
        setthirdMain(false)
        setfourthMain(false);
    }

    const step2 = () => {
        if (inputName != null) {
            setopenedStep2(true)
            setopenedStep3(false)
            setopenedStep4(false)

            setfirstMain(false);
            setsecondMain(true);
            setthirdMain(false)
            setfourthMain(false);
        }
    }

    const step3 = () => {
        if (inputName != null) {
            setopenedStep2(true)
            setopenedStep3(true)
            setopenedStep4(false)

            setfirstMain(false);
            setsecondMain(false);
            setthirdMain(true)
            setfourthMain(false);
        }
    }

    const step4 = () => {
        if (inputName != null) {
            setopenedStep2(true)
            setopenedStep3(true)
            setopenedStep4(true)

            setfirstMain(false);
            setsecondMain(false);
            setthirdMain(false);
            setfourthMain(true);
        }
    }

    const openStep = {
        backgroundColor: openedStep1 ? "black" : "",
        color: openedStep1 ? "white" : "",
        cursor: inputName !== null ? "pointer" : "not-allowed"
    }

    const openSpan = {
        color: openedStep1 ? "black" : ""
    }

    const openStep2 = {
        backgroundColor: openedStep2 ? "black" : "",
        color: openedStep2 ? "white" : "",
        cursor: inputName !== null ? "pointer" : "not-allowed"
    }

    const openSpan2 = {
        color: openedStep2 ? "black" : ""
    }

    const openStep3 = {
        backgroundColor: openedStep3 ? "black" : "",
        color: openedStep3 ? "white" : "",
        cursor: inputName !== null ? "pointer" : "not-allowed"
    }

    const openSpan3 = {
        color: openedStep3 ? "black" : ""
    }

    const openStep4 = {
        backgroundColor: openedStep4 ? "black" : "",
        color: openedStep4 ? "white" : "",
        cursor: inputName !== null ? "pointer" : "not-allowed"
    }

    const openSpan4 = {
        color: openedStep4 ? "black" : ""
    }

    const stepShow1 = {
        display: firstMain ? "flex" : "none"
    }

    const stepShow2 = {
        display: secondMain ? "flex" : "none"
    }

    const stepShow3 = {
        display: thirdMain ? "flex" : "none"
    }

    const stepShow4 = {
        display: fourthMain ? "flex" : "none"
    }

    const goStep2 = () => {
        step2();
    }

    const goStep3 = () => {
        step3();
    }

    const goStep4 = () => {
        step4();
    }

    const [socialMedias, setsocialMedias] = useState([]);

    const openLinks = () => {

        setOpenLink(true);
        setallLinks(true);
    }

    useEffect(() => {
        axios.get(`https://localhost:7092/api/SocialMedia/GetSocialMedias`)
            .then(response => {
                setsocialMedias(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    console.log(socialMedias);



    const closeTab = () => {
        setOpenLink(false);
        setallLinks(false);
    }

    const [goLink, setgoLink] = useState(false);



    const handleSectionClick = (section) => {
        setSelectedSection(section);
        setgoLink(true);
        setallLinks(false);
    };




    const goBack = () => {
        setgoLink(false);
        setallLinks(true);
        setOpenLink(true);

        setSelectedName("");
        setinputLinkTitle("");
    }

    const linkStyle = {
        display: openLink ? "flex" : "none"
    }

    const allLinkStyle = {
        display: allLinks ? "flex" : "none"
    }

    const [searchSections, setsearchSections] = useState(
        [
            'Contact',
            'Social Media',
            'Business'
        ]

    );


    const wentLinkStyle = {
        display: goLink ? "flex" : "none"
    }



    const [selectedSection, setSelectedSection] = useState(null);


    console.log(selectedSection);
    const linkView = {
        width: goLink ? "100%" : "50%"
    }

    const addBtn = {
        backgroundColor: SelectedName !== "" ? "black" : "rgba(0, 0, 0, 0.12)",
        cursor: SelectedName !== "" ? "pointer" : "not-allowed",
        color: SelectedName !== "" ? "" : "rgba(0, 0, 0, 0.26)"
    }



    const addFunction = () => {
        console.log(savedLinks);

        setgoLink(false);
        setallLinks(true);
        setOpenLink(true);

        setSelectedName("");
        setinputLinkTitle("");
    }

    const [inputEmail, setinputEmail] = useState("");
    const [inputPhoneNumber, setinputPhoneNumber] = useState("");

    const addEmail = () => {
        if (inputEmail.length > 1) {
            setSavedLinks(prevSavedLinks => [
                ...prevSavedLinks,
                {
                    name: sections[4].name,
                    img: sections[4].img,
                    link: inputPhoneNumber,
                    // section: selectedSection.section,
                    // goLink: selectedSection.goLink,
                    title: sections[4].name
                }
            ])
        }
    };

    const addPhoneNumber = () => {
        if (inputPhoneNumber.length > 1) {
            setSavedLinks(prevSavedLinks => [
                ...prevSavedLinks,
                {
                    name: sections[5].name,
                    img: sections[5].img,
                    link: inputEmail,
                    // section: selectedSection.section,
                    // goLink: selectedSection.goLink,
                    title: sections[5].name
                }
            ])
        }
    };

    console.log(savedLinks);

    const navigate = useNavigate();


    const finishBtn = () => {
        registerFormik.setFieldValue("name", inputName)
        registerFormik.setFieldValue("job", inputJob)
        registerFormik.setFieldValue("company", inputCompany)
        registerFormik.setFieldValue("userSocialMedias", sendedSocial)
        registerFormik.handleSubmit();
    }

    const [data, setdata] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const defaultLang = localStorage.getItem('language');
            console.log(defaultLang);
            try {
                const response = await axios.get(`https://localhost:7092/api/Home/GetRegisterLanguage?language=${defaultLang}`)

                if (response.status == 200) {
                    setdata(response.data.registerSteps)
                }
            } catch (error) {

            }
        }
        fetch();
    }, []);

    console.log(data);


    return (
        <>
            {data && (
                <div className={style.container}>
                    <div className={style.box}>
                        <div className={style.steps}>
                            <div className={style.step}>
                                <div onClick={step1} className={style.stepBox}>
                                    <div style={openStep} className={style.circle}>{data[0].stepNumber}</div>
                                    <span style={openSpan} className={style.stepSpan}>{data[0].stepName}</span>
                                </div>
                                <div className={style.next}>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </div>

                                <div onClick={step2} className={style.stepBox}>
                                    <div style={openStep2} className={style.circle}>{data[1].stepNumber}</div>
                                    <span style={openSpan2} className={style.stepSpan}>{data[1].stepName}</span>
                                </div>
                                <div className={style.next}>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </div>

                                <div onClick={step3} className={style.stepBox}>
                                    <div style={openStep3} className={style.circle}>{data[2].stepNumber}</div>
                                    <span style={openSpan3} className={style.stepSpan}>{data[2].stepName}</span>
                                </div>
                                <div className={style.next}>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </div>

                                <div onClick={step4} className={style.stepBox}>
                                    <div style={openStep4} className={style.circle}>{data[3].stepNumber}</div>
                                    <span style={openSpan4} className={style.stepSpan}>{data[3].stepName}</span>
                                </div>
                            </div>
                        </div>


                        <div style={stepShow1} className={style.main}>
                            <div className={style.logo}>LOGO</div>
                            <div className={style.title}>
                                {data[0].stepTitle}
                            </div>
                            <div className={style.description}>
                                {data[0].stepSubTitle}
                            </div>
                            <div className={style.info}>
                                <span>{data[0].registerInputs[0].inputName}</span>
                                <div className={style.inputContainer}>
                                    <div className={style.inputBase}>
                                        <input onChange={name} type="text" placeholder={data[0].registerInputs[0].inputName} />
                                    </div>
                                </div>
                            </div>
                            <div className={style.btn}>
                                <button onClick={goStep2} style={btnStyle} disabled={inputName === null} className={style.nextBtn} button='submit'>{data[0].buttonText}</button>
                            </div>
                        </div>

                        <div style={stepShow2} className={style.main}>
                            <div className={style.title}>
                                {data[1].stepTitle}
                            </div>
                            <div className={style.description}>
                                {data[1].stepSubTitle}
                            </div>
                            <div className={style.info}>
                                <div style={{ paddingBottom: "24px" }}>
                                    <span>{data[1].registerInputs[0].inputName}</span>
                                    <div className={style.inputContainer}>
                                        <div className={style.inputBase}>
                                            <input onChange={job} type="text" placeholder={data[1].registerInputs[0].inputName} />
                                        </div>
                                    </div>
                                </div>

                                <span>{data[1].registerInputs[1].inputName}</span>
                                <div className={style.inputContainer}>
                                    <div className={style.inputBase}>
                                        <input onChange={company} type="text" placeholder={data[1].registerInputs[1].inputName} />
                                    </div>
                                </div>
                            </div>
                            <div className={style.btn}>
                                <button onClick={goStep3} className={style.nextBtn}>{data[1].buttonText}</button>
                            </div>
                        </div>

                        <div style={stepShow3} className={style.main}>
                            <div className={style.title}>
                                {data[2].stepTitle}
                            </div>
                            <div className={style.description}>
                                {data[2].stepSubTitle}
                            </div>
                            <div className={style.info}>
                                <div style={{ paddingBottom: "24px" }}>
                                    <span>{data[2].registerInputs[0].inputName}</span>
                                    <div className={style.inputContainer}>
                                        <div className={style.inputBase}>
                                            <input onChange={(e) => setinputEmail(e.target.value)}
                                                type="email" placeholder='Email' />
                                        </div>
                                        <button onClick={addEmail}>Add</button>
                                    </div>
                                </div>

                                <span>{data[2].registerInputs[1].inputName}</span>
                                <div className={style.inputContainer}>
                                    <div className={style.inputBase}>
                                        <input onChange={(e) => setinputPhoneNumber(e.target.value)} type="text" placeholder='+9941234567' />
                                    </div>
                                    <button onClick={addPhoneNumber}>Add</button>
                                </div>
                            </div>
                            <div className={style.btn}>
                                <button onClick={openLinks} className={style.linkBtn}>+ Add Links and Contact Info</button>
                            </div>
                            <div className={style.btn}>
                                <button onClick={goStep4} className={style.nextBtn}>{data[2].buttonText}</button>
                            </div>
                        </div>

                        <div style={stepShow4} className={style.main}>
                            <div className={style.title}>
                                {data[3].stepTitle}
                            </div>
                            <div className={style.description}>
                                {data[3].stepSubTitle}                            </div>
                            <div className={style.info}>
                                <div style={{ paddingBottom: "24px" }}>
                                    <span>{data[3].registerInputs[0].inputName}</span>
                                    <div className={style.inputContainer}>
                                        <div className={style.inputBase}>
                                            <input name='email' onChange={registerFormik.handleChange} type="email" placeholder={data[3].registerInputs[0].inputName} />
                                        </div>
                                    </div>
                                    {registerFormik.errors.email && registerFormik.touched.email && (
                                        <span style={{ color: "red" }}>{registerFormik.errors.email}</span>
                                    )}
                                </div>

                                <span>{data[3].registerInputs[1].inputName}</span>
                                <div className={style.inputContainer}>
                                    <div className={style.inputBase}>
                                        <input name='password' onChange={registerFormik.handleChange} type="password" placeholder={data[3].registerInputs[1].inputName} />
                                    </div>

                                </div>
                                {registerFormik.errors.password && registerFormik.touched.password && (
                                    <span style={{ color: "red" }}>{registerFormik.errors.password}</span>
                                )}
                            </div>
                            <div className={style.btn}>
                                <button onClick={finishBtn} className={style.nextBtn}>{data[3].buttonText}</button>
                            </div>
                        </div>
                    </div>

                    <View
                        inputName={inputName}
                        inputJob={inputJob}
                        inputCompany={inputCompany}
                        savedLinks={savedLinks}
                    />

                    <div style={linkStyle} className={style.linkBackground}>
                        <div style={allLinkStyle} className={style.links}>
                            <div className={style.linkContainer}>
                                <div className={style.title}>
                                    <div className={style.text}>
                                        <span>Add Content</span>
                                        <FontAwesomeIcon onClick={closeTab} className={style.xMark} icon={faXmark} />
                                    </div>
                                    <div className={style.search}>
                                        <div>
                                            <span>Select from our wide variety of links and contact info below.</span>
                                        </div>


                                        <div>
                                            <div className={style.searchContainer}>
                                                <div className={style.searchIcon}>
                                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                                </div>
                                                <div className={style.searchInput}>
                                                    <input type="text" name="" id="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className={style.section}>
                                        {searchSections.map((index, _) =>
                                            <div className={style.sections}>{index}</div>
                                        )}
                                        {/* <div className={style.sections}>
                                        Contact
                                    </div> */}
                                    </div>

                                    <div className={style.line}></div>

                                    <div className={style.sectionLinks}>
                                        <span>Social Media</span>
                                        <div className={style.sectionContainer}>
                                            {socialMedias && socialMedias.media && socialMedias.media.map((result, index) => (
                                                result.enable && (
                                                    <div onClick={() => handleSectionClick(result)} key={index} className={style.linkContainer}>
                                                        <div className={style.linkRow}>
                                                            <img src={result.imageDataUrl} alt={result.name} />
                                                            <span>{result.name}</span>
                                                        </div>
                                                    </div>
                                                )
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {selectedSection && (
                            <div style={wentLinkStyle} className={style.singleLink}>
                                <div className={style.left}>
                                    <div className={style.logo}>
                                        <div className={style.logoContainer}>

                                            <img src={selectedSection.imageDataUrl} alt={selectedSection.name} />

                                        </div>
                                    </div>
                                    <div className={style.inputs}>
                                        <div className={style.userName}>
                                            <span>{selectedSection.title}</span>
                                            <div className={style.linkInputContainer}>
                                                <div className={style.linkInput}>
                                                    <input type="text" value={SelectedName} onChange={inputSelectedName} placeholder={selectedSection.title} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={style.userName}>
                                            <span>Link Title</span>
                                            <div className={style.linkInputContainer}>
                                                <div className={style.linkInput}>
                                                    <input type="text" value={inputLinkTitle} onChange={SelectedTitle} placeholder={selectedSection.name} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={style.testLink}>
                                        <a href={'https://' + selectedSection.mediaLink + SelectedName} target='_blank'>
                                            <p>Test Your Link</p>
                                            <FontAwesomeIcon icon={faLink} />
                                        </a>
                                    </div>

                                    <div className={style.buttons}>
                                        <button onClick={goBack} className={style.cancel}>
                                            Cancel
                                        </button>

                                        <button onClick={() => {
                                            if (SelectedName.length > 0) {
                                                setSavedLinks(prevSavedLinks => [
                                                    ...prevSavedLinks,
                                                    {
                                                        name: selectedSection.name,
                                                        img: selectedSection.imageDataUrl,
                                                        link: SelectedName,
                                                        section: selectedSection.section,
                                                        goLink: selectedSection.mediaLink + SelectedName,
                                                        title: inputLinkTitle != "" ? inputLinkTitle : selectedSection.name
                                                    }
                                                ]);
                                            }

                                            if (SelectedName.length > 0) {
                                                setsendedSocial(prevsendedSocial => [
                                                    ...prevsendedSocial,
                                                    {
                                                        imageName: selectedSection.imageDataUrl,
                                                        mediaName: selectedSection.name,
                                                        mediaUserName: SelectedName,
                                                        mediaLink: selectedSection.mediaLink + SelectedName,
                                                        mediaTitle: inputLinkTitle != "" ? inputLinkTitle : selectedSection.name,
                                                        userId: null
                                                    }
                                                ]);
                                            }
                                            addFunction();
                                        }} style={addBtn} className={style.add}>
                                            Add Link
                                        </button>
                                    </div>
                                </div>

                                <div className={style.straight}></div>

                                <div className={style.right}>
                                    <View
                                        savedLinks={savedLinks}
                                        SelectedTitle={SelectedTitle}
                                        inputLinkTitle={inputLinkTitle}
                                        linkView={linkView}
                                        selectedSection={selectedSection}
                                        SelectedName={SelectedName}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            )}

        </>
    );
}

export default Register;
