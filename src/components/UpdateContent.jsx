import React from 'react';
import style from '../styles/updatecontent.module.scss'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const UpdateContent = () => {

    const [checked, setchecked] = useState(false);

    const handleCheck = () => {
        setchecked(!checked);
    }

    const checkedStyle = {
        backgroundColor: checked ? "black" : "white"
    }
    return (
        <>
            <div className={style.addBtn}>
                <button>Add Links</button>
            </div>
            <div className={style.medias}>
                <div className={style.mediaInfos}>
                    <div className={style.mediaImage}></div>
                    <div className={style.mediaName}>Email</div>
                </div>
                <div className={style.mediaEdit}>
                    {!checked && (
                        <FontAwesomeIcon icon={faTrash} />
                    )}
                    <div style={checkedStyle} className={`${style.checkBox} ${checked ? style.checked : ''}`} onClick={handleCheck}>
                        <div className={style.ball}></div>
                        <input type='checkbox' checked={checked} onChange={handleCheck} />
                    </div>
                </div>


            </div>
        </>
    );
}

export default UpdateContent;
