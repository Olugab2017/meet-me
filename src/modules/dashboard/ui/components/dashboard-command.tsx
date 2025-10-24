import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="overflow-hidden p-0 shadow-lg max-w-2xl">
                <VisuallyHidden>
                    <DialogTitle>Command Menu</DialogTitle>
                </VisuallyHidden>
                
                <Command className="rounded-lg border-none">
                    <div className="flex items-center border-b px-3">
                        <CommandInput 
                            placeholder="Search for a meeting or agent..." 
                            className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <CommandList className="max-h-[400px] overflow-y-auto p-2">
                        <CommandItem className="rounded-sm px-3 py-2 text-sm cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground">
                            Test
                        </CommandItem>
                    </CommandList>
                </Command>
            </DialogContent>
        </Dialog>
    );
};