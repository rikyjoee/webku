import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isValidTikTokUrl } from "@/lib/tiktok-utils";
import ProgressBar from "./progress-bar";
import VideoPreview from "./video-preview";
import type { VideoInfo, Download as DownloadType } from "@shared/schema";

export default function DownloadForm() {
  const [url, setUrl] = useState("");
  const [downloadId, setDownloadId] = useState<number | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const videoInfoMutation = useMutation({
    mutationFn: async (url: string) => {
      const res = await apiRequest("POST", "/api/video-info", { url });
      return res.json() as Promise<VideoInfo>;
    },
    onSuccess: (data) => {
      console.log("Video info:", data);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to get video information",
        variant: "destructive",
      });
    },
  });

  const downloadMutation = useMutation({
    mutationFn: async ({ url, format, quality }: { url: string; format: "mp4" | "mp3"; quality: "hd" | "standard" }) => {
      const res = await apiRequest("POST", "/api/downloads", { url, format, quality });
      return res.json() as Promise<DownloadType>;
    },
    onSuccess: (data) => {
      setDownloadId(data.id);
      queryClient.invalidateQueries({ queryKey: ["/api/downloads"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to start download",
        variant: "destructive",
      });
    },
  });

  const { data: downloadStatus } = useQuery({
    queryKey: ["/api/downloads", downloadId],
    enabled: !!downloadId,
    refetchInterval: downloadId ? 1000 : false,
  });

  const handleDownload = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a TikTok URL",
        variant: "destructive",
      });
      return;
    }

    if (!isValidTikTokUrl(url)) {
      toast({
        title: "Error",
        description: "Please enter a valid TikTok URL",
        variant: "destructive",
      });
      return;
    }

    // First get video info
    videoInfoMutation.mutate(url);
  };

  const handleFormatDownload = (format: "mp4" | "mp3", quality: "hd" | "standard") => {
    downloadMutation.mutate({ url, format, quality });
  };

  const isLoading = videoInfoMutation.isPending || downloadMutation.isPending;

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="url"
            placeholder="Paste TikTok URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="url-input px-6 py-4 text-lg h-14 border-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary"
          />
        </div>
        <Button
          onClick={handleDownload}
          disabled={isLoading}
          className="download-btn px-8 py-4 text-lg h-14 bg-primary hover:bg-primary/90"
        >
          <Download className="w-5 h-5 mr-2" />
          {isLoading ? "Processing..." : "Download"}
        </Button>
      </div>

      {/* Progress Bar */}
      {downloadStatus && downloadStatus.status !== "completed" && downloadStatus.status !== "failed" && (
        <ProgressBar download={downloadStatus} />
      )}

      {/* Download Failed */}
      {downloadStatus?.status === "failed" && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-red-800">Download Failed</h3>
              <p className="text-red-600">Gagal memproses video TikTok. Silakan coba lagi atau gunakan URL yang berbeda.</p>
            </div>
            <Button
              onClick={() => {
                setUrl("");
                setDownloadId(null);
                videoInfoMutation.reset();
                downloadMutation.reset();
              }}
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        </div>
      )}

      {/* Video Preview */}
      {videoInfoMutation.data && (
        <VideoPreview
          videoInfo={videoInfoMutation.data}
          onDownload={handleFormatDownload}
          isDownloading={downloadMutation.isPending}
        />
      )}

      {/* Download Complete */}
      {downloadStatus?.status === "completed" && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-800">Download Complete!</h3>
                <p className="text-green-600">File {downloadStatus.format.toUpperCase()} siap untuk diunduh.</p>
                <p className="text-sm text-gray-600">
                  {downloadStatus.title} | {downloadStatus.quality.toUpperCase()} Quality
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => {
                    if (downloadStatus.downloadUrl) {
                      // Create a temporary link element to trigger download
                      const link = document.createElement('a');
                      link.href = downloadStatus.downloadUrl;
                      link.download = `${downloadStatus.title?.replace(/[^a-zA-Z0-9]/g, '_') || 'tiktok_video'}_${downloadStatus.id}.${downloadStatus.format}`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      
                      // Show success notification
                      toast({
                        title: "Download Started",
                        description: `File ${downloadStatus.format.toUpperCase()} sedang diunduh ke perangkat Anda.`,
                        variant: "default",
                      });
                    }
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download File
                </Button>
                <Button
                  onClick={() => {
                    setUrl("");
                    setDownloadId(null);
                    videoInfoMutation.reset();
                    downloadMutation.reset();
                  }}
                  variant="outline"
                >
                  New Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
