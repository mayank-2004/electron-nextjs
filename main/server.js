const express = require("express");
const mqtt = require("mqtt");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MQTT Broker Configuration
const MQTT_BROKER = "mqtt://192.168.1.200:1883"; 
const mqtt_Username = "Swajahome";
const mqtt_Password = "12345678";

const client = mqtt.connect(MQTT_BROKER,  {
  username: mqtt_Username,
  password: mqtt_Password,
  reconnectPeriod: 5000,
});

let messages = [];

client.on("connect", () => {
  console.log(`Connected to MQTT Broker at ${MQTT_BROKER}`);
});

client.on("error", (err) => {
  console.error("MQTT connection Error:", err);
});

client.on("message", (topic, message) => {
  const receivedMessage = { topic, text: message.toString(), type: "received" };
  messages.push(receivedMessage);
  console.log(`Message received from ${topic}: ${message.toString()}`);
});

// API Route to Publish Message
app.post("/publish", (req, res) => {
  const { topic, message } = req.body;

  if (!topic || !message) {
    return res.status(400).json({ error: "Topic and message are required" });
  }

  client.publish(topic, message, (err) => {
    if (err) {
      console.log("publish error");
      return res.status(500).json({ error: "Failed to publish message" });
    }
    console.log(`Published message: ${message} from topic: ${topic}`);
    messages.push({topic, text: message, type: "sent"});
    res.json({ success: true }); 
  });
});

// API Route to Subscribe to Topic
app.post("/subscribe", (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  client.subscribe(topic, (err) => {
    if (err) {
      return res.status(500).json({ error: "Subscription failed" });
    }
    console.log(`subscribed to topic: ${topic}`);
    res.json({ success: true, topic});
  });
});

// API to get received messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
