import { auth } from "@/lib/auth";
import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { cache } from "react";

export const createTRPCContext = cache(async () => {
    const session = await auth.api.getSession({
        headers: await headers(), 
    });
    
    return {
        auth: session,
    };
});

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create();

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
    if (!ctx.auth) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User is not authenticated' });
    }

    return next({ 
        ctx: {
            ...ctx, 
            auth: ctx.auth // Now guaranteed to exist
        } 
    });
});