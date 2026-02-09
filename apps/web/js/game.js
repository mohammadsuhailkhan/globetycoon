// GlobeTycoon - Game JavaScript
// Created by Mohammad Suhail Khan
// GitHub: https://github.com/mohammadsuhailkhan

// ============================================
// REAL WORLD BOARD DATA - 40 CITIES
// ============================================

const BOARD_DATA = [
    // CORNER: GO
    { position: 0, type: 'corner', name: 'GO', icon: '🚀', action: 'collect', amount: 200 },
    
    // INDIA GROUP (Brown) - 2 properties
    { position: 1, type: 'property', name: 'Mumbai', country: 'India', flag: '🇮🇳', price: 60, rent: 2, group: 'india', groupSize: 2, houseCost: 50 },
    { position: 2, type: 'chest', name: 'Community Chest', icon: '📦' },
    { position: 3, type: 'property', name: 'Delhi', country: 'India', flag: '🇮🇳', price: 60, rent: 4, group: 'india', groupSize: 2, houseCost: 50 },
    
    // TAX
    { position: 4, type: 'tax', name: 'Income Tax', amount: 200 },
    
    // RAIL 1
    { position: 5, type: 'rail', name: 'Trans-Siberian', country: 'Russia', flag: '🇷🇺', price: 200, rent: 25 },
    
    // EGYPT GROUP (Light Blue) - 3 properties
    { position: 6, type: 'property', name: 'Cairo', country: 'Egypt', flag: '🇪🇬', price: 100, rent: 6, group: 'egypt', groupSize: 3, houseCost: 50 },
    { position: 7, type: 'chance', name: 'Chance', icon: '❓' },
    { position: 8, type: 'property', name: 'Alexandria', country: 'Egypt', flag: '🇪🇬', price: 100, rent: 6, group: 'egypt', groupSize: 3, houseCost: 50 },
    { position: 9, type: 'property', name: 'Luxor', country: 'Egypt', flag: '🇪🇬', price: 120, rent: 8, group: 'egypt', groupSize: 3, houseCost: 50 },
    
    // CORNER: JAIL
    { position: 10, type: 'corner', name: 'Jail', icon: '🚓', subtext: 'Just Visiting' },
    
    // TURKEY GROUP (Pink) - 3 properties
    { position: 11, type: 'property', name: 'Istanbul', country: 'Turkey', flag: '🇹🇷', price: 140, rent: 10, group: 'turkey', groupSize: 3, houseCost: 100 },
    { position: 12, type: 'utility', name: 'Solar Grid', icon: '☀️', price: 150, multiplier: 4 },
    { position: 13, type: 'property', name: 'Ankara', country: 'Turkey', flag: '🇹🇷', price: 140, rent: 10, group: 'turkey', groupSize: 3, houseCost: 100 },
    { position: 14, type: 'property', name: 'Antalya', country: 'Turkey', flag: '🇹🇷', price: 160, rent: 12, group: 'turkey', groupSize: 3, houseCost: 100 },
    
    // RAIL 2
    { position: 15, type: 'rail', name: 'EuroStar', country: 'Europe', flag: '🇪🇺', price: 200, rent: 25 },
    
    // GREECE GROUP (Orange) - 3 properties
    { position: 16, type: 'property', name: 'Athens', country: 'Greece', flag: '🇬🇷', price: 180, rent: 14, group: 'greece', groupSize: 3, houseCost: 100 },
    { position: 17, type: 'chest', name: 'Community Chest', icon: '📦' },
    { position: 18, type: 'property', name: 'Santorini', country: 'Greece', flag: '🇬🇷', price: 180, rent: 14, group: 'greece', groupSize: 3, houseCost: 100 },
    { position: 19, type: 'property', name: 'Thessaloniki', country: 'Greece', flag: '🇬🇷', price: 200, rent: 16, group: 'greece', groupSize: 3, houseCost: 100 },
    
    // CORNER: FREE PARKING
    { position: 20, type: 'corner', name: 'Free Parking', icon: '💰', subtext: 'Collect All' },
    
    // ITALY GROUP (Red) - 3 properties
    { position: 21, type: 'property', name: 'Rome', country: 'Italy', flag: '🇮🇹', price: 220, rent: 18, group: 'italy', groupSize: 3, houseCost: 150 },
    { position: 22, type: 'chance', name: 'Chance', icon: '❓' },
    { position: 23, type: 'property', name: 'Milan', country: 'Italy', flag: '🇮🇹', price: 220, rent: 18, group: 'italy', groupSize: 3, houseCost: 150 },
    { position: 24, type: 'property', name: 'Venice', country: 'Italy', flag: '🇮🇹', price: 240, rent: 20, group: 'italy', groupSize: 3, houseCost: 150 },
    
    // RAIL 3
    { position: 25, type: 'rail', name: 'Amtrak', country: 'USA', flag: '🇺🇸', price: 200, rent: 25 },
    
    // FRANCE GROUP (Yellow) - 3 properties
    { position: 26, type: 'property', name: 'Paris', country: 'France', flag: '🇫🇷', price: 260, rent: 22, group: 'france', groupSize: 3, houseCost: 150 },
    { position: 27, type: 'property', name: 'Nice', country: 'France', flag: '🇫🇷', price: 260, rent: 22, group: 'france', groupSize: 3, houseCost: 150 },
    { position: 28, type: 'utility', name: 'Wind Farm', icon: '💨', price: 150, multiplier: 4 },
    { position: 29, type: 'property', name: 'Lyon', country: 'France', flag: '🇫🇷', price: 280, rent: 24, group: 'france', groupSize: 3, houseCost: 150 },
    
    // CORNER: GO TO JAIL
    { position: 30, type: 'corner', name: 'Go To Jail', icon: '👮', action: 'jail' },
    
    // GERMANY GROUP (Green) - 3 properties
    { position: 31, type: 'property', name: 'Berlin', country: 'Germany', flag: '🇩🇪', price: 300, rent: 26, group: 'germany', groupSize: 3, houseCost: 200 },
    { position: 32, type: 'property', name: 'Munich', country: 'Germany', flag: '🇩🇪', price: 300, rent: 26, group: 'germany', groupSize: 3, houseCost: 200 },
    { position: 33, type: 'chest', name: 'Community Chest', icon: '📦' },
    { position: 34, type: 'property', name: 'Hamburg', country: 'Germany', flag: '🇩🇪', price: 320, rent: 28, group: 'germany', groupSize: 3, houseCost: 200 },
    
    // RAIL 4
    { position: 35, type: 'rail', name: 'Shinkansen', country: 'Japan', flag: '🇯🇵', price: 200, rent: 25 },
    
    // CHANCE
    { position: 36, type: 'chance', name: 'Chance', icon: '❓' },
    
    // UK GROUP (Dark Blue) - 2 properties
    { position: 37, type: 'property', name: 'London', country: 'UK', flag: '🇬🇧', price: 350, rent: 35, group: 'uk', groupSize: 2, houseCost: 200 },
    { position: 38, type: 'tax', name: 'Luxury Tax', amount: 100 },
    { position: 39, type: 'property', name: 'Edinburgh', country: 'UK', flag: '🇬🇧', price: 400, rent: 50, group: 'uk', groupSize: 2, houseCost: 200 }
];

