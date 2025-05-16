import { jsonTransformer } from '@/utils/transformers';
import { initTRPC } from '@trpc/server';
import type { createContext } from './context';

type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create({
  transformer: jsonTransformer,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

export const publicProcedure = t.procedure;

export const authenticatedProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;

  return opts.next({
    ctx,
  });
});

export const mergeRouters = t.mergeRouters;

export const createCallerFactory = t.createCallerFactory;
