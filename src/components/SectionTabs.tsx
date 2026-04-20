const TAB_ITEMS = ['Overview', 'Matrix', 'Insights', 'History'];

export function SectionTabs() {
  return (
    <section aria-labelledby="section-tabs-title" className="relative">
      <div className="overflow-hidden rounded-[28px] border border-border/[0.55] bg-white/[0.7] px-6 py-5 shadow-[0_22px_70px_rgba(91,50,32,0.10)] backdrop-blur-xl sm:px-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Workspace preview
            </p>
            <h2
              className="font-display text-2xl font-semibold tracking-[-0.03em] text-foreground"
              id="section-tabs-title"
            >
              A lightweight tab bar for the main decision flow.
            </h2>
          </div>

          <ul
            aria-label="Placeholder workspace tabs"
            className="flex flex-wrap gap-2"
          >
            {TAB_ITEMS.map((label, index) => {
              const isActive = index === 0;

              return (
                <li key={label}>
                  <span
                    aria-current={isActive ? 'page' : undefined}
                    className={`inline-flex min-w-28 items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-[0_12px_30px_rgba(155,87,46,0.2)]'
                        : 'border border-border/[0.6] bg-white/[0.65] text-foreground/80'
                    }`}
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
