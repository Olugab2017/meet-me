import { LoadingState } from "@/components/loading-state";
import { AgentsView, AgentsViewLoading, AgentViewError } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

const Page = async () => {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
    return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoading />}>
            <ErrorBoundary fallback={<AgentViewError />}>
                <AgentsView />
            </ErrorBoundary>
            
        </Suspense>
    </HydrationBoundary>
    )
};

export default Page;
