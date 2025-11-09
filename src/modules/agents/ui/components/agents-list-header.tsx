"use client";

import { useState } from "react";
import { NewAgentDialog } from "./new-agent-dialog";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { AgentsSearchFilter } from "./agents-search-filter";
import { DEFAULT_PAGE } from "@/constants";

export const AgentsListHeader = () => {
    const [filters, setFilters] = useAgentsFilters();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const isAnyFilterModified = !!filters.search;

    const onClearFilters = () => {
        setFilters({
            search: "",
            page: DEFAULT_PAGE,
        })
    }

    const handleCreateAgent = (agentName: string, instructions?: string) => {
        // Logic to create a new agent
    };
    return (
        <>
            <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onCreate={handleCreateAgent} />
            <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                <h1 className="text-lg font-semibold">Agents</h1>
                <Button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => setIsDialogOpen(true)}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    New Agent
                </Button>
                
            </header>
            <div className="flex items-center gab-x-2 p-1">
                <AgentsSearchFilter />
                {isAnyFilterModified && (
                    <Button variant="outline" size="sm" onClick={onClearFilters} className="p-4">
                        <XCircleIcon />
                        Clear
                    </Button>
                )}
            </div>

        </>
    );
};