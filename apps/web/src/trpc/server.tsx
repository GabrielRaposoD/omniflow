import "server-only";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { cache } from "react";
import { createContext } from "./context";
import { makeQueryClient } from "./query-client";
import { appRouter } from "./routers/_app";
import type {
	FetchQueryOptions,
	FetchInfiniteQueryOptions,
} from "@tanstack/react-query";

export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
	ctx: createContext,
	router: appRouter,
	queryClient: getQueryClient,
});

export function HydrateClient(props: { children: React.ReactNode }) {
	const queryClient = getQueryClient();
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			{props.children}
		</HydrationBoundary>
	);
}

export function prefetch(
	queryOptions: FetchQueryOptions | FetchInfiniteQueryOptions,
) {
	const queryClient = getQueryClient();
	const queryType = (
		queryOptions.queryKey?.[1] as { type?: string } | undefined
	)?.type;
	if (queryType === "infinite") {
		void queryClient.prefetchInfiniteQuery(
			queryOptions as FetchInfiniteQueryOptions,
		);
	} else {
		void queryClient.prefetchQuery(queryOptions as FetchQueryOptions);
	}
}

export const caller = appRouter.createCaller(createContext);
