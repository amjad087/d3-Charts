import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as path from 'path'
import * as fs from 'fs';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {
      fs.readFile('public/chart.json', 'utf8', (err, data) => {
        if (err) {
          ws.send(JSON.stringify('could not read file'))
        }
        const arr = JSON.parse(data);
        let i = 0;
        for(let obj in arr) {
          const objArr = arr[i];
          setTimeout(() => {
            ws.send(JSON.stringify(objArr));
          }, 1000 * i);
          i++;
        }

      });
      //-----------------------------------------------------------
  });

});

//start our server
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000} :)`);
});
