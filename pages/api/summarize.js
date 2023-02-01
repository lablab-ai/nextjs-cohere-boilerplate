// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
require("dotenv").config();

const cohere = require("cohere-ai");
cohere.init(process.env.COHERE_API_KEY);

export default async function handler(req, res) {
  try {
    const { input } = req.body;
    const response = await cohere.generate({
      model: "xlarge",
      prompt: `Passage: Is Wordle getting tougher to solve? Players seem to be convinced that the game has gotten harder in recent weeks ever since The New York Times bought it from developer Josh Wardle in late January. The Times has come forward and shared that this likely isn’t the case. That said, the NYT did mess with the back end code a bit, removing some offensive and sexual language, as well as some obscure words There is a viral thread claiming that a confirmation bias was at play. One Twitter user went so far as to claim the game has gone to “the dusty section of the dictionary” to find its latest words.\n\nTLDR: Wordle has not gotten more difficult to solve.\n--\nPassage: ArtificialIvan, a seven-year-old, London-based payment and expense management software company, has raised $190 million in Series C funding led by ARG Global, with participation from D9 Capital Group and Boulder Capital. Earlier backers also joined the round, including Hilton Group, Roxanne Capital, Paved Roads Ventures, Brook Partners, and Plato Capital.\n\nTLDR: ArtificialIvan has raised $190 million in Series C funding.\n--\n Passage: ${input} \n\nTLDR: `,
      max_tokens: 70,
      temperature: 0.8,
      k: 0,
      p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: ["--"],
      return_likelihoods: "NONE",
    });

    res.status(200).json({ summary: response.body.generations[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ summary: "Error" });
  }
}
