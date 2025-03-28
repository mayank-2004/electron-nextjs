"use client"
import React, { useState } from 'react'
import "./Home.css"
import { useMqtt } from '@/context/MqttContext';

const Home = () => {

    const { onPublish, messages, sendTopic } = useMqtt();
    const [sendMessage, setSendMessage] = useState('');

    const handlePublish = () => {
        if (sendMessage) {
            onPublish(sendMessage);
            setSendMessage('');

        }
    };

    return <>
        <h1 style={{ fontSize: "18px", color: "white" }}>Home Page</h1>
        <div className='chat-container'>
            <div className='home-area'>
                <h1 className='msg'>{sendTopic}</h1>
                <div className="chat-box">
                    {messages.reverse().map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.type === 'sent' ? 'sent' : 'received'}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
            </div>

            {/* Pubisher */}
            <div className='home-container'>
                <div className='home-form' >
                    <h3>Publisher</h3>
                    <input type="text" name="text" placeholder='enter text to send' value={sendMessage}
                        onChange={(e) => setSendMessage(e.target.value)} />
                    <button onClick={handlePublish} type='button' className='btn'>Send</button>
                </div>
            </div>
        </div>
    </>
}

export default Home;
