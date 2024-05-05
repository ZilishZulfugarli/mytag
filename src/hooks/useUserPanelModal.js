// UseUserPanelModal.js
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { userPanelAction } from '../redux/slices/userPanelSlice';
import { useLocation } from 'react-router-dom';

const UseUserPanelModal = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const data = location.state?.userToken;

    const userPanelFormik = useFormik({
        initialValues: {
            id: data
        },
        onSubmit: async (values) => {
            try {
                // Dispatch the action to update the Redux store
                dispatch(userPanelAction(values.id));
            } catch (error) {
                console.error('Failed to submit form:', error);
                // Handle error here (e.g., display error message to the user)
            }
        },
    });

    useEffect(() => {
        // Trigger form submission when the component mounts
        userPanelFormik.handleSubmit();
    }, []); // Empty dependency array ensures it runs only once when the component mounts

    return { userPanelFormik };
};

export default UseUserPanelModal;
