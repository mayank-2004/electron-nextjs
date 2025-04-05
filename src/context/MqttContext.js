"use client";
import React, { useContext, createContext, useState, useEffect } from "react";

const MqttContext = createContext();

export const MqttProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);
    const [sendTopic, setSendTopic] = useState("");
    const [receiveTopic, setReceiveTopic] = useState("");

    const connectMqtt = async (mqttConig) => {

        setSendTopic(mqttConig.send);
        setReceiveTopic(mqttConig.receive);

        try {
            await fetch("http://localhost:5000/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic: mqttConig.receive }),
            });
            console.log(`Subscribed to topic: ${mqttConig.receive}`);
        } catch (error) {
            console.error("Subscription failed:", error);
        }
    }

    const onPublish = async (message) => {
        if (!sendTopic) {
            console.error("Send topic is not set");
            return;
        }

        try {
            await fetch("http://localhost:5000/publish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic: sendTopic, message }),
            });
            setMessages((prev) => [...prev, { text: message, type: "sent" }]);
            console.log(`Published message: ${message} to topic: ${sendTopic}`);
        } catch (error) {
            console.error("Error publishing message:", error);
        }
    };

      // Fetch messages from the server every 2 seconds
      useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await fetch("http://localhost:5000/messages");
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <MqttContext.Provider
            value={{ messages, connectMqtt, onPublish, sendTopic }}
        >
            {children}
        </MqttContext.Provider>
    );
};

export const useMqtt = () => {
    return useContext(MqttContext);
}