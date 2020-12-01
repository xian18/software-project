process.env.DEBUG='socket.io*';

const io = require('socket.io')();
io.on('connection', client => {
  client.on("connect",(data)=>{
    console.log(data);
  })
  console.log(client);
});
io.listen(3001);