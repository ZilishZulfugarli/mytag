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
import { synagogue } from 'fontawesome';
import savedLinks from '../sections/user'
import { array } from 'yup';
import sections from '../sections/section';

const Register = () => {

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
        cursor: inputName !== null ? "pointer" : "not-allowed"
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
        setopenedStep2(true)
        setopenedStep3(false)
        setopenedStep4(false)

        setfirstMain(false);
        setsecondMain(true);
        setthirdMain(false)
        setfourthMain(false);
    }

    const step3 = () => {
        setopenedStep2(true)
        setopenedStep3(true)
        setopenedStep4(false)

        setfirstMain(false);
        setsecondMain(false);
        setthirdMain(true)
        setfourthMain(false);
    }

    const step4 = () => {
        setopenedStep2(true)
        setopenedStep3(true)
        setopenedStep4(true)

        setfirstMain(false);
        setsecondMain(false);
        setthirdMain(false);
        setfourthMain(true);
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

    const openLinks = () => {
        setOpenLink(true);
        setallLinks(true);
    }

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


    // const linkRef = useRef();

    // useEffect(() => {
    //     const handleClose = (e) => {
    //         if (
    //             linkRef.current
    //         ) {
    //             setOpenLink(false);
    //             setallLinks(false);
    //         }
    //     }

    //     document.addEventListener("mousedown", handleClose);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClose);
    //     };
    // }, []);




    const wentLinkStyle = {
        display: goLink ? "flex" : "none"
    }



    const [selectedSection, setSelectedSection] = useState(null);


    const linkView = {
        width: goLink ? "100%" : "50%"
    }

    const addBtn = {
        backgroundColor: SelectedName !== "" ? "black" : "rgba(0, 0, 0, 0.12)",
        cursor: SelectedName !== "" ? "pointer" : "not-allowed",
        color: SelectedName !== "" ? "" : "rgba(0, 0, 0, 0.26)"
    }

    const [savedLinks, setSavedLinks] = useState([]);

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


    return (
        <>
            <div className={style.container}>
                <div className={style.box}>
                    <div className={style.steps}>
                        <div className={style.step}>
                            <div onClick={step1} className={style.stepBox}>
                                <div style={openStep} className={style.circle}>1</div>
                                <span style={openSpan} className={style.stepSpan}>Get Started</span>
                            </div>
                            <div className={style.next}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>

                            <div onClick={step2} className={style.stepBox}>
                                <div style={openStep2} className={style.circle}>2</div>
                                <span style={openSpan2} className={style.stepSpan}>Company Info</span>
                            </div>
                            <div className={style.next}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>

                            <div onClick={step3} className={style.stepBox}>
                                <div style={openStep3} className={style.circle}>3</div>
                                <span style={openSpan3} className={style.stepSpan}>Card Details</span>
                            </div>
                            <div className={style.next}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>

                            <div onClick={step4} className={style.stepBox}>
                                <div style={openStep4} className={style.circle}>4</div>
                                <span style={openSpan4} className={style.stepSpan}>Get Your Digital Card</span>
                            </div>

                        </div>
                    </div>

                    <div style={stepShow1} className={style.main}>
                        <div className={style.logo}>LOGO</div>
                        <div className={style.title}>
                            Let's get started
                        </div>
                        <div className={style.description}>
                            Create your X digital business card in 3 simple steps. First, let’s start with your name.
                        </div>
                        <div className={style.info}>
                            <span>Name</span>
                            <div className={style.inputContainer}>
                                <div className={style.inputBase}>
                                    <input onChange={name} type="text" placeholder='Name' />
                                </div>
                            </div>
                        </div>
                        <div className={style.btn}>
                            <button onClick={goStep2} style={btnStyle} className={style.nextBtn}>Continue</button>
                        </div>
                    </div>

                    <div style={stepShow2} className={style.main}>
                        <div className={style.title}>
                            Where do you work?
                        </div>
                        <div className={style.description}>
                            Add job title and company to your digital business card.
                        </div>
                        <div className={style.info}>
                            <div style={{ paddingBottom: "24px" }}>
                                <span>Job Title</span>
                                <div className={style.inputContainer}>
                                    <div className={style.inputBase}>
                                        <input onChange={job} type="text" placeholder='Name' />
                                    </div>
                                </div>
                            </div>

                            <span>Company</span>
                            <div className={style.inputContainer}>
                                <div className={style.inputBase}>
                                    <input onChange={company} type="text" placeholder='Name' />
                                </div>
                            </div>
                        </div>
                        <div className={style.btn}>
                            <button onClick={goStep3} className={style.nextBtn}>Continue</button>
                        </div>
                    </div>

                    <div style={stepShow3} className={style.main}>
                        <div className={style.title}>
                            Additional Info
                        </div>
                        <div className={style.description}>
                            Let’s add some more info to your card. You can add contact info, social media, payment links, and more.
                        </div>
                        <div className={style.info}>
                            <div style={{ paddingBottom: "24px" }}>
                                <span>Email</span>
                                <div className={style.inputContainer}>
                                    <div className={style.inputBase}>
                                        <input onChange={(e) => setinputEmail(e.target.value)}
                                            type="email" placeholder='Email' />
                                    </div>
                                    <button onClick={addEmail}>Add</button>
                                </div>
                            </div>

                            <span>Phone Number</span>
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
                            <button onClick={goStep4} className={style.nextBtn}>Continue</button>
                        </div>
                    </div>

                    <div style={stepShow4} className={style.main}>
                        <div className={style.title}>
                            Sign Up
                        </div>
                        <div className={style.description}>
                            Well done, your digital business card is looking great. Now, save your card by signing up below. Welcome to the Popl family 🚀
                        </div>
                        <div className={style.info}>
                            <div style={{ paddingBottom: "24px" }}>
                                <span>Email</span>
                                <div className={style.inputContainer}>
                                    <div className={style.inputBase}>
                                        <input onChange={name} type="email" placeholder='Email' />
                                    </div>
                                </div>
                            </div>

                            <span>Password</span>
                            <div className={style.inputContainer}>
                                <div className={style.inputBase}>
                                    <input onChange={name} type="password" placeholder='password' />
                                </div>
                            </div>
                        </div>
                        <div className={style.btn}>
                            <button className={style.nextBtn}>Continue</button>
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
                                        {defaultSections.map((section, index) => (
                                            <div onClick={() => (handleSectionClick(section))} key={index} className={style.linkContainer}>
                                                <div className={style.linkRow}>
                                                    <img src={section.img} alt={section.img} />
                                                    <span>{section.name}</span>
                                                </div>
                                            </div>
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

                                        <img src={selectedSection.img} alt={selectedSection.name} />

                                    </div>
                                </div>
                                <div className={style.inputs}>
                                    <div className={style.userName}>
                                        <span>{selectedSection.link}</span>
                                        <div className={style.linkInputContainer}>
                                            <div className={style.linkInput}>
                                                <input type="text" value={SelectedName} onChange={inputSelectedName} placeholder={selectedSection.link} />
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
                                    <a href={selectedSection.goLink + SelectedName} target='_blank'>
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
                                                    img: selectedSection.img,
                                                    link: SelectedName,
                                                    section: selectedSection.section,
                                                    goLink: selectedSection.goLink,
                                                    title: inputLinkTitle != "" ? inputLinkTitle : selectedSection.name
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
        </>
    );
}

export default Register;
