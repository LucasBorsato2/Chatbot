import { Bot } from '../classes/Bot';

export class RandomBot extends Bot {
    constructor() {
        super('RandomBot', 'https://api.adviceslip.com/advice');
        this.commands = {
            'advice': this.getAdvice,
            'funfact': this.getFunFact,
            'joke': this.getJoke,
            'help': this.showHelp,
        };
    }

    async getAdvice() {
        try {
            const response = await fetch('https://api.adviceslip.com/advice');
            const data = await response.json();
            return data.slip.advice;
        } catch (error) {
            console.error('Error fetching advice:', error);
            return 'Désolé, je ne peux pas vous donner de conseil pour le moment.';
        }
    }

    async getFunFact() {
        try {
            const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
            const data = await response.json();
            return data.text;
        } catch (error) {
            console.error('Error fetching fun fact:', error);
            return 'Désolé, je ne peux pas vous donner de fait amusant pour le moment.';
        }
    }

    async getJoke() {
        try {
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            const data = await response.json();
            return `${data.setup}\n${data.punchline}`;
        } catch (error) {
            console.error('Error fetching joke:', error);
            return 'Désolé, je ne peux pas vous raconter de blague pour le moment.';
        }
    }

    showHelp() {
        return 'Commandes disponibles : advice, funfact, joke, everybody';
    }

    respondTo(message) {
        const command = message.trim().toLowerCase();
        if (command in this.commands) {
            return this.commands[command]();
        } else {
            return 'Commande non reconnue. Tapez "help" pour voir les commandes disponibles.';
        }
    }
}
