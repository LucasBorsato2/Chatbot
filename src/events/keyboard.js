import { handleSendMessage } from '../../main.js';

export function initializeKeyboardEvents(inputElement, messagesElement, bot, botKey) {
    if (!inputElement) {
        console.error("L'élément input n'a pas été trouvé.");
        return;
    }

    inputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            handleSendMessage(bot, inputElement, messagesElement, botKey);
        }
    });
}
