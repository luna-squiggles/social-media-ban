import type { Question } from "@/data/questions";
import { VideoTile } from "@/components/VideoTile";

type VideoColumnProps = {
  questions: Question[];
  direction: "up" | "down";
  className?: string;
  /** Negative seconds to offset the loop's starting position for a staggered look. */
  delaySeconds?: number;
};

export function VideoColumn({
  questions,
  direction,
  className = "",
  delaySeconds = 0,
}: VideoColumnProps) {
  const loopedQuestions = [...questions, ...questions];
  const animationClass =
    direction === "up" ? "animate-scroll-up" : "animate-scroll-down";

  return (
    <div className={`relative h-full overflow-hidden ${className}`}>
      <div
        className={`flex flex-col gap-[var(--tile-gap)] will-change-transform ${animationClass}`}
        style={{
          animationDuration: direction === "up" ? "110s" : "125s",
          animationDelay: `${delaySeconds}s`,
        }}
      >
        {loopedQuestions.map((question, index) => (
          <VideoTile
            key={`${question.id}-${index}`}
            question={question}
          />
        ))}
      </div>
    </div>
  );
}
