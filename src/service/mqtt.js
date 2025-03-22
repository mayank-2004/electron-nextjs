const { protocol } = require('electron');
const mqtt = require('mqtt');

const BROKER_URL = `wss://broker.emqx.io:8084/mqtt`; 
// const TOPIC = 'test/topic';

const options = {
    protocol: wss,
    port: 8083,
    path: '/mqtt'
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

    const message = "Hello from MQTT Client!";
    client.publish(TOPIC, message, () => {
        console.log(`Message sent: "${message}"`);
    });
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
