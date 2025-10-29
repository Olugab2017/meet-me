"use client";

import {useSuspenseQuery} from "@tanstack/react-query";
import {useTRPC} from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";



export const AgentsView = () => {
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(
        trpc.agents.getMany.queryOptions());
    
    return (
        <div>
            
            <div className="p-4 flex flex-col gap-y-4">
                {JSON.stringify(data, null, 2)}
            </div>
        </div>
    );
};



export const AgentsViewLoading = () => {
    return (
        <LoadingState 
            title="Loading Agents"
            description="Please wait while we load the agents for you."
        />
    );
};


export const AgentViewError = () => {
   return (
    <ErrorState
        title="Error Loading Agents"
        description="Something went wrong"
    />
   ) 
}