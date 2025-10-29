import { CommandResponsiveDialog, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
    return (
        <CommandResponsiveDialog 
            open={open} 
            onOpenChange={setOpen}
            className="rounded-lg border-none"
        >
            <CommandInput
                placeholder="Search for a meeting or agent..."
                className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            <CommandList className="max-h-[400px] overflow-y-auto p-2">
                <CommandItem className="rounded-sm px-3 py-2 text-sm cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground">
                    Test
                </CommandItem>
            </CommandList>
        </CommandResponsiveDialog>
    );
};