import { useEffect } from "react";
import { Shield, Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

const Section = ({ id, title, children }) => (
  <section id={id} className="mb-10">
    <h2 className="text-xl font-black mb-4 flex items-center gap-2 text-fastfood-orange">
      <ChevronRight size={20} />
      {title}
    </h2>
    <div className="space-y-3 text-sm leading-relaxed">{children}</div>
  </section>
);

const P = ({ children, className = "" }) => <p className={`text-gray-700 dark:text-neutral-300 ${className}`}>{children}</p>;
const B = ({ children }) => <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>;
const Li = ({ children }) => (
  <li className="flex items-start gap-2 text-gray-700 dark:text-neutral-300">
    <span className="text-fastfood-orange mt-0.5">•</span>
    <span>{children}</span>
  </li>
);
const Ul = ({ children }) => <ul className="space-y-1.5 ml-2">{children}</ul>;

const Mix = ({ p }) => p.map((part, i) => i % 2 === 1 ? <B key={i}>{part}</B> : part);

const CONTENT = {
  ro: {
    docTitle: "Politica de Confidențialitate – Complete Pizza",
    title: "Politica de Confidențialitate",
    updated: "Ultima actualizare: 22 mai 2026",
    intro: ["Complete Pizza", " respectă confidențialitatea datelor tale. Acest site este exclusiv de prezentare — nu colectăm conturi, nu procesăm comenzi online și nu stocăm date cu caracter personal pe serverele noastre. Această politică explică ce date tehnice minime sunt procesate și ce drepturi ai conform ", "Regulamentului (UE) 2016/679 (GDPR)", " și legislației române aplicabile."],
    s1title: "1. Operatorul de date",
    s1fields: [
      ["Denumire:", " Complete Pizza"],
      ["Sediu:", " Alba Iulia – Cetate, str. Constantin Brâncoveanu nr. 21, jud. Alba, România"],
      ["Email:", " hello@completepizza.ro"],
      ["Telefon:", " +40 (744) 299 399"],
    ],
    s1p: "Suntem responsabili pentru prelucrarea datelor tale cu caracter personal în conformitate cu legislația aplicabilă, inclusiv GDPR și Legea nr. 190/2018.",
    s2title: "2. Ce date colectăm",
    s2h1: "2.1 Preferințe stocate local (în browser)",
    s2list1: ["Preferința de temă (întunecată / luminoasă) – stocată în localStorage, nu este transmisă nicăieri", "Preferința de limbă (RO / EN) – stocată în localStorage"],
    s2h2: "2.2 Date tehnice generate automat",
    s2list2: ["Adresă IP – procesată temporar de serverul de hosting pentru livrarea paginilor web (loguri de server)"],
    s2h3: "2.3 Date de contact (voluntar)",
    s2list3: ["Dacă ne contactezi telefonic sau prin e-mail, prelucrăm datele pe care ni le furnizezi (nume, număr de telefon, e-mail) exclusiv pentru a răspunde solicitării tale"],
    s2h4: "2.4 Ce NU colectăm",
    s2list4: ["Nu colectăm conturi de utilizator", "Nu procesăm comenzi online", "Nu stocăm date de card sau plată", "Nu folosim reclame sau trackere de marketing"],
    s3title: "3. Scopurile și temeiurile prelucrării",
    s3headers: ["Scop", "Temei juridic (GDPR)"],
    s3rows: [
      ["Livrarea site-ului (pagini, fonturi și imagini găzduite local)", "Art. 6(1)(f) – interes legitim – funcționalitatea site-ului"],
      ["Răspuns la solicitări de contact", "Art. 6(1)(b) – executarea unui contract / Art. 6(1)(f) – interes legitim"],
      ["Deschiderea locației pe Google Maps (doar dacă apeși linkul „Vezi pe hartă”)", "Art. 6(1)(f) – interes legitim / acțiune inițiată de tine"],
    ],
    s4title: "4. Cât timp păstrăm datele",
    s4list: [
      ["Preferințe browser:", " stocate local până la ștergerea cache-ului / cookie-urilor de către utilizator"],
      ["Date de contact:", " maxim 1 an de la ultima interacțiune"],
      ["Loguri server:", " maxim 30 de zile, conform politicii furnizorului de hosting"],
    ],
    s5title: "5. Terțe părți care primesc datele tale",
    s5p: ["Colaborăm cu furnizorii de mai jos. ", "Nu vindem niciodată datele tale.", ""],
    s5providers: [
      { name: "Furnizor de hosting", country: "UE", purpose: "Găzduiește și livrează paginile web; procesează temporar adresa IP în logurile serverului. Fonturile și imaginile sunt găzduite local, nu prin terți.", legal: "Interes legitim – funcționarea și securitatea site-ului", link: "" },
      { name: "Google Maps", country: "SUA (Data Privacy Framework UE-SUA)", purpose: "Se deschide într-o filă nouă doar dacă apeși linkul „Vezi pe hartă”. Nu se încarcă pe acest site și nu setează cookie-uri fără acțiunea ta.", legal: "Interes legitim – acțiune inițiată de tine", link: "https://policies.google.com/privacy" },
    ],
    s5labels: { purpose: "Scop:", country: "Locație:", legal: "Temei:", policy: "Politică:" },
    s6title: "6. Drepturile tale (GDPR, art. 15-22)",
    s6p: "Ai dreptul să:",
    s6list: [
      ["Accesezi", " datele pe care le deținem despre tine (art. 15)"],
      ["Corectezi", " datele inexacte (art. 16)"],
      ["Ștergi", " datele asociate ție (\"dreptul de a fi uitat\", art. 17)"],
      ["Restricționezi", " prelucrarea în anumite situații (art. 18)"],
      ["Te opui", " prelucrării bazate pe interes legitim (art. 21)"],
      ["Retragi consimțământul", " oricând, fără efecte retroactive (art. 7)"],
    ],
    s6contact: ["Pentru a exercita aceste drepturi, trimite un e-mail la ", "hello@completepizza.ro", " cu subiectul „Solicitare GDPR\". Răspundem în maxim ", "30 de zile calendaristice", "."],
    s6anspdcp: ["Dacă consideri că drepturile tale nu sunt respectate, poți depune o plângere la: ", "Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)", ", B-dul G-ral. Gheorghe Magheru 28-30, sector 1, București, "],
    s7title: "7. Securitatea datelor",
    s7list: [
      "Transmiterea datelor se face exclusiv prin conexiuni criptate HTTPS/TLS",
      "Nu stocăm parole, date de card sau informații sensibile pe serverele noastre",
      "Preferințele utilizatorului sunt stocate exclusiv local în browser",
      "Accesul la orice date de contact este restricționat personalului autorizat",
    ],
    s8title: "8. Date privind minorii",
    s8p: "Serviciile noastre nu sunt destinate persoanelor sub 16 ani. Nu colectăm intenționat date de la minori. Dacă identificăm astfel de date, le vom șterge imediat.",
    s9title: "9. Cookie-uri",
    s9p: "Fiind un site de prezentare, NU folosim cookie-uri de urmărire, analiză sau marketing. Stocăm doar preferințele tale (temă și limbă) în localStorage-ul browserului, exclusiv pentru funcționarea site-ului. Aceste date rămân pe dispozitivul tău și nu sunt transmise nimănui.",
    s10title: "10. Modificări ale politicii",
    s10p: "Putem actualiza această politică. Orice modificare semnificativă va fi anunțată printr-un mesaj vizibil pe site. Data ultimei actualizări este afișată în antetul acestei pagini.",
    contactTitle: "Contact privind datele personale",
    contactDPOLabel: "Responsabil cu protecția datelor:",
  },
  en: {
    docTitle: "Privacy Policy – Complete Pizza",
    title: "Privacy Policy",
    updated: "Last updated: 22 May 2026",
    intro: ["Complete Pizza", " respects the privacy of your data. This is a presentation-only website — we do not collect accounts, process online orders, or store personal data on our servers. This policy explains what minimal technical data is processed and what rights you have under ", "EU Regulation 2016/679 (GDPR)", " and applicable Romanian legislation."],
    s1title: "1. Data Controller",
    s1fields: [
      ["Name:", " Complete Pizza"],
      ["Registered address:", " Alba Iulia – Cetate, str. Constantin Brâncoveanu nr. 21, Alba County, Romania"],
      ["Email:", " hello@completepizza.ro"],
      ["Phone:", " +40 (744) 299 399"],
    ],
    s1p: "We are responsible for the processing of your personal data in accordance with applicable legislation, including GDPR and Law no. 190/2018.",
    s2title: "2. Data We Collect",
    s2h1: "2.1 Preferences stored locally (in your browser)",
    s2list1: ["Theme preference (dark / light) – stored in localStorage, never transmitted", "Language preference (RO / EN) – stored in localStorage"],
    s2h2: "2.2 Automatically generated technical data",
    s2list2: ["IP address – temporarily processed by the hosting server to deliver web pages (server logs)"],
    s2h3: "2.3 Contact data (voluntary)",
    s2list3: ["If you contact us by phone or email, we process the data you provide (name, phone number, email) solely to respond to your request"],
    s2h4: "2.4 What we do NOT collect",
    s2list4: ["We do not collect user accounts", "We do not process online orders", "We do not store card or payment data", "We do not use advertising or marketing trackers"],
    s3title: "3. Purposes & Legal Bases for Processing",
    s3headers: ["Purpose", "Legal basis (GDPR)"],
    s3rows: [
      ["Delivering the site (pages, fonts and images hosted locally)", "Art. 6(1)(f) – legitimate interest – site functionality"],
      ["Responding to contact requests", "Art. 6(1)(b) – performance of a contract / Art. 6(1)(f) – legitimate interest"],
      ["Opening the location on Google Maps (only if you click the “View on map” link)", "Art. 6(1)(f) – legitimate interest / action initiated by you"],
    ],
    s4title: "4. How Long We Retain Data",
    s4list: [
      ["Browser preferences:", " stored locally until the user clears cache / cookies"],
      ["Contact data:", " maximum 1 year from the last interaction"],
      ["Server logs:", " maximum 30 days, per hosting provider policy"],
    ],
    s5title: "5. Third Parties Receiving Your Data",
    s5p: ["We work with the providers below. ", "We never sell your data.", ""],
    s5providers: [
      { name: "Hosting provider", country: "EU", purpose: "Hosts and delivers the web pages; temporarily processes your IP address in server logs. Fonts and images are hosted locally, not via third parties.", legal: "Legitimate interest – site operation and security", link: "" },
      { name: "Google Maps", country: "USA (EU-US Data Privacy Framework)", purpose: "Opens in a new tab only if you click the “View on map” link. It does not load on this site and sets no cookies without your action.", legal: "Legitimate interest – action initiated by you", link: "https://policies.google.com/privacy" },
    ],
    s5labels: { purpose: "Purpose:", country: "Location:", legal: "Legal basis:", policy: "Policy:" },
    s6title: "6. Your Rights (GDPR, art. 15-22)",
    s6p: "You have the right to:",
    s6list: [
      ["Access", " the data we hold about you (art. 15)"],
      ["Rectify", " inaccurate data (art. 16)"],
      ["Erase", " data associated with you ('right to be forgotten', art. 17)"],
      ["Restrict", " processing in certain situations (art. 18)"],
      ["Object", " to processing based on legitimate interest (art. 21)"],
      ["Withdraw consent", " at any time, without retroactive effect (art. 7)"],
    ],
    s6contact: ["To exercise these rights, send an email to ", "hello@completepizza.ro", " with the subject 'GDPR Request'. We respond within a maximum of ", "30 calendar days", "."],
    s6anspdcp: ["If you believe your rights are not being respected, you may lodge a complaint with: ", "The National Supervisory Authority for Personal Data Processing (ANSPDCP)", ", B-dul G-ral. Gheorghe Magheru 28-30, sector 1, Bucharest, "],
    s7title: "7. Data Security",
    s7list: [
      "Data is transmitted exclusively over encrypted HTTPS/TLS connections",
      "We do not store passwords, card data, or sensitive information on our servers",
      "User preferences are stored exclusively locally in the browser",
      "Access to any contact data is restricted to authorised personnel",
    ],
    s8title: "8. Data Relating to Minors",
    s8p: "Our services are not intended for persons under 16 years of age. We do not intentionally collect data from minors. If we identify such data, we will delete it immediately.",
    s9title: "9. Cookies",
    s9p: "As a presentation website, we do NOT use tracking, analytics or marketing cookies. We only store your preferences (theme and language) in your browser's localStorage, solely for the site to function. This data stays on your device and is never transmitted to anyone.",
    s10title: "10. Policy Changes",
    s10p: "We may update this policy. Any significant changes will be announced via a visible notice on the site. The date of the last update is shown in the header of this page.",
    contactTitle: "Personal data contact",
    contactDPOLabel: "Data Protection Contact:",
  },
};

export default function PrivacyPolicy({ dark }) {
  const { language } = useLanguage();
  const c = CONTENT[language] || CONTENT.ro;

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = c.docTitle;
  }, [c.docTitle]);

  return (
    <div className={`min-h-screen ${dark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="bg-gradient-to-r from-fastfood-red to-fastfood-orange py-16 px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <Shield size={48} className="mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl sm:text-4xl font-black mb-3">{c.title}</h1>
          <p className="opacity-80 text-sm">{c.updated}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className={`rounded-xl p-5 mb-10 border-l-4 border-fastfood-orange ${dark ? "bg-gray-900" : "bg-orange-50"}`}>
          <P><Mix p={c.intro} /></P>
        </div>

        <Section id="controller" title={c.s1title}>
          {c.s1fields.map(([bold, text], i) => <P key={i}><B>{bold}</B>{text}</P>)}
          <P>{c.s1p}</P>
        </Section>

        <Section id="data-collected" title={c.s2title}>
          <P><B>{c.s2h1}</B></P>
          <Ul>{c.s2list1.map((item, i) => <Li key={i}>{item}</Li>)}</Ul>
          <P className="pt-2"><B>{c.s2h2}</B></P>
          <Ul>{c.s2list2.map((item, i) => <Li key={i}>{item}</Li>)}</Ul>
          <P className="pt-2"><B>{c.s2h3}</B></P>
          <Ul>{c.s2list3.map((item, i) => <Li key={i}>{item}</Li>)}</Ul>
          <P className="pt-2"><B>{c.s2h4}</B></P>
          <Ul>{c.s2list4.map((item, i) => <Li key={i}>{item}</Li>)}</Ul>
        </Section>

        <Section id="purposes" title={c.s3title}>
          <div className={`rounded-lg overflow-hidden border ${dark ? "border-gray-800" : "border-gray-200"}`}>
            <table className="w-full text-sm">
              <thead className={dark ? "bg-gray-800" : "bg-gray-100"}>
                <tr>
                  {c.s3headers.map((h) => <th key={h} className="text-left p-3 font-semibold">{h}</th>)}
                </tr>
              </thead>
              <tbody className={`divide-y ${dark ? "divide-gray-800" : "divide-gray-200"}`}>
                {c.s3rows.map(([purpose, basis]) => (
                  <tr key={purpose} className={dark ? "text-neutral-300" : "text-gray-700"}>
                    <td className="p-3">{purpose}</td>
                    <td className="p-3 text-fastfood-orange font-medium">{basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="retention" title={c.s4title}>
          <Ul>{c.s4list.map(([bold, text], i) => <Li key={i}><B>{bold}</B>{text}</Li>)}</Ul>
        </Section>

        <Section id="third-parties" title={c.s5title}>
          <P><Mix p={c.s5p} /></P>
          <div className="space-y-4 pt-2">
            {c.s5providers.map((p) => (
              <div key={p.name} className={`rounded-lg p-4 border ${dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
                <p className="font-bold text-fastfood-orange mb-1">{p.name}</p>
                <Ul>
                  <Li><B>{c.s5labels.purpose}</B> {p.purpose}</Li>
                  <Li><B>{c.s5labels.country}</B> {p.country}</Li>
                  <Li><B>{c.s5labels.legal}</B> {p.legal}</Li>
                  {p.link && <Li><B>{c.s5labels.policy}</B>{" "}<a href={p.link} target="_blank" rel="noopener noreferrer" className="text-fastfood-orange underline">{p.link}</a></Li>}
                </Ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="rights" title={c.s6title}>
          <P>{c.s6p}</P>
          <Ul>{c.s6list.map(([bold, text], i) => <Li key={i}><B>{bold}</B>{text}</Li>)}</Ul>
          <P className="pt-2"><Mix p={c.s6contact} /></P>
          <P>
            <Mix p={c.s6anspdcp} />
            <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-fastfood-orange underline">www.dataprotection.ro</a>.
          </P>
        </Section>

        <Section id="security" title={c.s7title}>
          <Ul>{c.s7list.map((item, i) => <Li key={i}>{item}</Li>)}</Ul>
        </Section>

        <Section id="minors" title={c.s8title}>
          <P>{c.s8p}</P>
        </Section>

        <Section id="cookies" title={c.s9title}>
          <P>{c.s9p}</P>
        </Section>

        <Section id="changes" title={c.s10title}>
          <P>{c.s10p}</P>
        </Section>

        <div className={`rounded-xl p-6 border ${dark ? "bg-gray-900 border-fastfood-orange/30" : "bg-orange-50 border-fastfood-orange/40"}`}>
          <h3 className="font-black text-lg mb-3 flex items-center gap-2">
            <Mail size={20} className="text-fastfood-orange" />
            {c.contactTitle}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><Mail size={16} className="text-fastfood-orange" /><a href="mailto:hello@completepizza.ro" className="text-fastfood-orange underline">hello@completepizza.ro</a></div>
            <div className="flex items-center gap-2"><Phone size={16} className="text-fastfood-orange" /><a href="tel:+40744299399" className="hover:text-fastfood-orange transition">+40 (744) 299 399</a></div>
            <div className="flex items-center gap-2"><MapPin size={16} className="text-fastfood-orange" /><span>Alba Iulia – Cetate, str. Constantin Brâncoveanu nr. 21, jud. Alba</span></div>
            <div className="flex items-start gap-2 pt-1"><Mail size={16} className="text-fastfood-orange mt-0.5" /><span><b>{c.contactDPOLabel}</b>{" "}<a href="mailto:hello@completepizza.ro" className="text-fastfood-orange underline">hello@completepizza.ro</a></span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
