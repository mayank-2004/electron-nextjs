"use client";
import React, { useContext, createContext, useState } from "react";
import mqtt from "mqtt";

// Create Context
const MqttContext = createContext();

// Context Provider Component
export const MqttProvider = ({ children }) => {

    const [client, setClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [sendTopic, setSendTopic] = useState("");
    const [receiveTopic, setReceiveTopic] = useState("");

    // function to connect to MQTT 
    const connectMqtt = (mqttConig) => {
        if (client) {
            client.end(); // Close existing connection before reconnecting
            setClient(null);
        }

        const brokerURL = `wss://${mqttConig.mqttip}:${mqttConig.port}/mqtt`;
        const options = {
            username: mqttConig.username || undefined,
            password: mqttConig.password || undefined,
        };

        const newClient = mqtt.connect(brokerURL, options);
        setClient(newClient);

        setSendTopic(mqttConig.send);
        setReceiveTopic(mqttConig.receive);

        newClient.on("connect", () => {
            console.log(`Connected to MQTT Broker: ${brokerURL}`);

            if (mqttConig.receive) {
                newClient.subscribe(mqttConig.receive, (err) => {
                    if (!err) {
                        console.log(`Subscribed to topic: ${mqttConig.receive}`);
                    } else {
                        console.error("Subscription error:", err);
                    }
                });
            }

            if (mqttConig.send) {
                newClient.publish(mqttConig.send, "Hello from MQTT Client!", (err) => {
                    if (err) {
                        console.error("error in Publishing:", err);
                    } else {
                        console.log(`Message sent to ${mqttConig.send}`);
                    }
                });
            }

        });

        newClient.on("message", (topic, message) => {
            console.log("hello is there any error");
            console.log(`Received on ${topic}: ${message.toString()}`);
            setMessages((prev) => [...prev, {text: `${message}`, type: "sent"}]);  // phone se laptop publisher ko msg ara h.
        });

        newClient.on("error", (err) => {
            console.error("MQTT Error:", err);
        });

        newClient.on("close", () => {
            console.log("Disconnected from MQTT broker");
        });
    }

    // Publish Message
    const onPublish = (message) => {
        if (client && sendTopic) {
            client.publish(sendTopic, message, (err) => {
                if (err) {
                    console.error("Error in Publishing:", err);
                } else {
                    console.log(`Message sent to ${sendTopic}`);
                    setMessages((prev) => [...prev, {text: `${message}`, type: "received"}]);  // laptop se phone publisher ko msg ara h.
                }
            })
        } else {
            console.error("Client not connected or send topic is empty");
        }
    }

    return (
        <MqttContext.Provider
            value={{ client, messages, connectMqtt, onPublish, sendTopic }}
        >
            {children}
        </MqttContext.Provider>
    );
};

// custom hook to use mqtt context
export const useMqtt = () => {
    return useContext(MqttContext);
}