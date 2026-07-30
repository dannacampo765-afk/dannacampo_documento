class IAService {
  async generarResumen(texto) {
    try {
      if (!process.env.APIKEY) {
        throw new Error("La API key Groq no está configurada todavia");
      }
      const { ChatGroq } = await import("@langchain/groq");
      const llm = new ChatGroq({
        model: "llama-3.1-8b-instant",
        apiKey: process.env.APIKEY,
        temperature: 0.3,
        maxTokens: 300,
        maxRetries: 2,
      });

      const respuesta = await llm.invoke([
        {
          role: "system",
          content:
            "Eres un experto  en resumir textos, genera un resumen claro,coherente y bien explicado. convervando únicamente las ideas principales y no agregar información que no aparezca en el texto...",
        },
        {
          role: "user",
          content: texto,
        },
      ]);

      const resumen = respuesta.content;

      if (!resumen || typeof resumen !== "string") {
        throw new Error("La IA Groq no genero un resumen valido");
      }

      return resumen.trim();
    } catch (error) {
      console.log("Error en La IA:", error.message);
      throw error;
    }
  }
}

module.exports = new IAService();