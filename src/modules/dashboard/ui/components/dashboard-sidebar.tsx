"use client"
import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarContent,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { StarIcon, VideoIcon, BotIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { DashboardUserButton } from './dashboard-userbutton';

const firstSection = [
    {
        label: 'Meetings',
        icon: VideoIcon,
        href: '/meeting',
    },
    {
        label: 'Agents',
        icon: BotIcon,
        href: '/agents',
    },
];

const secondSection = [
    {
        label: 'Upgrade',
        icon: StarIcon,
        href: '/upgrade',
    },
];

export const DashboardSidebar = () => {
   
    const pathname = usePathname();
    return (
        <Sidebar>
            <SidebarHeader className='text-sidebar-accent-foreground'>
                <Link href="/" className='flex items-center gap-2 px-2 pt-2'>
                    <Image src="/logo.svg" alt="MeetMe Logo" width={24} height={24} />
                    <span className='font-semibold text-lg'>MeetMe</span>
                </Link>
            </SidebarHeader>
            <div className='px-4 py-2'>
                <Separator className='bg-gray-400'/>
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={cn(
                                        'h-10 hover:bg-sidebar-accent/50 border border-transparent hover:border-sidebar-accent/10',
                                        pathname.startsWith(item.href) && 'bg-sidebar-accent/50 border-sidebar-accent/10'
                                    )}
                                    isActive={pathname.startsWith(item.href)}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className='h-5 w-5' />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className='px-4 py-2'>
                    <Separator className='bg-gray-400'/>
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={cn(
                                        'h-10 hover:bg-sidebar-accent/50 border border-transparent hover:border-sidebar-accent/10'
                                    )}>
                                        <Link href={item.href}>
                                            <item.icon className='h-5 w-5' />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className='text-white'>
                <DashboardUserButton />
            </SidebarFooter>
        </Sidebar>
    )
}; 