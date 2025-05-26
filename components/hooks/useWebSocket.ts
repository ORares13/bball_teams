// import { useEffect, useRef } from 'react';
// import { Team } from '@/domains/teams/types';

// interface WsMessage {
//     type: string;
//     payload: Team;
// }

// export function useWebSocket(
//     onNewTeam: (team: Team) => void,
//     competitionFilter: string = 'euroleague',
//     url = 'ws://localhost:3000'
// ) {
//     const wsRef = useRef<WebSocket | null>(null);
//     const reconnectTimeout = useRef<number | null>(null);
//     const reconnectAttempts = useRef(0);
//     const maxReconnectAttempts = 10;

//     // Heartbeat interval id
//     const heartbeatInterval = useRef<number | null>(null);

//     useEffect(() => {
//         function connect() {
//             wsRef.current = new WebSocket(url);

//             wsRef.current.onopen = () => {
//                 console.log('WebSocket connected');
//                 reconnectAttempts.current = 0;

//                 // Start sending ping every 30 seconds
//                 heartbeatInterval.current = window.setInterval(() => {
//                     if (wsRef.current?.readyState === WebSocket.OPEN) {
//                         wsRef.current.send(JSON.stringify({ type: 'PING' }));
//                     }
//                 }, 30000);
//             };

//             wsRef.current.onmessage = (event) => {
//                 try {
//                     const data = JSON.parse(event.data);

//                     // Handle PONG reply if needed
//                     if (data.type === 'PONG') {
//                         // Optionally log or reset heartbeat timers here
//                         return;
//                     }

//                     // Process new team messages
//                     if (data.type === 'NEW_ENTITY' && data.payload) {
//                         const team: Team = data.payload;
//                         if (team.competition === competitionFilter) {
//                             onNewTeam(team);
//                         }
//                     }
//                 } catch (error) {
//                     console.error('Failed to parse WS message', error);
//                 }
//             };

//             wsRef.current.onerror = (error) => {
//                 console.error('WebSocket error:', error);
//             };

//             wsRef.current.onclose = (event) => {
//                 console.warn(`WebSocket closed: code=${event.code} reason=${event.reason}`);

//                 if (heartbeatInterval.current) {
//                     clearInterval(heartbeatInterval.current);
//                     heartbeatInterval.current = null;
//                 }

//                 if (reconnectAttempts.current < maxReconnectAttempts) {
//                     const timeout = Math.min(1000 * 2 ** reconnectAttempts.current, 30000); // exponential backoff max 30s
//                     reconnectTimeout.current = window.setTimeout(() => {
//                         reconnectAttempts.current++;
//                         console.log(`Reconnecting... attempt ${reconnectAttempts.current}`);
//                         connect();
//                     }, timeout);
//                 } else {
//                     console.error('Max reconnect attempts reached, giving up.');
//                 }
//             };
//         }

//         connect();

//         return () => {
//             if (heartbeatInterval.current) clearInterval(heartbeatInterval.current);
//             if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//             wsRef.current?.close();
//         };
//     }, [competitionFilter, onNewTeam, url]);
// }
