import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";

interface NewMeetingDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const NewMeetingDialog = ({ open, onOpenChange }: NewMeetingDialogProps) => {
    return (
        <ResponsiveDialog 
            open={open} 
            onOpenChange={onOpenChange}
            title="Create New Meeting"
            trigger={<></>} // Empty trigger since we control open state externally
        >
            <MeetingForm 
                onSuccess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
            />
        </ResponsiveDialog>
    );
};