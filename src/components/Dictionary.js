import axios from 'axios';

export default class Dictionary {
    axios = require('axios');

    async translateText(text, sourceLang, targetLang) {
        return new Promise((resolve) => {
            const apiKey = process.env.REACT_APP_DEEPL_API_KEY
            const url = 'https://api-free.deepl.com/v2/translate';
            const params = {
                auth_key: apiKey,
                text: text,
                source_lang: sourceLang,
                target_lang: targetLang,
            };
            axios.post(url, null, { params })
                .then(response => {
                    const translation = response.data.translations[0].text;
                    console.log(response)
                    console.log(translation)
                    resolve(translation)
                })
                .catch(error => {
                    console.error(error);
                });
        })
    }
}