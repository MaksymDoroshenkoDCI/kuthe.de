export const translations = {
  de: {
    nav: {
      home: "Startseite",
      portfolio: "Portfolio",
      about: "Über uns",
      contact: "Kontakt",
      dashboard: "Dashboard"
    },
    hero: {
      title: "ERSTKLASSIGE GEWERBEOBJEKTE IN BERLIN",
      subtitle: "Die Arnold Kuthe Immobilienverwaltungs- GmbH ist ein mittelständisches, inhabergeführtes Familienunternehmen im Bereich des Berliner Gewerbeimmobilienmarktes. Wir verwalten unser Portfolio ausschließlich für die eigene Unternehmensgruppe.",
      cta: "Portfolio ansehen"
    },
    company: {
      title: "UNSERE PHILOSOPHIE",
      text: "Wir konzentrieren uns auf hochwertige Bürogebäude, klassische Fabrik- und Gewerbehöfe, industriell genutzte Gewerbegrundstücke und Pflegeheime. Dabei suchen wir das Besondere und Einzigartige in Berlin, ohne uns starre Grenzen bei der Art der Gewerbeimmobilie zu setzen.",
      values: "Kontinuität · Qualität · Unabhängigkeit"
    },
    properties: {
      title: "UNSER PORTFOLIO",
      filterAll: "Alle",
      filterOffice: "Büro",
      filterCommercial: "Gewerbe",
      filterResidential: "Wohnen",
      viewDetails: "Details ansehen"
    },
    footer: {
      address: "Brunsbütteler Damm 120-130, 13581 Berlin",
      rights: "© 2024 Arnold Kuthe Immobilienverwaltungs- GmbH. Alle Rechte vorbehalten.",
    },
    contact: {
      title: "Kontakt",
      notice: "Diese Seite wird überarbeitet!",
      subtitle: "Bei Fragen wenden Sie sich bitte telefonisch, per Fax oder per mail an uns:",
      firma: "Firma",
      sitz: "Sitz der Gesellschaft",
      anschrift: "Anschrift",
      telefon: "Telefon",
      telefax: "Telefax",
      email: "E-Mail",
      gericht: "Registergericht",
      geschaeftsfuehrer: "Geschäftsführer",
      gerichtsstand: "Gerichtsstand",
      behoerde: "Aufsichtsbehörde",
      ustid: "Umsatzsteueridentifikationsnummer"
    }
  },
  en: {
    nav: {
      home: "Home",
      portfolio: "Portfolio",
      about: "About Us",
      contact: "Contact",
      dashboard: "Dashboard"
    },
    hero: {
      title: "PRIME COMMERCIAL REAL ESTATE IN BERLIN",
      subtitle: "Arnold Kuthe Immobilienverwaltungs- GmbH is a medium-sized, owner-managed family business operating in the Berlin commercial real estate market. We manage our portfolio exclusively for our own corporate group.",
      cta: "View Portfolio"
    },
    company: {
      title: "OUR PHILOSOPHY",
      text: "We focus on high-quality office buildings, classic factory and commercial courtyards, industrially used commercial land and nursing homes. We look for the special and unique in Berlin without setting rigid boundaries for the type of commercial property.",
      values: "Continuity · Quality · Independence"
    },
    properties: {
      title: "OUR PORTFOLIO",
      filterAll: "All",
      filterOffice: "Office",
      filterCommercial: "Commercial",
      filterResidential: "Residential",
      viewDetails: "View Details"
    },
    footer: {
      address: "Brunsbütteler Damm 120-130, 13581 Berlin",
      rights: "© 2024 Arnold Kuthe Immobilienverwaltungs- GmbH. All rights reserved.",
    },
    contact: {
      title: "Contact",
      notice: "This page is being revised!",
      subtitle: "If you have any questions, please contact us by phone, fax or email:",
      firma: "Company",
      sitz: "Registered Office",
      anschrift: "Address",
      telefon: "Phone",
      telefax: "Fax",
      email: "Email",
      gericht: "Registration Court",
      geschaeftsfuehrer: "Managing Directors",
      gerichtsstand: "Jurisdiction",
      behoerde: "Supervisory Authority",
      ustid: "VAT Identification Number"
    }
  }
};

export type Locale = keyof typeof translations;
