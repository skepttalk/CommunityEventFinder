import Navbar from "./Navbar"

export default function MainLayout({ children }: any) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        {children}
      </div>
    </div>
  )
}