// Chance cards
const CHANCE_CARDS = [
    { text: 'Advance to GO', action: 'move', position: 0 },
    { text: 'Go to Jail', action: 'jail' },
    { text: 'Bank pays you dividend of $50', action: 'money', amount: 50 },
    { text: 'Pay poor tax of $15', action: 'money', amount: -15 },
    { text: 'Advance to Paris', action: 'move', position: 26 },
    { text: 'Advance to London', action: 'move', position: 39 },
    { text: 'Go back 3 spaces', action: 'move', offset: -3 },
    { text: 'Your building loan matures, collect $150', action: 'money', amount: 150 },
    { text: 'Speeding fine $15', action: 'money', amount: -15 },
    { text: 'Advance to nearest rail', action: 'nearest', type: 'rail' },
    { text: 'Advance to nearest utility', action: 'nearest', type: 'utility' },
    { text: 'Get Out of Jail Free', action: 'jailcard' },
    { text: 'Street repairs, pay $40 per house', action: 'repairs', perHouse: 40 },
    { text: 'General repairs, pay $25 per house', action: 'repairs', perHouse: 25 },
    { text: 'You have been elected chairman, pay each player $50', action: 'payall', amount: 50 },
    { text: 'Advance to Cairo', action: 'move', position: 6 }
];

