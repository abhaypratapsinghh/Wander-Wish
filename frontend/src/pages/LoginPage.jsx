import React, { useState } from "react";
import axios from "axios";
import { setLogin } from "../../redux/state";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/api/v1/auth/login",
        data: {
          email: email,
          password: password
        }
      })
      
      
      
      if (response) {
        dispatch(
          setLogin({
            user: response.data.user,
            token:response.data.token
          })
        )
        navigate("/")
      }
    }
    catch (err) {
      console.log("login failed", err.message);
    }

  }
  return (
    <div className="flex justify-center h-screen items-center bg-[url('./assets/register-bg.jpg')] bg-cover ">
      <div className="flex flex-col w-1/2 sm:w-1/3  border-black rounded-lg p-5 text-justify justify-center bg-black bg-opacity-70">
        <form className="flex flex-col ">
          <input
            className="p-2 m-2 text-center rounded-md text-md h-9 placeholder-black outline-none "
            type={"email"}
            name={"email"}
            placeholder={"Email"}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="p-2 m-2 text-center rounded-md text-md h-9 placeholder-black outline-none "
            type={"password"}
            name={"password"}
            placeholder={"Password"}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="hover:bg-green-700 self-center m-2 px-4 py-1 bg-red-700 text-white text-lg text-center rounded-lg"
            type={"submit"}
            onClick={handleSubmit}
          >
            {"Login"}
          </button>
        </form>
        <a className="m-2 text-center text-sm text-white" href="/register">
          Already have a account?Register here
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
