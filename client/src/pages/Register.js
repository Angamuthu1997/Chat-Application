// import React from 'react';
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoute";

export default function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      useEffect(() => {
        if(localStorage.getItem('chat-app-user')){
          navigate("/");
        }
      }, []);
      const toastOptions = {
        position: "bottom-right",
                autoClose: 8000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark"

      }

    const handleSubmit = async (e) => {
        // console.log("in submit");
        e.preventDefault();
        // alert("form");
        // handleValidation();
        if(handleValidation()){
            // console.log("in validation", registerRoute);
            const { password , confirmPassword, username, email} = values;
            const { data } = await axios.post(registerRoute, {
                username,
                password,
                email
            });
            if(data.status === false){
                toast.error(data.msg, toastOptions);                
            }
            if(data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
            }
            toast.success("User created!!!!!", toastOptions) ;
            navigate("/login");
        }
    }

    const handleValidation = () => {
        const {password , confirmPassword, username, email} = values;

        if(password !== confirmPassword){
            toast.error("Password and Confirm password should be same!!", toastOptions) ;
            return false;                       
        }else if(email === ""){
            toast.error("Email is required!!!!!", toastOptions) ;
            return false;    
        } else if(username.length < 3){
            toast.error("Username should be greater than 8 characters !!", toastOptions) ;
            return false;    
        } else if(password.length < 3){
            toast.error("Password should be greater than 8 characters !!", toastOptions) ;
            return false;    
        } 
        return true;   
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
      };
  return (
    <div>
        <FormContainer>
      <form action = " " onSubmit={(event) => handleSubmit(event)}>
        <div className='brand'>
            <img src={Logo} alt = ''>
            </img>
            <h1>snappy</h1>
        </div>
        <input type = "text" placeholder='Username' name = 'username' onChange={ (e) => handleChange(e)}></input>
        <input type = "email" placeholder='Email' name = 'email' onChange={ (e) => handleChange(e)}></input>
        <input type = "password" placeholder='Password' name = 'password' onChange={ (e) => handleChange(e)}></input>
        <input type = "password" placeholder='Confirm Password' name = 'confirmPassword' onChange={ (e) => handleChange(e)}></input>
        <button type = "submit"> Create User</button>
        <span>Already have an account ? <Link to = "/login"> Login</Link></span>

      </form>
      </FormContainer>
      <ToastContainer></ToastContainer>
    </div>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;


