import { useFormik } from "formik";
import * as Yup from "yup";
import RegisterImage from "./../../assets/imges/signup-g-Dtp6-wtD.svg";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);

    const initialValues = {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Name is required")
            .min(3, "Minimum 3 characters")
            .max(20, "Maximum 20 characters"),
        email: Yup.string()
            .required("Email is required")
            .email("Enter a valid email"),
        password: Yup.string()
            .required("Password is required")
            .matches(/^[A-Z][a-zA-Z0-9]{6,}$/, "Password must start with an uppercase letter and be at least 7 characters long"),
        rePassword: Yup.string()
            .required("Re-password is required")
            .oneOf([Yup.ref("password")], "Passwords do not match"),
        phone: Yup.string()
            .required("Phone is required")
            .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian number"),
    });

    const checkEmailValidity = async (email) => {
        setIsCheckingEmail(true);
        try {
            const { data } = await axios.post("https://api.emailvalidation.com/check", { email });
            if (!data.isValid) {
                toast.error("Invalid email address");
            }
        } catch (error) {
            toast.error("Failed to verify email");
        } finally {
            setIsCheckingEmail(false);
        }
    };

    const handleSignup = async (values) => {
        setIsLoading(true);
        try {
            await checkEmailValidity(values.email);
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/auth/signup",
                values
            );
            toast.success(data.message);
            navigate("/login");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "An error occurred");
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSignup,
    });

    return (
        <div className="flex flex-col md:flex-row w-[90%] md:w-[50%] justify-between items-center m-auto">
            <div>
                <img src={RegisterImage} alt="Register" className="w-full" />
            </div>
            <div className="py-7">
                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold m-2">Get Started Shopping</h1>
                    <p className="m-3">Welcome to FreshCart! Enter your details to sign up.</p>
                    <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                            <input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                type="text"
                                id="name"
                                name="name"
                                className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Your Name"
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                            )}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input
                                onChange={formik.handleChange}
                                onBlur={(e) => {
                                    formik.handleBlur(e);
                                    checkEmailValidity(e.target.value);
                                }}
                                value={formik.values.email}
                                type="email"
                                id="email"
                                name="email"
                                className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Email"
                                autoComplete="email"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                            )}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                type="password"
                                id="password"
                                name="password"
                                className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Password"
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                            )}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                            <input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.rePassword}
                                type="password"
                                id="rePassword"
                                name="rePassword"
                                className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Confirm Password"
                            />
                            {formik.touched.rePassword && formik.errors.rePassword && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.rePassword}</p>
                            )}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                            <input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                type="text"
                                id="phone"
                                name="phone"
                                className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Phone Number"
                            />
                        </div>
                        <div className="mb-5 text-center">
                            <a href="/forgot-password" className="text-blue-500 text-sm">Forgot Password?</a>
                        </div>
                        <div className="mb-5">
                            <button type="submit" className="text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg text-sm w-full p-2.5" disabled={isLoading}>
                                {isLoading ? <i className="fa-solid fa-spin fa-spinner text-white"></i> : "Sign Up"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
