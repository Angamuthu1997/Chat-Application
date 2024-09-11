import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components';
import Robot from "../assets/robot.gif";

// import React, { useEffect } from "react";

function Welcome({ currentUser }) {
  useEffect(() => {
    if (currentUser) {
      console.log("Current user:", currentUser);
    }
  }, [currentUser]); // This effect runs when currentUser is updated

  // Return null or a loader if currentUser is undefined
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <img src={Robot} alt="robot" />
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat to start!!</h3>
    </Container>
  );
}

// export default Welcome


const Container = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
    color: white;
    img:{
        height: 20 rem;    
    }
    span:{
        color: #4e00ff
    }

`;

export default Welcome
