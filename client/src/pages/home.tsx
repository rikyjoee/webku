import { Download, Eye, Music, Video, Smartphone, Monitor, Shield, Zap } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import DownloadForm from "@/components/download-form";
import FeatureCard from "@/components/feature-card";
import DeviceGuide from "@/components/device-guide";
import FaqSection from "@/components/faq-section";

export default function Home() {
  const features = [
    {
      icon: <Download className="w-8 h-8" />,
      title: "Unlimited Downloads",
      description: "Save as many TikTok videos as you want without any restrictions or limits.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=200"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "No Watermark",
      description: "Remove TikTok watermarks automatically and get clean, professional videos.",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=200"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "MP4 & MP3",
      description: "Download videos in HD MP4 format or extract audio as high-quality MP3 files.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=200"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Process and download TikTok videos in seconds with our optimized servers.",
      bgColor: "bg-purple-500"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "All Devices",
      description: "Works perfectly on iPhone, Android, PC, Mac, and tablets. No app required.",
      bgColor: "bg-green-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "100% Secure",
      description: "Your privacy is protected. We don't store your data or downloaded videos.",
      bgColor: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <SiTiktok className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">SSSTikTok</h1>
                <p className="text-sm text-muted-foreground">Video Downloader</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#how-to-use" className="text-muted-foreground hover:text-primary transition-colors">How to Use</a>
              <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-bg py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Download TikTok Videos
            <span className="text-yellow-300"> Without Watermark</span>
          </h2>
          <p className="text-xl text-gray-100 mb-12 max-w-2xl mx-auto">
            Save TikTok videos in HD quality, MP4 or MP3 format. Fast, free, and no registration required.
          </p>
          
          <DownloadForm />
          
          <div className="text-center mt-8">
            <p className="text-gray-200 text-sm">
              <Shield className="inline w-4 h-4 mr-2" />
              100% Free • No Registration • Privacy Protected
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose SSSTikTok?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The most reliable TikTok downloader with powerful features for all your video saving needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section id="how-to-use" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">How to Download TikTok Videos</h2>
            <p className="text-xl text-muted-foreground">Simple 3-step process to save any TikTok video</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Copy TikTok Link</h3>
              <p className="text-muted-foreground mb-6">Open TikTok app, find the video you want to download, tap 'Share' and copy the link.</p>
              <div className="bg-gray-50 rounded-xl p-4">
                <SiTiktok className="text-4xl text-primary mb-2 mx-auto" />
                <p className="text-sm text-muted-foreground">Share → Copy Link</p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Paste & Process</h3>
              <p className="text-muted-foreground mb-6">Paste the TikTok URL into our downloader and click the Download button.</p>
              <div className="bg-gray-50 rounded-xl p-4">
                <Download className="text-4xl text-secondary mb-2 mx-auto" />
                <p className="text-sm text-muted-foreground">Paste URL → Download</p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Save Video</h3>
              <p className="text-muted-foreground mb-6">Choose your preferred format (MP4 or MP3) and save the video to your device.</p>
              <div className="bg-gray-50 rounded-xl p-4">
                <Video className="text-4xl text-accent mb-2 mx-auto" />
                <p className="text-sm text-muted-foreground">MP4 / MP3 → Save</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Guides */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Device-Specific Guides</h2>
            <p className="text-xl text-muted-foreground">Step-by-step instructions for different devices</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DeviceGuide 
              icon={<Monitor className="w-8 h-8" />}
              title="PC & Mac"
              subtitle="Windows, Mac, Linux - All browsers supported"
              bgColor="from-blue-500 to-purple-600"
              image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300"
              steps={[
                "Open TikTok in your web browser or mobile app",
                "Copy the video URL from the address bar or share menu",
                "Paste the URL into SSSTikTok and click Download",
                "Choose your format and save to your computer"
              ]}
            />
            
            <DeviceGuide 
              icon={<Smartphone className="w-8 h-8" />}
              title="iPhone & iPad"
              subtitle="iOS 12+ with Documents by Readdle app"
              bgColor="from-pink-500 to-orange-500"
              image="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300"
              steps={[
                'Install "Documents by Readdle" from App Store',
                "Copy TikTok video link from the TikTok app",
                "Open Documents app and tap browser icon",
                "Go to SSSTikTok.io and paste the link"
              ]}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <SiTiktok className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">SSSTikTok</h3>
                  <p className="text-gray-400 text-sm">Video Downloader</p>
                </div>
              </div>
              <p className="text-gray-400">
                The most reliable TikTok video downloader. Download videos without watermarks in HD quality.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>• No Watermark</li>
                <li>• HD Quality</li>
                <li>• MP4 & MP3</li>
                <li>• All Devices</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>• How to Use</li>
                <li>• FAQ</li>
                <li>• Contact Us</li>
                <li>• Privacy Policy</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <SiTiktok className="text-xl" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 SSSTikTok. All rights reserved. | 
              <a href="#" className="text-primary hover:underline ml-2">Privacy Policy</a> | 
              <a href="#" className="text-primary hover:underline ml-2">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
