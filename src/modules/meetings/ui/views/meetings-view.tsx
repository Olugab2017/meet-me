"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";

export const MeetingsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(
        trpc.meetings.getMany.queryOptions()
    );
    
    // With superjson configured, dates should already be Date objects
    return (
        <div>
            <div className="p-4 flex flex-col gap-y-4">
                {data.map((item) => (
                    <div key={item.meeting.id} className="border rounded p-4">
                        <h3 className="font-bold">{item.meeting.title}</h3>
                        <p className="text-sm text-gray-600">{item.meeting.description}</p>
                        <p className="text-xs mt-2">
                            Status: {item.meeting.status}
                        </p>
                        {item.meeting.scheduledAt && (
                            <p className="text-xs">
                                Scheduled: {new Date(item.meeting.scheduledAt).toLocaleString()}
                            </p>
                        )}
                        {item.agent && (
                            <p className="text-xs mt-2">
                                Agent: {item.agent.name || 'Unknown'}
                            </p>
                        )}
                    </div>
                ))}
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
    );
};