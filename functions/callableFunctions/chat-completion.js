const functions = require("firebase-functions");
const admin = require("firebase-admin");
const OpenAI = require("openai");

if (admin.apps.length === 0) {
  admin.initializeApp();
}

exports.chatCompletion = functions.https.onCall(async (data, context) => {
  try {
    const { prompt } = data;
    const OPENAI_API_KEY = "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";
    const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
    const aiModel = "gpt-3.5-turbo-1106";

    const messages = [
      {
        role:"system",
        content: "you are a helpful assistant"
      },
      {
        role:"user",
        content: prompt
      },
    ]

    const completion = await openai.chat.completions.create({
      model: aiModel,
      messages: messages,
    });

    console.log(completion)

    const aiResponse = completion.choices[0].message.content;

    return {
      aiResponse,
    };
  } catch (error) {
    console.error("Error calling function: ", error);
    throw new functions.https.HttpsError("internal", "Internal server error.");
  }
});
