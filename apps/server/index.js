// GlobeTycoon Server
// Created by Mohammad Suhail Khan
// GitHub: https://github.com/mohammadsuhailkhan

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_URL, "https://globetycoon.netlify.app", "http://localhost:5173", "http://localhost:8888"].filter(Boolean),
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../web')));

// ============================================
// GAME STATE
// ============================================

const rooms = new Map();
const players = new Map();

// Generate room code
function generateRoomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Create new room
function createRoom(hostId, settings) {
    const code = generateRoomCode();
    const room = {
        code,
        name: settings.name || `Room ${code}`,
        mode: settings.mode || 'casual',
        maxPlayers: settings.maxPlayers || 4,
        host: hostId,
        players: [hostId],
        status: 'waiting',
        gameState: null,
        createdAt: Date.now()
    };
    rooms.set(code, room);
    return room;
}

// Get public rooms for lobby
function getPublicRooms() {
    return Array.from(rooms.values())
        .filter(r => r.status === 'waiting')
        .map(r => ({
            code: r.code,
            name: r.name,
            mode: r.mode,
            players: r.players.length,
            maxPlayers: r.maxPlayers,
            status: r.status,
            host: players.get(r.host)?.name || 'Unknown'
        }));
}

// Get lobby stats
function getLobbyStats() {
    return {
        onlinePlayers: players.size,
        activeGames: Array.from(rooms.values()).filter(r => r.status === 'playing').length,
        gamesToday: Math.floor(Math.random() * 200) + 100 // Placeholder
    };
}

// ============================================
// SOCKET.IO HANDLERS
// ============================================

