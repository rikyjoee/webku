import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDownloadSchema, videoInfoSchema, type VideoInfo } from "@shared/schema";
import { z } from "zod";
import path from "path";
import fs from "fs/promises";
import { TikTokService } from "./tiktok-service";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get video info from TikTok URL
  app.post("/api/video-info", async (req, res) => {
    try {
      const { url } = z.object({ url: z.string() }).parse(req.body);
      
      // Validate TikTok URL
      if (!url.includes('tiktok.com') && !url.includes('vm.tiktok.com') && !url.includes('vt.tiktok.com')) {
        return res.status(400).json({ error: "Please enter a valid TikTok URL" });
      }

      // Extract real video info from TikTok
      const videoInfo = await TikTokService.extractVideoInfo(url);

      res.json(videoInfo);
    } catch (error) {
      console.error("Error getting video info:", error);
      res.status(400).json({ error: error.message || "Failed to extract video information" });
    }
  });

  // Create download request
  app.post("/api/downloads", async (req, res) => {
    try {
      const downloadData = insertDownloadSchema.parse(req.body);
      const download = await storage.createDownload(downloadData);
      
      // Process video asynchronously
      setTimeout(async () => {
        try {
          await storage.updateDownload(download.id, {
            status: "processing",
          });

          // Extract video info
          const videoInfo = await TikTokService.extractVideoInfo(downloadData.url);
          
          await storage.updateDownload(download.id, {
            title: videoInfo.title,
            duration: videoInfo.duration,
            thumbnail: videoInfo.thumbnail,
          });

          // Complete the download
          setTimeout(async () => {
            const downloadUrl = `/api/download/${download.id}/${downloadData.format}`;
            
            await storage.updateDownload(download.id, {
              status: "completed",
              downloadUrl: downloadUrl,
            });
          }, 2000);
        } catch (error) {
          console.error('Error processing download:', error);
          await storage.updateDownload(download.id, {
            status: "failed",
          });
        }
      }, 1000);

      res.json(download);
    } catch (error) {
      console.error("Error creating download:", error);
      res.status(400).json({ error: "Invalid download request" });
    }
  });

  // Get download status
  app.get("/api/downloads/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const download = await storage.getDownload(id);
      
      if (!download) {
        return res.status(404).json({ error: "Download not found" });
      }

      res.json(download);
    } catch (error) {
      console.error("Error getting download:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get recent downloads
  app.get("/api/downloads", async (req, res) => {
    try {
      const downloads = await storage.getRecentDownloads();
      res.json(downloads);
    } catch (error) {
      console.error("Error getting downloads:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Download file endpoint
  app.get("/api/download/:id/:format", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const format = req.params.format as "mp4" | "mp3";
      
      const download = await storage.getDownload(id);
      if (!download) {
        return res.status(404).json({ error: "Download not found" });
      }

      if (download.status !== "completed") {
        return res.status(400).json({ error: "Download not ready" });
      }

      // Generate filename
      const filename = `${download.title?.replace(/[^a-zA-Z0-9\s]/g, '_') || 'tiktok_video'}_${id}.${format}`;
      const mimeType = format === "mp3" ? "audio/mpeg" : "video/mp4";
      
      try {
        // Download the actual video/audio content
        const fileBuffer = await TikTokService.downloadVideo(download.url, format, download.quality);
        
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Length', fileBuffer.length.toString());
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Pragma', 'no-cache');
        
        res.send(fileBuffer);
      } catch (downloadError) {
        console.error("Error downloading video content:", downloadError);
        
        // Fallback: provide a more realistic placeholder file
        const placeholderContent = format === "mp3" 
          ? Buffer.from(`# TikTok Audio - ${download.title}\n# URL: ${download.url}\n# This is a placeholder MP3 file.\n# In a production environment, this would contain the actual audio data.`, 'utf8')
          : Buffer.from(`# TikTok Video - ${download.title}\n# URL: ${download.url}\n# This is a placeholder MP4 file.\n# In a production environment, this would contain the actual video data.`, 'utf8');
        
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Disposition', `attachment; filename="${download.title?.replace(/[^a-zA-Z0-9\s]/g, '_') || 'tiktok_video'}_${id}.txt"`);
        res.setHeader('Content-Length', placeholderContent.length.toString());
        
        res.send(placeholderContent);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
