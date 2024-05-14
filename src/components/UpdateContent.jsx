import React, { useEffect, useState } from 'react';
import style from '../styles/updatecontent.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faLink, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import View from './View';

const UpdateContent = ({ user }) => {
    const [sendedSocial, setsendedSocial] = useState([]);

    const [savedLinks, setSavedLinks] = useState([]);

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

        window.location.reload();
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



    const addFunction = async () => {
        try {
            // Send a POST request to your backend API endpoint
            const response = await axios.post(`https://localhost:7092/api/Account/AccountMediaAdd`, {
                id: user.user.id,
                mediaName: selectedSection.name, // Pass the media name
                mediaLink: selectedSection.mediaLink + SelectedName, // Construct the media link
                mediaTitle: inputLinkTitle !== "" ? inputLinkTitle : selectedSection.name, // Pass the media title
                imageName: selectedSection.imageDataUrl, // Pass the image name
            });

            // If the request is successful, you can handle the response here
            console.log(response.data);

            setgoLink(false);
            setallLinks(true);
            setOpenLink(true);

            setSelectedName("");
            setinputLinkTitle("");

            // You may want to update the UI or take further actions based on the response
        } catch (error) {
            // If there's an error with the request, you can handle it here
            console.error('Error adding media:', error);
        }
    };




    const location = useLocation();

    console.log(user);

    const [users, setusers] = useState(null);

    console.log(users);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log("1");
                const response = await axios.get(`https://localhost:7092/api/Account/GetProfile?id=${user.user.id}`);
                console.log("2");
                if (response.status === 200) {
                    setusers(response.data);

                } else {

                    throw new Error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (user.user.id) {
            fetchUserData();
        }
    }, [user.user.id]);

    console.log(user.socialMedias);

    const [mediaIds, setMediaIds] = useState([]);
    const [show, setShow] = useState("");

    const userpanelLoc = useLocation('/userpanel')

    const handleSubmit = async (media) => {
        setShow(!media.show);
        setMediaIds([media.id]);
        try {
            const response = await axios.put(`https://localhost:7092/api/Account/AccountMediaUpdate`, {
                id: user.user.id,
                mediaId: media.id,
                mediaLink: null, 
                mediaTitle: null, 
                show: !media.show 
            });
            console.log(response.data); // Handle response if needed

            window.location.reload();

            userpanelLoc.reload();
        } catch (error) {
            console.error('Error updating media:', error);
            // Handle error if needed
        }
    }

    const checkedStyle = {
        transform: show ? "translateX(20px)" : "translateX(0)"
    };

    console.log(show);

    const [deleteState, setdeleteState] = useState(false);
    const [deletedMedia, setdeletedMedia] = useState("");

    const handleDelete = (media) => {
        setdeletedMedia(media.id)
        setdeleteState(true)
    }

    console.log(deletedMedia);

    const deleteStyle = {
        display: deleteState ? "flex" : "none"
    }

    const closeDelete = () =>  {
        setdeleteState(false);
    }

    const deleteReq = async () => {
        try {
            const response = await axios.delete(`https://localhost:7092/api/Account/DeleteMedia?id=${deletedMedia}`)

            if(response.status == 200){
                window.location.reload();
            }
        } catch (error) {
            
        }
    }

    return (
        <>
            <div className={style.addBtn}>
                <button onClick={openLinks}>Add Links</button>
            </div>

            <div className={style.mediaContainer}>
                {users && users.socialMedias.map((media, index) => (
                    <div key={index} className={style.medias}>
                        <div className={style.mediaInfos}>
                            <div className={style.mediaImage}>
                                <img src={media.imageName} alt="" />
                            </div>
                            <div className={style.mediaName}>{media.mediaTitle ? media.mediaTitle : media.mediaName}</div>
                        </div>
                        <div className={style.mediaEdit}>
                            {!media.show && (
                                <FontAwesomeIcon onClick={() => handleDelete(media)} icon={faTrash} />
                            )}
                            <div className={`${style.checkBox} ${media.show ? style.checked : ''}`} onClick={() => { handleSubmit(media) }}>
                                <div className={style.ball} style={{ transform: media.show ? "translateX(20px)" : "translateX(0)" }}></div>
                                <input type='checkbox' checked={media.show} readOnly />
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <div className={style.buttons}>
                <button className={style.cancelBtn}>Cancel</button>
                <button onClick={handleSubmit} className={style.updateBtn}>Update</button>
            </div>

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
                                        <div onClick={() => handleSectionClick(result)} key={index} className={style.linkContainer}>
                                            <div className={style.linkRow}>
                                                <img src={result.imageDataUrl} alt={result.name} /> {/* Use imageDataUrl instead of imageName */}
                                                <span>{result.name}</span>
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
                                profilePhoto={user.imageDataUrl}
                                coverPhoto={user.coverDataUrl}
                                inputName={user.user.name}
                                inputJob={user.user.jobTitle}
                                inputCompany={user.user.company}
                                location={user.user.location}
                            />
                        </div>
                    </div>
                )}


            </div>

            <div style={deleteStyle} className={style.deleteContainer}>
                <div>Are You sure?</div>
                <div className={style.buttons}>
                    <button 
                    onClick={closeDelete}
                    style={{border: "1px solid black"}} 
                    className={style.cancelBtn}>Cancel</button>
                    <button 
                    onClick={deleteReq}
                    className={style.deleteBtn}>Delete</button>
                </div>
            </div>
        </>
    );
};

export default UpdateContent;
