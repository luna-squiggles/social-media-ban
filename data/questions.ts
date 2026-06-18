export type PreviewSegment = {
  start: number;
  end: number;
};

export type Question = {
  id: string;
  title: string;
  youtubeId: string;
  preview: PreviewSegment;
};

// The reel is a montage with one clip per question, in order.
// Segment length is derived from the reel duration so every clip maps cleanly.
const REEL_DURATION = 42.5;
const SEGMENT_LENGTH = REEL_DURATION / 16;

const entries: { title: string; youtubeId: string }[] = [
  { title: "Why this consultation, and why now?", youtubeId: "rSE_Bidz0PM" },
  {
    title:
      "Who did you actually listen to? Parents, young people, experts, tech companies?",
    youtubeId: "AKKRDhTh_nU",
  },
  {
    title: "So — is social media banned for under-16s or not?",
    youtubeId: "CgUPE08S3XA",
  },
  {
    title: "Why a ban over regulating harmful features?",
    youtubeId: "Xq0aQ97tnMA",
  },
  {
    title: "Will this water down the Online Safety Act?",
    youtubeId: "NOQmEdaiST4",
  },
  {
    title: "What did young people themselves say they wanted?",
    youtubeId: "cfDrHfYSJ1k",
  },
  {
    title: "What's the plan for tackling algorithmic harm?",
    youtubeId: "llJaAi8QQzA",
  },
  { title: "Won't kids just use VPNs?", youtubeId: "4uz4rF74Be4" },
  {
    title: "How can I vote at 16, without information at 16?",
    youtubeId: "NsLi2Sspkz0",
  },
  {
    title: "What happens to tech companies that don't comply?",
    youtubeId: "D7ifxE816z0",
  },
  {
    title: "How do you define social media in scope of a ban?",
    youtubeId: "RhXfnzrHRxo",
  },
  {
    title: "Where do young people find communities of support?",
    youtubeId: "-6HsDkk9I9M",
  },
  {
    title:
      "Will this make a measurable difference to anxiety, depression, and body image issues, and how long before we'll see these results in young people's wellbeing?",
    youtubeId: "fuXzhMEe5uA",
  },
  { title: "Is this a slippery slope to surveillance?", youtubeId: "YESa8Ysonj8" },
  { title: "How can personal data be kept safe?", youtubeId: "ybExN7xVyHI" },
  {
    title: "What does success look like in five years' time?",
    youtubeId: "9yPKf348Lfw",
  },
];

export const PREVIEW_REEL_URL = "/preview-reel.mp4";

export const questions: Question[] = entries.map((entry, index) => ({
  id: `q${String(index + 1).padStart(2, "0")}`,
  title: entry.title,
  youtubeId: entry.youtubeId,
  preview: {
    start: index * SEGMENT_LENGTH,
    end: index * SEGMENT_LENGTH + SEGMENT_LENGTH,
  },
}));

export const columnAQuestions = questions.slice(0, 8);
export const columnBQuestions = questions.slice(8, 16);
