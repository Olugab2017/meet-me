"use client";

import {useSuspenseQuery} from "@tanstack/react-query";
import {useTRPC} from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "../components/data-table";
import { columns, Payment } from "../components/columns";    
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";
import { AgentsSearchFilter } from "../components/agents-search-filter";


export const AgentsView = () => {
    const [filters, setFilters] = useAgentsFilters();

    const trpc = useTRPC();
    
    
    const {data} = useSuspenseQuery(
            trpc.agents.getMany.queryOptions({
                ...filters,
            })
    );

    return (
        <div>
            <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
                <DataTable columns={columns} data={data.items} />
                <DataPagination
                    page={filters.page}
                    totalPages={data.totalPages}
                    onPageChange={(page) => setFilters({page})}
                />
                {data.items.length === 0 && (
                        <div className="mt-10">
                            <EmptyState
                                title="No Agents Found"
                                description="Try creating a new agent."
                            />
                        </div>
                    )}
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