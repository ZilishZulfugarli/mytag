import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
    email: Yup.string().required("Please add email"),
    password: Yup.string().required("Please add password"),
})