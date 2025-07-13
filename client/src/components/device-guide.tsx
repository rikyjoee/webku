import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface DeviceGuideProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  bgColor: string;
  image: string;
  steps: string[];
}

export default function DeviceGuide({ icon, title, subtitle, bgColor, image, steps }: DeviceGuideProps) {
  return (
    <Card className="shadow-lg overflow-hidden">
      <div className={`bg-gradient-to-r ${bgColor} p-6`}>
        <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
          <span className="mr-3">{icon}</span>
          {title}
        </h3>
        <p className="text-white/80">{subtitle}</p>
      </div>
      <CardContent className="p-6">
        <div className="space-y-4 mb-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-muted-foreground">{step}</p>
            </div>
          ))}
        </div>
        <img 
          src={image} 
          alt={`${title} guide`} 
          className="w-full rounded-lg"
        />
      </CardContent>
    </Card>
  );
}
