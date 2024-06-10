// UseRegisterModal.js

import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { registerAction } from '../redux/slices/registerSlice';
import { register } from '../services/accountServices';
import Cookies from 'js-cookie'
import { unstable_HistoryRouter, useNavigate } from 'react-router-dom';
import { registerSchema } from '../validations/registerSchema';


const UseRegisterModal = ({ sendedSocial }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const registerFormik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "z4483282",
            job: "",
            company: "",
            userSocialMedias: [],
        },
        onSubmit: async (values) => {
            console.log("salam");
            try {
                const updatedValues = { registerDto: values, userSocialMedias: sendedSocial };
                const resp = await register(updatedValues);
                Cookies.set('token', resp.data.token, { expires: 7 })
                dispatch(registerAction(resp.data));
                navigate('/userpanel', { state: { userToken: resp.data.id } })
                registerFormik.resetForm();
            } catch (error) {
                console.error('Registration failed:', error);
                // Handle error here (e.g., display error message to the user)
            }
        },
        validationSchema: registerSchema
    });

    return { registerFormik };
};

export default UseRegisterModal;
