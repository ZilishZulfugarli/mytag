import React from 'react';
import style from '../styles/view.module.scss'
import backgroundPhoto from './../images/simpleBGPhoto.jpg'
import emptyUser from './../images/emptyUser.png'
import mailIcon from './../images/mailIcon.png'
import callIcon from './../images/callIcon.png'
import savedLinks from '../sections/user'


const View = ({ inputName, inputJob, inputCompany, linkView, selectedSection, SelectedName, inputLinkTitle, savedLinks, profilePhoto, coverPhoto, location, updateView }) => {

    console.log(savedLinks);

    console.log(updateView);
    return (
        <div style={linkView} className={style.view}>
            <div className={style.liveView}>
                <div className={style.bgPhoto}>
                    <img src={coverPhoto ? coverPhoto : backgroundPhoto} alt="" />
                </div>
                <div className={style.info}>
                    <img src={profilePhoto ? profilePhoto : emptyUser} alt="" className={style.userimg} />
                    <p>{inputName}</p>
                    <div className={style.job}>
                        <p>{inputJob != "null" ? inputJob : ''}</p>
                        <p>{inputCompany!= "null" ? inputCompany : ''}</p>
                        <p>{location != "null" ? location : ''}</p>
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
                        )}

                        {selectedSection && (
                            <a href={selectedSection.goLink + SelectedName} className={style.icon} target='_blank'>
                                <img src={selectedSection.imageDataUrl} alt="" />
                                <p>{inputLinkTitle != "" ? inputLinkTitle : selectedSection.name}</p>
                            </a>
                        )}

                        {updateView && updateView.map((media, index) => (
                            media.show && (
                                <div key={index}>
                                    <a href={media.mediaLink} className={style.icon} target='_blank'>
                                        <img src={media.imageName} alt="" />
                                        <p>{media.mediaTitle !== null ? media.mediaTitle : media.mediaName}</p>
                                    </a>
                                </div>
                            )
                        ))}


                    </div>
                </div>

            </div>
        </div>
    );
}

export default View;
