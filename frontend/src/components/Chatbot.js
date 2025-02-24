import React, { useState } from 'react'
import '../css/Chatbot.css';
import uploadpic from '../assets/upload.png';
import logo from '../assets/logo.png';
import close from '../assets/close.png';
import axios from "axios";

function Chatbot() {
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState([]); // Stores user-input and chatbot-response pairs ...

  async function manageInput() {
    if (message.trim() === '') {
        console.log('No User Input');
        return;
    }

    const userMessage = message;
    setMessage(''); // Clear input box

    // Add new user message with placeholder chatbot response
    setConversations(prev => [...prev, { user: userMessage, bot: '...' }]);

    // Fetch chatbot response
    await fetchResponse(userMessage);
  }

  async function fetchResponse (input){
        try {
            const response = await axios.post('http://localhost:7000/api/chat', { message: input });
            console.log(response);
            if(response.status === 200) {
                // const updatedOutputs = [...chatbotOutput, response.data];
                // setChatbotOutput(updatedOutputs);
                // Update the last conversation entry with the bot's response
                setConversations(prev => {
                    const updatedConversations = [...prev];
                    updatedConversations[updatedConversations.length - 1].bot = response.data;
                    return updatedConversations;
                });
            } else {
                console.log('Error Occurred While Loading Chatbot');
                return;
            }
        } catch (error) {
            console.log(error);
            return;
        }
  }

  return (
    <div className='container'>
    <p className='chat'>live chat</p>
      <div className='chatbot-popup'>
          {/* chatbot page header including logo */}
          <div className='chat-header'>
              <div className='header-info'>
                  <img src={logo} alt='logo' width={100} height={100}/>
                  <div className="grey-line">
                      <p className={"grey-line-text"}>Gamage Recruiters</p>
                  </div>
              </div>
              <button className="close-button">
                    <img src={close} alt="close" width={20} height={20} />
              </button>
          </div>

          {/* chat body including popup boxes*/}
          <div className='chat-body'>

              <div className='message-bot-message'>
                  <div className='set1'>
                      <input type="text" className="box1-input" defaultValue={"Gamage Recruiters ChatBot"} readOnly/>
                  </div>
                  <div className='set1'>
                      <input type="text" className="box2-input"
                             defaultValue={"Hello! How can I assist you today?"}
                             rows={3} readOnly/>
                  </div>
                  <div className='set1'>
                      <input type="text" className="box2-input"
                             defaultValue={"Please ask only about the company."}
                             rows={3} readOnly/>
                  </div>
              </div>

              {conversations.map((conv, index) => (
                    <div key={index} className='message-bot-message'>

                        {/* User Message (New Popup) */}
                        <div className='set2'>
                            <input type="text" className="box3-input" value={"You"} readOnly style={{width: '45px'}}/>
                        </div>
                        <div className='set2'>
                            <input type="text" className="box4-input" value={conv.user} style={{ minHeight: '40px', height: `${Math.max(40, conv.bot.length / 2)}px`, overflowY: 'auto', whiteSpace: 'nowrap', color: 'white' }} readOnly/>
                        </div>

                        {/* Chatbot Response (Below the User Input) */}
                        <div className='set1'>
                            <input type="text" className="box1-input" value={"Gamage Recruiters ChatBot"} readOnly/>
                        </div>
                        <div className='set1'>
                            <input type="text" className="box2-input" value={conv.bot} style={{ minHeight: '40px', height: `${Math.max(40, conv.bot.length / 2)}px`, overflowY: 'auto', whiteSpace: 'nowrap' }} readOnly/>
                        </div>
                    </div>
              ))}

              {/* { userInput.map((input, index) => (
                  <div key={`user-${index}`} className='message-bot-message'>
                      <div className='set2'>
                          <input type="text" className="box3-input" value={"You"} readOnly style={{width: '45px'}}/>
                      </div>
                      <div className='set2'>
                          <input type="text" className="box4-input" value={input} style={{color: "white", fontSize: 12}}/>
                      </div>
                  </div>
              ))}

              { chatbotOutput.map((output, index) => (
                  <div key={`bot-${index}`} className='message-bot-message'>
                      <div className='set1'>
                          <input type="text" className="box1-input" value={"Gamage Recruiters ChatBot"} readOnly/>
                      </div>
                      <div className='set1'>
                          <input type="text" className="box2-input" value={output} rows={3} readOnly/>
                      </div>
                  </div>
              ))} */}

              {/*<div className='message-bot-message'>*/}
              {/*<div className='set1'>*/}
              {/*      <input type="text"  className="box4-input"/>  */}
              {/*    </div>*/}
              {/*    <div className='set2'>*/}
              {/*      <input type="text"  className="box4-input"/>  */}
              {/*    </div>*/}
              {/*</div>*/}
              <hr className="centered-hr"/>
          </div>

          {/* chat footer including message typing box and upload icon*/}
          <div className='chat-footer'>
                <form action="#" className="chat-form">
                    <input type="text" placeholder="TYPE YOUR MESSAGE...." className="message-input" required
                        value={message} onChange={(e) => setMessage(e.target.value)}/>
                    <button type="button" onClick={manageInput}>
                        <img src={uploadpic} alt="upload" />
                    </button>
                </form>
          </div>
      </div>
  </div> 
  );
}

export default Chatbot

