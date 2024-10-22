export class InternalServerError extends Error {
  public status: number;
  public message: string;
  public details: string;

  constructor(message: string, details: string) {
    super(message);
    this.status = 500;
    this.message = message;
    this.details = details;
  }
}
