/**
 * English texts. Must have exactly the same keys as lv.ts.
 * `{name}` placeholders are filled in by the code: keep them as is.
 */

import type { Dictionary } from ".";

const en: Dictionary = {
  meta: {
    description:
      "Blasto driving school: training for AM, A, B, BE, C, CE and D licences and code 95. Theory online or in person, experienced instructors and clear prices.",
  },

  common: {
    skipToContent: "Skip to content",
    homeLink: "Blasto home page",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    language: "Language",
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
  },

  footer: {
    tagline: "A calm road to your driving licence.",
    pages: "Pages",
    contacts: "Contacts",
    rights: "All rights reserved.",
  },

  home: {
    meta: { title: "Blasto driving school" },
    hero: {
      eyebrow: "Driving school",
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
        "Blasto is a driving school where you learn without rush or stress. A confident driver grows from clear theory, enough practice and an instructor who explains instead of shouting.",
        "We are with you all the way, from the first theory lesson to the CSDD exam.",
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
          text: "Driving lessons at times that suit you, including evenings and Saturdays.",
        },
        online: {
          title: "Theory online",
          text: "Study from home or come to the classroom. It is your choice.",
        },
        prices: {
          title: "Clear prices",
          text: "All prices are shown upfront, with no hidden fees.",
        },
      },
    },
    formats: {
      title: "Two ways to learn the theory",
      text: "The course is the same in both formats; only the place is different.",
      online: {
        title: "Online",
        text: "Lessons are streamed live over the internet. A computer or a phone is all you need.",
        points: [
          "Study from anywhere",
          "Ask the teacher questions live",
          "No time lost on the road",
        ],
      },
      inPerson: {
        title: "In person",
        text: "Lessons take place in our classroom, together with a group.",
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
          text: "Fill in a short form. We will call you back and answer your questions.",
        },
        {
          title: "Learn the theory",
          text: "Online or in person, then take the theory exam at CSDD.",
        },
        {
          title: "Drive with an instructor",
          text: "Practical lessons in a training car with your own instructor.",
        },
        {
          title: "Pass the exam",
          text: "When you are ready, take the driving exam and get your licence.",
        },
      ],
    },
  },

  courses: {
    meta: {
      title: "Courses & prices",
      description:
        "Training prices for the AM, A, B, BE, C, CE and D categories and code 95 at Blasto driving school.",
    },
    title: "Courses & prices",
    text: "The theory course and the driving lessons are paid separately. The number of lessons is up to you: drive as much as you need.",
    theory: "Theory course",
    lesson: "Driving lesson",
    minAge: "Age",
    apply: "Apply",
    applyFor: "Apply for category {category}",
    items: {
      b: {
        name: "Car",
        text: "Cars up to 3,500 kg with no more than 8 passenger seats.",
      },
      be: {
        name: "Car with trailer",
        text: "A category B car with a trailer heavier than 750 kg.",
      },
      am: {
        name: "Moped",
        text: "Mopeds and light quadricycles with a top speed of 45 km/h.",
      },
      a: {
        name: "Motorcycle",
        text: "Motorcycles of any power.",
      },
      c: {
        name: "Truck",
        text: "Trucks with a total weight over 3,500 kg.",
      },
      ce: {
        name: "Truck with trailer",
        text: "A category C truck with a trailer or semi-trailer.",
      },
      d: {
        name: "Bus",
        text: "Buses with more than 8 passenger seats.",
      },
      "95": {
        name: "Code 95",
        text: "Professional qualification for drivers who carry goods or passengers.",
      },
    },
    notes: {
      title: "Good to know",
      items: [
        "CSDD exam and licence fees are not included in the price.",
        "You need a medical certificate before the training starts.",
        "One driving lesson lasts 60 minutes.",
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          question: "How long does the training take?",
          answer:
            "The category B theory course usually takes about a month. The number of driving lessons depends on you.",
        },
        {
          question: "Can I pay in instalments?",
          answer:
            "Yes. The theory course can be paid in two parts, and driving lessons are paid before each lesson.",
        },
        {
          question: "What should I bring to the first lesson?",
          answer: "An identity document and a medical certificate. We provide everything else.",
        },
      ],
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
      description: "Address, phone, email and opening hours of Blasto driving school.",
    },
    title: "Contacts",
    text: "Call, write or drop by. We are happy to answer any question.",
    address: "Address",
    phone: "Phone",
    email: "Email",
    hours: "Opening hours",
    openMap: "Open in maps",
    closed: "Closed",
    days: {
      weekdays: "Monday–Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    },
    company: {
      title: "Company details",
      name: "Name",
      registrationNumber: "Registration no.",
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
      inPersonHint: "Lessons in the classroom",
      categories: "Categories",
      categoriesHint: "You can choose more than one.",
      submit: "Send application",
      sending: "Sending…",
      privacy:
        "By sending the application, you agree that we use your details only to contact you about the training.",
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

  notFound: {
    title: "Page not found",
    text: "The link may be out of date, or the address may contain a typo.",
    home: "Go to the home page",
  },
};

export default en;
