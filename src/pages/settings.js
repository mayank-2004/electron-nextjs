"use client"
import React, { useState } from 'react'
import "./settings.css"
import { useMqtt } from '@/context/MqttContext';

const API_URL = "http://localhost:5000";

const Settings = () => {
    let {connectMqtt} = useMqtt();
    let [user, setUser] = useState({
        mqttip: '192.168.1.200',
        port: '1883',
        username: 'Swajahome',
        password: '12345678',
        receive: 'indihood/meet1/out',
        send: 'indihood/meet1/in'
    })

    const InputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitting and transfering user details")
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
                            <input onChange={InputChange} value={user.mqttip} type="decimal" name='mqttip' placeholder='enter your id' required />
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
                            <input onChange={InputChange} value={user.password} type="password" name='password' placeholder='enter password' />
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
