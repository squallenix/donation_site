export interface RewardCard {
  id: string;
  type: "zakat" | "sadaqah" | "orphans";
  title: string;
  description: string;
  buttonText: string;
  suggestedAmount: number;
}

export const BOOST_REWARDS: RewardCard[] = [
  {
    id: "zakat",
    type: "zakat",
    title: "ZAKAT",
    description:
      "Can provide 50 people with two meals for a month at just £1 day in Gaza.",
    buttonText: "Give your Zakat »",
    suggestedAmount: 150,
  },
  {
    id: "sadaqah",
    type: "sadaqah",
    title: "SADAQAH",
    description:
      "Can help transform the lives of communities suffering the effects of poverty and conflict.",
    buttonText: "Give your Sadaqah »",
    suggestedAmount: 50,
  },
  {
    id: "orphans",
    type: "orphans",
    title: "ORPHANS",
    description:
      "Donate towards our Orphan and Children Fund each month and transform their lives.",
    buttonText: "Give your Donation »",
    suggestedAmount: 60,
  },
];
