import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../logo/Logo";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
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
            className="text-muted-foreground hover:text-foreground"
          >
            Browse Events
          </Link>

          {user && (
            <>
              <Link
                to="/calendar"
                className="text-muted-foreground hover:text-foreground"
              >
                Calendar
              </Link>

              <Link
                to="/my-activity"
                className="text-muted-foreground hover:text-foreground"
              >
                My Activity
              </Link>
            </>
          )}

          {user?.role === "organizer" && (
            <Link
              to="/dashboard"
              className="text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>

          {!user && (
            <>
              <Link to="/login" className="hidden md:block">
                <Button variant="ghost">Log In</Button>
              </Link>

              <Link to="/register" className="hidden md:block">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}

          {user && (
            <>
              <Link to="/profile">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                  {initials}
                </div>
              </Link>

              <Button
                variant="outline"
                onClick={logout}
                className="hidden md:block"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="flex-1 bg-black/40" onClick={() => setOpen(false)} />

          <div className="w-64 bg-background h-full shadow-lg p-6 space-y-4">
            <button onClick={() => setOpen(false)}>
              <X size={22} />
            </button>

            <Link to="/events" onClick={() => setOpen(false)}>
              Browse Events
            </Link>

            {user && (
              <>
                <Link to="/calendar" onClick={() => setOpen(false)}>
                  Calendar
                </Link>

                <Link to="/my-activity" onClick={() => setOpen(false)}>
                  My Activity
                </Link>
              </>
            )}

            {user?.role === "organizer" && (
              <Link to="/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
            )}

            {!user && (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>
                  Login
                </Link>

                <Link to="/register" onClick={() => setOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}

            {user && (
              <button onClick={logout} className="text-red-600">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
