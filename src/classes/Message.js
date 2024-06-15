export class Message {
	constructor(sender, content, timestamp, avatar) {
		this.sender = sender;
		this.content = content;
		this.timestamp = timestamp;
		this.avatar = avatar;
	}

	render() {
		const messageElement = document.createElement('div');
		messageElement.classList.add('message');
		messageElement.classList.add(this.sender === 'user' ? 'sent' : 'received');

		const messageContent = `
      <img src="${this.avatar}" alt="${this.sender}" />
      <div>
        <strong>${this.sender}</strong>
        <p>${this.content}</p>
        <small>${this.timestamp}</small>
      </div>
    `;

		messageElement.innerHTML = messageContent;
		return messageElement;
	}
}
