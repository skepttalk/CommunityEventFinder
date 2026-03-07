import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Logo />

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link
            to="/events"
            className="text-muted-foreground hover:text-foreground transition"
          >
            Browse Events
          </Link>

          {user && (
            <Link
              to="/calendar"
              className="text-muted-foreground hover:text-foreground transition"
            >
              Calendar
            </Link>
          )}

          {user?.role === "organizer" && (
            <Link
              to="/dashboard"
              className="text-muted-foreground hover:text-foreground transition"
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {!user && (
            <>
              <Link to="/login">
                <Button variant="ghost">Log In</Button>
              </Link>

              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}

          {user && (
            <>
              <Link to="/profile">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold hover:bg-indigo-700 transition cursor-pointer">
                  {initials}
                </div>
              </Link>

              <Button
                variant="outline"
                onClick={logout}
                className="hover:bg-red-50 hover:text-red-600 transition"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
