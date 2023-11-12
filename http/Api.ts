export abstract class Api {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1";
  }

  protected async get(endpoint: string): Promise<Response> {
    return fetch(`${this.baseUrl}/${endpoint}`);
  }
}
