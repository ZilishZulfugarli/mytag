import React from 'react';
import style from '../styles/register.module.scss'
import backgroundPhoto from './../images/simpleBGPhoto.jpg'
import emptyUser from './../images/emptyUser.png'
import mailIcon from './../images/mailIcon.png'
import callIcon from './../images/callIcon.png'
import savedLinks from '../sections/user'


const View = ({ inputName, inputJob, inputCompany, linkView, selectedSection, SelectedName, inputLinkTitle, savedLinks }) => {

    console.log(savedLinks);
    return (
        <div style={linkView} className={style.view}>
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
                        {savedLinks && savedLinks.map((index, _) =>
                            <a href={'https://' + index.goLink} target='_blank' className={style.icon}>
                                <img src={index.img} alt="" />
                                <p>{index.title != "" ? index.title : selectedSection.name}</p>
                            </a>
                        )

                        }
                        {/* 

                        <a href='mailto:2002zilis@gmail.com' className={style.icon}>
                            <img src={callIcon} alt="" />
                            <p>call</p>
                        </a> */}

                        {selectedSection && (
                            <a href={selectedSection.goLink + SelectedName} className={style.icon} target='_blank'>
                                <img src={selectedSection.imageDataUrl} alt="" />
                                <p>{inputLinkTitle != "" ? inputLinkTitle : selectedSection.name}</p>
                            </a>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default View;
