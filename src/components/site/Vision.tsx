import visionImg from "@/assets/rahul-vision.jpg";

export function Vision() {
  return (
    <section id="vision" className="relative bg-ink text-background py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img
          src={visionImg}
          alt="Rahul Tanwar — vision portrait"
          loading="lazy"
          className="h-full w-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      </div>
      <div className="absolute inset-0 grain" />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex items-center gap-4 mb-16">
          <span className="h-px w-12 bg-accent" />
          <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-accent">
            Chapter V — Vision
          </span>
        </div>

        <h2 className="font-display text-display-xl leading-[0.96] max-w-[14ch]">
          <span className="block">Building organisations</span>
          <span className="block italic text-accent">that outlive</span>
          <span className="block">their founders.</span>
        </h2>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl">
          <p className="text-lg leading-[1.75] text-background/70">
            A business is only meaningful if it serves a generation longer than the one that built
            it.
          </p>
          <div className="hidden md:block" />
          <p className="text-lg leading-[1.75] text-background/70 md:text-right">
            The work is the legacy. The team is the multiplier. Time is the only honest measure.
          </p>
        </div>
      </div>
    </section>
  );
}
