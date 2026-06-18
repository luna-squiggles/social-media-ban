"use client";

import { questions } from "@/data/questions";
import { useVideoLightbox } from "@/components/VideoLightbox";

export function QuestionList() {
  const { open } = useVideoLightbox();

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-[#DDA448] to-[#BB342F]" />
        <h2
          id="questions-heading"
          className="font-serif text-3xl font-bold tracking-tight text-black md:text-4xl"
        >
          All 16 questions
        </h2>
      </div>

      <ol className="mt-10 sm:columns-2 sm:gap-x-12">
        {questions.map((question, index) => (
          <li key={question.id} className="break-inside-avoid border-b border-black/10">
            <button
              type="button"
              onClick={() => open(question.youtubeId, question.title)}
              className="group flex w-full gap-4 rounded-lg px-2 py-4 text-left transition-colors hover:bg-[#BB342F]/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BB342F]"
            >
              <span className="w-8 shrink-0 font-serif text-sm font-semibold tabular-nums text-[#DDA448]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-serif text-lg leading-snug text-black transition-colors group-hover:text-[#BB342F] md:text-xl">
                {question.title}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
