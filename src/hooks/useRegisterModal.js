// UseRegisterModal.js

import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { registerAction } from '../redux/slices/registerSlice';
import { register } from '../services/accountServices';

const UseRegisterModal = ({ sendedSocial }) => {
    const dispatch = useDispatch();

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
                dispatch(registerAction(resp.data));
            } catch (error) {
                console.error('Registration failed:', error);
                // Handle error here (e.g., display error message to the user)
            }
        },
    });

    return { registerFormik };
};

export default UseRegisterModal;
