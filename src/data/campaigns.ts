export interface Campaign {
  id: string;
  title: string;
  image: string;
  category: string;
  description: string;
  amounts: number[];
  defaultAmount: number;
  highlighted?: boolean;
}

export const CAMPAIGNS: Campaign[] = [
  {
    id: "afghanistan-earthquake",
    title: "Afghanistan Earthquake Appeal",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    category: "Emergency",
    description: "Provide emergency food, clean water, medical aid, and shelter to survivors left homeless by devastating seismic tremors.",
    amounts: [75, 100, 250],
    defaultAmount: 100,
    highlighted: false,
  },
  {
    id: "pakistan-floods",
    title: "Pakistan Floods Appeal",
    image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80",
    category: "Disaster Relief",
    description: "Millions of families have been displaced by unprecedented monsoon rains and flooding across vulnerable provinces.",
    amounts: [75, 100, 250],
    defaultAmount: 100,
    highlighted: true, // As shown in mockup with vibrant yellow button
  },
  {
    id: "sudan-emergency",
    title: "Sudan Emergency Appeal",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
    category: "Refugee Aid",
    description: "Urgent medical supplies, life-saving nutritional relief, and clean drinking water for families trapped in severe conflict.",
    amounts: [75, 100, 250],
    defaultAmount: 100,
    highlighted: false,
  },
];
