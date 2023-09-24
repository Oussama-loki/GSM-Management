import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import IUser from "../../models/IUser";
import { signUp } from "../../services/auth.service";

const SignUpPage: React.FC = () => {
    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const initialValues: IUser = {
        username: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required("This field is required!"),
        lastName: Yup.string()
            .required("This field is required!"),
        phoneNumber: Yup.string()
            .test(
                "len",
                "The phone number must be between 10 and 15 characters.",
                (val: any) =>
                    val &&
                    val.toString().length >= 10 &&
                    val.toString().length <= 15
            )
            .required("This field is required!"),
        username: Yup.string()
            .test(
                "len",
                "The username must be between 3 and 20 characters.",
                (val: any) =>
                    val &&
                    val.toString().length >= 3 &&
                    val.toString().length <= 20
            )
            .required("This field is required!"),
        email: Yup.string()
            .email("This is not a valid email.")
            .required("This field is required!"),
        password: Yup.string()
            .test(
                "len",
                "The password must be between 6 and 40 characters.",
                (val: any) =>
                    val &&
                    val.toString().length >= 6 &&
                    val.toString().length <= 40
            )
            .required("This field is required!"),
    });

    const handleRegister = (formValue: IUser) => {
        const { username, email, password } = formValue;

        signUp(username, email, password).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            }
        );
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="https://www.radeema.ma/documents/20181/29122/logo"
                    alt="profile-img"
                />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    <Form>
                        {!successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="firstName"> First Name </label>
                                    <Field name="firstName" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="firstName"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastName"> Last Name </label>
                                    <Field name="lastName" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="lastName"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phoneNumber"> Phone Number </label>
                                    <Field name="phoneNumber" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="phoneNumber"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="username"> Username </label>
                                    <Field name="username" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="username"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email"> Email </label>
                                    <Field name="email" type="email" className="form-control" />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password"> Password </label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="checkbox" aria-label="Checkbox for following text input" />
                                        </div>
                                    </div>
                                    <span className="form-control" aria-label="Text input with checkbox">Admin</span>
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="checkbox" aria-label="Checkbox for following text input" />
                                        </div>
                                    </div>
                                    <span className="form-control" aria-label="Text input with checkbox">Operator Employee</span>
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                                </div>
                            </div>
                        )}

                        {message && (
                            <div className="form-group">
                                <div
                                    className={
                                        successful ? "alert alert-success" : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {message}
                                </div>
                            </div>
                        )}
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default SignUpPage;