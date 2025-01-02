export class Game {
    initializePlayers(playerCount, chips) {
        const players = [];
        for (let i = 0; i < playerCount; i++) {
            players.push(new Player(`Player ${i + 1}`, chips));
        }
        return players;
    }
    startGame() {
        this.deck.shuffle();
        this.currentHand.start(this.players, this.deck);
    }
    resetGame() {
        // Reset the deck
        this.deck = new Deck(); // Create a new deck
        this.deck.shuffle();
        // Reset the hands
        this.currentHand = new Hand(); // Create a new hand instance
        // Restart the game
        this.currentHand.start(this.players, this.deck);
    }
}
export class Deck {
    constructor() {
        this.cards = this.initializeDeck();
    }
    initializeDeck() {
        const suits = ['H', 'D', 'S', 'C'];
        const values = [
            { rank: "2", value: 2 },
            { rank: "3", value: 3 },
            { rank: "4", value: 4 },
            { rank: "5", value: 5 },
            { rank: "6", value: 6 },
            { rank: "7", value: 7 },
            { rank: "8", value: 8 },
            { rank: "9", value: 9 },
            { rank: "10", value: 10 },
            { rank: "J", value: 10 },
            { rank: "Q", value: 10 },
            { rank: "K", value: 10 },
            { rank: "A", value: 11 },
        ];
        const deck = [];
        for (const suit of suits) {
            for (const value of values) {
                deck.push(new Card(value.rank, suit, value.value));
            }
        }
        return deck;
    }
    shuffle() {
        this.cards.sort(() => Math.random() - 0.5);
    }
    deal() {
        return this.cards.pop();
    }
}
export class Card {
    constructor(rank, suit, value) {
        this.rank = rank;
        this.suit = suit;
        this.value = value;
    }
}
export class Player {
    constructor(name, chips = 1000) {
        this.name = name;
        this.chips = chips;
        this.isActive = true;
    }
    bet(amount) {
        if (amount <= this.chips) {
            this.chips -= amount;
        }
    }
}
export class Hand {
    constructor() {
        this.playersHands = new Map();
        this.dealerHand = [];
    }
    start(players, deck) {
        for (const player of players) {
            this.playersHands.set(player, [deck.deal(), deck.deal()]);
        }
        this.dealerHand = [deck.deal(), deck.deal()];
    }
    hit(player, deck) {
        const hand = this.playersHands.get(player);
        if (hand) {
            hand.push(deck.deal());
        }
    }
    dealerHit(deck, dealerHandValueNumber) {
        const hand = this.dealerHand;
        if (hand) {
            hand.push(deck.deal());
        }
    }
    calculateScore(hand) {
        return hand.reduce((acc, card) => acc + card.value, 0);
    }
}