// Community Chest cards
const CHEST_CARDS = [
    { text: 'Advance to GO', action: 'move', position: 0 },
    { text: 'Bank error in your favor, collect $200', action: 'money', amount: 200 },
    { text: 'Doctor\'s fee, pay $50', action: 'money', amount: -50 },
    { text: 'From sale of stock you get $50', action: 'money', amount: 50 },
    { text: 'Get Out of Jail Free', action: 'jailcard' },
    { text: 'Go to Jail', action: 'jail' },
    { text: 'Holiday fund matures, receive $100', action: 'money', amount: 100 },
    { text: 'Income tax refund, collect $20', action: 'money', amount: 20 },
    { text: 'It is your birthday, collect $10 from each player', action: 'collectall', amount: 10 },
    { text: 'Life insurance matures, collect $100', action: 'money', amount: 100 },
    { text: 'Pay hospital fees of $100', action: 'money', amount: -100 },
    { text: 'Pay school fees of $50', action: 'money', amount: -50 },
    { text: 'Receive $25 consultancy fee', action: 'money', amount: 25 },
    { text: 'You are assessed for street repairs, $40 per house', action: 'repairs', perHouse: 40 },
    { text: 'You have won second prize in a beauty contest, collect $10', action: 'money', amount: 10 },
    { text: 'You inherit $100', action: 'money', amount: 100 }
];

// ============================================
// GAME CLASS
// ============================================

class GlobeTycoonGame {
    constructor() {
        this.socket = null;
        this.roomCode = new URLSearchParams(window.location.search).get('room') || 'LOCAL';
        this.playerId = null;
        this.gameState = null;
        this.myPlayerIndex = 0;
        this.turnTimer = null;
        this.turnTimeLeft = 60;
        
        // Local game state (for offline/demo mode)
        this.localState = {
            players: [
                { id: 1, name: 'You', money: 1500, position: 0, properties: [], inJail: false, jailCards: 0, color: 'token-1' },
                { id: 2, name: 'Player 2', money: 1500, position: 0, properties: [], inJail: false, jailCards: 0, color: 'token-2' },
                { id: 3, name: 'Player 3', money: 1500, position: 0, properties: [], inJail: false, jailCards: 0, color: 'token-3' },
                { id: 4, name: 'Player 4', money: 1500, position: 0, properties: [], inJail: false, jailCards: 0, color: 'token-4' }
            ],
            currentPlayer: 0,
            round: 1,
            properties: {},
            freeParking: 0,
            gameLog: []
        };
        
        this.init();
    }

    init() {
        this.renderBoard();
        this.connectToServer();
        this.initEventListeners();
        this.updateUI();
        this.startTurnTimer();
    }

    // Connect to WebSocket server
    connectToServer() {
        // Backend URL - Change this to your Render URL after deployment
        const serverUrl = window.location.hostname === 'localhost' 
            ? 'http://localhost:3001'
            : 'https://globetycoon-api.onrender.com';
        
        this.socket = io(serverUrl, {
            transports: ['websocket', 'polling'],
            reconnection: true
        });

        this.socket.on('connect', () => {
            console.log('🌐 Connected to game server');
            this.socket.emit('game:join', { roomCode: this.roomCode });
        });

        this.socket.on('game:state', (state) => {
            this.gameState = state;
            this.updateUI();
        });

        this.socket.on('game:update', (update) => {
            this.handleGameUpdate(update);
        });

        this.socket.on('chat:message', (data) => {
            this.addChatMessage(data.player, data.message);
        });

        // Demo mode - simulate connection
        setTimeout(() => {
            if (!this.gameState) {
                console.log('🎮 Running in demo mode');
                this.gameState = this.localState;
                this.updateUI();
                this.addLog('🎮 Welcome to GlobeTycoon! Demo mode active.');
            }
        }, 2000);
    }

