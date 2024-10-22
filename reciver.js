const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const ipList = []
let messages = 0;

client.on('listening', () => {
  console.log(`[RECEIVER] Listening on port ${process.argv[2] || 8080}...`)
});

client.on('message', (msg, rinfo) => {
  if (!ipList.includes(rinfo.address)) {
    ipList.push(rinfo.address)
    console.log(`[RECEIVER] New IP: ${rinfo.address}`)
  }
  messages++;
})

setInterval(() => {
  console.log(`[RECEIVER] ${messages} packets por segundo`)
  messages = 0;
}, 10024)

client.bind(process.argv[2] || 8080);
