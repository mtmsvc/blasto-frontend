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
 * TODO(content): texts marked with TODO(content) contain sample facts
 * (durations, payment terms…). Check them against the real school.
 */

import type { CategoryId } from "@/content/site";

type CategoryText = { name: string; text: string };

const lv = {
  meta: {
    description:
      "Autoskola Blasto: AM, A, B, BE, C, CE, D kategoriju un 95. koda apmācība. Teorija tiešsaistē vai klātienē, pieredzējuši instruktori un skaidras cenas.",
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

  nav: {
    home: "Sākums",
    courses: "Kursi un cenas",
    teachers: "Pasniedzēji",
    contacts: "Kontakti",
    apply: "Pieteikties",
  },

  footer: {
    tagline: "Mierīgs ceļš līdz vadītāja apliecībai.",
    pages: "Lapas",
    contacts: "Kontakti",
    rights: "Visas tiesības aizsargātas.",
  },

  home: {
    meta: { title: "Autoskola Blasto" },
    hero: {
      eyebrow: "Autoskola",
      title: "Mierīgi līdz vadītāja apliecībai",
      text: "Teorija tiešsaistē vai klātienē, pacietīgi instruktori un skaidras cenas. Apmācām AM, A, B, BE, C, CE un D kategorijā, kā arī 95. kodam.",
      primary: "Pieteikties apmācībai",
      secondary: "Kursi un cenas",
      cardTitle: "Kategorijas",
      cardText: "Izvēlies kategoriju, lai redzētu cenu un prasības.",
    },
    about: {
      title: "Par mums",
      // TODO(content): the school's real story
      paragraphs: [
        "Blasto ir autoskola, kurā braukt mācās bez steigas un stresa. Drošs vadītājs izaug no saprotamas teorijas, pietiekamas prakses un instruktora, kurš izskaidro, nevis kliedz.",
        "Mēs esam blakus visā ceļā: no pirmās teorijas nodarbības līdz eksāmenam CSDD.",
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
          text: "Braukšanas nodarbības laikā, kas der tev, arī vakaros un sestdienās.",
        },
        online: {
          title: "Teorija tiešsaistē",
          text: "Mācies no mājām vai nāc uz klasi. Izvēle ir tava.",
        },
        prices: {
          title: "Skaidras cenas",
          text: "Visas cenas redzamas iepriekš, bez slēptām maksām.",
        },
      },
    },
    formats: {
      title: "Divi veidi, kā apgūt teoriju",
      text: "Kurss ir vienāds abos formātos, atšķiras tikai vieta.",
      online: {
        title: "Tiešsaistē",
        text: "Nodarbības notiek tiešraidē internetā. Pietiek ar datoru vai telefonu.",
        points: [
          "Mācies no jebkuras vietas",
          "Jautājumi pasniedzējam tiešraidē",
          "Nav jātērē laiks ceļam",
        ],
      },
      inPerson: {
        title: "Klātienē",
        text: "Nodarbības notiek mūsu mācību klasē kopā ar grupu.",
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
          text: "Aizpildi īsu pieteikumu. Mēs piezvanīsim un atbildēsim uz jautājumiem.",
        },
        {
          title: "Apgūsti teoriju",
          text: "Tiešsaistē vai klātienē, pēc tam kārto teorijas eksāmenu CSDD.",
        },
        {
          title: "Brauc ar instruktoru",
          text: "Praktiskās nodarbības mācību auto kopā ar savu instruktoru.",
        },
        {
          title: "Nokārto eksāmenu",
          text: "Kad esi gatavs, kārto braukšanas eksāmenu un saņem apliecību.",
        },
      ],
    },
  },

  courses: {
    meta: {
      title: "Kursi un cenas",
      description:
        "AM, A, B, BE, C, CE, D kategoriju un 95. koda apmācības cenas autoskolā Blasto.",
    },
    title: "Kursi un cenas",
    text: "Teorijas kursu un braukšanas nodarbības apmaksā atsevišķi. Nodarbību skaits ir atkarīgs no tevis: brauc tik, cik vajag.",
    theory: "Teorijas kurss",
    lesson: "Braukšanas nodarbība",
    minAge: "Vecums",
    apply: "Pieteikties",
    applyFor: "Pieteikties {category} kategorijai",
    items: {
      b: {
        name: "Vieglais automobilis",
        text: "Automobiļi līdz 3500 kg ar ne vairāk kā 8 pasažieru sēdvietām.",
      },
      be: {
        name: "Automobilis ar piekabi",
        text: "B kategorijas automobilis ar piekabi, kuras masa pārsniedz 750 kg.",
      },
      am: {
        name: "Mopēds",
        text: "Mopēdi un vieglie kvadricikli ar ātrumu līdz 45 km/h.",
      },
      a: {
        name: "Motocikls",
        text: "Jebkuras jaudas motocikli.",
      },
      c: {
        name: "Kravas automobilis",
        text: "Kravas automobiļi, kuru pilnā masa pārsniedz 3500 kg.",
      },
      ce: {
        name: "Kravas auto ar piekabi",
        text: "C kategorijas automobilis ar piekabi vai puspiekabi.",
      },
      d: {
        name: "Autobuss",
        text: "Autobusi ar vairāk nekā 8 pasažieru sēdvietām.",
      },
      "95": {
        name: "95. kods",
        text: "Profesionālā kvalifikācija kravu un pasažieru pārvadājumu vadītājiem.",
      },
    } satisfies Record<CategoryId, CategoryText>,
    notes: {
      title: "Labi zināt",
      // TODO(content): check these facts
      items: [
        "CSDD eksāmenu un vadītāja apliecības maksa cenā nav iekļauta.",
        "Pirms apmācības nepieciešama medicīniskā izziņa.",
        "Viena braukšanas nodarbība ilgst 60 minūtes.",
      ],
    },
    faq: {
      title: "Biežāk uzdotie jautājumi",
      // TODO(content): real answers
      items: [
        {
          question: "Cik ilgi ilgst apmācība?",
          answer:
            "B kategorijas teorijas kurss parasti aizņem apmēram mēnesi. Braukšanas nodarbību skaits ir individuāls.",
        },
        {
          question: "Vai var maksāt pa daļām?",
          answer:
            "Jā. Teorijas kursu var apmaksāt divās daļās, bet braukšanas nodarbības apmaksā pirms katras nodarbības.",
        },
        {
          question: "Kas jāņem līdzi uz pirmo nodarbību?",
          answer:
            "Personu apliecinošs dokuments un medicīniskā izziņa. Visu pārējo nodrošināsim mēs.",
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
      description: "Autoskolas Blasto adrese, tālrunis, e-pasts un darba laiks.",
    },
    title: "Kontakti",
    text: "Zvani, raksti vai nāc ciemos. Atbildēsim uz visiem jautājumiem.",
    address: "Adrese",
    phone: "Tālrunis",
    email: "E-pasts",
    hours: "Darba laiks",
    openMap: "Atvērt kartē",
    closed: "Slēgts",
    days: {
      weekdays: "Pirmdiena–piektdiena",
      saturday: "Sestdiena",
      sunday: "Svētdiena",
    },
    company: {
      title: "Rekvizīti",
      name: "Nosaukums",
      registrationNumber: "Reģistrācijas nr.",
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
      inPersonHint: "Nodarbības mācību klasē",
      categories: "Kategorijas",
      categoriesHint: "Vari izvēlēties vairākas.",
      submit: "Nosūtīt pieteikumu",
      sending: "Sūta…",
      privacy:
        "Nosūtot pieteikumu, tu piekrīti, ka izmantosim tavus datus tikai, lai sazinātos par apmācību.",
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

  notFound: {
    title: "Lapa nav atrasta",
    text: "Iespējams, saite ir novecojusi vai adrese ievadīta kļūdaini.",
    home: "Uz sākumlapu",
  },
};

export default lv;
