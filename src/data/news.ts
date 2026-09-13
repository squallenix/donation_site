export interface NewsArticle {
  id: string;
  title: string;
  snippet: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}

export const LATEST_NEWS: NewsArticle[] = [
  {
    id: "earthquakes-questions-answered",
    title: "Earthquakes: Your questions answered",
    snippet:
      "In late August, a 6.0 magnitude struck eastern Afghanistan, killing more than 800 people and injuring thousands across rural communities.",
    image:
      "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=800&q=80",
    category: "EMERGENCY BRIEF",
    date: "Aug 28, 2026",
    readTime: "3 min read",
  },
  {
    id: "urgent-appeal-survivors-afghanistan",
    title: "Urgent appeal to support survivors of Afghanistan",
    snippet:
      "SADAQAH BD is appealing for support to reach communities affected by a powerful earthquake in hard-to-reach mountainous provinces.",
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
    category: "FIELD REPORT",
    date: "Aug 26, 2026",
    readTime: "4 min read",
  },
  {
    id: "sadaqah-bd-deploys-aid-workers",
    title: "SADAQAH BD deploys aid workers to provide critical services",
    snippet:
      "Teams on the ground have mobilized emergency mobile health units, clean potable water tankers, and warm shelters for displaced families.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    category: "DISPATCH",
    date: "Aug 24, 2026",
    readTime: "2 min read",
  },
];
