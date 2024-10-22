export {};

declare global {
  namespace Express {
    export interface Response {
      sendformat: <Data>(data: Data, code?: number) => Response;
    }
  }
}
