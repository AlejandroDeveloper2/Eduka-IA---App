import axios, { AxiosError } from "axios";

import { config } from "@/lib/config/enviromentVariables";
import { GPTInstructions } from "@/lib/config/GPTInstructions";
import { ResourceRequest } from "@/lib/types/dataTypes";

export class AxiosOpenIAService {
  private static async getVisualPromptFromChatGPT(
    context: ResourceRequest
  ): Promise<string> {
    try {
      const systemPrompt = `
      Eres un modelo de OpenAI especializado en educación. Tu tarea es generar una descripción **visual y breve** que represente una escena o imagen pedagógica útil para el recurso solicitado. 
      No des explicaciones, solo describe la imagen que debería generarse.
      
      Responde en el idioma: ${context.language}.
      `;

      const userPrompt = `
      Materia: ${context.subject}
      Grado: ${context.grade}
      País: ${context.country}
      Descripción del recurso: ${context.promptText}
      Formato esperado: Imagen
      Tipo de recurso: ${
        context.otherResourceDescription.length > 0
          ? context.otherResourceDescription
          : context.resourceType
      }
      Genera una descripción visual para representar esta idea en una imagen educativa.`;

      const response = await axios.post(
        `${config.OPEN_IA_API_URL}/chat/completions`,
        {
          model: "gpt-4o",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${config.OPEN_IA_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response);
      throw new Error("error");
    }
  }

  private static async postEducativeImageFromPrompt(
    prompt: string
  ): Promise<string> {
    try {
      const { data } = await axios.post(
        `${config.OPEN_IA_API_URL}/images/generations`,
        {
          model: "dall-e-3",
          prompt,
          n: 1,
          size: "1024x1024",
          response_format: "b64_json",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.OPEN_IA_API_KEY}`,
          },
        }
      );

      const base64Image = data.data[0].b64_json;

      const imageUri = `data:image/png;base64,${base64Image}`;

      return imageUri;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response);
      throw new Error("error");
    }
  }

  public static async postEducativeResourceRequest(
    prompt: string
  ): Promise<string> {
    try {
      const { data } = await axios.post(
        `${config.OPEN_IA_API_URL}/chat/completions`,
        {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: GPTInstructions,
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.OPEN_IA_API_KEY}`,
          },
        }
      );
      return data.choices[0].message.content as string;
    } catch (error: unknown) {
      const e = error as AxiosError;
      console.error(e.message);
      throw new Error("..");
    }
  }

  public static async postImageEducativeResourceRequest(
    context: ResourceRequest
  ): Promise<string> {
    const visualPrompt = await this.getVisualPromptFromChatGPT(context);
    const imageUri = await this.postEducativeImageFromPrompt(visualPrompt);

    return imageUri;
  }
}
