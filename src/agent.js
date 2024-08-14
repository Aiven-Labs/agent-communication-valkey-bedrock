import {invokeModel, sendToChannel, subscribe} from "./common.js";
import {getContinueConversationPrompt, getStartConversationPrompt} from "./prompts.js";

class Agent {
    constructor(agentName, anotherAgent, starts) {
        this.agentName = agentName;
        this.anotherAgent = anotherAgent;
        this.shortMemory = [];
        this.starts = starts;
    }

    getPrompt(message) {
        return !!message ? getContinueConversationPrompt(this.agentName, this.shortMemory.join('\n - '), message) : getStartConversationPrompt(this.agentName);
    }

    async startConversation(recipient) {
        await this.replyToMessage(recipient);
    }

    async replyToMessage(recipient, message) {
        if (message && message.includes("END")) {
            return;
        }

        const prompt = this.getPrompt(message);
        console.log(`### ${this.agentName.toUpperCase()} PROMPT: ###`)
        console.log("prompt: " + this.agentName, prompt)
        const response = await invokeModel(prompt);
        console.log(`=== ${this.agentName.toUpperCase()} SAYS: ===`)
        console.log(`${response}`);
        if (message) {
            this.shortMemory.push(`${recipient} said: ${message}`)
        }

        this.shortMemory.push(`You replied: ${response}`);
        sendToChannel(recipient, JSON.stringify({agent: this.agentName, message: response}));
    }

    async startListeningToOthers() {
        const subscriber = subscribe(this.agentName);
        subscriber.on("message", async (channel, message) => {
            const parsedMessage = JSON.parse(message);
            await this.replyToMessage(parsedMessage.agent, parsedMessage.message)
        })
    }

    async initiate() {
        await this.startListeningToOthers();
        if (this.starts) {
            await this.startConversation(this.anotherAgent);
        }
    }
}

export default Agent;