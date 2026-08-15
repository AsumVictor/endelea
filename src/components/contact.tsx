import { ArrowRightIcon, StarIcon } from "@/components/icons";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-[#B7AC9C] px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-[#14150f]" />
          <span className="text-xs font-medium tracking-widest text-[#4B453C] uppercase">
            Our Company
          </span>
        </div>

        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#1E1B16] sm:text-5xl">
          Ready to build something?
        </h2>

        <p className="mt-6 max-w-md leading-relaxed text-[#3F392F]">
          Whether you&rsquo;re modernizing legacy workflows, launching a new
          product, or scaling infrastructure, Endelea is here to make it
          happen. From custom software to AI and IoT, we&rsquo;ve delivered
          systems that stand the test of time — now it&rsquo;s your turn to
          see what&rsquo;s possible.
        </p>

        <a
          href="#contact"
          className="mt-8 inline-flex items-center gap-2 border border-[#1E1B16]/15 bg-[#F4F2ED] px-6 py-3 text-sm font-semibold text-[#1E1B16] transition-colors hover:bg-white"
        >
          Book for Consultancy
          <ArrowRightIcon />
        </a>

        <div className="mt-10 max-w-sm bg-[#3F392F] p-6">
          <div className="flex gap-1 text-[#D4EC3A]">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
          <p className="mt-4 text-white/90">
            &ldquo;Endelea handled our platform rebuild with unmatched
            professionalism and skill. From planning to launch, every detail
            was considered.&rdquo;
          </p>
          <div className="mt-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-white">
                — Jordan Ekwueme
              </p>
              <p className="text-xs tracking-wide text-white/50 uppercase">
                Arcadia Robotics
              </p>
            </div>
            <div className="h-12 w-12 shrink-0 bg-[#6E7B8B]" />
          </div>
        </div>
      </div>

      <div className="bg-[#F4F2ED] px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <h2 className="text-3xl font-semibold tracking-tight text-[#14150f] sm:text-4xl">
          Want to optimize your process?
        </h2>

        <form className="mt-10 flex flex-col gap-6">
          <div>
            <label
              htmlFor="name"
              className="text-xs font-medium tracking-widest text-zinc-500 uppercase"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name here"
              className="mt-2 w-full bg-[#DCD4C7] px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-2 focus:outline-[#14150f]"
            />
          </div>

          <div className="grid gap-6">
            <div>
              <label
                htmlFor="email"
                className="text-xs font-medium tracking-widest text-zinc-500 uppercase"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                className="mt-2 w-full bg-[#DCD4C7] px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-2 focus:outline-[#14150f]"
              />
            </div>
           
          </div>

          <div>
            <label
              htmlFor="message"
              className="text-xs font-medium tracking-widest text-zinc-500 uppercase"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Describe your project vision"
              className="mt-2 w-full resize-none bg-[#DCD4C7] px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-2 focus:outline-[#14150f]"
            />
          </div>

          <label className="flex items-start gap-3 text-sm text-zinc-700">
            <input
              type="checkbox"
              name="consent"
              className="mt-0.5 h-4 w-4 shrink-0 border border-zinc-400"
            />
            I allow Endelea to store my details for communication.
          </label>

          <div className="flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-end">
            <p className="text-xs text-zinc-500">
              We&rsquo;ll reply within 24&ndash;48h.
              <br />
              By sending, you accept our{" "}
              <a href="#privacy" className="underline">
                Privacy Policy
              </a>
              .
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-[#D4EC3A] px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#c3da2f]"
            >
              Send Message
              <ArrowRightIcon />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
