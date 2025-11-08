import { AlertCircleIcon } from "lucide-react";
import Image from "next/image";

interface Props {
    title: string;
    description: string;    

}

export const EmptyState = ({title, description}: Props) => {
    return (
        <div className="flex flex-col items-center justify-center">    
           <Image src="/empty.svg" alt="No data" width={320} height={320} />
            <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center">
                <h2 className="text-lg font-medium">{title}</h2>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    );
}