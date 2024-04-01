import React, { useEffect, useState } from 'react';
import style from '../styles/register.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import backgroundPhoto from './../images/simpleBGPhoto.jpg'
import emptyUser from './../images/emptyUser.png'
import mailIcon from './../images/mailIcon.png'
import callIcon from './../images/callIcon.png'

const Register = () => {

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


    useEffect(() => {

        setopenedStep1(true);
        setfirstMain(true)

    }, []);


    const step1 = () => {
        setopenedStep2(false);
        setopenedStep3(false);
        setopenedStep4(false);

        setfirstMain(true);
    }

    const step2 = () => {
        setopenedStep2(true)
        setopenedStep3(false)
        setopenedStep4(false)

        setfirstMain(false);
        setsecondMain(true);
    }

    const step3 = () => {
        setopenedStep2(true)
        setopenedStep3(true)
        setopenedStep4(false)

        setfirstMain(false);
        setsecondMain(false);
        setthirdMain(true)
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
                                        <input onChange={name} type="email" placeholder='Email' />
                                    </div>
                                </div>
                            </div>

                            <span>Phone Number</span>
                            <div className={style.inputContainer}>
                                <div className={style.inputBase}>
                                    <input onChange={name} type="text" placeholder='+9941234567' />
                                </div>
                            </div>
                        </div>
                        <div className={style.btn}>
                            <button className={style.linkBtn}>+ Add Links and Contact Info</button>
                        </div>
                        <div className={style.btn}>
                            <button className={style.nextBtn}>Continue</button>
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

                <div className={style.view}>
                    <div className={style.liveView}>
                        <div className={style.bgPhoto}>
                            <img src={backgroundPhoto} alt="" />
                        </div>
                        <div className={style.info}>
                            <img src={emptyUser} alt="" className={style.userimg} />
                            <p>{inputName}</p>
                            <div className={style.job}>
                            <p>{inputJob}</p>
                            <p>{inputCompany}</p>
                            </div>
                            
                            <button className={style.saveBtn}>
                                SAVE CONTACT
                            </button>

                            <div className={style.icons}>
                                <a href='mailto:2002zilis@gmail.com' className={style.icon}>
                                    <img src={mailIcon} alt="" />
                                    <p>Mail</p>
                                </a>

                                <a href='mailto:2002zilis@gmail.com' className={style.icon}>
                                    <img src={callIcon} alt="" />
                                    <p>call</p>
                                </a>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
