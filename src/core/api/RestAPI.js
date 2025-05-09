import axios from "axios";

const baseUrl = "https://sky-scrapper.p.rapidapi.com/api/";

export class RestAPI {
  static handleError(error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Request setup error:", error.message);
    }
  }

  static async getRequest(
    pathUrl,
    params = {},
    isArrayBuffer = false
  ) {
    const url = `${baseUrl}${pathUrl}`;
    try {
      const response = await axios.get(url, {
        params,
        responseType: isArrayBuffer ? "arraybuffer" : "json",
        headers: {
          'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
          'x-rapidapi-key': '42d1d96455msh4e5dd47f6ce1d31p18a159jsn6ee449e8df7f'
        }
      });
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
}