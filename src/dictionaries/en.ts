/**
 * English texts. Must have exactly the same keys as lv.ts.
 * `{name}` placeholders are filled in by the code: keep them as is.
 */

import type { Dictionary } from ".";

const en: Dictionary = {
  meta: {
    description:
      "Blasto driving school in Riga: training for AM, A, B, BE, C, CE and D licences and code 95. Theory online or in person, lessons in Latvian, Russian or English.",
  },

  common: {
    skipToContent: "Skip to content",
    homeLink: "Blasto home page",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    language: "Language",
    breadcrumb: "Breadcrumb",
    theme: {
      label: "Colour theme",
      light: "Light",
      dark: "Dark",
      system: "Same as device",
    },
    cta: {
      title: "Ready to start?",
      text: "Leave an application and we will contact you on the next working day.",
      button: "Apply now",
      call: "Or call:",
    },
  },

  nav: {
    home: "Home",
    courses: "Courses & prices",
    teachers: "Teachers",
    contacts: "Contacts",
    apply: "Apply",
    privacy: "Privacy policy",
    rules: "School rules",
  },

  footer: {
    tagline: "A calm road to your driving licence.",
    pages: "Pages",
    contacts: "Contacts",
    rights: "All rights reserved.",
  },

  home: {
    meta: { title: "Blasto driving school in Riga" },
    hero: {
      eyebrow: "Driving school in Riga",
      title: "A calm road to your driving licence",
      text: "Theory online or in person, patient instructors and clear prices. We teach the AM, A, B, BE, C, CE and D categories, as well as code 95.",
      primary: "Apply for training",
      secondary: "Courses & prices",
      cardTitle: "Categories",
      cardText: "Pick a category to see its price and requirements.",
    },
    about: {
      title: "About us",
      paragraphs: [
        "Blasto is a driving school in Riga where you learn without rush or stress. You can study the theory in person or online, and you learn to drive in the same cars you will take the CSDD exam in.",
        "We are with you all the way, from the medical certificate and the first aid course to the CSDD exam. You can get both right here at our school.",
      ],
    },
    benefits: {
      title: "Why Blasto",
      items: {
        instructors: {
          title: "Patient instructors",
          text: "Calm, experienced teachers who adapt to your pace.",
        },
        schedule: {
          title: "Flexible schedule",
          text: "Lessons from Monday to Saturday, at times that suit you.",
        },
        languages: {
          title: "Three languages",
          text: "Training in Latvian, Russian or English.",
        },
        prices: {
          title: "Clear prices",
          text: "All costs are shown upfront, including the CSDD state fees.",
        },
      },
    },
    formats: {
      title: "Two ways to learn the theory",
      text: "The course is the same in both formats; only the place is different.",
      online: {
        title: "Online",
        text: "Lessons take place over the internet. A computer or a phone is all you need.",
        points: ["Study from anywhere", "No time lost on the road", "The same course as in person"],
      },
      inPerson: {
        title: "In person",
        text: "Lessons take place in our classroom in the centre of Riga, together with a group.",
        points: [
          "Real conversation with the teacher and the group",
          "Study materials on site",
          "Easier to keep a steady rhythm",
        ],
      },
    },
    steps: {
      title: "How it works",
      items: [
        {
          title: "Apply",
          text: "Fill in a short form. We will call you back, answer your questions and help you choose a group.",
        },
        {
          title: "Learn the theory",
          text: "Online or in person. After the course, pass the school theory exam and then the CSDD one.",
        },
        {
          title: "Drive with an instructor",
          text: "Get your learner permit at CSDD and drive with your own instructor.",
        },
        {
          title: "Pass the exam",
          text: "After the school driving exam, take the exam at CSDD and get your licence.",
        },
      ],
    },
    reviews: {
      title: "What our students say",
      rating: "{rating} out of 5 on Google",
      count: "Reviews: {count}",
      all: "All reviews on Google",
    },
  },

  courses: {
    meta: {
      title: "Courses & prices",
      description:
        "Training prices for the AM, A, B, BE, C, CE and D categories and code 95 at Blasto driving school in Riga, including CSDD state fees.",
    },
    title: "Courses & prices",
    text: "The theory course and the driving are paid separately. Driving is counted in academic hours (45 min); a lesson is usually 2 hours.",
    age: "Age",
    ageRange: "training {start}+, exam {exam}+",
    requires: "Requires category {list}",
    or: "or",
    documents: "Paperwork",
    theory: "Theory course",
    drivingHour: "Driving, 45 min",
    minDriving: "Min. driving, {hours} × 45 min",
    priceOnRequest: "Price on request",
    apply: "Apply",
    applyFor: "Apply for category {category}",
    more: "Details",
    moreAbout: "More about category {category}",
    items: {
      b: {
        name: "Car",
        text: "Cars up to 3,500 kg with no more than 8 seats (not counting the driver).",
      },
      be: {
        name: "Car with trailer",
        text: "A category B car with a trailer or semi-trailer weighing up to 3,500 kg.",
      },
      am: {
        name: "Moped",
        text: "Mopeds with an engine up to 50 cm³ and a top speed up to 45 km/h.",
      },
      a: {
        name: "Motorcycle",
        text: "Motorcycles from 50 cm³ and faster than 45 km/h. Also covers categories A1 and A2.",
      },
      c: {
        name: "Truck",
        text: "Trucks with a total weight over 3,500 kg.",
      },
      ce: {
        name: "Truck with trailer",
        text: "A category C truck with a trailer weighing more than 750 kg.",
      },
      d: {
        name: "Bus",
        text: "Buses with more than 8 seats (not counting the driver).",
      },
      "95": {
        name: "Code 95",
        text: "Professional qualification for carrying goods or passengers, plus the periodic training every 5 years (35 hours).",
      },
    },
    extras: {
      title: "Additional costs",
      services: {
        title: "Available at our school",
        text: "Before the training you need a medical certificate and a first aid course.",
        firstAid: "First aid course",
        medicalCertificate: "Medical certificate",
      },
      csdd: {
        title: "CSDD state fees",
        text: "These are paid to CSDD, not to the school. The amounts are set by the state.",
        learnerPermit: "Learner permit",
        theoryExam: "Theory exam",
        drivingExam: "Driving exam",
        licence: "Issuing the licence",
      },
    },
    notes: {
      title: "Good to know",
      items: [
        "One driving lesson lasts 90 minutes, which is 2 academic hours.",
        "Before driving, you need a learner permit from CSDD.",
        "You learn to drive in the same cars you will take the CSDD exam in.",
        "Training is available in Latvian, Russian and English.",
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          question: "At what age can I start?",
          answer:
            "You can start the category B training at 16 and take the CSDD exams from 18. The ages for other categories are shown on each category.",
        },
        {
          question: "Can I study the theory online?",
          answer:
            "Yes. Theory lessons take place in person in Riga or online, whichever suits you. Driving lessons take place in Riga.",
        },
        {
          question: "What if I miss a theory lesson?",
          answer:
            "You can attend the missed lesson with another group (€10) or individually (€70). If you are more than 15 minutes late, the lesson does not count.",
        },
        {
          question: "Can I cancel a driving lesson?",
          answer:
            "Yes, no later than 24 hours before it starts. Lessons cancelled later are not refunded.",
        },
        {
          question: "Can I take the exam in an automatic car?",
          answer:
            "Yes. Your licence will then have the code B (78), which allows you to drive only cars with an automatic gearbox.",
        },
      ],
    },
  },

  categoryPages: {
    sections: {
      requirements: "Requirements",
      theory: "Theory",
      practice: "Driving",
      exams: "Exams",
    },
    costs: "Costs",
    total: "Total, minimum",
    totalNote: "Plus: first aid course, medical certificate and CSDD state fees.",
    extrasLink: "See additional costs",
    otherCategories: "Other categories",
    items: {
      b: {
        title: "Category B",
        intro:
          "Category B lets you drive cars with a total weight up to 3,500 kg and no more than 8 seats (not counting the driver).",
        requirements: [
          "You can start the training at 16 and take the CSDD exams from 18.",
          "You need a medical certificate and a first aid course. You can get both at our school.",
        ],
        theory: [
          "11 theory lessons, in person or online (11 × 5 study hours).",
          "At the end, the school theory exam: 30 questions, 1 mistake allowed. Then the CSDD theory exam.",
        ],
        practice: [
          "Before driving, you need a learner permit from CSDD.",
          "The minimum is 20 academic hours, that is 10 lessons of 90 minutes. At the end, the school driving exam.",
        ],
        exams: [
          "CSDD theory exam: 30 questions, 3 mistakes allowed.",
          "The driving exam is taken in a manual car. You can also take it in an automatic, but then your licence will have the code B (78), and you may only drive cars with an automatic gearbox.",
        ],
      },
      be: {
        title: "Category BE",
        intro:
          "Category BE lets you drive a category B car with a trailer or semi-trailer weighing up to 3,500 kg.",
        requirements: [
          "You must be at least 18 and hold category B.",
          "You need a medical certificate and a first aid course. You can get both at our school.",
        ],
        theory: ["4 theory lessons. No theory exam, neither at school nor at CSDD."],
        practice: [
          "The minimum is 8 academic hours, that is 4 lessons of 90 minutes: manoeuvres on the training ground and driving in traffic. At the end, the school driving exam.",
        ],
        exams: [
          "Only the CSDD driving exam, in a car with a trailer. After it, you get category BE.",
        ],
      },
      am: {
        title: "Category AM",
        intro:
          "Category AM lets you ride mopeds with an engine up to 50 cm³ and a top speed up to 45 km/h.",
        requirements: [
          "You can start the training and take the CSDD exams from 14.",
          "You need a medical certificate and a first aid course. You can get both at our school.",
        ],
        theory: [
          "For category AM, training at a driving school is optional, but it helps you feel confident. We offer 3 to 11 theory lessons.",
          "There is no school theory exam: after the course you go straight to the CSDD theory exam.",
        ],
        practice: [
          "Before riding, you need a learner permit from CSDD.",
          "The course includes 10 academic hours, that is 5 lessons of 90 minutes: manoeuvres on the training ground and riding in traffic.",
        ],
        exams: [
          "CSDD theory exam: 20 questions, including 2 video questions, 2 mistakes allowed.",
          "Riding exam: manoeuvres on the training ground and riding in traffic. It is held from 1 April to 1 October. You need protective gear: helmet, protectors, clothing and gloves.",
        ],
      },
      a: {
        title: "Category A",
        intro:
          "Category A lets you ride motorcycles from 50 cm³ and faster than 45 km/h, with or without a sidecar. It also covers category A1 and A2 motorcycles.",
        requirements: [
          "You can start the training at 22 if you already hold category B. The CSDD exams can be taken from 24.",
          "You need a medical certificate and a first aid course. You can get both at our school.",
        ],
        theory: [
          "With category B, 3 theory lessons are enough (15 study hours). At the end, the school theory exam, then the CSDD theory exam.",
        ],
        practice: [
          "The minimum is 10 academic hours, that is 5 lessons of 90 minutes: manoeuvres on the training ground and riding in traffic. At the end, the school riding exam.",
        ],
        exams: [
          "CSDD theory exam: 30 questions, 3 mistakes allowed.",
          "Riding exam: manoeuvres on the training ground and riding in traffic, from 1 April to 1 October. You need protective gear: helmet, protectors, clothing and gloves.",
          "If you have held category A2 for at least 2 years, you only take the CSDD riding exam for category A.",
        ],
      },
      c: {
        title: "Category C",
        intro:
          "Category C lets you drive trucks with a total weight over 3,500 kg and no more than 8 passenger seats, including with a trailer up to 750 kg.",
        requirements: [
          "You can start the training at 19 if you already hold category B. The CSDD exams can be taken from 21.",
          "You need a medical certificate and a first aid course. You can get both at our school.",
        ],
        theory: [
          "6 to 10 theory lessons, depending on which categories you already have.",
          "At the end, the school theory exam: 35 questions, 1 mistake allowed. Then the CSDD theory exam.",
        ],
        practice: [
          "The course includes 10 to 20 academic hours, depending on your experience. At the end, the school driving exam.",
        ],
        exams: [
          "CSDD theory exam: 35 questions, 3 mistakes allowed. Driving exam: manoeuvres on the training ground and driving in traffic.",
          "To carry goods commercially, you also need code 95.",
        ],
      },
      ce: {
        title: "Category CE",
        intro:
          "Category CE lets you drive a category C truck with a trailer weighing more than 750 kg. Professional freight drivers need it.",
        requirements: [
          "You must be at least 21 and hold category C.",
          "You need a medical certificate and a first aid course. You can get both at our school.",
        ],
        theory: [
          "5 theory lessons (25 study hours). No theory exam, neither at school nor at CSDD.",
        ],
        practice: [
          "The minimum is 14 academic hours, that is 7 lessons of 90 minutes. At the end, the school driving exam.",
        ],
        exams: [
          "Only the CSDD driving exam, in a truck with a trailer.",
          "To carry goods commercially, you also need code 95.",
        ],
      },
      d: {
        title: "Category D",
        intro:
          "Category D lets you drive buses with more than 8 seats (not counting the driver), including with a trailer up to 750 kg.",
        requirements: [
          "You can start the training at 22 if you already hold category C1, D1 or C. The CSDD exams can be taken from 24.",
          "You need a medical certificate and a first aid course. You can get both at our school.",
        ],
        theory: [
          "6 to 8 theory lessons, depending on which categories you already have.",
          "At the end, the school theory exam: 35 questions, 1 mistake allowed. Then the CSDD theory exam.",
        ],
        practice: [
          "The course includes 12 to 20 academic hours, depending on your experience. At the end, the school driving exam.",
        ],
        exams: [
          "CSDD theory exam: 35 questions, 3 mistakes allowed. Driving exam: manoeuvres on the training ground and driving in traffic.",
          "To carry passengers commercially, you also need code 95.",
        ],
      },
      "95": {
        title: "Code 95",
        intro:
          "Code 95 is a mark on the driving licence that confirms your professional qualification. You need it to carry goods or passengers commercially.",
        requirements: [
          "You need category C1, C, C1E, CE, D1, D, D1E or DE and a medical certificate.",
        ],
        theory: [
          "5 theory lessons (5 × 7 study hours). New drivers take a school theory exam at the end: 45 questions, 1 mistake allowed.",
          "If you already have code 95, you need the periodic training every 5 years (35 hours). After it, we issue a certificate.",
        ],
        practice: ["No extra driving lessons are needed for code 95."],
        exams: [
          "At CSDD you take theory exams on traffic rules (35 questions, 3 mistakes allowed) and on professional topics (45 questions, 5 mistakes allowed).",
          "Practical exam: questions about the vehicle and securing cargo, manoeuvres on the training ground, and at least 90 minutes of driving in traffic.",
        ],
      },
    },
  },

  teachers: {
    meta: {
      title: "Teachers",
      description: "Meet the teachers and instructors of Blasto driving school.",
    },
    title: "Teachers",
    text: "Our instructors teach calmly, clearly and with respect for every student.",
    categories: "Categories",
    bios: {
      "teacher-1":
        "An instructor with more than 10 years of experience. Helps you feel confident in city traffic, too.",
      "teacher-2":
        "Patient and precise. Especially enjoys working with people who are behind the wheel for the first time.",
      "teacher-3": "A motorcycle and moped specialist who rides all year round.",
      "teacher-4":
        "Teaches the truck, bus and code 95 courses. Previously worked as a professional driver.",
    },
  },

  contacts: {
    meta: {
      title: "Contacts",
      description:
        "Address of Blasto driving school in Riga (Merķeļa iela 6), phone, email, opening hours and company details.",
    },
    title: "Contacts",
    text: "Call, write or drop by. We are happy to answer any question.",
    address: "Lesson address",
    addressDetails: "3rd floor, room 301",
    phone: "Phone",
    email: "Email",
    hours: "Opening hours",
    hoursLines: ["Every day, remotely", "Lessons: Monday–Saturday"],
    openMap: "Open in maps",
    company: {
      title: "Company details",
      name: "Name",
      registrationNumber: "Registration no.",
      legalAddress: "Legal address",
      bank: "Bank",
      account: "Account no.",
    },
  },

  apply: {
    meta: {
      title: "Application",
      description: "Apply for training at Blasto driving school and we will contact you.",
    },
    title: "Apply for training",
    text: "It takes less than a minute. Then we will call you to agree on the details.",
    form: {
      allRequired: "All fields are required.",
      name: "Full name",
      phone: "Phone",
      phoneHint: "For example, +371 20 000 000",
      email: "Email",
      trainingType: "Theory format",
      online: "Online",
      onlineHint: "Lessons over the internet",
      inPerson: "In person",
      inPersonHint: "Lessons in our classroom in Riga",
      categories: "Categories",
      categoriesHint: "You can choose more than one.",
      submit: "Send application",
      sending: "Sending…",
      privacy:
        "By sending the application, you agree that we use your details only to contact you about the training.",
      privacyLink: "Privacy policy",
    },
    errors: {
      summary: "Please correct the highlighted fields.",
      nameRequired: "Please enter your full name.",
      phoneRequired: "Please enter your phone number.",
      phoneInvalid: "This phone number looks wrong. For example: +371 20 000 000.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "This email address looks wrong. For example: name@mail.com.",
      trainingTypeRequired: "Please choose a theory format.",
      categoriesRequired: "Please choose at least one category.",
    },
    result: {
      successTitle: "Thank you! We have received your application.",
      successText: "We will contact you on the next working day.",
      again: "Send another application",
      errorTitle: "The application could not be sent",
      badRequest: "The server did not accept the data. Please check the fields and try again.",
      tooManyRequests: "Too many attempts. Please wait a minute and try again.",
      serverError: "Something went wrong on our server. Please try again later or call us.",
      network: "Could not reach the server. Please check your internet connection and try again.",
      unknown: "Something went wrong. Please try again or call us.",
      statusCode: "Error code: {status}",
    },
    aside: {
      title: "What happens next?",
      steps: [
        "We call you on the next working day.",
        "Together we choose a group and a schedule.",
        "You start your training.",
      ],
      question: "Questions? Call us:",
    },
  },

  legal: {
    updated: "Updated: November 2026",
    rulesNote:
      "The school rules are available in Latvian only. If anything is unclear, call or write to us and we will explain.",
    rulesMeta: {
      title: "School rules",
      description: "Internal rules for students of Blasto driving school (in Latvian).",
    },
    privacy: {
      meta: {
        title: "Privacy policy",
        description: "How Blasto driving school processes and protects your personal data.",
      },
      title: "Privacy policy",
      sections: [
        {
          title: "Who processes your data",
          paragraphs: [
            "The data controller is {legalName}, registration no. {registrationNumber}, legal address: {legalAddress}. You can reach us by email at {email} or by phone at {phone}.",
          ],
        },
        {
          title: "What data we process",
          items: [
            "From the application form: your name, phone number, email address, the chosen theory format and categories.",
            "When signing the training contract: also your personal code, address and other details needed for the training and for registration at CSDD.",
          ],
        },
        {
          title: "Why, and on what legal basis",
          items: [
            "To answer your application and contact you about the training (steps before entering into a contract, GDPR Article 6(1)(b)).",
            "To sign and carry out the training contract (GDPR Article 6(1)(b)).",
            "To meet legal obligations, such as registering you at CSDD and keeping accounting records (GDPR Article 6(1)(c)).",
            "To send news and offers, but only with your consent, which you can withdraw at any time (GDPR Article 6(1)(a)).",
          ],
        },
        {
          title: "Who we share data with",
          paragraphs: [
            "Only those who need it for the training or where the law requires it: CSDD, your instructor, partners who provide part of the training (such as first aid courses), and public authorities. We do not sell data, and we store it in the European Union or the European Economic Area.",
          ],
        },
        {
          title: "How long we keep data",
          paragraphs: [
            "We keep application data for as long as we need it to contact you about the training. Contracts and accounting documents are kept for the periods set by law, for example at least 5 years for accounting documents. When data is no longer needed, we delete or anonymise it.",
          ],
        },
        {
          title: "Your rights",
          paragraphs: [
            "You have the right to access your data, correct it, ask for it to be deleted or its processing to be restricted, object to processing, receive your data to transfer it, and withdraw your consent. Write to us at {email} or visit our office. We will reply within one month.",
            "If you believe your rights have been violated, you can file a complaint with the Data State Inspectorate of Latvia (www.dvi.gov.lv).",
          ],
        },
        {
          title: "Cookies",
          paragraphs: [
            "This website does not use cookies, analytics or advertising tools. If you choose the light or dark theme, that choice is saved only in your browser, and you can delete it in your browser settings.",
          ],
        },
      ],
    },
  },

  notFound: {
    title: "Page not found",
    text: "The link may be out of date, or the address may contain a typo.",
    home: "Go to the home page",
  },
};

export default en;
