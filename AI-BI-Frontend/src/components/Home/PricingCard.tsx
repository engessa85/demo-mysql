
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const PricingCard = ({
  title,
  price,
  features,
  buttonText,
  buttonVariant,
}: {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  buttonVariant: "default" | "outline";
}) => {
  return (
    <Card className="bg-white/5  border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-600 dark:text-white">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-400">{price}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="text-gray-400">
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant={buttonVariant} className="bg-button hover:scale-105">
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};
