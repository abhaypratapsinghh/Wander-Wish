import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [checkPassword, setCheckPassword] = useState(false)
  
  useEffect(() =>{
    setCheckPassword(formData.password === formData.confirmPassword || formData.confirmPassword === "")
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/api/v1/auth/register",
        data: formData,
      })
      if(response)
      navigate("/login");
  }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };


  
  return (
    <div className="flex justify-center h-screen items-center bg-[url('./assets/register-bg.jpg')] bg-cover ">
      <div className="flex flex-col w-1/2 sm:w-1/3    border-black rounded-lg p-5 text-justify justify-center bg-black bg-opacity-70">
        <form className="flex flex-col ">
          <input
            className="p-2 m-2 text-center rounded-md text-md h-9 placeholder-black outline-none "
            type={"text"}
            name={"firstName"}
            placeholder={"First Name"}
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            className="p-2 m-2 text-center rounded-md text-md h-9 placeholder-black outline-none "
            type={"text"}
            name={"lastName"}
            placeholder={"Last Name"}
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            className="p-2 m-2 text-center rounded-md text-md h-9 placeholder-black outline-none "
            type={"email"}
            name={"email"}
            placeholder={"Email"}
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="p-2 m-2 text-center rounded-md text-md h-9 placeholder-black outline-none "
            type={"password"}
            name={"password"}
            placeholder={"Password"}
            value={formData.password}
            onChange={handleChange}
          />
          <input
            className="p-2 m-2 text-center rounded-md text-md h-9 placeholder-black outline-none "
            type={"password"}
            name={"confirmPassword"}
            placeholder={"Confirm Password"}
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {!checkPassword && (
            <p className="text-red-400 self-center">Password not matched</p>
          )}

          <button
            className="hover:bg-green-700 self-center m-2 px-4 py-1 bg-red-700 text-white text-lg text-center rounded-lg"
            type={"submit"}
            onClick={handleSubmit}
          >
            {"Register"}
          </button>
        </form>
        <a className="m-2 text-center text-sm text-white" href="/login">
          Already have a account?Log in here
        </a>
      </div>
    </div>
  );
};

export default RegisterPage;
