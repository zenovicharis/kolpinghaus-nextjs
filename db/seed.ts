import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { admin, slides, workTime, food, picklists, images } from './schema';
import * as bcrypt from 'bcryptjs';
import 'dotenv/config';

const main = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
  });

  const db = drizzle(connection);

  await db.delete(admin);
  await db.delete(slides);
  await db.delete(workTime);
  await db.delete(food);
  await db.delete(picklists);
  await db.delete(images);

  const hashedPassword = await bcrypt.hash('Asd123!', 10);

  await db.insert(admin).values({
    username: 'haris@zenovic.com',
    password: hashedPassword,
  });

  const slidesData = [
    {
      url: 'img/Slider/slide1.jpg',
      title: 'Herzlich Willkommen',
      subtitle: 'Begleiten Sie uns in den besten balkan und internationale Küche genießen',
    },
    {
      url: 'img/Slider/slide2.png',
      title: 'Genießen Sie in unserer einzigartigen Rezepte',
      subtitle: 'Spüren Sie den echten Geschmack des Balkans',
    },
    {
      url: 'img/Slider/slide3.png',
      title: 'Herzlich Willkommen',
      subtitle: 'Begleiten Sie uns in den besten balkan und internationale Küche genießen',
    },
  ];

  await db.insert(slides).values(slidesData);

  const workTimeInput = {
    "Montag": "17:00 - 23:00",
    "Dienstag": "Ruhetag",
    "Mittwoch": "17:00 - 23:00",
    "Donnerstag": "17:00 - 23:00",
    "Freitag": "17:00 - 23:00",
    "Samstag": "17:00 - 23:00",
    "Sonntag": "11:30 - 14:30\n17:00 - 21:00"
  };

  const workTimeData = Object.entries(workTimeInput).map(([day, time]) => ({ day, time }));

  for (const wt of workTimeData) {
    if (wt.time === 'Ruhetag') {
      await db.insert(workTime).values({ day: wt.day, open: '00:00', close: '00:00' });
    } else {
      const times = wt.time.split('\n');
      for (const t of times) {
        const [open, close] = t.split(' - ');
        await db.insert(workTime).values({ day: wt.day, open: open, close: close });
      }
    }
  }

  const foodData = [
    {
      "name": "Vorspeise",
      "types": [
        {
          "name": "Apperatifs",
          "list": [
            { "name": "Glass Prosecco", "price": "3.5", "info": "0.1l" },
            { "name": "Aperol Spritz", "price": "5", "info": "" },
            { "name": "Hugo", "price": "5", "info": "Holunderblütensirup mit Minzblättern, Limetten und Prosecco" }
          ]
        },
        {
          "name": "Vorspeisen",
          "list": [
            { "name": "Im Knoblauch gebratene Pepperoni", "price": "8", "info": "Serviert mit Baguette" },
            { "name": "Gebackener Camembert", "price": "8.5", "info": "Petersilie, Pfirsichhälften mit Preiselbeeren, dazu Toast" },
            { "name": "Caprese", "price": "8", "info": "Tomaten und Mozzarella in Scheiben geschnitten dazu Basilikum und Balsamicosauce" },
            { "name": "Champignons 'Mendoza-Art'", "price": "9", "info": "Frische Champignons mit Knoblauch und Toast" },
            { "name": "Gambas", "price": "12.9", "info": "In Knoblauchsauce" }
          ]
        },
        {
          "name": "Suppen",
          "list": [
            { "name": "Französische Zwiebelsuppe", "price": "5.2", "info": "mit Käse überbacken" },
            { "name": "Tagessuppe", "price": "5.2", "info": "(fragen Sie unser Personal)" }
          ]
        },
        {
          "name": "Salaten",
          "list": [
            { "name": "Salat 'Balkan Art'", "price": "10.9", "info": "Frische Salate der Saison mit Schafskäse in Essig-Öl Dressing" },
            { "name": "Salat 'Tonno'", "price": "10.9", "info": "Frische Salate der Saison in Essig-Öl Dressing dazu Zwiebeln, Oliven und Tunfisch" },
            { "name": "Chefsalat", "price": "10.9", "info": "Frische Salate der Saison, Gurken, Tomaten, Mais, Bohnen,Krautsalat, Oliven, gekochter Schinken & Käse" },
            { "name": "Salat 'Adria'", "price": "11.9", "info": "Frische Salate der Saison mit gebratenen Putenbruststreifen in Sahne-Dressing" },
            { "name": "Salat 'Galia'", "price": "14.9", "info": "Frische Salate der Saison  mit Rindfleischstreifen von Grill mit Sahne-Dressing" },
            { "name": "Salatplatte 'Kolping'", "price": "14.9", "info": "Frische Salate der Saison mit Italienischem Dressing  dazu gegrillte Scampi, Oliven und Ei" }
          ]
        },
        {
          "name": "Toastgerichte",
          "list": [
            { "name": "Toast 'Hawai'", "price": "8.2", "info": "Toast mit Kochschinken, Ananas, Sauce Hollandaise und Käse überbacken" },
            { "name": "Toast 'Florida'", "price": "12.2", "info": "Toast mit Putenmedaillons, Pfirsichhälften  und Sauce Hollandaise,  mit Käse überbacken" },
            { "name": "Toast 'Kolping'", "price": "12.2", "info": "Toast mit Schweinefiletlendchen, Pfirsichhälften und Sauce Hollandaise, mit Käse überbacken" }
          ]
        }
      ]
    },
    {
      "name": "Hauptgericht",
      "types": [
        {
          "name": "Vegetarische Gerichte",
          "list": [
            { "name": "Ofenkartoffel mit frischem Gemüse aus der Pfanne", "price": "11.9", "info": "mit Käse überbacken, dazu Kräuterquark und Salatgarnitur" },
            { "name": "Satarasch", "price": "11.9", "info": "Verschiedenes Gemüse aus der Pfanne mit Butterreis" }
          ]
        },
        {
          "name": "Nudelgerichte",
          "list": [
            { "name": "Tagliatelle 'Carbonara'", "price": "9.9", "info": "Bandnudeln mit Schinken und Käse in einer feinen Sahnesauce" },
            { "name": "Tagliatelle 'Mediterran'", "price": "9.9", "info": "Bandnudeln mit Kirschtomaten, Rucola und Parmesan-Käse" }
          ]
        },
        {
          "name": "Pikantes aus der Pfanne",
          "list": [
            { "name": "Muckalica", "price": "17.9", "info": "geschnetzeltes Schweinefilet mit Paprika, Zwiebeln, Tomaten gedünstet, dazu Butterreis und Salat" },
            { "name": "Bauernpfanne", "price": "17.9", "info": "3 Schweinemedaillons auf Bratkartoffel, (Speck - Zwiebeln) frische Champignons, Spiegelei & gemischter Salat" }
          ]
        },
        {
          "name": "Schnitzel",
          "list": [
            { "name": "Schnitzel  Wiener Art", "price": "11.9", "info": "Paniertes Schnitzel vom Schweinerücken dazu Pommes Frites und gemischter Salat" },
            { "name": "Jäger Schnitzel", "price": "13.9", "info": "Schweineschnitzel mit Jägersauce, Kroketten und Salat" },
            { "name": "Champignon Rahmschnitzel", "price": "13.9", "info": "Schweineschnitzel mit Pommes Frites und Salat" },
            { "name": "Zigeuner Schnitzel", "price": "13.9", "info": "Schweineschnitzel mit Zigeunersauce, Pommes Frites und Salat" },
            { "name": "Zwiebel-Schnitzel", "price": "13.9", "info": "Schweineschnitzel mit geschmorten Zwiebeln, Bratkartoffeln und Salat" },
            { "name": "Krüstchen", "price": "13.9", "info": "Schweineschnitzel auf Toast mit Spiegelei dazu Pommes Frites und Salat" },
            { "name": "Pfefferrahm-Schnitzel", "price": "13.9", "info": "Schweineschnitzel in einer mit einer Pfefferrahmsauce dazu Kroketten und Salat" },
            { "name": "Cordon Bleu", "price": "13.9", "info": "Gefülltes paniertes Schnitzel mit Kochschinken und Käse dazu Pommes Frites und Gemüse" },
            { "name": "Schnitzel Kolping", "price": "14.9", "info": "Schweineschnitzel mit Tomaten, Sauce Hollandaise und Käse überbacken dazu Folienkartoffel und Salat" },
            { "name": "Schnitzel Hawaii", "price": "14.9", "info": "Paniertes Schnitzel mit Ananas, Sauce Hollandaise und Käse überbacken dazu Kroketten und Salat" }
          ]
        },
        {
          "name": "Balkan Gerichte",
          "list": [
            { "name": "Balkanleber", "price": "12.5", "info": "Rinderleber mit geschmorten Zwiebeln dazu Bratkartoffeln und Salat" },
            { "name": "Cevapcici", "price": "12.9", "info": "Fleischröllchen mit Pommes Frites, Djuvecreis, Ajvar, Zwiebeln und Salat" },
            { "name": "Raznicij", "price": "13.5", "info": "zwei Fleischspieße vom Schweinenacken mit Pommes Frites, Djuvecreis und Salat" },
            { "name": "Halb und Halb", "price": "13.5", "info": "Fleischspieß vom Schweinenacken, drei Cevapcici dazu Pommes Frites, Djuvecreis, Ajvar, Zwiebeln und Salat" },
            { "name": "Steak 'Somoborski Art'", "price": "13.5", "info": "zwei Schweinerückensteaks vom Grill mit viel Knoblauch dazu Djuvecreis, Pommes Frites und Salat" },
            { "name": "Pljeskavica 'Spezial'", "price": "15.5", "info": "Hackfleischsteak gefüllt mit Schafskäse dazu Djuvecreis, Pommes Frites und Salt" },
            { "name": "Grillteller", "price": "16.9", "info": "zwei Cevapcici, ein kleines Hacksteak, ein kleines Schweinesteak, ein Spieß und Speck dazu Djuvecreis, Pommes Frites und Salat" },
            { "name": "Reuberspieß", "price": "17.9", "info": "Rindersteak, Schweinesteak und Hacksteak mit Speck, Paprika dazu Pommes Frites, Djuvecreis und Salat" },
            { "name": "Dubrovnik Spieß", "price": "18.9", "info": "Rumpsteak, Hacksteack, Schweinefilet, Speck, Zwiebeln dazu Pfefferrahmsauce, eine Folienkartoffel mit Kräuterquark und Salat" },
            { "name": "Vjesalica 'Montenegro'", "price": "19.9", "info": "Schweinefilet gefüllt mit Schafskäse, Reis, Pommes Frites und Salat" }
          ]
        },
        {
          "name": "Fisch Gerichte",
          "list": [
            { "name": "Calamaris (paniert)", "price": "14.5", "info": "Tintenfischringe mit Rösti dazu Salt und Kräuterquark" },
            { "name": "Lachssteak", "price": "20.9", "info": "in einer Knoblauch-Sahne-Sauce dazu Butterreis und Salat" },
            { "name": "Zanderfilet", "price": "20.9", "info": "Zanderfilet auf frischem knackigem gedünstetem Gemüse dazu Röstitaler" }
          ]
        },
        {
          "name": "Steak",
          "list": [
            { "name": "Putensteak", "price": "17.9", "info": "dazu Folienkartoffel mit Kräuterquark und Salat" },
            { "name": "Rumpsteak(200g)", "price": "22.9", "info": "argentinisches Rumpsteak mit Pommes Frites und Salat" },
            { "name": "Lustiger Bosnjak", "price": "23.9", "info": "Rumpsteak  gefüllt mit Schinken, Käse und Senfdazu Djuvecreis, Pommes Frites und Salat" },
            { "name": "Black and White' (200g)", "price": "23.9", "info": "argentinisches Rumpsteak mit Pfefferrahmsauce, Kroketten und Salat" },
            { "name": "Steak 'Kolping'", "price": "23.9", "info": "argentinisches Rumpsteak (200g) mit geschmorten Zwiebeln dazu Bratkartoffeln und Salat" },
            { "name": "Entrecote-Steak (200g)", "price": "24.9", "info": "mit Kräuterbutter, dazu Folienkartoffel und Salt" }
          ]
        }
      ]
    },
    {
      "name": "Spezialangebote",
      "types": [
        {
          "name": "Für unsere 'Kleinen gaste'",
          "list": [
            { "name": "Kinderspieß", "price": "8.9", "info": "vom Schwein mit Pommes Frites dazu Wahlweise Ketchup oder Mayonaise" },
            { "name": "Kinderportion Civapcici", "price": "8.9", "info": "mit Pommes Frites dazu Wahlweise Ketchup oder Mayonaise" },
            { "name": "Kleines Wienerschnitzel", "price": "8.9", "info": "mit Pommes Frites dazu Wahlweise Ketchup oder Mayonaise" },
            { "name": "Konstantin Steak", "price": "8.9", "info": "kl. Schweinesteak mit Broccoli Suace Hollandaise und Kroketten" }
          ]
        },
        {
          "name": "Platten für 2 Personen",
          "list": [
            { "name": "Balkangrillplatte", "price": "39.9", "info": "4 Cevapcici, zwei kleine Hacksteaks, zwei Schweinesteaks, zwei Spieße und Speckdazu Djuvecreis, Pommes Frites, Gemüse und Salat" },
            { "name": "Steakplatte", "price": "49.9", "info": "Arg. Rumpsteak (450g) wird serviert mit Pfefferrahmsauce & Sauce Bearnaise dazu Bratkartoffeln (Speck & Zwiebeln), Kaisergemüse überzogen mit Sauce Hollandaise" }
          ]
        },
        {
          "name": "HAUSSPEZIALITÄTEN",
          "list": [
            { "name": "Hähnchenfilet in einer Sahnesauce mit Mozzarella überbacken", "price": "14.9", "info": "dazu Butterreis und Kaisergemüse" },
            { "name": "Putenmedaillons Hawaii", "price": "16.9", "info": "belegt mit Kochschinken und Ananas mit Hollandaise und Käse überbacken dazu Röstitaler und Salat" },
            { "name": "Schweinegeschnetzeltes 'Züricher Art'", "price": "16.5", "info": "mit Champignons im Rahmsauce dazu Röstitaler und Salat" },
            { "name": "Schweinefile 'Imperial'", "price": "16.5", "info": "3 Medaillons in Pfefferrahmsauce dazu Bratkartoffeln und Salat" },
            { "name": "Kolping-Teller", "price": "16.5", "info": "Schweinefiletmedaillons mit gerösteten Zwiebeln mit Käse überbacken dazu Kroketten" },
            { "name": "Filettopf", "price": "18.5", "info": "Schweine-, Puten- und Rindersteak mit Bratkartoffeln, Gemüse und Salat" }
          ]
        }
      ]
    },
    {
      "name": "Beilage",
      "types": [
        {
          "name": "Beilagen",
          "list": [
            { "name": "Pommes Frites", "price": "3.5", "info": "" },
            { "name": "Kroketten", "price": "3.5", "info": "" },
            { "name": "Röstitaler", "price": "3.5", "info": "" },
            { "name": "Djuvecreis", "price": "3.5", "info": "" },
            { "name": "Bratkartoffeln", "price": "4.5", "info": "" },
            { "name": "Folienkartoffel", "price": "4.5", "info": "" },
            { "name": "Beilagensalat", "price": "3.5", "info": "" },
            { "name": "Kaisergemüse", "price": "3.5", "info": "" }
          ]
        },
        {
          "name": "Saucen",
          "list": [
            { "name": "Ketchup", "price": "0.6", "info": "" },
            { "name": "Majonaise", "price": "0.6", "info": "" },
            { "name": "Ajvar", "price": "3", "info": "" },
            { "name": "Zaziki", "price": "3", "info": "" },
            { "name": "Kräuterquark", "price": "2.1", "info": "" },
            { "name": "Sauce Hollandaise", "price": "3", "info": "" },
            { "name": "Sauce Bearnaise", "price": "3", "info": "" },
            { "name": "Pfefferrahmsauce", "price": "3.1", "info": "" },
            { "name": "Champignonrahmsauce", "price": "3.1", "info": "" },
            { "name": "Zigeunersauce", "price": "3.1", "info": "" }
          ]
        }
      ]
    },
    {
      "name": "Getrankenkarte",
      "types": [
        {
          "name": "Biere",
          "list": [
            { "name": "Krombacher Pils", "price": "1.9", "info": "0.2l" },
            { "name": "Krombacher Pils", "price": "2.7", "info": "0.3l" },
            { "name": "Krombacher Pils", "price": "3.6", "info": "0.4l" },
            { "name": "Malzbier", "price": "2.7", "info": "0.3l" },
            { "name": "Pils mit Schuss", "price": "1.9", "info": "0.2l" },
            { "name": "Pils mit Schuss", "price": "2.7", "info": "0.3l" },
            { "name": "Pils mit Schuss", "price": "3.6", "info": "0.4l" },
            { "name": "Pils mit Cola", "price": "1.9", "info": "0.2l" },
            { "name": "Pils mit Cola", "price": "2.7", "info": "0.3l" },
            { "name": "Pils mit Cola", "price": "3.6", "info": "0.4l" },
            { "name": "Krefelder", "price": "3.6", "info": "0.4l" },
            { "name": "Weizen hell", "price": "3.9", "info": "0.5l" },
            { "name": "Weizen dunkel", "price": "3.9", "info": "0.5l" },
            { "name": "Weizen alkoholfrei", "price": "3.9", "info": "0.5l" },
            { "name": "Krombacher alkoholfrei", "price": "2.9", "info": "0.33l" },
            { "name": "Alsterwasser", "price": "1.9", "info": "0.2l" },
            { "name": "Pils mit Fanta", "price": "2.7", "info": "0.3l" },
            { "name": "Pils mit Fanta", "price": "3.6", "info": "0.4l" },
            { "name": "Bananen-Weizen", "price": "4.2", "info": "0.5l" }
          ]
        },
        {
          "name": "Alkoholfreie Getranke",
          "list": [
            { "name": "Sprite", "price": "1.9", "info": "0.2l" },
            { "name": "Sprite", "price": "2.7", "info": "0.3l" },
            { "name": "Sprite", "price": "3.6", "info": "0.4l" },
            { "name": "Coca-Cola", "price": "1.9", "info": "0.2l" },
            { "name": "Coca-Cola", "price": "2.7", "info": "0.3l" },
            { "name": "Coca-Cola", "price": "3.6", "info": "0.4l" },
            { "name": "Coca-Cola light", "price": "1.9", "info": "0.2l" },
            { "name": "Coca-Cola light", "price": "2.7", "info": "0.3l" },
            { "name": "Coca-Cola light", "price": "3.6", "info": "0.4l" },
            { "name": "Fanta", "price": "1.9", "info": "0.2l" },
            { "name": "Fanta", "price": "2.7", "info": "0.3l" },
            { "name": "Fanta", "price": "3.6", "info": "0.4l" },
            { "name": "Spezi(Cola,Fanta)", "price": "1.9", "info": "0.2l" },
            { "name": "Spezi(Cola,Fanta)", "price": "2.7", "info": "0.3l" },
            { "name": "Spezi(Cola,Fanta)", "price": "3.6", "info": "0.4l" },
            { "name": "Apfelsaftschorle", "price": "1.9", "info": "0.2l" },
            { "name": "Apfelsaftschorle", "price": "2.7", "info": "0.3l" },
            { "name": "Apfelsaftschorle", "price": "3.6", "info": "0.4l" },
            { "name": "Mineralwasser", "price": "2.6", "info": "0.25l" },
            { "name": "Mineralwasser", "price": "6", "info": "0.75l" },
            { "name": "Orangensaft", "price": "2.8", "info": "0.2l" },
            { "name": "Apfelsaft", "price": "2.8", "info": "0.2l" },
            { "name": "Johannisbeersaft", "price": "2.8", "info": "0.2l" },
            { "name": "Ginger Ale", "price": "2.8", "info": "0.2l" },
            { "name": "Bitter Lemon", "price": "2.8", "info": "0.2l" },
            { "name": "Tonic Water", "price": "2.8", "info": "0.2l" },
            { "name": "Fassbrause", "price": "2.8", "info": "0.33l" }
          ]
        },
        {
          "name": "Offene Weine",
          "list": [
            { "name": "Rotwein", "price": "5.2", "info": "trocken, halbtrocken, lieblich - 0.25l" },
            { "name": "Weißwein", "price": "5.2", "info": "trocken, halbtrocken, lieblich - 0.25l" },
            { "name": "Weinschorle", "price": "4.5", "info": "0.25l" }
          ]
        },
        {
          "name": "Flaschenweine",
          "list": [
            { "name": "Vranac (Rotwein)", "price": "25", "info": "trocken - 0.75l" },
            { "name": "Krstac (Weißwein)", "price": "25", "info": "trocken - 0.75l" }
          ]
        },
        {
          "name": "Warme Getranke",
          "list": [
            { "name": "Tasse Kaffee", "price": "2.2", "info": "" },
            { "name": "Cappuccino", "price": "2.8", "info": "" },
            { "name": "Tasse Tee", "price": "2.2", "info": "" },
            { "name": "Tasse Kakao", "price": "2.5", "info": "" },
            { "name": "Tasse Kakao mit Sahne", "price": "2.8", "info": "" },
            { "name": "Milchkaffee", "price": "2.8", "info": "" },
            { "name": "Latte Macchiatto", "price": "3.1", "info": "" },
            { "name": "Tasse Espresso", "price": "2.2", "info": "" },
            { "name": "Glas Grog", "price": "3.5", "info": "" }
          ]
        },
        {
          "name": "Longdrinks",
          "list": [
            { "name": "Wodka Lemon", "price": "3.9", "info": "2cl" },
            { "name": "Wodka Orange", "price": "3.9", "info": "2cl" },
            { "name": "Bacardi Cola", "price": "3.9", "info": "2cl" },
            { "name": "Asbach Cola", "price": "3.5", "info": "2cl" }
          ]
        },
        {
          "name": "Spirituosen",
          "list": [
            { "name": "Tequila", "price": "2", "info": "2cl" },
            { "name": "Sljivovic", "price": "2", "info": "2cl" },
            { "name": "Julischka", "price": "2", "info": "2cl" },
            { "name": "Obstler", "price": "2.1", "info": "2cl" },
            { "name": "Fernet Branca", "price": "2.3", "info": "2cl" },
            { "name": "Jägermeister", "price": "2.3", "info": "2cl" },
            { "name": "Ramazotti", "price": "2.3", "info": "2cl" },
            { "name": "Baileys", "price": "2.3", "info": "2cl" },
            { "name": "Jubil Aquavit", "price": "2.3", "info": "2cl" },
            { "name": "Malteser", "price": "2.3", "info": "2cl" },
            { "name": "Wodka", "price": "2.3", "info": "2cl" },
            { "name": "Williams", "price": "2.5", "info": "2cl" },
            { "name": "Asbach Uralt", "price": "2.5", "info": "2cl" },
            { "name": "Grappa", "price": "2.5", "info": "2cl" },
            { "name": "Jack Daniels", "price": "3", "info": "2cl" },
            { "name": "Remy Martin", "price": "4", "info": "2cl" },
            { "name": "Chivas", "price": "4.3", "info": "2cl" },
            { "name": "Ballantines", "price": "3", "info": "2cl" },
            { "name": "Jim Beam", "price": "3", "info": "2cl" },
            { "name": "Bacardi", "price": "3", "info": "2cl" },
            { "name": "Ouzo", "price": "2.1", "info": "2cl" },
            { "name": "Sambuca", "price": "2.1", "info": "2cl" },
            { "name": "Korn", "price": "2", "info": "2cl" }
          ]
        }
      ]
    },
    {
      "name": "Dessert",
      "types": [
        {
          "name": "Dessert",
          "list": [
            { "name": "Gemischtes Eis ohne Sahne", "price": "4", "info": "Vanilleeis, Erbeereis und Schokoladeneis" },
            { "name": "Gemischtes Eis mit Sahne", "price": "4.5", "info": "Vanilleeis, Erdbeereis und Schokoladeneis" },
            { "name": "Heiße Liebe", "price": "6", "info": "Vanilleeis Wahlweise mit heißen Kirschen oder heißen Himbeeren und Sahne" },
            { "name": "Palatschinken", "price": "7", "info": "Pfannkuchen mit Vanilleeis, Sahne und Schoko-Sauce" }
          ]
        }
      ]
    }
  ];

  for (const category of foodData) {
    const [typeResult] = await db.insert(picklists).values({
      title: category.name,
      delimeter: 'main',
    });
    const typeId = typeResult.insertId;

    for (const subCategory of category.types) {
      const [subtypeResult] = await db.insert(picklists).values({
        title: subCategory.name,
        delimeter: 'sub',
        description: category.name,
      });
      const subtypeId = subtypeResult.insertId;

      if (subCategory.list) {
        for (const item of subCategory.list) {
          await db.insert(food).values({
            name: item.name,
            price: item.price,
            info: item.info,
            typeId: typeId,
            subtypeId: subtypeId,
          });
        }
      }
    }
  }

  const galleryData = [
    { "path": "/img/grid/pic1.jpg" },
    { "path": "/img/grid/pic2.jpg" },
    { "path": "/img/grid/pic3.jpg" },
    { "path": "/img/grid/pic4.jpg" },
    { "path": "/img/grid/pic5.jpg" },
    { "path": "/img/grid/pic6.jpg" },
    { "path": "/img/grid/pic7.jpg" },
    { "path": "/img/grid/pic8.jpg" },
    { "path": "/img/grid/pic9.jpg" },
    { "path": "/img/grid/pic10.jpg" },
    { "path": "/img/grid/pic12.jpg" }
  ];

  for (const image of galleryData) {
    await db.insert(images).values({ url: image.path });
  }

  console.log('Seeding complete');
  process.exit(0);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});