io.on('connection', (socket) => {
    console.log(`🔌 Player connected: ${socket.id}`);
    
    // Store player info
    players.set(socket.id, {
        id: socket.id,
        name: `Player ${Math.floor(Math.random() * 1000)}`,
        room: null
    });

    // ========================================
    // LOBBY EVENTS
    // ========================================

    // Join lobby
    socket.on('lobby:join', () => {
        socket.join('lobby');
        socket.emit('lobby:rooms', getPublicRooms());
        socket.emit('lobby:stats', getLobbyStats());
    });

    // Create room
    socket.on('room:create', (settings) => {
        const room = createRoom(socket.id, settings);
        players.get(socket.id).room = room.code;
        
        socket.leave('lobby');
        socket.join(room.code);
        
        socket.emit('room:created', { code: room.code, name: room.name });
        io.to('lobby').emit('lobby:rooms', getPublicRooms());
        
        console.log(`🏠 Room created: ${room.code} by ${socket.id}`);
    });

    // Join room
    socket.on('room:join', (code) => {
        const room = rooms.get(code);
        if (!room) {
            socket.emit('error', { message: 'Room not found' });
            return;
        }
        
        if (room.players.length >= room.maxPlayers) {
            socket.emit('error', { message: 'Room is full' });
            return;
        }
        
        if (room.status === 'playing') {
            socket.emit('error', { message: 'Game already in progress' });
            return;
        }
        
        room.players.push(socket.id);
        players.get(socket.id).room = code;
        
        socket.leave('lobby');
        socket.join(code);
        
        // Notify other players
        socket.to(code).emit('room:playerJoined', {
            id: socket.id,
            name: players.get(socket.id).name
        });
        
        socket.emit('room:joined', {
            code: room.code,
            name: room.name,
            players: room.players.map(id => ({
                id,
                name: players.get(id)?.name || 'Unknown'
            }))
        });
        
        io.to('lobby').emit('lobby:rooms', getPublicRooms());
        console.log(`👤 ${socket.id} joined room ${code}`);
    });

    // ========================================
    // GAME EVENTS
    // ========================================

    // Join game
    socket.on('game:join', ({ roomCode }) => {
        const room = rooms.get(roomCode);
        if (!room) {
            socket.emit('error', { message: 'Room not found' });
            return;
        }
        
        // Initialize game state if not exists
        if (!room.gameState) {
            room.gameState = {
                players: room.players.map((id, index) => ({
                    id,
                    name: players.get(id)?.name || `Player ${index + 1}`,
                    money: 1500,
                    position: 0,
                    properties: [],
                    inJail: false,
                    jailCards: 0,
                    color: index
                })),
                currentPlayer: 0,
                round: 1,
                properties: {},
                freeParking: 0
            };
        }
        
        socket.emit('game:state', room.gameState);
    });

    // Roll dice
    socket.on('game:roll', () => {
        const player = players.get(socket.id);
        if (!player?.room) return;
        
        const room = rooms.get(player.room);
        if (!room?.gameState) return;
        
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        
        io.to(player.room).emit('game:diceRolled', {
            playerId: socket.id,
            dice: [dice1, dice2],
            total: dice1 + dice2
        });
    });

    // Move player
    socket.on('game:move', ({ position }) => {
        const player = players.get(socket.id);
        if (!player?.room) return;
        
        const room = rooms.get(player.room);
        if (!room?.gameState) return;
        
        const playerIndex = room.gameState.players.findIndex(p => p.id === socket.id);
        if (playerIndex === -1) return;
        
        room.gameState.players[playerIndex].position = position;
        
        io.to(player.room).emit('game:playerMoved', {
            playerIndex,
            position
        });
    });

    // Buy property
    socket.on('game:buy', ({ position, price }) => {
        const player = players.get(socket.id);
        if (!player?.room) return;
        
        const room = rooms.get(player.room);
        if (!room?.gameState) return;
        
        const playerIndex = room.gameState.players.findIndex(p => p.id === socket.id);
        if (playerIndex === -1) return;
        
        room.gameState.properties[position] = playerIndex;
        room.gameState.players[playerIndex].money -= price;
        room.gameState.players[playerIndex].properties.push(position);
        
        io.to(player.room).emit('game:propertyBought', {
            playerIndex,
            position,
            price
        });
    });

    // End turn
    socket.on('game:endTurn', () => {
        const player = players.get(socket.id);
        if (!player?.room) return;
        
        const room = rooms.get(player.room);
        if (!room?.gameState) return;
        
        room.gameState.currentPlayer = (room.gameState.currentPlayer + 1) % room.gameState.players.length;
        
        if (room.gameState.currentPlayer === 0) {
            room.gameState.round++;
        }
        
        io.to(player.room).emit('game:turnEnded', {
            nextPlayer: room.gameState.currentPlayer,
            round: room.gameState.round
        });
    });

    // Chat message
    socket.on('chat:message', ({ message }) => {
        const player = players.get(socket.id);
        if (!player?.room) return;
        
        io.to(player.room).emit('chat:message', {
            player: player.name,
            message,
            timestamp: Date.now()
        });
    });

    // ========================================
    // DISCONNECT
    // ========================================

    socket.on('disconnect', () => {
        console.log(`🔌 Player disconnected: ${socket.id}`);
        
        const player = players.get(socket.id);
        if (player?.room) {
            const room = rooms.get(player.room);
            if (room) {
                room.players = room.players.filter(id => id !== socket.id);
                
                if (room.players.length === 0) {
                    rooms.delete(player.room);
                    console.log(`🗑️ Room deleted: ${player.room}`);
                } else {
                    socket.to(player.room).emit('room:playerLeft', { id: socket.id });
                }
                
                io.to('lobby').emit('lobby:rooms', getPublicRooms());
            }
        }
        
        players.delete(socket.id);
    });
});

// ============================================
// HTTP ROUTES
// ============================================

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        players: players.size, 
        rooms: rooms.size,
        version: '1.0.0'
    });
});

app.get('/api/rooms', (req, res) => {
    res.json(getPublicRooms());
});

app.get('/api/stats', (req, res) => {
    res.json(getLobbyStats());
});

// Serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../web/index.html'));
});

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   🌍 GLOBE TYCOON SERVER                                 ║
║   Created by Mohammad Suhail Khan                        ║
║   GitHub: https://github.com/mohammadsuhailkhan         ║
║                                                          ║
║   Server running on port ${PORT}                            ║
║   Environment: ${process.env.NODE_ENV || 'development'}                           ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
    `);
});

// Periodic cleanup of empty rooms
setInterval(() => {
    const now = Date.now();
    for (const [code, room] of rooms) {
        if (room.players.length === 0 || (now - room.createdAt > 24 * 60 * 60 * 1000)) {
            rooms.delete(code);
            console.log(`🧹 Cleaned up room: ${code}`);
        }
    }
}, 60 * 60 * 1000); // Every hour
