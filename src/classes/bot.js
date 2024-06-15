export class Bot {
	constructor(name, avatar) {
		this.name = name;
		this.avatar = avatar;
		this.commands = {
			'common': this.commonAction.bind(this)
		};
	}

	commonAction() {
		return `${this.name} is responding to the common command!`;
	}

	respond(command) {
		const action = this.commands[command];
		return action ? action.call(this) : '';
	}
}
