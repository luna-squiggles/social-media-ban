import { TweetEmbed } from "@/components/TweetEmbed";

export function BanInBrief() {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
      <div>
        <div className="flex items-center gap-3">
          <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-[#DDA448] to-[#BB342F]" />
          <h2 className="font-serif text-3xl font-bold tracking-tight text-black md:text-4xl">
            The ban, in brief
          </h2>
        </div>
        <p className="mt-5 font-serif text-lg leading-relaxed text-neutral-800">
          In June 2026, the Government announced that social media platforms will
          be required to stop offering their services to children under 16,
          alongside wider protections against harmful features online. The
          decision followed one of the largest public conversations of its kind,
          with more than 116,000 responses from parents, young people and
          experts. The measures are expected to be brought before Parliament
          before Christmas 2026, with the first protections coming into force in
          Spring 2027.
        </p>
      </div>

      <div className="w-full max-w-[550px] lg:justify-self-end">
        <TweetEmbed />
      </div>
    </div>
  );
}
