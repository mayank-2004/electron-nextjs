const { protocol } = require('electron');
const mqtt = require('mqtt');

const BROKER_URL = `mqtt://192.168.1.200:1883`; 
const TOPIC = 'test/topic';

const options = {
    clientId: `mqttjs_${Date.now()}_${Math.random().toString(16).substr(2, 4)}`,
    reconnectPeriod: 1000,
}

const client = mqtt.connect(BROKER_URL, options);

client.on('connect', () => {
    console.log(`Connected to MQTT Broker: ${BROKER_URL}`);

    client.subscribe(TOPIC, (err) => {
        if (!err) {
            console.log(`Subscribed to topic: ${TOPIC}`);
        } else {
            console.error('Subscription error:', err);
        }
    });

    setTimeout(() => {
        const message = "Hello from MQTT Client!";
        client.publish(TOPIC, message, () => {
            console.log(`Message sent: "${message}"`);
        });
    }, 500);
});

client.on('message', (topic, message) => {
    console.log(`Received message on ${topic}: ${message.toString()}`);
});

client.on('error', (err) => {
    console.error('MQTT Error:', err);
});

client.on('close', () => {
    console.log('Disconnected from MQTT broker');
});
