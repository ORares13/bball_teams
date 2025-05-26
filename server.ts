import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { WebSocketServer, WebSocket } from 'ws';
import fs from 'fs';
import path from 'path';
import { Competition } from './domains/teams/types';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

let clients: Set<WebSocket> = new Set();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url!, true);

        if (req.method === 'POST' && parsedUrl.pathname === '/upload') {
            // File upload logic
            const boundary = req.headers['content-type']?.split('boundary=')[1];
            if (!boundary) {
                res.statusCode = 400;
                return res.end('Missing boundary');
            }
            const filePath = path.join(__dirname, 'public', 'uploads', `video-${Date.now()}.mp4`);
            const fileStream = fs.createWriteStream(filePath);
            req.pipe(fileStream);
            req.on('end', () => {
                res.statusCode = 200;
                res.end('File uploaded');
            });
            return;
        }

        handle(req, res, parsedUrl);
    });

    const wss = new WebSocketServer({ noServer: true });

    wss.on('connection', (ws: WebSocket) => {
        clients.add(ws);
        ws.send(JSON.stringify({ message: 'Connected to HIHIWebSocket server' }));

        ws.on('close', () => {
            clients.delete(ws);
        });
    });

    server.on('upgrade', (req, socket, head) => {
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit('connection', ws, req);
        });
    });

    // Example async entity generator every 10 seconds
    setInterval(() => {
        const newEntity = {
            id: Math.floor(Math.random() * 10000),
            name: 'Generated Team',
            country: 'Generated Country',
            arena: 'Generated Arena',
            arenaCapacity: Math.floor(Math.random() * 10000),
            logo: "generated logo",
            manager: "Generated Manager",
            competition: "euroleague"
        };
        clients.forEach((ws: WebSocket) => {
            if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify({ type: 'NEW_ENTITY', payload: newEntity }));
            }
        });
    }, 10000);

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});