    // Render the game board
    renderBoard() {
        const board = document.getElementById('game-board');
        if (!board) return;

        // Clear existing content
        board.innerHTML = '';

        // Calculate board dimensions
        const boardSize = board.offsetWidth || 800;
        const cornerSize = boardSize * 0.14;
        const propertyWidth = boardSize * 0.07;
        const propertyHeight = boardSize * 0.14;

        BOARD_DATA.forEach(space => {
            const el = document.createElement('div');
            el.className = 'board-space';
            el.dataset.position = space.position;

            // Position calculation
            let left, top, width, height;
            
            if (space.position === 0) { // GO - bottom left
                left = 0; top = boardSize - cornerSize;
                width = cornerSize; height = cornerSize;
                el.classList.add('corner-space');
            } else if (space.position === 10) { // JAIL - bottom right
                left = boardSize - cornerSize; top = boardSize - cornerSize;
                width = cornerSize; height = cornerSize;
                el.classList.add('corner-space');
            } else if (space.position === 20) { // FREE PARKING - top right
                left = boardSize - cornerSize; top = 0;
                width = cornerSize; height = cornerSize;
                el.classList.add('corner-space');
            } else if (space.position === 30) { // GO TO JAIL - top left
                left = 0; top = 0;
                width = cornerSize; height = cornerSize;
                el.classList.add('corner-space');
            } else if (space.position < 10) { // Bottom row
                left = cornerSize + (space.position - 1) * propertyWidth;
                top = boardSize - propertyHeight;
                width = propertyWidth; height = propertyHeight;
            } else if (space.position < 20) { // Right column
                left = boardSize - propertyHeight;
                top = boardSize - cornerSize - (space.position - 10) * propertyWidth;
                width = propertyHeight; height = propertyWidth;
                el.classList.add('vertical');
            } else if (space.position < 30) { // Top row
                left = boardSize - cornerSize - (space.position - 20) * propertyWidth;
                top = 0;
                width = propertyWidth; height = propertyHeight;
            } else { // Left column
                left = 0;
                top = cornerSize + (space.position - 30) * propertyWidth;
                width = propertyHeight; height = propertyWidth;
                el.classList.add('vertical');
            }

            el.style.left = `${left}px`;
            el.style.top = `${top}px`;
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;

            // Content based on type
            if (space.type === 'property') {
                el.classList.add(`group-${space.group}`);
                el.innerHTML = `
                    <div class="text-xs font-bold leading-tight">${space.name}</div>
                    <div class="text-lg">${space.flag}</div>
                    <div class="price">$${space.price}</div>
                    <div class="houses-indicator" id="houses-${space.position}"></div>
                    <div class="property-owned-indicator hidden" id="owner-${space.position}"></div>
                `;
            } else if (space.type === 'rail') {
                el.classList.add('group-rail');
                el.innerHTML = `
                    <div class="text-lg">🚂</div>
                    <div class="text-xs font-bold">${space.name}</div>
                    <div class="price">$${space.price}</div>
                `;
            } else if (space.type === 'utility') {
                el.classList.add('group-utility');
                el.innerHTML = `
                    <div class="text-lg">${space.icon}</div>
                    <div class="text-xs font-bold">${space.name}</div>
                    <div class="price">$${space.price}</div>
                `;
            } else if (space.type === 'corner') {
                el.innerHTML = `
                    <div class="text-2xl">${space.icon}</div>
                    <div class="text-xs font-bold">${space.name}</div>
                    ${space.subtext ? `<div class="text-xs opacity-70">${space.subtext}</div>` : ''}
                `;
            } else if (space.type === 'chest' || space.type === 'chance') {
                el.classList.add('group-special');
                el.innerHTML = `
                    <div class="text-lg">${space.icon}</div>
                    <div class="text-xs font-bold">${space.name}</div>
                `;
            } else if (space.type === 'tax') {
                el.classList.add('group-special');
                el.innerHTML = `
                    <div class="text-lg">💸</div>
                    <div class="text-xs font-bold">${space.name}</div>
                    <div class="text-xs">$${space.amount}</div>
                `;
            }

            el.onclick = () => this.onSpaceClick(space);
            board.appendChild(el);
        });

        // Add player tokens
        for (let i = 0; i < 4; i++) {
            const token = document.createElement('div');
            token.className = `player-token token-${i + 1}`;
            token.id = `token-${i}`;
            token.style.left = '10px';
            token.style.top = `${boardSize - 34}px`;
            board.appendChild(token);
        }
    }

    // Handle space click
    onSpaceClick(space) {
        if (space.type === 'property') {
            this.showPropertyInfo(space);
        }
    }

