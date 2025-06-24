// constants/footerData.js
import BLIK from "../assets/img/footer/1.png";
import Visa from "../assets/img/footer/2.png";
export const FOOTER_LINKS = [
  { path: "/", label: "Strona glowna", isAnchor: false },
  { path: "/order", label: "Standardowe menu", isAnchor: true },
  { path: "/pricing", label: "Nasze Ceny", isAnchor: false },
  { path: "/privacy-policy", label: "Polityka", isAnchor: false },
  { path: "/regulamin/", label: "Regulamin", isAnchor: false },
];

export const PAYMENT_METHODS = [
  { image: BLIK, alt: "Płatność BLIK" },
  { image: Visa, alt: "Płatność kartą Visa" },
];

export const SOCIAL_LINKS = {
  email: "mailto:forexample.com",
  instagram: "https://www.instagram.com",
};
