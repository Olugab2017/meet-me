import {createTRPCRouter, baseProcedure, protectedProcedure} from "@/trpc/init";
import {agents, meetings} from "@/db/schema";
import {db} from "@/db";
import { agentInsertSchema } from "../schemas";
import { meetingInsertSchema } from "../schemas"; // You'll need to create this
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { create } from "domain";


export const agentsRouter = createTRPCRouter({
    getOne: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            const [existingAgent] = await db
                .select()
                .from(agents)
                .where(
                    and(
                        eq(agents.id, input.id),
                        eq(agents.userId, ctx.auth.user.id),
                    ),
                );

            if (!existingAgent) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Agent not found",
                });
            }

            return existingAgent;
        }),


    getMany: protectedProcedure.query(async ({ ctx }) => {
        return db
            .select()
            .from(agents)
            .where(eq(agents.userId, ctx.auth.user.id));
    }),

        create: protectedProcedure.input(agentInsertSchema).mutation(async ({input, ctx}) => {
            const [createdAgent] = await db.insert(agents).values({
                name: input.name,
                instructions: input.instructions ?? "",
                userId: ctx.auth.user.id,
            }).returning();

            return createdAgent;
        }),
    });

export const meetingsRouter = createTRPCRouter({
    // Get all meetings for the current user
    getMany: protectedProcedure.query(async ({ctx}) => {
        const data = await db
            .select({
                meeting: meetings,
                agent: agents,
            })
            .from(meetings)
            .leftJoin(agents, eq(meetings.agentId, agents.id))
            .where(eq(meetings.userId, ctx.auth.user.id))
            .orderBy(meetings.createdAt);
        
        return data;
    }),

    // Get a specific meeting by ID
    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({input, ctx}) => {
            const [meeting] = await db
                .select({
                    meeting: meetings,
                    agent: agents,
                })
                .from(meetings)
                .leftJoin(agents, eq(meetings.agentId, agents.id))
                .where(
                    and(
                        eq(meetings.id, input.id),
                        eq(meetings.userId, ctx.auth.user.id)
                    )
                );

            if (!meeting) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Meeting not found",
                });
            }

            return meeting;
        }),

    // Create a new meeting
    create: protectedProcedure
        .input(z.object({
            agentId: z.string(),
            title: z.string().min(1).max(255),
            description: z.string().optional(),
            scheduledAt: z.date().optional(),
        }))
        .mutation(async ({input, ctx}) => {
            // Verify the agent exists and belongs to the user
            const [agent] = await db
                .select()
                .from(agents)
                .where(
                    and(
                        eq(agents.id, input.agentId),
                        eq(agents.userId, ctx.auth.user.id)
                    )
                );

            if (!agent) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Agent not found or you don't have access to it",
                });
            }

            const [createdMeeting] = await db.insert(meetings).values({
                agentId: input.agentId,
                userId: ctx.auth.user.id,
                title: input.title,
                description: input.description ?? "",
                scheduledAt: input.scheduledAt,
                status: "scheduled",
            }).returning();

            return createdMeeting;
        }),

    // Start a meeting (change status to active)
    start: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({input, ctx}) => {
            const [meeting] = await db
                .select()
                .from(meetings)
                .where(
                    and(
                        eq(meetings.id, input.id),
                        eq(meetings.userId, ctx.auth.user.id)
                    )
                );

            if (!meeting) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Meeting not found",
                });
            }

            const [updatedMeeting] = await db
                .update(meetings)
                .set({
                    status: "active",
                    startedAt: new Date(),
                })
                .where(eq(meetings.id, input.id))
                .returning();

            return updatedMeeting;
        }),

    // End a meeting (change status to completed)
    end: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({input, ctx}) => {
            const [meeting] = await db
                .select()
                .from(meetings)
                .where(
                    and(
                        eq(meetings.id, input.id),
                        eq(meetings.userId, ctx.auth.user.id)
                    )
                );

            if (!meeting) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Meeting not found",
                });
            }

            const [updatedMeeting] = await db
                .update(meetings)
                .set({
                    status: "completed",
                    endedAt: new Date(),
                })
                .where(eq(meetings.id, input.id))
                .returning();

            return updatedMeeting;
        }),

    // Cancel a meeting
    cancel: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({input, ctx}) => {
            const [meeting] = await db
                .select()
                .from(meetings)
                .where(
                    and(
                        eq(meetings.id, input.id),
                        eq(meetings.userId, ctx.auth.user.id)
                    )
                );

            if (!meeting) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Meeting not found",
                });
            }

            const [updatedMeeting] = await db
                .update(meetings)
                .set({
                    status: "cancelled",
                })
                .where(eq(meetings.id, input.id))
                .returning();

            return updatedMeeting;
        }),

    // Delete a meeting
    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({input, ctx}) => {
            const [meeting] = await db
                .select()
                .from(meetings)
                .where(
                    and(
                        eq(meetings.id, input.id),
                        eq(meetings.userId, ctx.auth.user.id)
                    )
                );

            if (!meeting) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Meeting not found",
                });
            }

            await db.delete(meetings).where(eq(meetings.id, input.id));

            return { success: true };
        }),
});