    // Show property info
    showPropertyInfo(space) {
        const owner = this.gameState?.properties[space.position];
        const ownerName = owner !== undefined ? this.gameState.players[owner]?.name : 'Unowned';
        
        alert(`${space.flag} ${space.name}, ${space.country}\n\nPrice: $${space.price}\nBase Rent: $${space.rent}\nOwner: ${ownerName}`);
    }

    // Roll dice
    rollDice() {
        if (!this.gameState) return;
        
        const currentPlayer = this.gameState.players[this.gameState.currentPlayer];
        if (currentPlayer.id !== 1) { // Not your turn
            this.addLog('❌ Not your turn!');
            return;
        }

        const diceEl = document.getElementById('dice');
        const btn = document.getElementById('btn-roll');
        
        diceEl.classList.add('rolling');
        btn.disabled = true;

        // Animate
        let rolls = 0;
        const interval = setInterval(() => {
            diceEl.textContent = Math.floor(Math.random() * 6) + 1;
            rolls++;
            
            if (rolls >= 10) {
                clearInterval(interval);
                
                const die1 = Math.floor(Math.random() * 6) + 1;
                const die2 = Math.floor(Math.random() * 6) + 1;
                const total = die1 + die2;
                
                diceEl.textContent = total;
                diceEl.classList.remove('rolling');
                
                this.movePlayer(total);
            }
        }, 80);
    }

    // Move player
    movePlayer(steps) {
        const player = this.gameState.players[this.gameState.currentPlayer];
        const oldPos = player.position;
        player.position = (player.position + steps) % 40;
        
        // Passed GO
        if (player.position < oldPos) {
            player.money += 200;
            this.addLog(`🎉 ${player.name} passed GO and collected $200!`);
        }
        
        // Update token position
        this.updateTokenPosition(this.gameState.currentPlayer, player.position);
        
        // Handle landing
        this.handleLanding(player);
        
        // Enable end turn
        document.getElementById('btn-end').disabled = false;
        
        this.updateUI();
    }

