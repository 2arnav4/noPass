import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Interface for card properties
interface CardProps {
  cardNo: string;
  name: string;  // Name on the card
  expiry: string;
  cvv: number;
}

export function YourCards({ cards }: { cards: CardProps[] }) {
  return (
    <div className="space-y-4 h-44 overflow-y-auto">
      {cards.length === 0 && <span className="text-muted-foreground">No cards added</span>}
      
      {cards.map((card: CardProps) => (
        <Card key={card.cardNo} className="p-4 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{card.cardNo}</CardTitle>
            <CardDescription className="text-muted-foreground">{card.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              <strong>Expires:</strong> {card.expiry}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>CVV:</strong> XXX  {/* Masking CVV for security */}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
