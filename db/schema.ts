import { mysqlTable, int, varchar, timestamp, time } from "drizzle-orm/mysql-core";
import type { InferModel } from "drizzle-orm";

export const admin = mysqlTable("admin", {
	id: int("id").primaryKey().autoincrement(),
	username: varchar("username", { length: 255 }).notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	createdAt: timestamp("created_at").defaultNow(),
});

export const images = mysqlTable("images", {
	id: int("id").primaryKey().autoincrement(),
	url: varchar("url", { length: 255 }).notNull(),
	createdAt: timestamp("created_at").defaultNow(),
});

export const slides = mysqlTable("slides", {
	id: int("id").primaryKey().autoincrement(),
	url: varchar("url", { length: 255 }).notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	subtitle: varchar("subtitle", { length: 255 }),
	createdAt: timestamp("created_at").defaultNow(),
});

export const food = mysqlTable("food", {
	id: int("id").primaryKey().autoincrement(),
	name: varchar("name", { length: 255 }),
	price: varchar("price", { length: 255 }).notNull(),
	info: varchar("info", { length: 255 }).notNull(),
	subtypeId: int("subtype_id").references(() => picklists.id),
	typeId: int("type_id").references(() => picklists.id),
	createdAt: timestamp("created_at").defaultNow(),
});

export const picklists = mysqlTable("picklists", {
	id: int("id").primaryKey().autoincrement(),
	title: varchar("title", { length: 255 }).notNull(),
	delimeter: varchar("delimeter", { length: 255 }).notNull(),
	description: varchar("description", { length: 1000 }),
	createdAt: timestamp("created_at").defaultNow(),
});

export const workTime = mysqlTable("worktime", {
	id: int("id").primaryKey().autoincrement(),
	day: varchar("day", { length: 255 }).notNull(),
	open: varchar("open", { length: 255 }).notNull(),
	close: varchar("close", { length: 255 }).notNull(),
	createdAt: timestamp("created_at").defaultNow(),
});

export type Admin = InferModel<typeof admin>;
export type NewAdmin = InferModel<typeof admin, "insert">;

export type Slides = InferModel<typeof slides>;
export type NewSlides = InferModel<typeof slides, "insert">;

export type Food = InferModel<typeof food>;
export type NewFood = InferModel<typeof food, "insert">;

export type Picklists = InferModel<typeof picklists>;
export type NewPicklists = InferModel<typeof picklists, "insert">;

export type Worktime = InferModel<typeof workTime>;
export type NewWorktime = InferModel<typeof workTime, "insert">;

export type Image = InferModel<typeof images>;
export type NewImage = InferModel<typeof images, "insert">;
