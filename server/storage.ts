import { downloads, type Download, type InsertDownload } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getDownload(id: number): Promise<Download | undefined>;
  createDownload(download: InsertDownload): Promise<Download>;
  updateDownload(id: number, updates: Partial<Download>): Promise<Download | undefined>;
  getRecentDownloads(): Promise<Download[]>;
}

export class DatabaseStorage implements IStorage {
  async getDownload(id: number): Promise<Download | undefined> {
    const [download] = await db.select().from(downloads).where(eq(downloads.id, id));
    return download || undefined;
  }

  async createDownload(insertDownload: InsertDownload): Promise<Download> {
    const [download] = await db
      .insert(downloads)
      .values(insertDownload)
      .returning();
    return download;
  }

  async updateDownload(id: number, updates: Partial<Download>): Promise<Download | undefined> {
    const [updatedDownload] = await db
      .update(downloads)
      .set(updates)
      .where(eq(downloads.id, id))
      .returning();
    return updatedDownload || undefined;
  }

  async getRecentDownloads(): Promise<Download[]> {
    return await db
      .select()
      .from(downloads)
      .orderBy(desc(downloads.createdAt))
      .limit(10);
  }
}

export const storage = new DatabaseStorage();
