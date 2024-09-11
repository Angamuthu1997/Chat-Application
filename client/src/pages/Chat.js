import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from '../utils/APIRoute';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client'
// import { Socket } from ;


function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts,setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined); 
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);


  // useEffect(() => {
  //   const setUser = async() => {
  //     if(!localStorage.getItem('chat-app-user')){
  //       navigate("/login");
  //     } else{
  //       console.log("in else")
  //       // console.log(await JSON.parse(localStorage.getItem("chat-app-user")));
  //       setCurrentUser(await JSON.parse (localStorage.getItem('chat-app-user')));
  //       console.log(currentUser);
  //     }
  //   }
  //   setUser();    
  // }, []);


  useEffect(() => {
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  },[currentUser]);

  useEffect(() => {
    const setUser = async () => {
      const user = localStorage.getItem("chat-app-user");

      if (!user) {
        // Navigate to login if no user is found in localStorage
        navigate("/login");
      } else {
        // Parse user and set it in state
        const parsedUser = await JSON.parse(user);
        setCurrentUser(parsedUser); // Set the user in the state
        console.log("Current user:", parsedUser); // Log the user directly after parsing
        setIsLoaded(true);
      }
    };

    setUser();
  }, [navigate]);

  useEffect(() => {
    console.log(currentUser);
    const getCurrentUser = async() => {
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          // console.log(currentUser._id);
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          // console.log(data);
          setContacts(data.data);
        }else{
          navigate("/setAvatar")
        }
      }
    }
    getCurrentUser();  

  },[currentUser]);


  const handleChatChange = (chat) => 
  {
    setCurrentChat(chat);
  }


  return (
    <Container>
      <div className="container" >
      <Contacts contacts = {contacts} currentUser = {currentUser} changeChat={handleChatChange}></Contacts>
      {
        isLoaded && currentChat === undefined? (
          <Welcome currentUser= { currentUser}></Welcome>
        ) : <ChatContainer currentChat={currentChat} currentUser={currentUser} socket ={socket}></ChatContainer>
      }
      {/* <Welcome currentUser = {currentUser}></Welcome> */}
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;



export default Chat
