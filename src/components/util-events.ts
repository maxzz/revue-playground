const subscribers: {
    [key: string]: any[]
} = {};

type Unsibscribe = Function;

export function subscribe(topic: string, handler: Function): Unsibscribe {
    let handlers = subscribers[topic];
    if (!handlers) {
        handlers = subscribers[topic] = [];
    }
    if (handlers.indexOf(handler) === -1) {
        handlers.push(handler);
    }

    return () => handlers.splice(handlers.indexOf(handler), 1);
}

export function publish(topic: string, data?: any): void {
    if (subscribers[topic]) {
        setTimeout(function callSubscribers() {
            if (subscribers[topic]) {
                const handlers = subscribers[topic];
                for (var i = 0; i < handlers.length; i++) {
                    handlers[i](data);
                }
            }
        }, 0);
    }
}

export function clear(unsubscribers: Unsibscribe[]) {
    unsubscribers.forEach(call);
}

function call(f: Function) {
    return f();
}
