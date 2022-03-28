/** @format */

import React from "react";
import {Formik, Form, Field, ErrorMessage, FieldArray} from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const emailValidation =
    /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:. [a-zA-Z0-9-]+)*$/;

const initialValues = {
    name: "",
    email: "",
    channel: "",
    comment: "",
    adress: "",
    nickName: [""],
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

const validateComments = (value) => {
    let err;
    if (!value) err = "Required";
    return err;
};

const YoutubeForm = () => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            <Form className='absolute flex flex-col border border-gray-500 p-5 space-y-4'>
                <label htmlFor='name'>Name</label>
                <Field
                    type='text'
                    id='name'
                    name='name'
                    className='border-2 border-gray-400 p-1'
                />
                <ErrorMessage name='name' component={TextError} />

                <label htmlFor='email'>Email</label>
                <Field
                    type='text'
                    id='email'
                    name='email'
                    className='border-2 border-gray-400 p-1'
                />
                <ErrorMessage name='email'>
                    {(err) => {
                        console.log(err);
                        return <div className='text-red-600'>{err}</div>;
                    }}
                </ErrorMessage>

                <label htmlFor='channel'>Channel</label>
                <Field
                    type='text'
                    id='channel'
                    name='channel'
                    className='border-2  border-gray-400 p-1'
                />
                <ErrorMessage name='channel' className='text-red-700' />
                <label htmlFor='comment'>Comment</label>
                <Field
                    as='textarea'
                    id='comment'
                    name='comment'
                    className='border-2  border-gray-400 p-1'
                    validate={validateComments}
                />
                <ErrorMessage name='comment' component={TextError} />
                <label htmlFor='address'>Address</label>
                <Field name='address'>
                    {(props) => {
                        const {field, meta, form} = props;

                        return (
                            <div>
                                <input
                                    type='text'
                                    id='address'
                                    {...field}
                                    className='border-2  border-gray-400 p-1'
                                />
                                {meta.touched && meta.error && (
                                    <div>{meta.error}</div>
                                )}
                            </div>
                        );
                    }}
                </Field>
                <label htmlFor='nickName'>Nick Name</label>
                <FieldArray name='nickName'>
                    {(props) => {
                        const {form, push, remove} = props;
                        const {values} = form;
                        const {nickName} = values;

                        return (
                            <div>
                                {nickName.map((name, index) => {
                                    return (
                                        <div key={index}>
                                            <Field
                                                name={`nickName[${index}]`}
                                                className='border-2  border-gray-400 p-1'
                                            />
                                            {index > 0 && (
                                                <button
                                                    type='button'
                                                    onClick={() =>
                                                        remove(index)
                                                    }>
                                                    -
                                                </button>
                                            )}
                                            <button
                                                type='button'
                                                onClick={() => push("")}>
                                                +
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    }}
                </FieldArray>

                <button type='submit'>Submit</button>
            </Form>
        </Formik>
    );
};

export default YoutubeForm;
