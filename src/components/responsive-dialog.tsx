    "use client"

    import { useIsMobile } from "@/hooks/use-mobile";
    import { Dialog, DialogContent, 
        DialogHeader, DialogTitle, DialogDescription,  DialogTrigger
    } from "@/components/ui/dialog";
    import {Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerTrigger} from "@/components/ui/drawer";

    interface ResponsiveDialogProps {
        title: string;
        description?: string;
        trigger: React.ReactNode;
        children: React.ReactNode;
        open?: boolean;
        onOpenChange?: (open: boolean) => void;     
    }

    export const ResponsiveDialog = ({
        title,
        description,
        trigger,
        children,
        open,
        onOpenChange
    }: ResponsiveDialogProps) => {
        const isMobile = useIsMobile();

        if (isMobile) {
            return (
                <Drawer open={open} onOpenChange={onOpenChange}>
                    <DrawerTrigger>{trigger}</DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>{title}</DrawerTitle>
                            {description && <DrawerDescription>{description}</DrawerDescription>}
                        </DrawerHeader>
                        <div className='p-4'>
                            {children}
                        </div>
                    </DrawerContent>
                </Drawer>
            );
        }

        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogTrigger>{trigger}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        {description && <DialogDescription>{description}</DialogDescription>}
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        );
    };
