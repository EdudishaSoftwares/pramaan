export class TemplateNotFoundException extends Error {
  public status: number;
  public message: string;
  public details: { templateId: string; sellerId?: string };

  constructor(message: string, details: { templateId: string; sellerId?: string }) {
    super(message);
    this.status = 404;
    this.message = message;
    this.details = details;
  }
}
