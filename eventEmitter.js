// eventEmitter.js

class EventEmitter {
    constructor() {
        this.events = {}; // This object will hold the name of the event as the key and an array of listeners as the value.
    }
    on(eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
    }
    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(listener => {
                listener(...args);
            });
        }
    }
    off(eventName, listenerToRemove) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(listener => listener !== listenerToRemove);
        }
    }
}
export const eventEmitter = new EventEmitter();
