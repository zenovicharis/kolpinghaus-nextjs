import { getDb } from "../lib/db";
import { food, picklists, slides, images } from "./schema";
import { eq } from "drizzle-orm";
import dotenv from "dotenv";

dotenv.config();

async function seed() {
	const db = await getDb();

	// Slides
	const slideData = [
		{
			title: "Herzlich Willkommen",
			url: "img/Slider/slide1.jpg",
		},
		{
			title: "Genießen Sie in unserer einzigartigen Rezepte",
			url: "img/Slider/slide2.png",
		},
		{
			title: "Herzlich Willkommen",
			url: "img/Slider/slide3.png",
		},
	];

	for (const s of slideData) {
		const existing = await db
			.select()
			.from(slides)
			.where(eq(slides.title, s.title))
			.limit(1)
			.execute();
		if (existing.length === 0) {
			await db
				.insert(slides)
				.values({ title: s.title, url: s.url, createdAt: new Date() })
				.execute();
		}
	}

	// Gallery Images
	const galleryData = [
		"/img/grid/pic1.jpg",
		"/img/grid/pic2.jpg",
		"/img/grid/pic3.jpg",
		"/img/grid/pic4.jpg",
		"/img/grid/pic5.jpg",
		"/img/grid/pic6.jpg",
		"/img/grid/pic7.jpg",
		"/img/grid/pic8.jpg",
		"/img/grid/pic9.jpg",
		"/img/grid/pic10.jpg",
		"/img/grid/pic12.jpg",
	];

	for (const path of galleryData) {
		const existing = await db
			.select()
			.from(images)
			.where(eq(images.url, path))
			.limit(1)
			.execute();
		if (existing.length === 0) {
			await db
				.insert(images)
				.values({ url: path, createdAt: new Date() })
				.execute();
		}
	}

	// Food and Picklists
	const foodSections = [
		{
			section: "Vorspeise",
			delimeter: "food-type",
			types: [
				{
					subtype: "Apperatifs",
					items: [
						{ name: "Glass Prosecco", price: "3.5", info: "0.1l" },
						{ name: "Aperol Spritz", price: "5", info: "" },
						{
							name: "Hugo",
							price: "5",
							info: "Holunderblütensirup mit Minzblättern, Limetten und Prosecco",
						},
					],
				},
				{
					subtype: "Vorspeisen",
					items: [
						{
							name: "Im Knoblauch gebratene Pepperoni",
							price: "8",
							info: "Serviert mit Baguette",
						},
						{
							name: "Gebackener Camembert",
							price: "8.5",
							info: "Petersilie, Pfirsichhälften mit Preiselbeeren, dazu Toast",
						},
						{
							name: "Caprese",
							price: "8",
							info: "Tomaten und Mozzarella in Scheiben geschnitten dazu Basilikum und Balsamicosauce",
						},
						{
							name: "Champignons 'Mendoza-Art'",
							price: "9",
							info: "Frische Champignons mit Knoblauch und Toast",
						},
						{ name: "Gambas", price: "12.9", info: "In Knoblauchsauce" },
					],
				},
				{
					subtype: "Suppen",
					items: [
						{
							name: "Französische Zwiebelsuppe",
							price: "5.2",
							info: "mit Käse überbacken",
						},
						{
							name: "Tagessuppe",
							price: "5.2",
							info: "(fragen Sie unser Personal)",
						},
					],
				},
			],
		},
	];

	for (const section of foodSections) {
		// Insert or get type
		let typePick = await db
			.select()
			.from(picklists)
			.where(eq(picklists.title, section.section))
			.limit(1)
			.execute();
		if (typePick.length === 0) {
			const [inserted] = await db
				.insert(picklists)
				.values({
					title: section.section,
					delimeter: section.delimeter,
					description: `Food category: ${section.section}`,
					createdAt: new Date(),
				})
				.returning();
			typePick = [inserted];
		}

		for (const subtype of section.types) {
			let subtypePick = await db
				.select()
				.from(picklists)
				.where(eq(picklists.title, subtype.subtype))
				.limit(1)
				.execute();
			if (subtypePick.length === 0) {
				const [inserted] = await db
					.insert(picklists)
					.values({
						title: subtype.subtype,
						delimeter: "food-subtype",
						description: `Subtype of ${section.section}`,
						createdAt: new Date(),
					})
					.returning();
				subtypePick = [inserted];
			}

			for (const item of subtype.items) {
				const existing = await db
					.select()
					.from(food)
					.where(eq(food.name, item.name))
					.limit(1)
					.execute();
				if (existing.length === 0) {
					await db
						.insert(food)
						.values({
							name: item.name,
							price: item.price,
							info: item.info,
							typeId: typePick[0].id,
							subtypeId: subtypePick[0].id,
							createdAt: new Date(),
						})
						.execute();
				}
			}
		}
	}

	console.log("✅ Seeding completed.");
}

seed().catch((err) => {
	console.error("❌ Seeding failed:", err);
	process.exit(1);
});
