import { Bot } from '../classes/Bot';

export class CatBot extends Bot {
    constructor() {
        super('CatBot');
        this.commands = {
            'fact': this.getCatFact,
            'sound': this.getCatSound,
            'play': this.playWithCat,
            'help': this.showHelp,
        };
    }

	async getCatFact() {
        try {
            const response = await fetch('https://catfact.ninja/fact');
            const data = await response.json();
            return data.fact;
        } catch (error) {
            console.error('Error fetching cat fact:', error);
            return 'Désolé, je ne peux pas trouver de fait sur les chats pour le moment.';
        }
    }

    getCatSound() {
        const sounds = [
            'Miaou !',
            'Prrrrrr...',
            'Ronronnement doux',
			'Meow !',
			'Prrrrrr...',
			'AGRAOUUUUUUU'
        ];
        return sounds[Math.floor(Math.random() * sounds.length)];
    }

    playWithCat() {
        const activities = [
            'Lancer une balle à votre chat',
            'Gratter le ventre de votre chat',
            'Jouer avec une baguette de plumes',
            'Faire rouler une balle en papier',
        ];
        return `Activité recommandée : ${activities[Math.floor(Math.random() * activities.length)]}`;
    }

    showHelp() {
        return 'Commandes disponibles : fact, sound, play, everybody';
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
