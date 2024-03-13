let throttleTimer = null;

export const throttle = (callback, time) => {
    let prev = 0;
    return (...args) => {
        let now = new Date().getTime();

        if (now - prev > time) {
            prev = now;
            return callback(...args);
        }
    }
};