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
  username: string;
  password: string;
}

export function YourPasswords({ passwords }: { passwords: Password[] }) {
  return (
    <div className="space-y-4 h-44 overflow-y-auto">
      {passwords.length === 0 && (
        <span className="text-muted-foreground">No passwords added</span>
      )}

      {passwords.map((password: Password) => (
        <Card key={`${password.website}-${password.username}`} className="p-4 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              <Link
                href={password.website}
                target="_blank"
                className="text-blue-600 hover:underline"
                aria-label={`Visit ${password.website}`}
              >
                {password.website}
              </Link>
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Username: {password.username}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              <strong>Password:</strong>{" "}
              <span className="tracking-widest select-none">
                •••••••••
              </span> {/* Masked password for better security */}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
