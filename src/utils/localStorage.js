export function loadMessagesFromLocalStorage(botKey, messagesElement) {
    const messages = JSON.parse(localStorage.getItem(botKey)) || [];
    
    // Trier les messages par leur horodatage
    messages.sort((a, b) => new Date(a.time) - new Date(b.time));

    messages.forEach((message) => {
        addMessageToChat(message, messagesElement);
    });
    console.log("Messages chargés pour ", botKey, ":", messages);
}

export function saveMessagesToLocalStorage(botKey, message) {
    const messages = JSON.parse(localStorage.getItem(botKey)) || [];
    messages.push(message);
    localStorage.setItem(botKey, JSON.stringify(messages));
    console.log(`Message sauvegardé pour ${botKey}:`, messages);
}

export async function addMessageToChat(message, messagesElement) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(message.sender === 'user' ? 'user-message' : 'bot-message');

    const avatarElement = document.createElement('img');
    avatarElement.classList.add('avatar');
    avatarElement.src = getAvatarUrl(message.sender);

    messageElement.appendChild(avatarElement);

    const messageTextElement = document.createElement('div');
    messageTextElement.classList.add('message-text');

    if (isValidImageUrl(message.text)) {
        const imageElement = document.createElement('img');
        imageElement.src = message.text;
        imageElement.style.maxWidth = '50%';
        messageTextElement.appendChild(imageElement);
    } else {
        messageTextElement.innerHTML = `<strong>${message.sender}</strong> [${message.time}]: ${message.text}`;
    }

    messageElement.appendChild(messageTextElement);

    messagesElement.appendChild(messageElement);
    messagesElement.scrollTop = messagesElement.scrollHeight;
}

function getAvatarUrl(sender) {
    const avatarKey = `avatar_${sender}`;
    let avatarUrl = localStorage.getItem(avatarKey);
    if (!avatarUrl) {
        avatarUrl = generateAvatarUrl(sender);
        localStorage.setItem(avatarKey, avatarUrl);
    }
    return avatarUrl;
}

function generateAvatarUrl(sender) {
    if (sender === 'CatBot') {
		return "https://img.freepik.com/photos-gratuite/gros-plan-chaton-entoure-fleurs_23-2150782329.jpg?size=626&ext=jpg"; 
	    }
        else if(sender === 'CookBot') {
            return "https://img.freepik.com/vecteurs-libre/colore-chefdesign_1152-73.jpg?t=st=1718475244~exp=1718478844~hmac=47b0ce41ee609d569320224829c9a5b20253c0397f91eaed3c4f9b7746731469&w=740";
        }
        else if(sender === 'RandomBot') {
            return "https://img.freepik.com/vecteurs-libre/robot-mignon-tenant-bulle-discours_52683-27188.jpg?size=626&ext=jpg";
        }
             else {
        return `https://randomuser.me/api/portraits/${Math.random() < 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`;
    }
}

function isValidImageUrl(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}
