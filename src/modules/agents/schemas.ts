import { z } from "zod";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Agents table
export const agents = pgTable("agents", {
    id: text("id").primaryKey().notNull().$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    instructions: text("instructions").default(""),
    userId: text("user_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Meetings table
export const meetings = pgTable("meetings", {
    id: text("id").primaryKey().notNull().$defaultFn(() => crypto.randomUUID()),
    agentId: text("agent_id").notNull().references(() => agents.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    description: text("description").default(""),
    status: text("status").notNull().default("scheduled"), // scheduled, active, completed, cancelled
    scheduledAt: timestamp("scheduled_at"),
    startedAt: timestamp("started_at"),
    endedAt: timestamp("ended_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const agentsRelations = relations(agents, ({ many }) => ({
    meetings: many(meetings),
}));

export const meetingsRelations = relations(meetings, ({ one }) => ({
    agent: one(agents, {
        fields: [meetings.agentId],
        references: [agents.id],
    }),
}));

// Zod Schemas for validation
export const agentInsertSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
    instructions: z.string().max(500, "Instructions must be less than 500 characters").optional(),
});

export const meetingInsertSchema = z.object({
    id: z.string().optional(),
    agentId: z.string().min(1, "Agent ID is required"),
    title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
    description: z.string().max(1000, "Description must be less than 1000 characters").optional(),
    scheduledAt: z.date().optional(),
    status: z.enum(["scheduled", "active", "completed", "cancelled"]).default("scheduled").optional(),
});