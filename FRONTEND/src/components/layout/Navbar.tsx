import { Link } from "react-router-dom"
import Logo from "../logo/Logo"
import { Button } from "../ui/button"

export default function Navbar() {
  return (
    <header className="border-b bg-background">
      
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">

        <Logo />

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/events" className="text-muted-foreground hover:text-foreground">
            Browse Events
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost">Log In</Button>
          </Link>

          <Link to="/register">
            <Button>Sign Up</Button>
          </Link>
        </div>

      </div>

    </header>
  )
}