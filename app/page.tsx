import { BanInBrief } from "@/components/BanInBrief";
import { HeroText } from "@/components/HeroText";
import { PreviewReelProvider } from "@/components/PreviewReelProvider";
import { QuestionList } from "@/components/QuestionList";
import { StickySection } from "@/components/StickySection";
import { TallyForm } from "@/components/TallyForm";
import { VideoColumn } from "@/components/VideoColumn";
import { VideoLightboxProvider } from "@/components/VideoLightbox";
import { columnAQuestions, columnBQuestions } from "@/data/questions";

const panelClass =
  "-mt-16 rounded-t-[2.5rem] border-t border-white/50 px-6 pt-16 shadow-[0_-24px_60px_-30px_rgba(187,52,47,0.25)] md:px-10 lg:px-16";

function PanelHairline() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[2.5rem] bg-gradient-to-r from-transparent via-[#DDA448] to-transparent"
    />
  );
}

function HeroVideoGrid() {
  return (
    <PreviewReelProvider>
      <div
        aria-label="Video previews"
        className="hero-video-grid hidden h-full w-[45%] shrink-0 items-start justify-center gap-[var(--column-gap)] overflow-hidden px-6 xl:px-10 lg:flex"
      >
        <VideoColumn
          questions={columnAQuestions}
          direction="up"
          delaySeconds={-7}
          className="h-full"
        />
        <VideoColumn
          questions={columnBQuestions}
          direction="down"
          className="h-full"
        />
      </div>
    </PreviewReelProvider>
  );
}

export default function Home() {
  return (
    <VideoLightboxProvider>
      <div className="bg-[#F8F7FF]">
        <section
          aria-label="Introduction"
          className="sticky top-0 z-0 h-svh overflow-hidden"
        >
          <div className="mx-auto flex h-full max-w-[96rem] flex-col lg:flex-row">
            <HeroVideoGrid />

            <div className="flex h-full flex-1 items-center lg:w-[55%]">
              <HeroText />
            </div>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#F8F7FF]/70"
          />
        </section>

        <StickySection
          aria-label="The ban, in brief"
          className={`z-10 bg-[#F8F7FF]/80 pb-24 backdrop-blur-2xl ${panelClass}`}
        >
          <PanelHairline />
          <div className="mx-auto w-full max-w-5xl">
            <BanInBrief />
          </div>
        </StickySection>

        <StickySection
          aria-labelledby="questions-heading"
          className={`z-20 bg-[#F8F7FF]/80 pb-24 backdrop-blur-2xl ${panelClass}`}
        >
          <PanelHairline />
          <div className="mx-auto w-full max-w-5xl">
            <QuestionList />
          </div>
        </StickySection>

        <section
          aria-labelledby="submit-heading"
          className={`relative z-30 overflow-hidden bg-[#F8F7FF] pb-28 ${panelClass}`}
        >
          <PanelHairline />

          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 top-12 h-72 w-72 rounded-full bg-[#DDA448]/45 blur-3xl" />
            <div className="absolute -right-12 top-40 h-80 w-80 rounded-full bg-[#BB342F]/35 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#DDA448]/30 blur-3xl" />
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-white/30 backdrop-blur-2xl"
          />

          <div className="relative mx-auto max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-[#DDA448] to-[#BB342F]" />
              <h2
                id="submit-heading"
                className="font-serif text-3xl font-bold tracking-tight text-black md:text-4xl"
              >
                Have a question of your own?
              </h2>
            </div>
            <p className="mt-5 font-serif text-lg leading-relaxed text-neutral-800">
              Have a question that is not answered here? Submit it using the box
              below. We are gathering the questions people ask most, and the
              Minister will answer a selection of them in a final, quickfire
              round-up video. You do not need to give any personal details to ask
              a question, we will only use your question to help shape the video.
            </p>
            <div className="mt-10">
              <TallyForm />
            </div>
          </div>
        </section>
      </div>
    </VideoLightboxProvider>
  );
}
