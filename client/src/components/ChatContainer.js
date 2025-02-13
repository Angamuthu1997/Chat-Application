import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import LogOut from './LogOut';
import ChatInput from './ChatInput';
import Messages from './Messages';
import axios from 'axios';
import { getMessagesRoute, sendMessageRoute } from '../utils/APIRoute';
import {v4 as  uuidv4} from 'uuid'; 

function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setSrrivalMessage ] = useState(null);
  const scrollref = useRef();
  useEffect(() => {
    const getMessage = async () => {
      if (currentChat && currentUser) {
        // console.log("999999999999999999999",currentChat,currentUser)
        const user = localStorage.getItem("chat-app-user");
        const data = await JSON.parse(user);
        const response = await axios.post(getMessagesRoute, {
          from: data._id,
          to: currentChat._id,
        });
        console.log(response)
        setMessages(response.data);
      }
    }
    getMessage();

  }, [currentChat]);

  const handlesendMsg = async (msg) => {

    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg
    });
    socket.current.emit("send-msg",{
      to: currentChat._id,
      from: currentUser._id,
      message: msg
    })
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if(socket.current){
      socket.current.on("msg-recieve", (msg) => {
        setSrrivalMessage({
          fromSelf: false,
          message: msg
        })
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage]);

  useEffect(() => {
    scrollref.current?.scrollIntoView({
      behaviour: "smooth"
    })
  },[messages]);


  return (
    <>
      {currentChat && (
        <Container>
          <div className='chat-header'>
            <div className='user-details'>
              <div className='avatar'>
                <img
                  src={`data:image/svg+xml;base64, ${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className='username'>
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <LogOut />
          </div>
          <div className='chat-messages'>
            {
              messages.map((message) => {
                return (
                  <div ref={scrollref} key={uuidv4()}>
                    <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                      <div className='content'>
                        <p>
                          {/* <div className="content "> */}
                            <p>{message.message}</p>
                          {/* </div> */}
                        </p>
                      </div>
                    </div>
                  </div>

                )
              })
            }
          </div>
          <ChatInput handlesendMsg={handlesendMsg} />
        </Container>
      )}

    </>

  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;


export default ChatContainer




// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import styled from 'styled-components';
// import { BiPowerOff } from 'react-icons/bi';

// function Logout() {
//     const navigate = useNavigate();
//     const handleClick = async() => {
//         localStorage.clear();
//         navigate("/login");
//     };
//   return (
//     <Button onClick={handleClick()}>
//       <BiPowerOff></BiPowerOff>
//     </Button>
//   )
// }

// const Button = styled.div `
//     display: flex;
//     justify-content: center;
//     align_items: center;
//     padding: 0.5 rem;
//     border-radius: 0.5rem;
//     background-color: #9a68f3;
//     border: none;
//     cursor: pointer;
//     svg{
//         font-size: 1.3rem;
//         color: #ebe7ff;
//     }
// `;

// export default Logout
