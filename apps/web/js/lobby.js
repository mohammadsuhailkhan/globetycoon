// GlobeTycoon - Lobby JavaScript
// Created by Mohammad Suhail Khan
// GitHub: https://github.com/mohammadsuhailkhan

class GlobeTycoonLobby {
    constructor() {
        this.socket = null;
        this.rooms = [];
        this.playerStats = {
            gamesPlayed: 0,
            gamesWon: 0,
            totalEarnings: 0,
            propertiesOwned: 0
        };
        this.init();
    }

    init() {
        this.initTypingAnimation();
        this.initScrollAnimations();
        this.connectToServer();
        this.initEventListeners();
        this.animateStats();
    }

    // Connect to WebSocket server
    connectToServer() {
        // Backend URL - Change this to your Render URL after deployment
        const serverUrl = window.location.hostname === 'localhost' 
            ? 'http://localhost:3001'
            : 'https://globetycoon-api.onrender.com';
        
        this.socket = io(serverUrl, {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 5
        });

        this.socket.on('connect', () => {
            console.log('🌐 Connected to GlobeTycoon server');
            this.socket.emit('lobby:join');
        });

        this.socket.on('disconnect', () => {
            console.log('🔌 Disconnected from server');
        });

        this.socket.on('lobby:rooms', (rooms) => {
            this.rooms = rooms;
            this.renderRooms();
        });

        this.socket.on('lobby:stats', (stats) => {
            this.updateLiveStats(stats);
        });

        this.socket.on('room:created', (room) => {
            window.location.href = `game.html?room=${room.code}`;
        });

        this.socket.on('error', (error) => {
            this.showNotification(error.message, 'error');
        });
    }

