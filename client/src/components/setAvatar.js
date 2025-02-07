import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';
import Loader from '../assets/loader.gif';
// import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRoute";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"

  };

  useEffect(() => {
    if(!localStorage.getItem('chat-app-user')){
      navigate("/login");
    }
  }, []);
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("please select an avatar", toastOptions);
    } else{
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));
      const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
        image: avatars[selectedAvatar],
      });
      if(data.isSet){
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user",JSON.stringify(user));
        navigate('/chat');
      }
      else{
        toast.error("error setting avatar, please try again!!!", toastOptions);
      }
    }
  };

  //   useEffect( () => {
  //     const fetchAvatar = async  () => {
  //       const data = [];
  //       for(let i =0 ;i<4; i++){
  //           const image = await axios.get(
  //               `${api}/${Math.round(Math.random() * 1000)}`
  //           );
  //           const buffer = new Buffer(image.data);
  //           data.push(buffer.toString("base64"));
  //       };
  //       setAvatars(data);
  //       setIsLoading(false);
  //       fetchAvatar();
  //   }
  // },[]);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const data = [];
        for (let i = 0; i < 3; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = new Buffer.from(image.data); // Corrected Buffer instantiation
          data.push(buffer.toString('base64'));
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching avatars:', error);
      }
    };

    
    fetchAvatar();
  }, [api]);





  return (
    <>
      {
        isLoading ? (
          <Container>
            <img src={Loader} alt="loader" className="loader" />
          </Container>
        ) : (
          <Container>
            <div className="title-container">
              Pick your avatar as your profile picture
            </div>
            <div className="avatars">{
              avatars.map((avatar, index) => {
                return (
                  <div className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                    <img src={`data:image/svg+xml;base64, ${avatar}`}
                      alt="avatar"
                      key={avatar}
                      onClick={() => setSelectedAvatar(index)}
                    />

                  </div>

                )
              })
            }</div>
            <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>


            <ToastContainer></ToastContainer>
          </Container>

        )
      }

    </>
  )
}

export default SetAvatar
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
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
`;
