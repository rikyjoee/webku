import { Progress } from "@/components/ui/progress";
import type { Download } from "@shared/schema";

interface ProgressBarProps {
  download: Download;
}

export default function ProgressBar({ download }: ProgressBarProps) {
  const getProgress = () => {
    switch (download.status) {
      case "pending":
        return 0;
      case "processing":
        return 50;
      case "completed":
        return 100;
      default:
        return 0;
    }
  };

  const getStatusText = () => {
    switch (download.status) {
      case "pending":
        return "Initializing...";
      case "processing":
        return "Processing video...";
      case "completed":
        return "Complete!";
      case "failed":
        return "Failed to process";
      default:
        return "Processing...";
    }
  };

  return (
    <div className="mt-6">
      <Progress value={getProgress()} className="mb-4" />
      <p className="text-sm text-muted-foreground text-center">
        {getStatusText()}
      </p>
    </div>
  );
}
