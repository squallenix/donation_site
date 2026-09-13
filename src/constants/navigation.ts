export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export const HEADER_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", isActive: true },
  { label: "Giving", href: "#giving" },
  { label: "Our Works", href: "#campaigns" },
  { label: "About us", href: "#about" },
  { label: "Resources", href: "#resources" },
  { label: "Annual Reports", href: "#reports" },
];

export interface LanguageOption {
  code: string;
  label: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "ar", label: "AR", flag: "🇸🇦" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
];

export interface FooterColumn {
  title: string;
  links: {
    label: string;
    href: string;
    flag?: string;
  }[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Current Appeal",
    links: [
      { label: "Palestine Emergency", href: "#palestine" },
      { label: "Afghanistan Earthquake", href: "#campaigns" },
      { label: "Pakistan Floods", href: "#campaigns" },
      { label: "Sudan Appeal", href: "#campaigns" },
      { label: "Yemen Appeal", href: "#campaigns" },
    ],
  },
  {
    title: "Useful links",
    links: [
      { label: "About us", href: "#about" },
      { label: "Annual reports", href: "#reports" },
      { label: "Our History", href: "#history" },
      { label: "Ways to donate", href: "#giving" },
      { label: "Where we work", href: "#work" },
    ],
  },
  {
    title: "Giving",
    links: [
      { label: "Zakat", href: "#zakat" },
      { label: "Sadaqah", href: "#sadaqah" },
      { label: "Where most needed", href: "#giving" },
      { label: "Fidyah", href: "#fidyah" },
      { label: "Kaffarah", href: "#kaffarah" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Media resources", href: "#resources" },
      { label: "Knowledge Base", href: "#knowledge" },
      { label: "Zakat Calculator", href: "#calculator" },
      { label: "Charity in Islam", href: "#charity" },
      { label: "Interest (Riba)", href: "#riba" },
    ],
  },
  {
    title: "Country",
    links: [
      { label: "United States", href: "#", flag: "https://flagcdn.com/24x18/us.png" },
      { label: "Canada", href: "#", flag: "https://flagcdn.com/24x18/ca.png" },
      { label: "United Kingdom", href: "#", flag: "https://flagcdn.com/24x18/gb.png" },
      { label: "Malaysia", href: "#", flag: "https://flagcdn.com/24x18/my.png" },
      { label: "United Arab Emirates", href: "#", flag: "https://flagcdn.com/24x18/ae.png" },
    ],
  },
];
