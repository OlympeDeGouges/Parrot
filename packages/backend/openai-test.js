const axios = require('axios');
require('dotenv').config();

async function testOpenAI() {
    const apiKey = process.env.OPENAI_API_KEY;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: 'Hallo, wie geht es dir?' }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            }
        );

        console.log(response.data.choices[0].message.content);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
    }
}

testOpenAI();
