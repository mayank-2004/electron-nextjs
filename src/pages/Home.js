"use client"
import React, { useState } from 'react'
import "./Home.css"
import { useMqtt } from '@/context/MqttContext';

const Home = () => {

    const { onPublish, messages } = useMqtt();
    const [sendMessage, setSendMessage] = useState('');

    const handlePublish = () => {
        if (sendMessage) {
            onPublish(sendMessage);
            setSendMessage('');
        }
    };

    return <>
        {/* Pubisher */}
        <h1 style={{ fontSize: "18px" }}>Home Page</h1>
        <div className='home-container'>
            <div className='home-form' >
                <h3>Publisher</h3>
                <input type="text" name="text" placeholder='enter text to send' value={sendMessage}
                    onChange={(e) => setSendMessage(e.target.value)} />
                <button onClick={handlePublish} type='button' className='btn'>Send</button>
            </div>
        </div>

        <div className='home-area'>
            <h3 className='msg'>Have a communication here</h3>
            <textarea readOnly value={messages.join("\n")} name="message" cols="25" rows="8"></textarea>
        </div>

    </>
}

export default Home;
