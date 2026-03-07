import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";

export default function Profile() {

  const { user } = useAuth();

  if (!user) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-10">

      <Card>
        <CardContent className="p-8 space-y-4">

          <h1 className="text-2xl font-bold">Profile</h1>

          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">{user.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="font-medium capitalize">{user.role}</p>
          </div>

        </CardContent>
      </Card>

    </div>
  );
}