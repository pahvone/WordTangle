import axios from "axios";

export default class Dictionary {
  axios = require("axios");

  getLang(lang) {
    switch (lang) {
      case "EN":
        return "eng";
      case "FI":
        return "fin";
      case "ES":
        return "spa";
    }
  }

  async translateText(text, sourceLang, targetLang) {
    return new Promise(async (resolve) => {
      sourceLang = this.getLang(sourceLang);
      targetLang = this.getLang(targetLang);

      const options = {
        method: "GET",
        url:
          process.env.REACT_APP_LINK_API_URL +
          sourceLang +
          "/" +
          targetLang +
          "/" +
          text,
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_LINK_API_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_LINK_API_HOST,
        },
      };

      try {
        const response = await axios.request(options);
        resolve(response.data);
      } catch (error) {
        console.error(error);
        resolve(null);
      }
    });
  }
}