    // Update token position visually
    updateTokenPosition(playerIndex, position) {
        const token = document.getElementById(`token-${playerIndex}`);
        if (!token) return;

        const board = document.getElementById('game-board');
        const boardSize = board.offsetWidth || 800;
        const cornerSize = boardSize * 0.14;
        const propertyWidth = boardSize * 0.07;

        let x, y;
        const offset = playerIndex * 8;

        if (position === 0) {
            x = offset; y = boardSize - cornerSize + offset;
        } else if (position === 10) {
            x = boardSize - cornerSize + offset; y = boardSize - cornerSize + offset;
        } else if (position === 20) {
            x = boardSize - cornerSize + offset; y = offset;
        } else if (position === 30) {
            x = offset; y = cornerSize + offset;
        } else if (position < 10) {
            x = cornerSize + (position - 1) * propertyWidth + offset;
            y = boardSize - propertyWidth * 2 + offset;
        } else if (position < 20) {
            x = boardSize - propertyWidth * 2 + offset;
            y = boardSize - cornerSize - (position - 10) * propertyWidth + offset;
        } else if (position < 30) {
            x = boardSize - cornerSize - (position - 20) * propertyWidth + offset;
            y = propertyWidth + offset;
        } else {
            x = propertyWidth + offset;
            y = cornerSize + (position - 30) * propertyWidth + offset;
        }

        token.style.left = `${x}px`;
        token.style.top = `${y}px`;

        // Animate
        if (typeof anime !== 'undefined') {
            anime({
                targets: token,
                scale: [1, 1.3, 1],
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    }

    // Handle landing on space
    handleLanding(player) {
        const space = BOARD_DATA[player.position];
        
        switch (space.type) {
            case 'property':
            case 'rail':
            case 'utility':
                const owner = this.gameState.properties[player.position];
                if (owner === undefined) {
                    // Unowned - can buy
                    document.getElementById('btn-buy').disabled = player.money < space.price;
                    document.getElementById('btn-auction').disabled = false;
                    this.addLog(`🏙️ ${player.name} landed on ${space.name}, ${space.country}`);
                } else if (owner !== this.gameState.currentPlayer) {
                    // Pay rent
                    const rent = this.calculateRent(space, owner);
                    player.money -= rent;
                    this.gameState.players[owner].money += rent;
                    this.addLog(`💸 ${player.name} paid $${rent} rent to ${this.gameState.players[owner].name}`);
                }
                break;
                
            case 'tax':
                player.money -= space.amount;
                this.gameState.freeParking += space.amount;
                this.addLog(`💸 ${player.name} paid $${space.amount} in ${space.name}`);
                break;
                
            case 'chest':
                this.drawChestCard(player);
                break;
                
            case 'chance':
                this.drawChanceCard(player);
                break;
                
            case 'corner':
                if (space.action === 'jail') {
                    player.inJail = true;
                    player.position = 10;
                    this.updateTokenPosition(this.gameState.currentPlayer, 10);
                    this.addLog(`🚓 ${player.name} went to Jail!`);
                } else if (space.name === 'Free Parking') {
                    player.money += this.gameState.freeParking;
                    this.addLog(`💰 ${player.name} collected $${this.gameState.freeParking} from Free Parking!`);
                    this.gameState.freeParking = 0;
                }
                break;
        }
    }

    // Calculate rent
    calculateRent(space, ownerIndex) {
        if (space.type === 'rail') {
            const railsOwned = Object.entries(this.gameState.properties)
                .filter(([pos, idx]) => idx === ownerIndex && BOARD_DATA[pos].type === 'rail').length;
            return space.rent * Math.pow(2, railsOwned - 1);
        }
        
        if (space.type === 'utility') {
            // Roll dice and multiply
            return 0; // Simplified
        }
        
        // Property rent with houses
        const houses = 0; // TODO: track houses
        if (houses === 0) {
            // Check monopoly
            const groupProps = BOARD_DATA.filter(s => s.group === space.group);
            const ownsGroup = groupProps.every(p => this.gameState.properties[p.position] === ownerIndex);
            return ownsGroup ? space.rent * 2 : space.rent;
        }
        
        return space.rent * Math.pow(5, houses);
    }

    // Draw chance card
    drawChanceCard(player) {
        const card = CHANCE_CARDS[Math.floor(Math.random() * CHANCE_CARDS.length)];
        this.addLog(`❓ ${player.name} drew Chance: "${card.text}"`);
        
        // Handle card action
        if (card.action === 'money') {
            player.money += card.amount;
        } else if (card.action === 'move') {
            player.position = card.position;
            this.updateTokenPosition(this.gameState.currentPlayer, card.position);
        } else if (card.action === 'jail') {
            player.inJail = true;
            player.position = 10;
            this.updateTokenPosition(this.gameState.currentPlayer, 10);
        } else if (card.action === 'jailcard') {
            player.jailCards++;
        }
    }

    // Draw chest card
    drawChestCard(player) {
        const card = CHEST_CARDS[Math.floor(Math.random() * CHEST_CARDS.length)];
        this.addLog(`📦 ${player.name} drew Community Chest: "${card.text}"`);
        
        if (card.action === 'money') {
            player.money += card.amount;
        } else if (card.action === 'move') {
            player.position = card.position;
            this.updateTokenPosition(this.gameState.currentPlayer, card.position);
        } else if (card.action === 'jail') {
            player.inJail = true;
            player.position = 10;
            this.updateTokenPosition(this.gameState.currentPlayer, 10);
        } else if (card.action === 'jailcard') {
            player.jailCards++;
        }
    }

    // Buy property
    buyProperty() {
        const player = this.gameState.players[this.gameState.currentPlayer];
        const space = BOARD_DATA[player.position];
        
        if (space.price && player.money >= space.price) {
            player.money -= space.price;
            player.properties.push(player.position);
            this.gameState.properties[player.position] = this.gameState.currentPlayer;
            
            this.addLog(`🏙️ ${player.name} bought ${space.name} for $${space.price}!`);
            
            document.getElementById('btn-buy').disabled = true;
            document.getElementById('btn-auction').disabled = true;
            
            // Show ownership
            const indicator = document.getElementById(`owner-${player.position}`);
            if (indicator) {
                indicator.classList.remove('hidden');
                indicator.style.background = this.getPlayerColor(this.gameState.currentPlayer);
            }
            
            this.updateUI();
        }
    }

    // Get player color
    getPlayerColor(index) {
        const colors = ['#E74C3C', '#3498DB', '#2ECC71', '#F39C12'];
        return colors[index] || '#fff';
    }

    // Start auction
    startAuction() {
        document.getElementById('auction-modal').classList.remove('hidden');
    }

    // End turn
    endTurn() {
        this.gameState.currentPlayer = (this.gameState.currentPlayer + 1) % this.gameState.players.length;
        this.gameState.round++;
        
        // Reset buttons
        document.getElementById('btn-roll').disabled = false;
        document.getElementById('btn-buy').disabled = true;
        document.getElementById('btn-auction').disabled = true;
        document.getElementById('btn-end').disabled = true;
        
        // Update active token
        document.querySelectorAll('.player-token').forEach((t, i) => {
            t.classList.toggle('token-active', i === this.gameState.currentPlayer);
        });
        
        this.addLog(`➡️ ${this.gameState.players[this.gameState.currentPlayer].name}'s turn`);
        this.resetTurnTimer();
        this.updateUI();
    }

    // Update UI
    updateUI() {
        if (!this.gameState) return;
        
        const player = this.gameState.players[this.myPlayerIndex];
        const currentPlayer = this.gameState.players[this.gameState.currentPlayer];
        
        // Update stats
        document.getElementById('player-money').textContent = `$${player.money.toLocaleString()}`;
        
        // Calculate net worth
        const propertyValue = player.properties.reduce((sum, pos) => {
            const space = BOARD_DATA[pos];
            return sum + (space?.price || 0);
        }, 0);
        document.getElementById('player-networth').textContent = `$${(player.money + propertyValue).toLocaleString()}`;
        
        document.getElementById('property-count').textContent = player.properties.length;
        document.getElementById('jail-cards').textContent = player.jailCards;
        
        // Update current player display
        document.getElementById('current-player-name').textContent = currentPlayer.name;
        document.getElementById('current-player-indicator').style.background = this.getPlayerColor(this.gameState.currentPlayer);
        document.getElementById('current-round').textContent = this.gameState.round;
        
        // Update room code
        document.getElementById('room-code').textContent = this.roomCode;
        
        // Update players list
        this.updatePlayersList();
        
        // Update owned properties
        this.updateOwnedProperties();
    }

    // Update players list
    updatePlayersList() {
        const list = document.getElementById('players-list');
        if (!list) return;
        
        list.innerHTML = this.gameState.players.map((p, i) => `
            <div class="flex items-center justify-between p-2 rounded-lg ${i === this.gameState.currentPlayer ? 'bg-gold/20' : 'bg-white/5'}">
                <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full" style="background: ${this.getPlayerColor(i)}"></div>
                    <span class="text-sm ${i === this.myPlayerIndex ? 'text-gold' : 'text-cream'}">${p.name}</span>
                    ${i === this.gameState.currentPlayer ? '<span class="text-xs">🎲</span>' : ''}
                </div>
                <span class="text-sm text-cream/70">$${p.money.toLocaleString()}</span>
            </div>
        `).join('');
    }

    // Update owned properties display
    updateOwnedProperties() {
        const container = document.getElementById('owned-properties');
        if (!container) return;
        
        const player = this.gameState.players[this.myPlayerIndex];
        
        if (player.properties.length === 0) {
            container.innerHTML = '<div class="text-cream/40 text-sm text-center py-4">No cities owned yet</div>';
            return;
        }
        
        container.innerHTML = player.properties.map(pos => {
            const space = BOARD_DATA[pos];
            return `
                <div class="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                    <div class="flex items-center gap-2">
                        <span>${space.flag}</span>
                        <span class="text-sm">${space.name}</span>
                    </div>
                    <span class="text-xs text-gold">$${space.rent}</span>
                </div>
            `;
        }).join('');
    }

    // Turn timer
    startTurnTimer() {
        this.turnTimeLeft = 60;
        
        this.turnTimer = setInterval(() => {
            this.turnTimeLeft--;
            
            const bar = document.getElementById('turn-timer-bar');
            const text = document.getElementById('turn-time-remaining');
            
            if (bar) bar.style.width = `${(this.turnTimeLeft / 60) * 100}%`;
            if (text) text.textContent = `${this.turnTimeLeft}s`;
            
            if (this.turnTimeLeft <= 0) {
                if (this.gameState.currentPlayer === this.myPlayerIndex) {
                    this.endTurn();
                }
                this.resetTurnTimer();
            }
        }, 1000);
    }

    resetTurnTimer() {
        this.turnTimeLeft = 60;
    }

    // Add log entry
    addLog(message) {
        const log = document.getElementById('game-log');
        if (!log) return;
        
        const entry = document.createElement('div');
        entry.className = 'text-cream/80 text-sm mb-1 animate-fadeIn';
        entry.textContent = message;
        log.appendChild(entry);
        log.scrollTop = log.scrollHeight;
        
        // Keep only last 50 entries
        while (log.children.length > 50) {
            log.removeChild(log.firstChild);
        }
    }

    // Chat
    sendChatMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addChatMessage('You', message);
        input.value = '';
        
        if (this.socket) {
            this.socket.emit('chat:message', { message });
        }
    }

    addChatMessage(player, message) {
        const chat = document.getElementById('chat-messages');
        if (!chat) return;
        
        const entry = document.createElement('div');
        entry.className = 'mb-2 text-sm';
        entry.innerHTML = `<span class="text-gold font-semibold">${player}:</span> <span class="text-cream">${message}</span>`;
        chat.appendChild(entry);
        chat.scrollTop = chat.scrollHeight;
    }

    // Trade modal
    openTrade() {
        document.getElementById('trade-modal').classList.remove('hidden');
    }

    closeTradeModal() {
        document.getElementById('trade-modal').classList.add('hidden');
    }

    proposeTrade() {
        this.addLog('🤝 Trade proposed!');
        this.closeTradeModal();
    }

    // Build modal
    openBuildMenu() {
        document.getElementById('build-modal').classList.remove('hidden');
    }

    closeBuildModal() {
        document.getElementById('build-modal').classList.add('hidden');
    }

    // Leave game
    leaveGame() {
        if (confirm('Leave this game?')) {
            window.location.href = 'index.html';
        }
    }

    // Show rules
    showRules() {
        alert('GlobeTycoon Rules:\n\n1. Roll dice and move around the world\n2. Buy cities when you land on them\n3. Collect full country sets to build landmarks\n4. Charge rent when others land on your cities\n5. Bankrupt all opponents to win!');
    }

    // Toggle sound
    toggleSound() {
        const btn = document.getElementById('sound-btn');
        btn.textContent = btn.textContent === '🔊' ? '🔇' : '🔊';
    }

    // Event listeners
    initEventListeners() {
        // Chat enter key
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendChatMessage();
            });
        }

