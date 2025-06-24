// здесь только данные — никаких React-компонентов и никаких default export
export const NAV_ITEMS = [
  { id: "order-placing", text: "Złożenie i dostawa zamówienia" },
  { id: "menu-compliance", text: "Zgodność menu" },
  { id: "delivery-conditions", text: "Warunki dostawy" },
  { id: "delivery-guarantee", text: "Gwarancja dostawy" },
  {
    id: "delivery-issues",
    text: "Niemożność dostawy z przyczyn niezależnych",
  },
  { id: "order-receiving", text: "Przyjmowanie zamówień" },
  { id: "contact-info", text: "Informacje kontaktowe" },
];

export const ARTICLE_SECTIONS = [
  {
    id: "order-placing",
    title: "Złożenie i dostawa zamówienia",
    content:
      "Zamówienie uważa się za złożone, a firma zobowiązuje się je dostarczyć dopiero po otrzymaniu płatności na wskazany numer konta lub poprzez system płatności na stronie internetowej. Po potwierdzeniu płatności otrzymasz potwierdzenie na e-mail lub SMS-em.",
  },
  {
    id: "menu-compliance",
    title: "Zgodność menu",
    content:
      "Menu dostarczone klientowi zawiera dania wskazane na dany dzień zgodnie z harmonogramem menu na stronie. Nie ma możliwości zamiany dań w już potwierdzonym zamówieniu.",
  },
  {
    id: "delivery-conditions",
    title: "Warunki dostawy",
    content:
      "Dostawa jest bezpłatna na terenie miasta Kraków i odbywa się w godzinach od 2:00 do 7:00 rano. Możesz wskazać preferowany przedział czasowy dostawy, a my postaramy się go uwzględnić.",
  },
  {
    id: "delivery-guarantee",
    title: "Gwarancja dostawy",
    content:
      "Firma zobowiązuje się dostarczyć zamówienie do godziny 7:00 rano. W przypadku opóźnienia przekraczającego jedną godzinę, klient ma prawo zrezygnować z zamówienia i żądać zwrotu pieniędzy lub otrzymać zamówienie oraz dodatkowe bezpłatne zamówienie na następny dzień, na życzenie klienta.",
  },
  {
    id: "delivery-issues",
    title: "Niemożność dostawy z przyczyn niezależnych",
    content:
      "Jeśli zamówienie nie może zostać dostarczone z przyczyn niezależnych od kuriera lub firmy (nieprawidłowy kod do wejścia, błędny adres, niesprawny domofon itp.), firma nie ponosi odpowiedzialności za niedostarczenie, a środki za ten dzień nie podlegają zwrotowi.",
  },
  {
    id: "order-receiving",
    title: "Przyjmowanie zamówień",
    content:
      "Zamówienia przyjmowane są do godziny 21:00 dnia poprzedzającego dostawę. W przypadku anulowania zamówienia po tym czasie, środki nie podlegają zwrotowi.",
  },
  {
    id: "contact-info",
    title: "Informacje kontaktowe",
    content:
      "W razie pytań lub problemów z zamówieniem skontaktuj się z nami pod adresem e-mail: kontakt@twojarestauracja.pl lub telefonicznie: +48 777 777 777",
  },
];
