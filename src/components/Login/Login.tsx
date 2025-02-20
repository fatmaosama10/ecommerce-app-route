
import { useFormik } from "formik";
import * as Yup from "yup";
import signinImage from "./../../assets/imges/signin-DlR7P608.png";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Login() {
  const navigate = useNavigate()
  const {setToken}=useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false);


  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-zA-Z0-9]{6,}$/,
        "Password must start with an uppercase letter and be at least 7 characters long"
      )
  });

  const handleSignin = async (values: typeof initialValues) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      localStorage.setItem("tkn",data.token)
      setToken(data.token)
      toast.success(data.message);
      //login
      navigate("/")
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
    onSubmit: handleSignin,
  });

  return (
    <div className="flex flex-col md:flex-row w-[90%] md:w-[50%] justify-between items-center m-auto my-20">
      <div>
        <img src={signinImage} alt="Register" className="w-full" />
      </div>
      <div className="py-7">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold m-2">Sign in to FreshCart</h1>
          <p className="m-3">Welcome back to FreshCart! Enter your email to get started.</p>

          <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
            {/* Email */}
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                type="email"
                id="email"
                name="email"
                className={`bg-gray-50 border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-200"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:border-green-400 focus:shadow-xl`}
                placeholder="Email"
                autoComplete="email"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                type="password"
                id="password"
                name="password"
                className={`bg-gray-50 border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-200"
                } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:border-green-400 focus:shadow-xl`}
                placeholder="Password"
                autoComplete="new-password"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
              )}
            </div>
            {/* Submit Button */}
            <div className="mb-5">
              <button
                type="submit"
                className="text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg text-sm w-full p-2.5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <i className="fa-solid fa-spin fa-spinner text-white"></i>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Login
