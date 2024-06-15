import { handleSendMessage } from '../../main.js';

export function initializeClickEvents(sendButton, inputElement, messagesElement, bot, botKey) {
	if (sendButton) {
		sendButton.addEventListener('click', () => {
			handleSendMessage(bot, inputElement, messagesElement, botKey);
		});
	} else {
		console.error("Le bouton d'envoi n'a pas été trouvé.");
	}
}
