export class TSPublishError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
    }
    format() {
        return `${this.code}: ${this.message}`;
    }
}
