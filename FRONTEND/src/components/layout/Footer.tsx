import { Link } from "react-router-dom"
import Logo from "../logo/Logo"

export default function Footer() {
  return (
    <footer className="border-t bg-background mt-20">

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <Logo />

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/events">Events</Link>
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>

        </div>

        <div className="mt-6 border-t pt-6 text-center text-sm text-muted-foreground">
          Built for communities. © 2026 EventFinder.
        </div>

      </div>

    </footer>
  )
}