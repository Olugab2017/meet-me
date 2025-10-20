import { authClient } from '@/lib/auth-client';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { UserIcon, SettingsIcon, LogOutIcon, CreditCardIcon, HelpCircleIcon, ChevronDownIcon } from 'lucide-react';

export const DashboardUserButton = () => {
    const { data, isPending } = authClient.useSession();

    if (isPending || !data?.user) {
        return (
            <div className='rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 animate-pulse'>
                <div className='flex items-center gap-3 flex-1'>
                    <div className='size-9 rounded-full bg-gray-300' />
                    <div className='flex flex-col gap-1 flex-1'>
                        <div className='h-3 bg-gray-300 rounded w-24' />
                        <div className='h-2 bg-gray-200 rounded w-32' />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-sidebar-accent'>
                    <div className='flex items-center gap-3 overflow-hidden flex-1'>
                        {data.user.image ? (
                            <Avatar className='size-9'>
                                <AvatarImage src={data.user.image} alt={data.user.name} />
                                <AvatarFallback>{data.user.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                        ) : (
                            <GeneratedAvatar
                                seed={data.user.name}
                                variant="initials"
                                className='size-9'
                            />
                        )}
                        <div className='flex flex-col items-start overflow-hidden flex-1'>
                            <span className='text-sm font-medium truncate w-full'>
                                {data.user.name}
                            </span>
                            <span className='text-xs text-white truncate w-full'>
                                {data.user.email}
                            </span>
                        </div>
                    </div>
                    <ChevronDownIcon className='ml-2 h-4 w-4 shrink-0' />   
                </button>
                
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className='w-56'>
                <DropdownMenuLabel>
                    <div className='flex flex-col'>
                        <span className='font-semibold'>{data.user.name}</span>
                        <span className='text-xs text-muted-foreground font-normal'>
                            {data.user.email}
                        </span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem className='cursor-pointer'>
                    <UserIcon className='h-4 w-4 mr-2' />
                    <span>Profile</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className='cursor-pointer'>
                    <SettingsIcon className='h-4 w-4 mr-2' />
                    <span>Settings</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className='cursor-pointer'>
                    <CreditCardIcon className='h-4 w-4 mr-2' />
                    <span>Billing</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className='cursor-pointer'>
                    <HelpCircleIcon className='h-4 w-4 mr-2' />
                    <span>Help & Support</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                    className='cursor-pointer text-red-600 focus:text-red-600'
                    onClick={() => authClient.signOut()}
                >
                    <LogOutIcon className='h-4 w-4 mr-2' />
                    <span>Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};