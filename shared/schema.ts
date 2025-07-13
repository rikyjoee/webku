import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const downloads = pgTable("downloads", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  title: text("title"),
  duration: integer("duration"), // in seconds
  thumbnail: text("thumbnail"),
  format: text("format").notNull(), // "mp4" or "mp3"
  quality: text("quality").notNull(), // "hd" or "standard"
  status: text("status").notNull().default("pending"), // "pending", "processing", "completed", "failed"
  downloadUrl: text("download_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertDownloadSchema = createInsertSchema(downloads).pick({
  url: true,
  format: true,
  quality: true,
}).extend({
  url: z.string().url("Please enter a valid URL").refine(
    (url) => url.includes('tiktok.com') || url.includes('vm.tiktok.com') || url.includes('vt.tiktok.com'),
    "Please enter a valid TikTok URL"
  ),
  format: z.enum(["mp4", "mp3"]),
  quality: z.enum(["hd", "standard"]),
});

export const videoInfoSchema = z.object({
  title: z.string(),
  duration: z.number(),
  thumbnail: z.string().url(),
  formats: z.array(z.object({
    type: z.enum(["mp4", "mp3"]),
    quality: z.enum(["hd", "standard"]),
    size: z.string().optional(),
  })),
});

export type InsertDownload = z.infer<typeof insertDownloadSchema>;
export type Download = typeof downloads.$inferSelect;
export type VideoInfo = z.infer<typeof videoInfoSchema>;
