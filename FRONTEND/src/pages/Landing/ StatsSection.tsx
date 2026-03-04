export default function StatsSection() {

  const stats = [
    { value: "2,500+", label: "Events Hosted" },
    { value: "15,000+", label: "Active Members" },
    { value: "120+", label: "Cities" },
    { value: "98%", label: "Satisfaction" },
  ]

  return (
    <section className="border-y bg-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        <div className="grid grid-cols-2 gap-10 text-center md:grid-cols-4">

          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">

              <span className="text-3xl font-bold text-primary lg:text-4xl">
                {stat.value}
              </span>

              <span className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </span>

            </div>
          ))}

        </div>

      </div>
    </section>
  )
}