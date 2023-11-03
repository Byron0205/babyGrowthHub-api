const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.API_CHATGPT,
});
const openai = new OpenAIApi(configuration);

const gptController = {
    obtenerRespuesta: async (req, res) => {
        try {
            const question = req.body.question;

            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: question,
                max_tokens: 400,
            });

            const completion = response.data.choices[0].text;

            return res.status(200).json({
                response: completion,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    },
};

module.exports = gptController;
