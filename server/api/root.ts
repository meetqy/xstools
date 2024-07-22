import { aiSlugGenerator } from "@/server/api/routers/ai-slug-generator";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { aiGeneratorFakeUser } from "./routers/ai-generator-fake-user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  aiSlugGenerator,
  aiGeneratorFakeUser,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
