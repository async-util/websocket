import WebSocket from 'ws';
import { getWsData } from '@async-util/websocket';

(async function () {
  const ws = new WebSocket('wss://gateway.discord.gg/?v=9&encoding=json');
  setTimeout(() => ws.send('{"op":1,"d":6}'), 1000);
  setTimeout(() => ws.close(), 5000);

  for await (const data of getWsData(ws)) {
    console.log(data);
  }

  console.log('socket closed.');
})(console.error);