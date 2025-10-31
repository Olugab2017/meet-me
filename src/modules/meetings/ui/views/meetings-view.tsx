"use client";

import {useSuspenseQuery} from "@tanstack/react-query";
import {useTRPC} from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";



export const MeetingsView = () => {
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(
        trpc.meetings.getMany.queryOptions());
    
    return (
        <div>
            
            <div className="p-4 flex flex-col gap-y-4">
                {JSON.stringify(data, null, 2)}
            </div>
        </div>
    );
};



export const MeetingsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Meetings"
            description="Please wait while we load the meetings for you."
        />
    );
};


export const MeetingsViewError = () => {
   return (
    <ErrorState
        title="Error Loading Meetings"
        description="Something went wrong"
    />
   ) 
}