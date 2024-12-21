export class Game {
    deck: Deck;
    players: Player[];
    currentHand: Hand;

    initializePlayers(playerCount: number): Player[]{
        const players: Player[] = [];
        for(let i=0; i<playerCount; i++){
            players.push(new Player(`Player ${i+1}`));
        }
        return players;
    }
    startGame(){
        this.deck.shuffle();
        this.currentHand.start(this.players, this.deck);
    }
}
export class Deck{
    cards: Card[];

    constructor(){
        this.cards = this.initializeDeck();
    }
    initializeDeck(): Card[]{
        const suits = ['H', 'D', 'S', 'C'];
        const values = [
            {rank: "2", value: 2},
            {rank: "3", value: 3},
            {rank: "4", value: 4},
            {rank: "5", value: 5},
            {rank: "6", value: 6},
            {rank: "7", value: 7},
            {rank: "8", value: 8},
            {rank: "9", value: 9},
            {rank: "10", value: 10},
            {rank: "J", value: 10},
            {rank: "Q", value: 10},
            {rank: "K", value: 10},
            {rank: "A", value: 11},
        ];
        const deck: Card[] = [];
        for(const suit of suits){
            for(const value of values){
                deck.push(new Card(value.rank, suit, value.value));
            }
        }
        return deck;
    }
    shuffle(){
        this.cards.sort(() => Math.random() - 0.5);
    }
    deal(): Card{
        return this.cards.pop()!;
    }
}
export class Card{
    rank: string;
    suit: string;
    value: number;
    url: string;

    constructor(rank: string, suit: string, value: number){
        this.rank = rank;
        this.suit = suit;
        this.value = value;
    }
}
export class Player{
    name: string;
    chips: number;
    isActive: boolean;

    constructor(name: string, chips: number = 1000){
        this.name = name;
        this.chips = chips;
        this.isActive = true;
    }
    bet(amount: number){
        if(amount <= this.chips){
            this.chips -= amount;
        }
    }
}
export class Hand{
    playersHands: Map<Player, Card[]>;
    dealerHand: Card[];

    constructor(){
        this.playersHands = new Map();
        this.dealerHand = [];
    }

    start(players: Player[], deck: Deck){
        for(const player of players){
            this.playersHands.set(player, [deck.deal(), deck.deal()]);
        }
        this.dealerHand = [deck.deal(), deck.deal()];
    }
    hit(player: Player, deck: Deck){
        const hand = this.playersHands.get(player);
        if(hand){
            hand.push(deck.deal());
        }
    }
    calculateScore(hand: Card[]): number {
        return hand.reduce((acc, card) => acc+card.value, 0);
    }
}