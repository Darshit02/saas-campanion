import { Redis } from "@upstash/redis";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { delimiter } from "path";

export type CompanionKey = {
  compainonName: string;
  modelName: string;
  userId: string;
};

export class MemmoryManager {
  private static instance: MemmoryManager;
  private history: Redis;
  private vectorDBClient: PineconeClient;

  private constructor() {
    this.history = Redis.fromEnv();
    this.vectorDBClient = new PineconeClient();
  }

  public async init() {
    if (this.vectorDBClient instanceof PineconeClient) {
      await this.vectorDBClient.init({
        apiKey: process.env.PINECONE_API_KEY!,
        environment: process.env.PINCONE_ENVIRONMENT!,
      });
    }
  }
  public async vectorSearch(
    recentChatHistory: string,
    companionFileName: string
  ) {
    const pineconeClient = <PineconeClient>this.vectorDBClient;
    const pineconeIndex = pineconeClient.Index(
      process.env.PINECONE_INDEX! || ""
    );
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
      }),
      { pineconeIndex }
    );

    const similarDocs = await vectorStore
      .similaritySearch(recentChatHistory, 3, { fileName: companionFileName })
      .catch((err) => {
        console.log("Failed to get vector search results", err);
      });

    return similarDocs;
  }

  public static async getInstance(): Promise<MemmoryManager> {
    if (!MemmoryManager.instance) {
      MemmoryManager.instance = new MemmoryManager();
      await MemmoryManager.instance.init();
    }
    return MemmoryManager.instance;
  }

  private ganerteRedisCompanionKey(CompanionKey: CompanionKey): string {
    return `${CompanionKey.compainonName}-${CompanionKey.modelName}-${CompanionKey.userId}`;
  }
  public async writeHistory(text: string, companionKey: CompanionKey) {
    if (!companionKey || typeof companionKey.userId == "undefined") {
      console.log("CompanionKey set Incorrectly");
      return "";
    }
    const key = this.ganerteRedisCompanionKey(companionKey);
    const result = await this.history.zadd(key, {
      score: Date.now(),
      member: text,
    });
    return result;
  }
  public async readLatestHistory(companionKey: CompanionKey): Promise<string> {
    if (!companionKey || typeof companionKey.userId == "undefined") {
      console.log("Companion key ser Incorrectly");
      return "";
    }
    const key = this.ganerteRedisCompanionKey(companionKey);
    let result = await this.history.zrange(key, 0, Date.now(), {
      byScore: true,
    });
    result = result.slice(-30).reverse();
    const recentChat = result.reverse().join("/n");
    return recentChat;
  }
  public async seedChatHistory(
    seedContent: String,
    delimiter: string = "/n",
    companionKey: CompanionKey
  ) {
    const key = this.ganerteRedisCompanionKey(companionKey);

    if (await this.history.exists(key)) {
      console.log("User Alredy has chat history");
    }
    const content = seedContent.split(delimiter);
    let counter = 0;
    for (const line of content) {
      await this.history.zadd(key, { score: counter, member: line });
      counter += 1;
    }
  }
}
