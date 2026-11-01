/**
 * Latvian texts (the default language).
 *
 * This file defines the *shape* of every dictionary: ru.ts and en.ts must
 * contain exactly the same keys, and TypeScript reports an error if one is
 * missing. Add a new text here first, then to the other two files.
 *
 * `{name}` in a text is a placeholder filled in by the code (see `fill()` in
 * src/i18n/format.ts). Keep it as is when translating.
 *
 * Most facts come from the previous website (blasto.lv). Texts marked
 * TODO(content) still need checking by the school.
 */

import type { CategoryId } from "@/content/site";

type CategoryText = { name: string; text: string };
/** A section of a legal document: a heading plus paragraphs and/or a list. */
export type DocumentSection = { title: string; paragraphs?: string[]; items?: string[] };

const lv = {
  meta: {
    description:
      "Autoskola Blasto Rīgā: AM, A, B, BE, C, CE, D kategoriju un 95. koda apmācība. Teorija tiešsaistē vai klātienē, mācības latviešu, krievu un angļu valodā.",
  },

  common: {
    skipToContent: "Pāriet uz saturu",
    homeLink: "Blasto sākumlapa",
    openMenu: "Atvērt izvēlni",
    closeMenu: "Aizvērt izvēlni",
    menu: "Izvēlne",
    language: "Valoda",
    theme: {
      label: "Krāsu tēma",
      light: "Gaišā",
      dark: "Tumšā",
      system: "Kā ierīcē",
    },
    // A call-to-action block reused at the bottom of several pages.
    cta: {
      title: "Gatavs sākt?",
      text: "Atstāj pieteikumu, un mēs sazināsimies ar tevi tuvākajā darba dienā.",
      button: "Pieteikties",
      call: "Vai zvani:",
    },
  },

  // Page names: used in the menu, the footer and the language switcher.
  nav: {
    home: "Sākums",
    courses: "Kursi un cenas",
    teachers: "Pasniedzēji",
    contacts: "Kontakti",
    apply: "Pieteikties",
    privacy: "Privātuma politika",
    rules: "Iekšējās kārtības noteikumi",
  },

  footer: {
    tagline: "Mierīgs ceļš līdz vadītāja apliecībai.",
    pages: "Lapas",
    contacts: "Kontakti",
    rights: "Visas tiesības aizsargātas.",
  },

  home: {
    meta: { title: "Autoskola Blasto Rīgā" },
    hero: {
      eyebrow: "Autoskola Rīgā",
      title: "Mierīgi līdz vadītāja apliecībai",
      text: "Teorija tiešsaistē vai klātienē, pacietīgi instruktori un skaidras cenas. Apmācām AM, A, B, BE, C, CE un D kategorijā, kā arī 95. kodam.",
      primary: "Pieteikties apmācībai",
      secondary: "Kursi un cenas",
      cardTitle: "Kategorijas",
      cardText: "Izvēlies kategoriju, lai redzētu cenu un prasības.",
    },
    about: {
      title: "Par mums",
      paragraphs: [
        "Blasto ir autoskola Rīgā, kurā braukt mācās bez steigas un stresa. Teoriju var apgūt klātienē vai tiešsaistē, bet braukšanu mācām ar tādiem pašiem auto, ar kādiem kārtosi eksāmenu CSDD.",
        "Mēs esam blakus visā ceļā: no medicīniskās izziņas un pirmās palīdzības kursa līdz eksāmenam CSDD. Abus var nokārtot tepat, mūsu autoskolā.",
      ],
    },
    benefits: {
      title: "Kāpēc Blasto",
      items: {
        instructors: {
          title: "Pacietīgi instruktori",
          text: "Mierīgi un pieredzējuši pasniedzēji, kuri pielāgojas tavam tempam.",
        },
        schedule: {
          title: "Elastīgs grafiks",
          text: "Nodarbības no pirmdienas līdz sestdienai, laikā, kas der tev.",
        },
        languages: {
          title: "Trīs valodas",
          text: "Mācības notiek latviešu, krievu vai angļu valodā.",
        },
        prices: {
          title: "Skaidras cenas",
          text: "Visas izmaksas redzamas iepriekš, arī CSDD valsts nodevas.",
        },
      },
    },
    formats: {
      title: "Divi veidi, kā apgūt teoriju",
      text: "Kurss ir vienāds abos formātos, atšķiras tikai vieta.",
      online: {
        title: "Tiešsaistē",
        text: "Nodarbības notiek internetā. Pietiek ar datoru vai telefonu.",
        points: [
          "Mācies no jebkuras vietas",
          "Nav jātērē laiks ceļam",
          "Tas pats kurss kā klātienē",
        ],
      },
      inPerson: {
        title: "Klātienē",
        text: "Nodarbības notiek mūsu mācību klasē Rīgas centrā, kopā ar grupu.",
        points: [
          "Dzīva saruna ar pasniedzēju un grupu",
          "Mācību materiāli uz vietas",
          "Vieglāk noturēt ritmu",
        ],
      },
    },
    steps: {
      title: "Kā tas notiek",
      items: [
        {
          title: "Piesakies",
          text: "Aizpildi īsu pieteikumu. Mēs piezvanīsim, atbildēsim uz jautājumiem un palīdzēsim izvēlēties grupu.",
        },
        {
          title: "Apgūsti teoriju",
          text: "Tiešsaistē vai klātienē. Pēc kursa kārto skolas teorijas eksāmenu un tad CSDD.",
        },
        {
          title: "Brauc ar instruktoru",
          text: "Saņem CSDD mācību braukšanas atļauju un brauc kopā ar savu instruktoru.",
        },
        {
          title: "Nokārto eksāmenu",
          text: "Pēc skolas braukšanas eksāmena kārto eksāmenu CSDD un saņem apliecību.",
        },
      ],
    },
    reviews: {
      title: "Ko saka mūsu audzēkņi",
      rating: "{rating} no 5 Google",
      count: "Atsauksmes: {count}",
      all: "Visas atsauksmes Google",
    },
  },

  courses: {
    meta: {
      title: "Kursi un cenas",
      description:
        "AM, A, B, BE, C, CE, D kategoriju un 95. koda apmācības cenas autoskolā Blasto Rīgā, ieskaitot CSDD valsts nodevas.",
    },
    title: "Kursi un cenas",
    text: "Teorijas kursu un braukšanu apmaksā atsevišķi. Braukšanu skaita akadēmiskajās stundās (45 min); viena nodarbība parasti ir 2 stundas.",
    age: "Vecums",
    ageRange: "mācības {start}+, eksāmens {exam}+",
    requires: "Nepieciešama {list} kategorija",
    or: "vai",
    documents: "Dokumentu noformēšana",
    theory: "Teorijas kurss",
    drivingHour: "Braukšana, 45 min",
    minDriving: "Min. braukšana, {hours} × 45 min",
    priceOnRequest: "Cena pēc pieprasījuma",
    apply: "Pieteikties",
    applyFor: "Pieteikties {category} kategorijai",
    items: {
      b: {
        name: "Vieglais automobilis",
        text: "Automobiļi līdz 3500 kg ar ne vairāk kā 8 sēdvietām (neskaitot vadītāja vietu).",
      },
      be: {
        name: "Automobilis ar piekabi",
        text: "B kategorijas automobilis ar piekabi vai puspiekabi, kuras pilnā masa nepārsniedz 3500 kg.",
      },
      am: {
        name: "Mopēds",
        text: "Mopēdi ar motora tilpumu līdz 50 cm³ un ātrumu līdz 45 km/h.",
      },
      a: {
        name: "Motocikls",
        text: "Motocikli no 50 cm³ un ar ātrumu virs 45 km/h. Ietver arī A1 un A2 kategoriju.",
      },
      c: {
        name: "Kravas automobilis",
        text: "Kravas automobiļi, kuru pilnā masa pārsniedz 3500 kg.",
      },
      ce: {
        name: "Kravas auto ar piekabi",
        text: "C kategorijas vilcējs ar piekabi, kuras pilnā masa pārsniedz 750 kg.",
      },
      d: {
        name: "Autobuss",
        text: "Autobusi ar vairāk nekā 8 sēdvietām (neskaitot vadītāja vietu).",
      },
      "95": {
        name: "95. kods",
        text: "Profesionālā kvalifikācija kravu un pasažieru pārvadājumiem, kā arī periodiskā apmācība ik pēc 5 gadiem (35 stundas).",
      },
    } satisfies Record<CategoryId, CategoryText>,
    extras: {
      title: "Papildu izmaksas",
      services: {
        title: "Pieejams mūsu autoskolā",
        text: "Pirms apmācības nepieciešama medicīniskā izziņa un pirmās palīdzības kurss.",
        firstAid: "Pirmās palīdzības kurss",
        medicalCertificate: "Medicīniskā izziņa",
      },
      csdd: {
        title: "CSDD valsts nodevas",
        text: "Tās maksā CSDD, nevis autoskolai. Summas nosaka valsts.",
        learnerPermit: "Mācību braukšanas atļauja",
        theoryExam: "Teorijas eksāmens",
        drivingExam: "Braukšanas eksāmens",
        licence: "Vadītāja apliecības izsniegšana",
      },
    },
    notes: {
      title: "Labi zināt",
      items: [
        "Viena braukšanas nodarbība ilgst 90 minūtes jeb 2 akadēmiskās stundas.",
        "Pirms braukšanas jāsaņem mācību braukšanas atļauja CSDD.",
        "Braukšanu mācām ar tādiem pašiem auto, ar kādiem kārtosi eksāmenu CSDD.",
        "Mācības notiek latviešu, krievu un angļu valodā.",
      ],
    },
    faq: {
      title: "Biežāk uzdotie jautājumi",
      items: [
        {
          question: "No cik gadiem var sākt mācības?",
          answer:
            "B kategorijas apmācību var sākt no 16 gadu vecuma, bet CSDD eksāmenus kārtot no 18 gadiem. Citu kategoriju vecumi norādīti pie katras kategorijas.",
        },
        {
          question: "Vai teoriju var apgūt tiešsaistē?",
          answer:
            "Jā. Teorijas nodarbības notiek klātienē Rīgā vai tiešsaistē, kā tev ērtāk. Braukšanas nodarbības notiek Rīgā.",
        },
        {
          question: "Ko darīt, ja nokavēju teorijas nodarbību?",
          answer:
            "Nokavēto nodarbību var noklausīties kopā ar citu grupu (10 €) vai individuāli (70 €). Ja kavējums ir ilgāks par 15 minūtēm, nodarbība netiek ieskaitīta.",
        },
        {
          question: "Vai var atcelt braukšanas nodarbību?",
          answer:
            "Jā, ne vēlāk kā 24 stundas pirms nodarbības sākuma. Vēlāk atceltu nodarbību neatmaksājam.",
        },
        {
          question: "Vai eksāmenu var kārtot ar automātisko pārnesumkārbu?",
          answer:
            "Jā. Tad vadītāja apliecībā būs atzīme B (78), kas ļauj vadīt tikai automobiļus ar automātisko pārnesumkārbu.",
        },
      ],
    },
  },

  teachers: {
    meta: {
      title: "Pasniedzēji",
      description: "Iepazīsties ar autoskolas Blasto pasniedzējiem un instruktoriem.",
    },
    title: "Pasniedzēji",
    text: "Mūsu instruktori māca mierīgi, saprotami un ar cieņu pret katru audzēkni.",
    categories: "Kategorijas",
    // One bio per teacher id from src/content/site.ts.
    // TODO(content): real bios
    bios: {
      "teacher-1":
        "Instruktors ar vairāk nekā 10 gadu pieredzi. Palīdz justies droši arī pilsētas satiksmē.",
      "teacher-2":
        "Pacietīga un precīza. Īpaši patīk strādāt ar tiem, kuri pie stūres sēžas pirmo reizi.",
      "teacher-3": "Motociklu un mopēdu speciālists, kurš pats brauc visu gadu.",
      "teacher-4":
        "Pasniedz kravas automobiļu, autobusu un 95. koda apmācību. Agrāk strādājis par profesionālu autovadītāju.",
    } as Record<string, string>,
  },

  contacts: {
    meta: {
      title: "Kontakti",
      description:
        "Autoskolas Blasto adrese Rīgā, Merķeļa ielā 6, tālrunis, e-pasts, darba laiks un rekvizīti.",
    },
    title: "Kontakti",
    text: "Zvani, raksti vai nāc ciemos. Atbildēsim uz visiem jautājumiem.",
    address: "Nodarbību adrese",
    addressDetails: "3. stāvs, 301. kabinets",
    phone: "Tālrunis",
    email: "E-pasts",
    hours: "Darba laiks",
    hoursLines: ["Katru dienu, attālināti", "Nodarbības: pirmdiena–sestdiena"],
    openMap: "Atvērt kartē",
    company: {
      title: "Rekvizīti",
      name: "Nosaukums",
      registrationNumber: "Reģistrācijas nr.",
      legalAddress: "Juridiskā adrese",
      bank: "Banka",
      account: "Konta nr.",
    },
  },

  apply: {
    meta: {
      title: "Pieteikums",
      description: "Piesakies apmācībai autoskolā Blasto, un mēs sazināsimies ar tevi.",
    },
    title: "Pieteikums apmācībai",
    text: "Tas aizņems mazāk nekā minūti. Pēc tam mēs piezvanīsim, lai vienotos par detaļām.",
    form: {
      allRequired: "Visi lauki ir obligāti.",
      name: "Vārds, uzvārds",
      phone: "Tālrunis",
      phoneHint: "Piemēram, +371 20 000 000",
      email: "E-pasts",
      trainingType: "Teorijas formāts",
      online: "Tiešsaistē",
      onlineHint: "Nodarbības internetā",
      inPerson: "Klātienē",
      inPersonHint: "Nodarbības mācību klasē Rīgā",
      categories: "Kategorijas",
      categoriesHint: "Vari izvēlēties vairākas.",
      submit: "Nosūtīt pieteikumu",
      sending: "Sūta…",
      privacy:
        "Nosūtot pieteikumu, tu piekrīti, ka izmantosim tavus datus tikai, lai sazinātos par apmācību.",
      privacyLink: "Privātuma politika",
    },
    errors: {
      summary: "Lūdzu, izlabo atzīmētos laukus.",
      nameRequired: "Lūdzu, ieraksti vārdu un uzvārdu.",
      phoneRequired: "Lūdzu, ieraksti tālruņa numuru.",
      phoneInvalid: "Tālruņa numurs izskatās nepareizs. Piemēram: +371 20 000 000.",
      emailRequired: "Lūdzu, ieraksti e-pasta adresi.",
      emailInvalid: "E-pasta adrese izskatās nepareiza. Piemēram: vards@epasts.lv.",
      trainingTypeRequired: "Lūdzu, izvēlies teorijas formātu.",
      categoriesRequired: "Lūdzu, izvēlies vismaz vienu kategoriju.",
    },
    result: {
      successTitle: "Paldies! Pieteikums saņemts.",
      successText: "Mēs sazināsimies ar tevi tuvākajā darba dienā.",
      again: "Nosūtīt vēl vienu pieteikumu",
      errorTitle: "Pieteikumu neizdevās nosūtīt",
      badRequest: "Serveris nepieņēma datus. Lūdzu, pārbaudi laukus un mēģini vēlreiz.",
      tooManyRequests: "Pārāk daudz mēģinājumu. Lūdzu, pagaidi minūti un mēģini vēlreiz.",
      serverError: "Serverī radās kļūda. Lūdzu, mēģini vēlāk vai zvani mums.",
      network: "Neizdevās sazināties ar serveri. Pārbaudi interneta savienojumu un mēģini vēlreiz.",
      unknown: "Kaut kas nogāja greizi. Lūdzu, mēģini vēlreiz vai zvani mums.",
      statusCode: "Kļūdas kods: {status}",
    },
    aside: {
      title: "Kas notiek tālāk?",
      steps: [
        "Mēs piezvanīsim tuvākajā darba dienā.",
        "Kopā izvēlēsimies grupu un grafiku.",
        "Tu sāc mācības.",
      ],
      question: "Ir jautājumi? Zvani:",
    },
  },

  legal: {
    updated: "Atjaunots: 2026. gada novembrī",
    // The internal rules exist only in Latvian; this note is shown on the
    // Russian and English pages (empty here, because this *is* Latvian).
    rulesNote: "",
    rulesMeta: {
      title: "Iekšējās kārtības noteikumi",
      description: "Autoskolas Blasto kursantu iekšējās kārtības noteikumi.",
    },
    privacy: {
      meta: {
        title: "Privātuma politika",
        description: "Kā autoskola Blasto apstrādā un aizsargā tavus personas datus.",
      },
      title: "Privātuma politika",
      // {legalName}, {registrationNumber}, {legalAddress}, {email} and {phone}
      // are filled in from src/content/site.ts.
      // TODO(content): have the school (or a lawyer) review this text.
      sections: [
        {
          title: "Kas apstrādā tavus datus",
          paragraphs: [
            "Personas datu pārzinis ir {legalName}, reģ. nr. {registrationNumber}, juridiskā adrese: {legalAddress}. Ar mums vari sazināties pa e-pastu {email} vai tālruni {phone}.",
          ],
        },
        {
          title: "Kādus datus apstrādājam",
          items: [
            "Pieteikuma formā: vārdu, uzvārdu, tālruņa numuru, e-pasta adresi, izvēlēto teorijas formātu un kategorijas.",
            "Slēdzot apmācības līgumu: arī personas kodu, adresi un citus datus, kas nepieciešami apmācībai un reģistrācijai CSDD.",
          ],
        },
        {
          title: "Kāpēc un uz kāda pamata",
          items: [
            "Lai atbildētu uz tavu pieteikumu un sazinātos par apmācību (pasākumi pirms līguma noslēgšanas, VDAR 6. panta 1. punkta b apakšpunkts).",
            "Lai noslēgtu un izpildītu apmācības līgumu (VDAR 6. panta 1. punkta b apakšpunkts).",
            "Lai izpildītu likumā noteiktos pienākumus, piemēram, reģistrētu tevi CSDD un kārtotu grāmatvedību (VDAR 6. panta 1. punkta c apakšpunkts).",
            "Lai sūtītu jaunumus un piedāvājumus, bet tikai ar tavu piekrišanu, ko vari jebkurā brīdī atsaukt (VDAR 6. panta 1. punkta a apakšpunkts).",
          ],
        },
        {
          title: "Kam datus nododam",
          paragraphs: [
            "Tikai tiem, kam tas nepieciešams apmācībai vai ko prasa likums: CSDD, tavam instruktoram, sadarbības partneriem, kas nodrošina daļu apmācības (piemēram, pirmās palīdzības kursus), un valsts iestādēm. Datus nepārdodam un glabājam Eiropas Savienībā vai Eiropas Ekonomikas zonā.",
          ],
        },
        {
          title: "Cik ilgi glabājam",
          paragraphs: [
            "Pieteikuma datus glabājam, kamēr tie nepieciešami saziņai par apmācību. Līguma un grāmatvedības dokumentus glabājam likumos noteiktos termiņus, piemēram, grāmatvedības dokumentus vismaz 5 gadus. Kad dati vairs nav vajadzīgi, mēs tos dzēšam vai anonimizējam.",
          ],
        },
        {
          title: "Tavas tiesības",
          paragraphs: [
            "Tev ir tiesības piekļūt saviem datiem, labot tos, pieprasīt to dzēšanu vai apstrādes ierobežošanu, iebilst pret apstrādi, saņemt savus datus pārnešanai un atsaukt piekrišanu. Raksti mums uz {email} vai nāc uz mūsu biroju. Atbildēsim viena mēneša laikā.",
            "Ja uzskati, ka tavas tiesības ir pārkāptas, vari iesniegt sūdzību Datu valsts inspekcijai (www.dvi.gov.lv).",
          ],
        },
        {
          title: "Sīkdatnes",
          paragraphs: [
            "Šī vietne neizmanto sīkdatnes, analītikas vai reklāmas rīkus. Ja izvēlies gaišo vai tumšo krāsu tēmu, šī izvēle tiek saglabāta tikai tavā pārlūkā, un to vari dzēst pārlūka iestatījumos.",
          ],
        },
      ] satisfies DocumentSection[],
    },
  },

  notFound: {
    title: "Lapa nav atrasta",
    text: "Iespējams, saite ir novecojusi vai adrese ievadīta kļūdaini.",
    home: "Uz sākumlapu",
  },
};

export default lv;
