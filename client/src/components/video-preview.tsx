import { Button } from "@/components/ui/button";
import { Music, Video, Download } from "lucide-react";
import type { VideoInfo } from "@shared/schema";

interface VideoPreviewProps {
  videoInfo: VideoInfo;
  onDownload: (format: "mp4" | "mp3", quality: "hd" | "standard") => void;
  isDownloading: boolean;
}

export default function VideoPreview({ videoInfo, onDownload, isDownloading }: VideoPreviewProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mt-6 bg-gray-50 rounded-xl p-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
          <img 
            src={videoInfo.thumbnail} 
            alt="Video thumbnail" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">{videoInfo.title}</h3>
          <p className="text-muted-foreground text-sm">
            Duration: {formatDuration(videoInfo.duration)} | Quality: HD
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {videoInfo.formats.map((format, index) => (
          <Button
            key={index}
            onClick={() => onDownload(format.type, format.quality)}
            disabled={isDownloading}
            variant="outline"
            className="flex items-center justify-between p-4 h-auto bg-white hover:bg-gray-50"
          >
            <div className="flex items-center space-x-2">
              {format.type === "mp4" ? (
                <Video className="w-5 h-5" />
              ) : (
                <Music className="w-5 h-5" />
              )}
              <span className="font-medium">
                {format.type.toUpperCase()} {format.quality.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {format.size && (
                <span className="text-sm text-muted-foreground">{format.size}</span>
              )}
              <Download className="w-4 h-4" />
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
