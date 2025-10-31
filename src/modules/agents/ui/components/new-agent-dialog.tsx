import { ResponsiveDialog } from "@/components/responsive-dialog";
import { useState } from "react";
import { AgentForm } from "./agent-form";

interface NewAgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCreate: (agentName: string, instructions?: string) => void;
}

export const NewAgentDialog = ({ open, onOpenChange, onCreate }: NewAgentDialogProps) => {
    const [agentName, setAgentName] = useState("");
    const [instructions, setInstructions] = useState("");

    const handleCreate = () => {
        if (agentName.trim()) {
            onCreate(agentName, instructions);
            setAgentName("");
            setInstructions("");
            onOpenChange(false);
        }
    };

    return (
        <ResponsiveDialog 
            open={open} 
            onOpenChange={onOpenChange}
            title="Create New Agent"
            trigger={<></>} // Empty trigger since we control open state externally
        >
            <AgentForm onSuccess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
            />
        </ResponsiveDialog>
    );
};