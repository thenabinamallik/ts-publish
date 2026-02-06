export class TSPublishError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }

  format(): string {
    return `${this.code}: ${this.message}`;
  }
}
