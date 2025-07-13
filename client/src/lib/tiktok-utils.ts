export function isValidTikTokUrl(url: string): boolean {
  if (!url) return false;
  
  const tiktokPatterns = [
    /^https?:\/\/(www\.)?tiktok\.com\/@[\w.-]+\/video\/\d+/,
    /^https?:\/\/(www\.)?tiktok\.com\/t\/[\w-]+/,
    /^https?:\/\/vm\.tiktok\.com\/[\w-]+/,
    /^https?:\/\/vt\.tiktok\.com\/[\w-]+/,
    /^https?:\/\/m\.tiktok\.com\/v\/\d+/,
  ];
  
  return tiktokPatterns.some(pattern => pattern.test(url));
}

export function extractTikTokId(url: string): string | null {
  const patterns = [
    /\/video\/(\d+)/,
    /\/t\/([\w-]+)/,
    /vm\.tiktok\.com\/([\w-]+)/,
    /vt\.tiktok\.com\/([\w-]+)/,
    /\/v\/(\d+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
}

export function formatFileSize(bytes: number): string {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
