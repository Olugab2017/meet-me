import { LoadingState } from "@/components/loading-state";
import { AgentsView, AgentsViewLoading, AgentViewError } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { AgentsListHeader } from "@/modules/agents/ui/components/agents-list-header";
import { headers } from "next/dist/server/request/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(), 
    });
    if (!session) {
        redirect('/sign-in');
    }
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
    return (
        <>
            <AgentsListHeader />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<AgentsViewLoading />}>
                    <ErrorBoundary fallback={<AgentViewError />}>
                        <AgentsView />
                    </ErrorBoundary>
                    
                </Suspense>
            </HydrationBoundary>
        </>
    
    )
};

export default Page;
