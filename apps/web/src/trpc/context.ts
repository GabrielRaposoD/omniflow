import { cache } from 'react';

type CreateContextOptions = object;

export async function createContextInner(_opts: CreateContextOptions) {
  return {};
}

export type Context = Awaited<ReturnType<typeof createContextInner>>;

export const createContext = cache(async (): Promise<Context> => {
  return await createContextInner({});
});
