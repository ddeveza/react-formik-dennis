import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";

const emailValidation =
    /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:. [a-zA-Z0-9-]+)*$/;

const initialValues = {
    name: "",
    email: "",
    channel: "",
};
const onSubmit = ({name, email, channel}) => {
    console.log(name, email, channel);
};

const validate = (values) => {
    let error = {};

    if (!values.name) {
        error.name = "Required";
    }

    if (!values.email) {
        error.email = "Required";
    } else if (!emailValidation.test(values.email)) {
        error.email = "Invalid email format";
    }

    if (!values.channel) {
        error.channel = "Required";
    }

    return error;
};

const validationSchema = Yup.object({
    name: Yup.string().required("Required!"),
    email: Yup.string().email("Not a valid email").required("Required"),
    channel: Yup.string().required("Required"),
});

const YoutubeForm = () => {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    return (
        <div className='relative flex justify-center'>
            <form
                onSubmit={formik.handleSubmit}
                className='absolute flex flex-col border border-gray-500 p-5 space-y-4'>
                <label htmlFor='name'>Name</label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    className='border-2 border-gray-400 p-1'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />

                {formik.errors?.name && formik.touched.name && (
                    <span className='text-red-600'>
                        {formik.errors.name}
                    </span>
                )}
                <label htmlFor='email'>Email</label>
                <input
                    type='text'
                    id='email'
                    name='email'
                    className='border-2 border-gray-400 p-1'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.errors?.email && formik.touched.email && (
                    <span className='text-red-600'>
                        {formik.errors.email}
                    </span>
                )}
                <label htmlFor='channel'>Channel</label>
                <input
                    type='text'
                    id='channel'
                    name='channel'
                    className='border-2 border-gray-400 p-1'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.channel}
                />
                {formik.errors?.channel && formik.touched.channel && (
                    <span className='text-red-600'>
                        {formik.errors.channel}
                    </span>
                )}

                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default YoutubeForm;
