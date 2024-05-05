import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import style from '../styles/allusers.module.scss'
import { useLocation } from 'react-router-dom';

const AllUsers = ({ users, fetchData, stylish }) => {

    const allUserStyle = {
        display: stylish ? "flex" : "none"
    }

    console.log(users);

    const [searchedUser, setsearchedUser] = useState('');

    const searchInput = (e) => {
        setsearchedUser(e.target.value)
    }

    const [searchResult, setsearchResult] = useState();

    const searchUser = async () => {
        try {
            const response = await axios.get(`https://localhost:7092/api/Admin/GetByMail?mail=${searchedUser}`)

            if (response.status === 200) {
                setsearchResult(response.data)
            }
            else {
                throw new Error('Failed to fetch user data');
            }
        }
        catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    console.log(searchResult);

    const [deleteState, setDeleteState] = useState(false);

    const [deleteInput, setdeleteInput] = useState(null);

    const deleteBtn = () => {
        setDeleteState(true);
    }

    const closeBtn = () => {
        setDeleteState(false);
    }

    const deleteStyle = {
        display: deleteState ? "flex" : "none"
    }

    const deleteref = useRef();

    useEffect(() => {
        const handleClose = (e) => {
            if (deleteState && deleteref.current && !deleteref.current.contains(e.target)) {
                setDeleteState(false)
            };

            document.addEventListener("mousedown", handleClose)
        }
        return () => {
            document.removeEventListener("mousedown", handleClose)
        };
    }, [deleteState, deleteref]);



    const deleteUser = async () => {
        try {
            const deleteReq = await axios.delete(`https://localhost:7092/api/Admin/DeleteUser?mail=${deleteInput}`)

            if (deleteReq.status == 200) {
                setDeleteState(false);
                fetchData();
            }
            else {
                throw new Error('Failed to fetch user data');
            }
        }
        catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    

    return (
        <>
            <div style={allUserStyle} className={style.container}>
                <div className={style.searchContainer}>
                    <div className={style.search}>
                        <input
                            type="text"
                            value={searchedUser}
                            onChange={searchInput}
                        />
                    </div>
                    <button onClick={searchUser}>Search</button>
                    <span onClick={() => {
                        setsearchResult(null);
                        fetchData()
                    }}>Show All</span>
                </div>

                <ul>
                    {users && searchResult == null && users.map(user => (
                        <div className={style.userDetails}>
                            <li key={user.id}>{user.email}</li>

                            <div className={style.buttons}>
                                <p>Edit</p>
                                <p onClick={() => { setdeleteInput(user.email); deleteBtn(); console.log(deleteInput); }}>Delete</p>
                            </div>
                        </div>

                    ))}

                    {searchResult && searchResult.map(user => (
                        <div className={style.userDetails}>
                            <li key={user.id}>{user.email}</li>
                            <div className={style.buttons}>
                                <p>Edit</p>
                                <p onClick={() => { setdeleteInput(user.email); deleteBtn(); console.log(deleteInput); }}>Delete</p>
                            </div>
                        </div>

                    ))}
                </ul>

                <div ref={deleteref} style={deleteStyle} className={style.deleteContainer}>
                    <h3>Are you sure to delete {deleteInput}?</h3>
                    <div className={style.deleteButtons}>
                        <button onClick={closeBtn}>Cancel</button>
                        <button onClick={deleteUser}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllUsers;
