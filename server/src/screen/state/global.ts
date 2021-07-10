export class State {
    state: any;
    private updater: any;

    constructor() {
        this.state = {};
        this.updater = {};
    }

    setState(newState: object) {
        Object.assign(this.state, newState);
        Object.keys(this.updater).forEach(key => {
            try {
                this.runUpdater(key);
            } catch(e) {
                this.popUpdater(key);
            }
        });
    }

    appendUpdater(fn: Function) {
        const key = Math.random().toString();
        this.updater[key] = fn;
        return key;
    }

    runUpdater(key: string) {
        this.updater[key]();
    }

    popUpdater(key: string) {
        delete this.updater[key];
    }
}