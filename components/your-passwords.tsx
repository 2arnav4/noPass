import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
// Interface for password properties
interface Password {
  website: string;
  username: string; // Name on the site
  password: string;
}

export function YourPasswords({ passwords }: { passwords: Password[] }) {
  return (
    <div className="space-y-4 h-44 overflow-y-auto">
      {passwords.length === 0 && (
        <span className="text-muted-foreground">"No passwords added"</span>
      )}

      {passwords.map((password: Password) => (
        <Card key={password.website} className="p-4 shadow-md">
          <div>
            <Link href={password.website} target="_blank">
              <div className="font-semibold cursor-pointer text-blue-600">
                {password.website}
              </div>
            </Link>
          </div>

          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {password.website}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Username: {password.username}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              <strong>Password:</strong>{" "}
              <span className="blur-sm hover:blur-none">
                {password.password}
              </span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
