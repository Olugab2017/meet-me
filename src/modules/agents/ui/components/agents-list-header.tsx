"use client";

import { useState } from "react";
import { NewAgentDialog } from "./new-agent-dialog";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AgentsListHeader = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        </>
    );
};