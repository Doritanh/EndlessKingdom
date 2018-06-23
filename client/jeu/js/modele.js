export class Modele {
    constructor(socket) {
        this._socket = socket;
        this._events = {}
    }

    addEventListener(type, callback) {
        this._events[type] = [];
        this._events[type].push(callback);
    }

    loadEvent(type) {
        for (let callback in this._events[type]) {
            this._events[type].callback();
        }
    }
}