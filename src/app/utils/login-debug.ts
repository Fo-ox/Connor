export const logInDebug = (function (): Function {
    const enabled = sessionStorage.getItem('debug') === 'YES';
    return function (value: unknown): void {
        if (enabled) {
            console.dir(value);
        }
    };
}());
