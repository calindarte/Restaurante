import { useEffect } from "react";
import { login } from "../config/firebase";
import {  useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useOrderContext } from "../context/UseOrderContext";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useOrderContext();

  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user]);

  const onSubmit = async (
    { email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
     await login({ email, password });
      resetForm();
    } catch (error) {
      // console.log(error.code);
      // console.log(error.message);
    
      if (error.code === "auth/invalid-credential") {
        return setErrors({ email: "Credenciales invalidas", password: "Credenciales invalidas" });
      }
      if (error.code === "auth/too-many-requests") {
        return setErrors({password:"Demasiados intentos"})
        
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email no valido").required("Email requerido"),
    password: Yup.string()
      .trim()
      .min(6, "Minimo 6 caracteres")
      .required("Password requerido"),
  });

  return (
    <div className="absolute right-12 top-16">
      <div className="flex flex-col gap-y-4 px-8 border py-6 shadow-xl rounded-md bg-slate-50 ">
        <h1 className="text-center font-semibold">SIGN IN ADMIN</h1>

        <Formik
          onSubmit={onSubmit}
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-800"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="text"
                  placeholder="Ingrese Email"
                  value={values.email}
                  onChange={handleChange}
                  name="email"
                  onBlur={handleBlur}
                  className=" relative z-10 py-2 px-3 border shadow-sm  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
                <span className="text-xs text-red-600">
                  {errors.email && touched.email && errors.email}
                </span>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-800"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Ingrese Password"
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                  onBlur={handleBlur}
                  className="relative z-10 py-2 px-3 p-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
                <span className="text-xs text-red-600">
                  {errors.password && touched.password && errors.password}
                </span>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg p-2 bg-blue-500  hover:bg-blue-600 text-white font-semibold sm:text-sm w-full"
                >
                  Acceder
                </button>
              </div>
              
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