    // Initialize typing animation
    initTypingAnimation() {
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle && typeof Typed !== 'undefined') {
            new Typed('#hero-title', {
                strings: [
                    'Own The World',
                    'Build Your Empire',
                    'Conquer Cities',
                    'GlobeTycoon'
                ],
                typeSpeed: 100,
                backSpeed: 60,
                backDelay: 2500,
                startDelay: 500,
                loop: true,
                showCursor: true,
                cursorChar: '_'
            });
        }
    }

    // Initialize scroll animations
    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.room-card, .stats-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Animate stats counters
    animateStats() {
        this.animateCounter('active-players', 0, 1247, 2000);
        this.animateCounter('active-games', 0, 42, 1500);
        this.animateCounter('games-today', 0, 156, 1800);
    }

    animateCounter(elementId, start, end, duration) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
            
            const current = Math.floor(start + (end - start) * easeProgress);
            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    // Update live stats from server
    updateLiveStats(stats) {
        document.getElementById('active-players').textContent = stats.onlinePlayers.toLocaleString();
        document.getElementById('active-games').textContent = stats.activeGames.toLocaleString();
        document.getElementById('games-today').textContent = stats.gamesToday.toLocaleString();
    }

    // Render room cards
    renderRooms(filter = 'all') {
        const grid = document.getElementById('rooms-grid');
        if (!grid) return;

        const filtered = filter === 'all' 
            ? this.rooms 
            : this.rooms.filter(r => r.mode === filter);

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <div class="text-4xl mb-4">🏠</div>
                    <div class="text-cream/60">No rooms available. Create one!</div>
                </div>
            `;
            return;
        }

        grid.innerHTML = filtered.map(room => `
            <div class="room-card p-5 rounded-xl cursor-pointer" onclick="joinRoom('${room.code}')">
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-lg font-bold text-gold">${room.name}</h3>
                    <span class="px-2 py-1 rounded text-xs font-semibold ${
                        room.status === 'waiting' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                    }">
                        ${room.status === 'waiting' ? 'Waiting' : 'In Game'}
                    </span>
                </div>
                
                <div class="space-y-2 text-sm mb-4">
                    <div class="flex justify-between">
                        <span class="text-cream/50">Mode:</span>
                        <span class="text-cream capitalize">${room.mode}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-cream/50">Players:</span>
                        <span class="text-cream">${room.players}/${room.maxPlayers}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-cream/50">Host:</span>
                        <span class="text-cream">${room.host}</span>
                    </div>
                </div>
                
                <div class="w-full bg-white/10 rounded-full h-1.5 mb-3">
                    <div class="bg-gold h-1.5 rounded-full transition-all" 
                         style="width: ${(room.players / room.maxPlayers) * 100}%"></div>
                </div>
                
                <button class="w-full ${room.status === 'waiting' && room.players < room.maxPlayers 
                    ? 'luxury-button' 
                    : 'bg-white/10 text-cream/50 cursor-not-allowed'} py-2 rounded-lg text-sm font-semibold"
                        ${room.status !== 'waiting' || room.players >= room.maxPlayers ? 'disabled' : ''}>
                    ${room.status === 'waiting' && room.players < room.maxPlayers ? 'Join Game' : 'Full'}
                </button>
            </div>
        `).join('');

        // Animate cards
        if (typeof anime !== 'undefined') {
            anime({
                targets: '.room-card',
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(50),
                duration: 400,
                easing: 'easeOutQuad'
            });
        }
    }

    // Initialize event listeners
    initEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.remove('luxury-button', 'active');
                    b.classList.add('luxury-button-outline');
                });
                e.target.classList.remove('luxury-button-outline');
                e.target.classList.add('luxury-button', 'active');
                this.renderRooms(e.target.dataset.filter);
            });
        });

        // Search
        const searchInput = document.getElementById('room-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchRooms(e.target.value);
            });
        }

        // Modal close on outside click
        document.addEventListener('click', (e) => {
            const modal = document.getElementById('create-room-modal');
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    // Search rooms
    searchRooms(query) {
        if (!query.trim()) {
            this.renderRooms();
            return;
        }

        const filtered = this.rooms.filter(room => 
            room.name.toLowerCase().includes(query.toLowerCase()) ||
            room.host.toLowerCase().includes(query.toLowerCase())
        );

        const grid = document.getElementById('rooms-grid');
        grid.innerHTML = filtered.map(room => `
            <div class="room-card p-5 rounded-xl cursor-pointer" onclick="joinRoom('${room.code}')">
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-lg font-bold text-gold">${room.name}</h3>
                    <span class="px-2 py-1 rounded text-xs font-semibold ${
                        room.status === 'waiting' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                    }">
                        ${room.status === 'waiting' ? 'Waiting' : 'In Game'}
                    </span>
                </div>
                
                <div class="space-y-2 text-sm mb-4">
                    <div class="flex justify-between">
                        <span class="text-cream/50">Mode:</span>
                        <span class="text-cream capitalize">${room.mode}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-cream/50">Players:</span>
                        <span class="text-cream">${room.players}/${room.maxPlayers}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-cream/50">Host:</span>
                        <span class="text-cream">${room.host}</span>
                    </div>
                </div>
                
                <div class="w-full bg-white/10 rounded-full h-1.5 mb-3">
                    <div class="bg-gold h-1.5 rounded-full transition-all" 
                         style="width: ${(room.players / room.maxPlayers) * 100}%"></div>
                </div>
                
                <button class="w-full ${room.status === 'waiting' && room.players < room.maxPlayers 
                    ? 'luxury-button' 
                    : 'bg-white/10 text-cream/50 cursor-not-allowed'} py-2 rounded-lg text-sm font-semibold"
                        ${room.status !== 'waiting' || room.players >= room.maxPlayers ? 'disabled' : ''}>
                    ${room.status === 'waiting' && room.players < room.maxPlayers ? 'Join Game' : 'Full'}
                </button>
            </div>
        `).join('');
    }

    // Create private room
    createPrivateRoom() {
        const modal = document.getElementById('create-room-modal');
        modal.classList.remove('hidden');
        
        if (typeof anime !== 'undefined') {
            anime({
                targets: '.modal-content',
                scale: [0.9, 1],
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutBack'
            });
        }
    }

    // Close modal
    closeModal() {
        const modal = document.getElementById('create-room-modal');
        
        if (typeof anime !== 'undefined') {
            anime({
                targets: '.modal-content',
                scale: [1, 0.9],
                opacity: [1, 0],
                duration: 200,
                easing: 'easeInQuad',
                complete: () => modal.classList.add('hidden')
            });
        } else {
            modal.classList.add('hidden');
        }
    }

    // Create room
    createRoom() {
        const name = document.getElementById('room-name').value.trim();
        const mode = document.getElementById('game-mode').value;
        const maxPlayers = parseInt(document.getElementById('max-players').value);

        if (!name) {
            this.showNotification('Please enter a room name', 'error');
            return;
        }

        this.socket.emit('room:create', { name, mode, maxPlayers });
        this.closeModal();
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-24 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl max-w-sm transform translate-x-full ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 
            'bg-blue-500'
        } text-white`;
        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="text-xl">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        if (typeof anime !== 'undefined') {
            anime({
                targets: notification,
                translateX: ['100%', '0'],
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
        
        setTimeout(() => {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: notification,
                    translateX: '100%',
                    opacity: 0,
                    duration: 300,
                    easing: 'easeInQuad',
                    complete: () => notification.remove()
                });
            } else {
                notification.remove();
            }
        }, 4000);
    }

    // Scroll to rooms
    scrollToRooms() {
        document.getElementById('rooms').scrollIntoView({ behavior: 'smooth' });
    }
}

// Global functions
function createPrivateRoom() {
    lobby.createPrivateRoom();
}

function closeModal() {
    lobby.closeModal();
}

function createRoom() {
    lobby.createRoom();
}

function scrollToRooms() {
    lobby.scrollToRooms();
}

function joinRoom(roomCode) {
    window.location.href = `game.html?room=${roomCode}`;
}

// Initialize
let lobby;
document.addEventListener('DOMContentLoaded', () => {
    lobby = new GlobeTycoonLobby();
});

// Demo rooms for when server is not connected
const demoRooms = [
    { code: 'ABC123', name: 'Mumbai Masters', mode: 'casual', players: 2, maxPlayers: 4, status: 'waiting', host: 'PlayerOne' },
    { code: 'DEF456', name: 'Tokyo Tycoons', mode: 'ranked', players: 3, maxPlayers: 4, status: 'waiting', host: 'SamuraiX' },
    { code: 'GHI789', name: 'Fast Paris', mode: 'fast', players: 1, maxPlayers: 4, status: 'waiting', host: 'FrenchFry' },
    { code: 'JKL012', name: 'NYC Night', mode: 'casual', players: 4, maxPlayers: 4, status: 'playing', host: 'BigApple' },
    { code: 'MNO345', name: 'London Calling', mode: 'ranked', players: 2, maxPlayers: 6, status: 'waiting', host: 'TeaTime' },
    { code: 'PQR678', name: 'Sydney Squad', mode: 'casual', players: 1, maxPlayers: 4, status: 'waiting', host: 'AussieBob' }
];
