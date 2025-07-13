import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function FaqSection() {
  const faqs = [
    {
      question: "Is it legal to download TikTok videos?",
      answer: "Yes, downloading TikTok videos for personal use is generally legal. However, respect copyright laws and don't redistribute content without permission from the creator."
    },
    {
      question: "What video quality can I download?",
      answer: "You can download TikTok videos in their original quality, up to 1080p HD. We preserve the original resolution and quality of the video."
    },
    {
      question: "Do I need to create an account?",
      answer: "No registration required! Simply paste the TikTok URL and download. We don't store your personal information or downloaded videos."
    },
    {
      question: "Can I download private TikTok videos?",
      answer: "No, our service only works with public TikTok videos. Private videos and content from private accounts cannot be downloaded."
    }
  ];

  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">Everything you need to know about downloading TikTok videos</p>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
                  <HelpCircle className="w-6 h-6 text-primary mr-3" />
                  {faq.question}
                </h3>
                <p className="text-muted-foreground pl-9">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
