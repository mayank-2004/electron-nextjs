"use client"
import React, { useState } from 'react'
import "./settings.css"
import { useMqtt } from '@/context/MqttContext';

const Settings = () => {
    const {connectMqtt} = useMqtt();
    const [user, setUser] = useState({
        mqttip: 'broker.emqx.io',
        port: '8084',
        username: '',
        password: '',
        receive: '',
        send: ''
    })

    const InputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    // Handle Publish
    const handleSubmit = (e) => {
        e.preventDefault();
        connectMqtt(user);
    }

    return <>
        <div className='settings-section'>
            <div>
                <h1>Setting Page</h1>
                <form onSubmit={handleSubmit} className='container'>
                    <div className='form'>
                        <div className='form-group'>
                            <label htmlFor="">
                                MQTTIP:
                            </label>
                            <input onChange={InputChange} value={user.mqttip} type="text" name='mqttip' placeholder='enter your id' required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">
                                PORT:
                            </label>
                            <input onChange={InputChange} value={user.port} type="number" name='port' placeholder='enter port' required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">
                                username:
                            </label>
                            <input onChange={InputChange} value={user.username} type="text" name='username' placeholder='enter username' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">
                                password:
                            </label>
                            <input onChange={InputChange} value={user.password} type="text" name='password' placeholder='enter password' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">
                                Receive Topic:
                            </label>
                            <input onChange={InputChange} value={user.receive} type="text" name='receive' placeholder='enter received topic' required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">
                                Send Topic:
                            </label>
                            <input onChange={InputChange} value={user.send} type="text" name='send' placeholder='enter topic to send' required />
                        </div>
                        <div>
                            <button className='btn' type='submit' name='button'>Save</button>
                        </div>
                    </div>
                </form >
            </div>
        </div>
    </>
}

export default Settings;
