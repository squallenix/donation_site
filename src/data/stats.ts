export interface ImpactStat {
  value: string;
  label: string;
  sublabel: string;
}

export const IMPACT_STATS: ImpactStat[] = [
  {
    value: "50,000+",
    label: "Meals Provided",
    sublabel: "Delivering food to families in crisis.",
  },
  {
    value: "10,000+",
    label: "Medical Kits Distributed",
    sublabel: "Ensuring urgent healthcare reaches those in need.",
  },
  {
    value: "5,000",
    label: "Families Sheltered",
    sublabel: "Offering safety and dignity to displaced families.",
  },
];

export const IMPACT_QUOTE = {
  text: "Through your support, we've provided food, shelter, and medical aid to thousands of families in Palestine.",
  image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
  alt: "Volunteer packing and holding humanitarian aid donation box in warehouse",
};
