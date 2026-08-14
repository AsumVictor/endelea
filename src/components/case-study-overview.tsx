interface CaseStudyOverviewProps {
  eyebrow: string;
  title: string;
  description: string;
  stats: { label: string; value: string }[];
}

export function CaseStudyOverview({
  eyebrow,
  title,
  description,
  stats,
}: CaseStudyOverviewProps) {
  return (
    <section className="bg-white px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl border-t border-zinc-200">
        <div className="grid gap-12 py-16 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-zinc-200">
          <div className="lg:pr-16">
            <p className="text-sm font-medium text-[#C08A46]">{eyebrow}</p>
            <h2 className="mt-4 font-serif text-4xl text-[#1E3A4C] sm:text-5xl">
              {title}
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-zinc-600">
              {description}
            </p>
          </div>

          <div className="lg:pl-16">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between gap-6 border-b border-zinc-200 py-8 first:pt-0"
              >
                <p className="text-sm text-zinc-500">{stat.label}</p>
                <p className="text-right font-serif text-5xl text-[#1E3A4C] sm:text-6xl">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
