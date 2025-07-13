import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  image?: string;
  bgColor?: string;
}

export default function FeatureCard({ icon, title, description, image, bgColor = "bg-primary" }: FeatureCardProps) {
  return (
    <Card className="feature-card bg-white shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-8 text-center">
        {image && (
          <div className="w-full h-32 mb-6 overflow-hidden rounded-lg">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
