import { CatBot } from './src/bots/CatBot.js';
import { CookBot } from './src/bots/CookBot.js';
import { RandomBot } from './src/bots/RandomBot.js';
import { initializeKeyboardEvents } from './src/events/keyboard.js';
import { initializeClickEvents } from './src/events/click.js';
import { loadMessagesFromLocalStorage, saveMessagesToLocalStorage, addMessageToChat } from './src/utils/localStorage.js';

const catBot = new CatBot();
const cookBot = new CookBot();
const randomBot = new RandomBot();

document.addEventListener('DOMContentLoaded', () => {
    loadMessagesFromLocalStorage('catBot', document.getElementById('catBot-messages'));
    loadMessagesFromLocalStorage('cookBot', document.getElementById('cookBot-messages'));
    loadMessagesFromLocalStorage('randomBot', document.getElementById('randomBot-messages'));

    initializeKeyboardEvents(document.getElementById('catBot-input'), document.getElementById('catBot-messages'), catBot, 'catBot');
    initializeKeyboardEvents(document.getElementById('cookBot-input'), document.getElementById('cookBot-messages'), cookBot, 'cookBot');
    initializeKeyboardEvents(document.getElementById('randomBot-input'), document.getElementById('randomBot-messages'), randomBot, 'randomBot');

    initializeClickEvents(document.getElementById('catBot-send'), document.getElementById('catBot-input'), document.getElementById('catBot-messages'), catBot, 'catBot');
    initializeClickEvents(document.getElementById('cookBot-send'), document.getElementById('cookBot-input'), document.getElementById('cookBot-messages'), cookBot, 'cookBot');
    initializeClickEvents(document.getElementById('randomBot-send'), document.getElementById('randomBot-input'), document.getElementById('randomBot-messages'), randomBot, 'randomBot');
});

export async function handleSendMessage(bot, inputElement, messagesElement, botKey) {
    const message = inputElement.value.trim();
    if (message !== '') {
        const timestamp = new Date().toLocaleTimeString();
        const userMessage = {
            sender: 'user',
            text: message,
            time: timestamp,
        };
        addMessageToChat(userMessage, messagesElement);
        saveMessagesToLocalStorage(botKey, userMessage);
        console.log(`Message sauvegardé pour ${botKey}: `, userMessage);

        if (message.toLowerCase() === 'everybody') {
            const allBots = [catBot, cookBot, randomBot]; 
            allBots.forEach(b => {
                const botMessage = {
                    sender: b.name,
                    text: `Viens me parler ! Je suis ${b.name}. J'ai un tas de choses à te dire !`, 
                    time: timestamp,
                };
                addMessageToChat(botMessage, messagesElement);
                saveMessagesToLocalStorage(b.key, botMessage);
            });
        } else {
            const botResponsePromise = bot.respondTo(message);
            const botResponse = await botResponsePromise;
            console.log("Retour du bot :", botResponse);

            if (botResponse) {
                const botMessage = {
                    sender: bot.name,
                    text: botResponse,
                    time: timestamp,
                };
                addMessageToChat(botMessage, messagesElement);
                saveMessagesToLocalStorage(botKey, botMessage);
            }
        }

        inputElement.value = '';
    }
}

document.getElementById('btn-catBot').addEventListener('click', function () {
    switchToBot('catBot');
});

document.getElementById('btn-cookBot').addEventListener('click', function () {
    switchToBot('cookBot');
});

document.getElementById('btn-randomBot').addEventListener('click', function () {
    switchToBot('randomBot');
});

function switchToBot(botId) {
    const chatBoxes = document.querySelectorAll('.chat-box');
    chatBoxes.forEach(chatBox => {
        chatBox.style.display = 'none';
    });

    document.getElementById(botId + '-chat').style.display = 'block';
}
