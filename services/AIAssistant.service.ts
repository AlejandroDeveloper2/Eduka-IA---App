/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";

import { config } from "@/lib/config/enviromentVariables";

import { getFileTypeHeader } from "@/lib/utils";
import { AttachedFile } from "@/lib/types/dataTypes";

const axiosInstance = axios.create({
  baseURL: config.OPEN_IA_API_URL,
  headers: {
    Authorization: `Bearer ${config.OPEN_IA_API_KEY}`,
    "OpenAI-Beta": "assistants=v2",
    "Content-Type": "application/json",
  },
});

export class AIAssistantService {
  private static async uploadFile(
    fileUri: string,
    fileName: string,
    type: string,
    purpose: "vision" | "assistants"
  ): Promise<string> {
    try {
      const formData = new FormData();

      formData.append("file", {
        uri: fileUri,
        name: fileName.endsWith(".txt")
          ? fileName.replace(".txt", ".pdf")
          : fileName,
        type,
      } as any);

      formData.append("purpose", purpose);

      const assistantResponse = await axios.post(
        `${config.OPEN_IA_API_URL}/files`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${config.OPEN_IA_API_KEY}`,
            "OpenAI-Beta": "assistants=v2",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return assistantResponse.data.id as string;
    } catch (error) {
      const e = error as AxiosError;
      console.error(
        console.error("Upload error:", e.response?.data || e.message)
      );
      throw new Error("There is an error uploading the file");
    }
  }

  private static async createThread(): Promise<string> {
    try {
      const response = await axiosInstance.post("/threads");

      return response.data.id as string;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e);
      throw new Error("There is an error creating the thread");
    }
  }

  private static async addMessage(
    threadId: string,
    prompt: string,
    fileId: string | null,
    extension: string | null
  ): Promise<void> {
    try {
      if (
        fileId &&
        extension &&
        (extension === "jpg" || extension === "webp")
      ) {
        await axiosInstance.post(`/threads/${threadId}/messages`, {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "image_file",
              image_file: {
                file_id: fileId,
              },
            },
          ],
        });
      } else if (fileId) {
        await axiosInstance.post(`/threads/${threadId}/messages`, {
          role: "user",
          content: prompt,
          attachments: [{ file_id: fileId, tools: [{ type: "file_search" }] }],
        });
      } else {
        await axiosInstance.post(`/threads/${threadId}/messages`, {
          role: "user",
          content: prompt,
        });
      }
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data || e);
      throw new Error("There is an error adding the message to thread");
    }
  }

  private static async runAssistant(
    threadId: string,
    assistantId: string
  ): Promise<string> {
    try {
      let assistantResponseMessage: string = "";

      const runResponse = await axiosInstance.post(
        `/threads/${threadId}/runs`,
        {
          assistant_id: assistantId,
        }
      );

      const runId = runResponse.data.id;
      let status = runResponse.data.status;

      /** Assistant's status */
      while (status === "queued" || status === "in_progress") {
        await new Promise((res) => setTimeout(res, 1500));
        const statusRes = await axiosInstance.get(
          `/threads/${threadId}/runs/${runId}`
        );
        status = statusRes.data.status;
      }

      /** Assistant's Response Message */
      const msgResponse = await axiosInstance.get(
        `/threads/${threadId}/messages`
      );
      const lastMessage = msgResponse.data.data[0];

      for (const part of lastMessage.content) {
        if (part.type === "text") {
          assistantResponseMessage = part.text.value;
          break;
        }
      }

      return assistantResponseMessage;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e);
      throw new Error("There is an error trying to run the assistant");
    }
  }

  private static async createEducativeImageFromPrompt(
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
      console.error(e);
      throw new Error("There is an error generating the image");
    }
  }

  /** Public Methods */
  public static async postEducativeResourceRequest(
    prompt: string,
    attachedFile: AttachedFile | null
  ): Promise<string> {
    const assistantId = "asst_Q1NTGDO19EHmDCsccOxT6jDT";
    let filePath: string | null = null;

    if (attachedFile) {
      const { fileName, fileUri, extension } = attachedFile;
      const fileTypeHeader = getFileTypeHeader(fileName);

      filePath = await this.uploadFile(
        fileUri,
        fileName,
        fileTypeHeader,
        extension === "jpg" || extension === "webp" ? "vision" : "assistants"
      );
    }

    const threadId = await this.createThread();
    const extension = attachedFile ? attachedFile.extension : null;

    await this.addMessage(threadId, prompt, filePath, extension);

    const assistantMessage = await this.runAssistant(threadId, assistantId);

    return assistantMessage;
  }

  public static async postImageEducativeResourceRequest(
    prompt: string,
    attachedFile: AttachedFile | null
  ): Promise<string> {
    const visualPrompt = await this.postEducativeResourceRequest(
      prompt,
      attachedFile
    );
    const imageUri = await this.createEducativeImageFromPrompt(visualPrompt);

    return imageUri;
  }
}
