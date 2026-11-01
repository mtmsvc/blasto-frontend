/**
 * "Iekšējās kārtības noteikumi": the school's internal rules for students.
 *
 * Copied word for word from the previous website (blasto.lv, November 2026).
 * This is a legal document, so it is kept in Latvian only and edited as a
 * whole here, not in the dictionaries. The Russian and English pages show
 * it with a note that the document is in Latvian.
 *
 * TODO(content): have the school review it. It mentions info@blasto.lv and
 * +371 20169111, which differ from the contacts used elsewhere on the site.
 */

export type LegalSection = { title: string; clauses: string[] };

export const rulesLv: { title: string; sections: LegalSection[] } = {
  title: "Iekšējās kārtības noteikumi",
  sections: [
    {
      title: "Vispārīgie jautājumi",
      clauses: [
        "1.1. Autoskolas vietnes www.blasto.lv uzturētājs un tirgotājs ir SIA Blasto, reģ. Nr. 40203287655, juridiskā adrese: Merķeļa iela 6-8, Rīga, Latvija, LV-1050 (turpmāk Autoskola).",
        "1.2. Autoskolas Kursantu iekšējās kārtības Noteikumi (turpmāk – Noteikumi) sastādīti saskaņā ar Ministru kabineta noteikumiem Nr.358 “Noteikumi par transportlīdzekļu vadītāju apmācību un transportlīdzekļu vadītāju apmācības programmām” un Nr.103 „Transportlīdzekļu vadītāja tiesību iegūšanas un atjaunošanas kārtība un vadītāja apliecības izsniegšanas, apmaiņas, atjaunošanas un iznīcināšanas kārtība” (turpmāk – MK noteikumi).",
        "1.3. Noteikumu mērķis ir regulēt un nodrošināt Autoskolas pareizu darba organizāciju, mācību laika pilnīgu un racionālu izmantošanu, disciplīnas ievērošanu un Kursantu drošību Autoskolā;",
        "1.4. Autoskola pārdod pakalpojumus, izmantojot interneta vietnes platformu. Piedāvātie pakalpojumi aptver autoskolas Blasto pakalpojumus un citu uzņēmumu pakalpojumus, kas saistīti ar autovadītāju apmācību, kurus Autoskolai ir atļauts pārdot.",
        "1.5. Kursants, veicot reģistrāciju interneta vietnē www.blasto.lv, apliecina, ka viņš ir iepazinies ar interneta vietnes lietošanas noteikumiem un ir sapratis to būtību un tālāk minēto.",
      ],
    },
    {
      title: "Datu apstrādes un glabāšanas politika",
      clauses: [
        "2.1. Autoskola apstrādā Kursanta personas datus tādā apjomā, kas nepieciešams šī Līguma noteikumu izpildei.",
        "2.2. Autoskola komunikācijā, tajā skaitā attālinātajā (izmantojot e-pastu, tālruni), identificē privātpersonu pēc diviem no, turpmāk nosauktajiem, identifikatoriem:",
        "2.2.1. Kursanta vārda, uzvārda un personas koda,",
        "2.2.2. Noslēgtā apmācības Līguma numura. Ja Kursants norāda nepieciešamos identifikatorus, Autoskola ir tiesīga viņu apkalpot.",
        "2.3. Autoskola apņemas neizpaust un neizplatīt trešajām personām, bez Kursanta piekrišanas, Līguma izpildes gaitā iegūto informāciju, izņemot gadījumus, kad informācija tiek sniegta Ceļu Satiksmes Drošības Direkcijai, Autoskolas instruktoram, valsts pārvaldes sistēmas iestādēm un tiesībsargājošām institūcijām, kā arī citos gadījumos, kad informācijas izpaušanu pieprasa piemērojamie tiesību akti. Autoskola ir tiesīga nodot informāciju saviem sadarbības partneriem, kas saistīti ar autovadītāju apmācību, šī Līguma izpildei.",
        "2.4. Kursants, parakstot šo Līgumu, apstiprina, ka ir informēts par tiesībām iepazīties ar saviem iesniegtajiem un apstrādātajiem datiem, labot tos, saņemt un pārsūtīt tos citam pārzinim, ierobežot to apstrādi vai atteikties no datu apstrādes, atsaucot savu sniegto piekrišanu, kā arī pieprasīt datu dzēšanu. Kursants apzinās, ka piekrišanas atsaukšana neietekmēs apstrādes likumīgumu, kura pamatā ir pirms atsaukuma sniegtā piekrišana, kā arī gadījumos, kad datu apstrāde tiek veikta saskaņā ar citu tiesisko pamatu.",
        "2.5. Autoskolai ir tiesības pieprasīt un saņemt Kursanta personas datus no trešajām personām šī Līguma un tiesību aktos noteikto pienākumu izpildei.",
      ],
    },
    {
      title: "Pieteikšanās un līguma noslēgšanas kārtība",
      clauses: [
        "3.1. Kursants izrāda vēlmi mācīties Autoskolā, izvēlas pakalpojumu vai mācību grupu vietnē www.blasto.lv un spiež pogu “Pieteikties”, apstiprinot savu izvēli. Visiem pakalpojumiem interneta vietnē ir pievienoti detalizēti apraksti, kas sniedz informāciju par pakalpojumu: cenu, norises vietu, pakalpojuma sniegšanas valodu, datumu, laiku u.tml.",
        "3.2. Nākamajā posmā Kursants iziet reģistrācijas procesu Autoskolā, kur Kursants ievada savus personas datus (vārds, uzvārds, personas kods, tālrunis, e-pasta adrese). Pēc reģistrācijas pabeigšanas Kursants apliecina ka ir iepazinies un piekrīt Apmācības līguma nosacījumiem un šiem Noteikumiem.",
        "3.3. Autoskola nosūta Kursantam apstiprinājumu uz e-pastu, kurā atkārtoti norādīts pasūtītāja pasūtījums. Šis apstiprinājums nav uzskatāms par mācību līgumu. Apmācības līgums stājas spēkā tikai pēc tā abpusējas parakstīšanas brīža, t.sk. izmantojot drošu elektronisko parakstu.",
        "3.4. Lai noskaidrotu neskaidros jautājumus par iegādāto pakalpojumu, autoskola var sazināties ar pasūtītāju pa tālruni vai pa e-pastu. Tālruņa numurs un e-pasts tiek izmantots tikai un vienīgi pirkuma apstrādei, un netiek izmantots reklāmas nolūkos, ja vien pasūtītājs nav tam piekritis.",
        "3.5. Apmācības līgums nevar būt noslēgts šādos gadījumos:",
        "3.5.1. ja Kursantam ir piemērots administratīvais sods – aizliegums noteiktu laiku iegūt transportlīdzekļu vadīšanas tiesības – vai atņemtas transportlīdzekļu vadīšanas tiesības;",
        "3.5.2. ja Kursantam ir piemērots transportlīdzekļu vadīšanas tiesību izmantošanas aizliegums;",
        "3.5.3. ja Kursants nav sasniedzis 16 gadu vecumu;",
        "3.5.4. ja Kursantam ir konstatētas medicīniskās pretindikācijas transportlīdzekļu vadīšanai;",
        "3.5.5. ja Kursantam nav tiesību uzturēties Latvijā un nav piešķirts personas kods.",
      ],
    },
    {
      title: "Teorētisko priekšmetu apmācības procesa organizācija",
      clauses: [
        "4.1. Katrs Kursants ir atbildīgs par sava apmācības procesa ievērošanu. Autoskola nenes atbildību par Kursanta apmācību nodarbību kavēšanu, maksājumu neveikšanu un/vai kavēšanu, kā arī citiem apmācību procesa pārkāpumiem, kuri var ietekmēt mācību procesu.",
        "4.2. Nodarbības notiek atkarībā no izvēlētās grupas vai apmācības veida, saskaņā ar nodarbību grafiku. Kursants Autoskolā ierodas/pieslēdzās mācību platformai (ja nodarbība notiek attālināti) savlaicīgi, lai nodarbībai uzsākoties, Kursants atrastos mācību telpā vai online platformā un netraucētu pasniedzējam sākt apmācības.",
        "4.3. Ja nodarbība tiek kavēta vairāk par 15 minūtēm no nodarbības sākuma, Kursanta nodarbību apmeklējums netiek reģistrēts CSDD sistēmā. Kavētā nodarbība Kursantam ir jānoklausās kopā ar citu grupu, iepriekš veicot apmaksu par kavēto nodarbību: citā mācību grupā – 10,00 EUR; individuāli – 70,00 EUR.",
        "4.4. Nodarbību grafiks tiek paziņots pirmajā teorijas nodarbībā. Nodarbību grafiks var tikt mainīts. Kursants apmeklē visas nodarbību sarakstā paredzētās nodarbības.",
        "4.5. Teorētiskos priekšmetus pasniedz pasniedzēji, kuriem ir attiecīgo priekšmetu pasniedzēja kvalifikācija, ko apstiprina apliecība.",
        "4.6. Teorētisko priekšmētu nodarbība ir uzskatāma par apmeklētu, ja Kursants mācību dienā ir apmeklējis visas noteiktās mācību stundas. Ja netiek apmeklēta vismaz viena mācību stunda, konkrētās teorētisko priekšmetu nodarbības apmācība jāveic atkārtoti.",
        "4.7. Pēc teorētisko priekšmetu apmācības pabeigšanas Kursantam ir tiesības pieteikties teorijas eksāmena kārtošanai.",
        "4.8. Teorētiskās apmācības uz B kategoriju var apgūt arī tālmācības platformā www.macam.lv, t.i. 8 nodarbības no 11 e-vidē, noslēdzot atbilstošu līgumu. Kursantiem jāapgust platformas teorētisko daļu 4 kalendāro mēnešu garumā, citādāk, piekļūve tiks apstadinātā.",
        "4.9. Ja Kursants kavē vairākas nodarbības vai maksājumus, Autoskola ir tiesīga atskaitīt Kursantu.",
        "4.10. Apmācība tiek nodrošināta gan latviešu, gan krievu, gan angļu valodā. Apmācību valodas izvēle ir atkarīga no izvēlētās grupas un apmācību veida.",
        "4.11. Kursants drīkst atteikties (pa tālr. vai e-pastu) no rezervētās atkārtotās teorētiskās nodarbības – ne vēlāk, kā 24st. līdz nodarbības sākumam, pretējā gadījumā iemaksātā nauda par atkārtotu teorētisko nodarbību Kursantam netiek atgriezta depozītā.",
        "4.12. Klients apņemas apgūt teorētisko priekšmetu apmācību viena gada laikā. Ja teorētisko priekšmetu apmācība netiek pabeigta minētajā termiņā, tā jāveic atkārtoti, reģistrējoties jaunā mācību grupā.",
      ],
    },
    {
      title: "Braukšanas apmācības kārtība",
      clauses: [
        "5.1. Pirms braukšanas apmācības uzsākšanas Kursants klātienē apņemas noformēt braukšanas mācību atļauju CSDD.",
        "5.2. Kursants izvēlas vēlamo nodarbības laiku un instruktoru, (ņemot vērā attiecīgā instruktora cenrādi), to apstiprina.",
        "5.3. Ja Kursants nevar ierasties uz braukšanas nodarbību, viņa pienākums ir atcelt braukšanas nodarbību ne vēlāk, kā 24st. līdz nodarbības sākumam, pretējā gadījumā iemaksātā nauda par braukšanas nodarbību Kursantam netiek atgriezta.",
        "5.4. Pēc Noteikumos noteikto 10 minimālo praktisko braukšanas nodarbību (20 ak./st.) pabeigšanas Kursants var turpināt braukšanas apmācību vai izvēlēties kārtot Autoskolas braukšanas eksāmenu.",
      ],
    },
    {
      title: "Autoskolas eksāmeni",
      clauses: [
        "6.1. Autoskolas teorijas eksāmens.",
        "6.1.1. Kursants tiek pielaists pie teorijas eksāmena ar nosacījumu, ka ir nokārtotas visas finansiālas saistības ar Autoskolu.",
        "6.1.2. Autoskolas teorijas eksāmenu atļauts kārtot 1 reizi dienā. Tas sastāv no 30 jautājumiem. Kursants drīkst pieļaut 1 kļūdu, pretējā gadījumā eksāmenu jākārto no jauna.",
        "6.1.3. Kursants ierodoties uz autoskolas teorijas eksāmenu, uzrāda personu apliecinošu dokumentu, pretējā gadījumā netiek pie eksāmena pielaists.",
        "6.1.4. Pēc autoskolas teorijas eksāmena nokārtošanas Autoskola viec nepieciešamas atzīmes CSDD datu bāzē 5 darba dienu laikā, pēc kā kļūst pieejama teorijas eksāmena kārtošana CSDD, par ko KLIENTS saņem informatīvu e-pastu.",
        "6.1.5. Pēc informatīva e-pasta saņemšanas Kursants apņemas 3 darba dienu laikā nokārtot CSDD teorētisko eksāmenu, vai arī atkārtoti kārto autoskolas eksāmenu 3 darba dienas pirms plānotā CSDD eksāmena.",
        "6.2. Autoskolas braukšanas eksāmens.",
        "6.6. Autoskolas braukšanas eksāmena kārtošana pieļaujama tikai pēc nokārtota Autoskolas teorētiskā eksāmena.",
        "6.7. Autoskolas braukšanas eksāmena organizēšana un apmaksa notiek kā jebkurai braukšanas nodarbībai, instruktora vietā izvēloties “Braukšanas eksāmens”. Pēc autoskolas braukšanas eksāmena nokārtošanas Autoskola viec nepieciešamas atzīmes CSDD datu bāzē 5 darba dienu laikā, pēc kā kļūst pieejama braukšanas eksāmena kārtošana CSDD, par ko Kursants saņem informatīvu e-pastu.",
      ],
    },
    {
      title: "Pirmās palīdzības kursi",
      clauses: [
        "7.1. Kursantam, kas vēlas iegūt A, A2, B, BE, C1, C1E, D1, D1E, C, CE, D, DE kategorijas transportlīdzekļu vadītāju kvalifikāciju, ir nepieciešams iziet pirmās palīdzības mācību kursus. No šiem kursiem ir atbrīvotas personas, kas jau ir pabeigušas pirmās palīdzības mācību kursus, vai kurām ir vidējā vai augstākā medicīniskā izglītība vai kuras mācās attiecīgās izglītības iestādēs. Šāda gadījumā Kursantam, iesniedzot CSDD izglītības pabeigšanas dokumenta kopiju vai izziņu no attiecīgās mācību iestādes, jāsaņem CSDD apstiprinājums par pirmās palīdzības kursu ieskaitīšanu;",
        "7.2. Autoskola piedāvā iespēju iziet pirmās palīdzības kursus pie Apmacītājorganizācijas, ar kuru sadarbojas;",
        "7.3. Kursants var brīvi izvēlēties organizāciju pirmās palīdzības kursu pakalpojumu saņemšanai;",
        "7.4. Autoskolai nav pienākuma organizēt pirmās palīdzības kursus saviem Kursantiem, bet savu iespēju robežās, Autoskola centīsies tos nodrošināt;",
        "7.5. Pirmās palīdzības kursi skaitās nokārtoti un sertifikāts tiek izsniegts pēc visu attiecīgu maksājumu veikšanas, praktiskās daļas un veiksmīgas teorijas eksāmena nokārtošanas;",
        "7.6. Kursants drīkst atteikties (pa tālr. vai e-pastu) no Pirmās palīdzības kursiem – ne vēlāk kā 24 st. līdz kursu sākumam, pretējā gadījumā iemaksātā nauda par apmācību Kursantam netiek atgriezta;",
      ],
    },
    {
      title: "Naudas atgriešanas politika",
      clauses: [
        "8.1. Kursantam ir tiesības atkāpties no distances līguma 14 dienu laikā no tā noslēgšanas, ja pakalpojums vēl nav izmantots. Šai nolūkā Kursantam ir jāsazinās ar Autoskolu, rakstot e-pastu uz: info@blasto.lv vai zvanot pa tālruni: 20169111.",
        "8.2. KLIENTAM ir tiesības laicīgi atteikties no AUTOSKOLAS sniegtājiem pakalpojumiem:",
        "8.2.1. no Pirmās palīdzības kursiem ne vēlāk kā 24 st. līdz kursu sākumam, pretējā gadījumā iemaksātā nauda par apmācību Kursantam netiek atgriezta;",
        "8.2.2. no Medicīniskās komisijas ne vēlāk kā 24 st. līdz kursu sākumam, pretējā gadījumā iemaksātā nauda par apmācību Kursantam netiek atgriezta;",
        "8.2.3. no autoskolas teorijas vai braukšanas eksāmeniem ne vēlāk kā 24 st. līdz eksāmena sākumam, pretējā gadījumā iemaksātā nauda par eksāmeniem Kursantam netiek atgriezta;",
        "8.2.4. no rezervētās atkārtotās teorētiskās nodarbības ne vēlāk kā 24 st. līdz nodarbības sākumam, pretējā gadījumā iemaksātā nauda par atkārtotu nodarbību Kursantam netiek atgriezta.",
        "8.3. Sūdzību gadījumā Kursants ir tiesīgs vērsties pie Autoskolas, iesniedzot rakstisku pretenziju Autoskolas administrācijai un adresējot to SIA “Blasto”, Reģ. Nr. 40203287655, Juridiskā adrese: Merķeļa iela 6-8, Rīga, LV-1050.",
        "8.4. SIA “Blasto” izskata iesniegumus un pretenzijas 5 darba dienu laikā no to saņemšanas brīža. Pēc Kursanta pamatotas pretenzijas Autoskola atgriež naudu par atbilstošā mācību procesa daļu. Atmaksājamo naudas summu par pakalpojumu kursants saņems pilnā apmērā atpakaļ ne vēlāk kā 10 dienu laikā no iesnieguma vai pretenzijas izskatīšanas dienas. Atmaksāšana tiks veikta, izmantojot tādu pašu maksāšanas līdzekli, kādu kursants izmantoja sākotnējam darījumam, ja vien kursants nav skaidri paudis piekrišanu to darīt citādi.",
      ],
    },
    {
      title: "Uzvedības noteikumi",
      clauses: [
        "9.1. Autoskolas telpās, kāpņu telpās un nodarbībās kategoriski aizliegts lietot alkoholiskos dzērienus, smēķēt un lietot narkotiskās vielas;",
        "9.2. Kursantam jāievēro pārējo klausītāju tiesības un nedrīkst traucēt apmācību gaitu;",
        "9.3. Nodarbību laikā jāievēro disciplīna un klusums. Nodarbību laikā aizliegts lietot mobilos telefonu, CD, DVD u.c. elektroniskas ierīces, jo ierīču lietošana traucē mācību procesam;",
        "9.4. Kursantam jāizturas ar cieņu pret pasniedzējiem, personālu, saviem grupas biedriem un citiem klausītājiem;",
        "9.5. Nodarbībās Kursantam jāpilda pasniedzēja norādījumi un uzdevumi;",
        "9.6. Kursantam saudzīgi jāizturas pret Autoskolas inventāru, mācību līdzekļiem un telpu aprīkojumu. Inventāra, mācību līdzekļu un telpas sabojāšanas gadījumā Kursants par to paziņo pasniedzējam, administrācijai vai Autoskolas vadībai un atlīdzina skolai nodarītos zaudējumus.",
      ],
    },
    {
      title: "Atsauksmes",
      clauses: [
        "10.1. Atsauksmes tiek publicētas mājaslapā 2 darba dienu laikā, pie nosacījuma, ka informācija atbilst patiesībai;",
        "10.2. Autoskola var sazināties ar jebkuru Kursantu, kurš atstāja atsauksmi, lai saņemtu vairāk informācijas pakalpojumu kvalitātes kontroles un uzlabošanas nolūkos;",
        "10.3. Netiek publicētas atsauksmes, kurās:",
        "10.3.1. tiek izmantota nenormatīva leksika;",
        "10.3.2. tiek izrādīta agresija;",
        "10.3.3. tiek skartas politiskās, seksuālas un reliģiozas tēmas;",
        "10.3.4. tiek izmantota apšaubāma vai nepatiesa informācija.",
      ],
    },
    {
      title: "Nobeiguma noteikumi",
      clauses: [
        "11.1. Gadījumā, ja Autoskolas darbinieks, pasniedzējs vai instruktors nepilda šī Noteikumu nosacījumus, Kursantam ir pienākums nekavējoties informēt par to Autoskolas vadību, izmantojot rekvizītos norādīto telefonu.",
        "11.2. Šie lietošanas noteikumi nosaka, ka panākta pilnīga vienošanās starp visām iesaistītajām pusēm, kas ir jebkādā veidā saistītas ar šo noteikumu izpildi. Vietnes www.blasto.lv lietošana nozīmē pilnīgu, bezierunu piekrišanu šiem noteikumiem.",
      ],
    },
  ],
};