        // Window resize - re-render board
        window.addEventListener('resize', () => {
            this.renderBoard();
            // Reposition tokens
            this.gameState?.players.forEach((p, i) => {
                this.updateTokenPosition(i, p.position);
            });
        });
    }

    // Handle game updates from server
    handleGameUpdate(update) {
        switch (update.type) {
            case 'playerMoved':
                this.gameState.players[update.playerIndex].position = update.position;
                this.updateTokenPosition(update.playerIndex, update.position);
                break;
            case 'propertyBought':
                this.gameState.properties[update.position] = update.playerIndex;
                this.gameState.players[update.playerIndex].money -= update.price;
                this.gameState.players[update.playerIndex].properties.push(update.position);
                break;
            case 'moneyChanged':
                this.gameState.players[update.playerIndex].money = update.amount;
                break;
        }
        this.updateUI();
    }
}

// Global functions
function rollDice() { game.rollDice(); }
function buyProperty() { game.buyProperty(); }
function startAuction() { game.startAuction(); }
function endTurn() { game.endTurn(); }
function openTrade() { game.openTrade(); }
function closeTradeModal() { game.closeTradeModal(); }
function proposeTrade() { game.proposeTrade(); }
function openBuildMenu() { game.openBuildMenu(); }
function closeBuildModal() { game.closeBuildModal(); }
function leaveGame() { game.leaveGame(); }
function showRules() { game.showRules(); }
function toggleSound() { game.toggleSound(); }
function sendChatMessage() { game.sendChatMessage(); }
function placeBid(amount) { alert(`Bid $${amount} placed!`); }
function passAuction() { document.getElementById('auction-modal').classList.add('hidden'); }
function placeCustomBid() {
    const bid = prompt('Enter your bid:');
    if (bid) placeBid(parseInt(bid));
}

// Initialize
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new GlobeTycoonGame();
});
