import fastify from 'fastify';

const socket: () => void = require('./client.js').socket;
const disconnect: () => void = require('./client.js').disconnect;
const app = fastify();

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.post('/connect', socket);
app.post('/disconnect', disconnect);
 
app.listen({
    port: 2345,
}).then(() => {
    console.log("Server is running on port 2345...");
});