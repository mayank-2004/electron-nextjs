"use client"
import React, { useEffect, useState } from 'react'
import "./settings.css"
import mqtt from 'mqtt';

const Settings = () => {
    const [user, setUser] = useState({
        mqttip: 'broker.emqx.io',
        port: '8084',
        username: '',
        password: '',
        receive: '',
        send: ''
    })

    const [client, setClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [sendMessage, setSendMessage] = useState('');

    const InputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value })
    }
    // Handle Publish
    const handleSubmit = (e) => {
        e.preventDefault();

        if (client) {
            client.end(); // Close existing connection before reconnecting
            setClient(null);
        }

        const brokerURL = `wss://${user.mqttip}:8084/mqtt`;
        const options = {
            username: user.username || undefined,
            password: user.password || undefined,
        };

        const newClient = mqtt.connect(brokerURL, options);
        setClient(newClient);
        newClient.on("connect", () => {
            console.log(`Connected to MQTT Broker: ${brokerURL}`);
            if (user.receive) {
                newClient.subscribe(user.receive, (err) => {
                    if (!err) {
                        console.log(`Subscribed to topic: ${user.receive}`);
                    } else {
                        console.error("Subscription error:", err);
                    }
                });
            }

            if (user.send) {
                newClient.publish(user.send, "Hello from MQTT Client!", (err) => {
                    if (err) {
                        console.error("error in Publishing:", err);
                    } else {
                        console.log(`Message sent to ${user.send}`);
                    }
                });
            }

        });

        newClient.on("message", (topic, message) => {
            console.log(`Received on ${topic}: ${message.toString()}`);
            setMessages((prevMessages) => [...prevMessages, message.toString()]);
        });

        newClient.on("error", (err) => {
            console.error("MQTT Error:", err);
        });

        newClient.on("close", () => {
            console.log("Disconnected from MQTT broker");
        });
    }

    const onPublish = () => {
        if (!client || !client.connected) {
            console.error("MQTT client is not connected!");
            return;
        }

        if (user.send && sendMessage) {
            client.publish(user.send, sendMessage, (err) => {
                if (err) {
                    console.error("error in Publishing:", err);
                } else {
                    console.log(`Message sent to ${user.send}`);
                    setMessages((prevMessages) => [...prevMessages, sendMessage]);
                    setSendMessage('')
                }
            });
        } else {
            console.error("Client not connected or send topic is empty");
        }
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
            <div className='publisher'>
                <h1>Publisher</h1>
                <div className='publishers'>
                    <div className='publisher-form'>
                        <label>send text</label>
                        <input value={sendMessage} onChange={(e) => setSendMessage(e.target.value)} type="text" name="text" placeholder='enter text' />
                    </div>
                    <button onClick={onPublish} type='button' className='btn'>Send</button>
                </div>
                <div className='publisher-area'>
                    <textarea readOnly value={messages.join("\n")} name="message" cols="40" rows="15"></textarea>
                </div>
            </div>

            <div className='publisher'>
                <h1>Subscriber</h1>
                <form>
                    <div className='publishers'>
                        <div className='publisher-form'>
                            <label>receive text</label>
                            <div className='publisher-area'>
                                <textarea readOnly value={messages.join("\n")} name="message" cols="25" rows="15"></textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
}

export default Settings
