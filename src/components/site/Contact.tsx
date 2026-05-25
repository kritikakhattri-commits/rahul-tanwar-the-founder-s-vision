export function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <div className="eyebrow reveal">Chapter VI — Contact</div>
            <h2 className="mt-6 font-display text-display-lg reveal">
              Let's build something <em className="text-accent">meaningful.</em>
            </h2>
            <p className="mt-8 max-w-xl text-lg text-ink-soft leading-relaxed reveal">
              For partnerships, investment conversations, press and speaking
              enquiries — the office of Rahul Tanwar responds personally.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 reveal">
              <a href="mailto:office@rahultanwar.com" className="magnetic-btn">
                <span>Connect with Office</span><span>→</span>
              </a>
              <a href="#ventures" className="ghost-btn">
                <span>Explore the Ecosystem</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 lg:border-l lg:pl-12 border-border space-y-8 reveal-up">
            <div>
              <div className="eyebrow">Office</div>
              <div className="mt-2 font-display text-2xl">New Delhi, India</div>
            </div>
            <div>
              <div className="eyebrow">Email</div>
              <a href="mailto:office@rahultanwar.com" className="mt-2 block font-display text-2xl hover:text-accent transition-colors">
                office@rahultanwar.com
              </a>
            </div>
            <div>
              <div className="eyebrow">Social</div>
              <div className="mt-2 flex gap-4 text-sm">
                <a href="#" className="underline-offset-4 hover:underline">LinkedIn</a>
                <a href="#" className="underline-offset-4 hover:underline">X / Twitter</a>
                <a href="#" className="underline-offset-4 hover:underline">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-display text-lg">Rahul Tanwar</span>
        </div>
        <div className="text-xs tracking-[0.2em] uppercase text-ink-soft">
          © {new Date().getFullYear()} — Office of Rahul Tanwar. All rights reserved.
        </div>
        <div className="text-xs tracking-[0.2em] uppercase text-ink-soft">An Ecosystem in Motion</div>
      </div>
    </footer>
  );
}
