import { Sparkles, FolderOpen, Database, UsersRound, Headset, Info, BarChart3, CreditCard } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { navigate } from 'astro:transitions/client';
import { useEffect, useState } from 'react';

const navItems = [
    { title: 'Rendering', url: '/dashboard', icon: Sparkles },
    { title: 'Prosjekter', url: '/dashboard/prosjekter', icon: FolderOpen },
];
const navItemsSupport = [
    { title: 'Dokumentasjon', url: '/dashboard/dokumentasjon', icon: Info },
    { title: 'Kontakt Support', url: '/dashboard/kontakt', icon: Headset },
]
const navItemsAdmin = [
    { title: 'Team', url: '/dashboard/team', icon: UsersRound },
    { title: 'Innsikt', url: '/dashboard/innsikt', icon: BarChart3 },
    { title: 'Modelltrening', url: '/dashboard/trening', icon: Database },
    { title: 'Fakturering', url: '/dashboard/fakturering', icon: CreditCard },
];

export function AppSidebar() {
    const [isAdmin, setIsAdmin] = useState(true);
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        setPathname(window.location.pathname);
    });

    return (
        <Sidebar className='border-r-0 overflow-hidden'>
            <SidebarHeader className='p-5 bg-sidebar-background'>
                <a href="/">
                    <div className='flex items-center gap-2.5'>
                        <div className='h-8 w-8 rounded-lg flex items-center justify-center'>
                            <img src='/images/archway-logo.webp' alt='Archway' />
                        </div>
                        <span className='font-serif text-xl text-foreground tracking-tight'>
                            Archway
                        </span>
                    </div>
                </a>
            </SidebarHeader>

            <SidebarSeparator className='self-center' />

            <SidebarContent className='px-2 pt-2 overflow-hidden bg-sidebar-background'>
                <SidebarGroup>
                    <SidebarGroupLabel className='text-[11px] uppercase tracking-widest text-muted-foreground/60 font-sans font-medium'>
                        Workspace
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => {
                                const isActive =
                                    item.url === '/dashboard'
                                        ? pathname === '/dashboard'
                                        : pathname.startsWith(item.url);

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            tooltip={item.title}
                                        >
                                            <a
                                                href={item.url}
                                                className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors ${
                                                    isActive
                                                        ? 'bg-secondary text-foreground font-medium'
                                                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                                                }`}
                                            >
                                                <item.icon className='h-4 w-4' />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {isAdmin && (
                    <SidebarGroup>
                        <SidebarSeparator className='self-center mb-2' />

                        <SidebarGroupLabel className='text-[11px] uppercase tracking-widest text-muted-foreground/60 font-sans font-medium'>
                            Administrer
                        </SidebarGroupLabel>

                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navItemsAdmin.map((item) => {
                                    const isActive =
                                        item.url === '/dashboard'
                                            ? pathname === '/dashboard'
                                            : pathname.startsWith(item.url);

                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                tooltip={item.title}
                                            >
                                                <a
                                                    href={item.url}
                                                    className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors ${
                                                        isActive
                                                            ? 'bg-secondary text-foreground font-medium'
                                                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                                                    }`}
                                                >
                                                    <item.icon className='h-4 w-4' />
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}

                <SidebarGroup>
                    <SidebarSeparator className='self-center mb-2' />

                    <SidebarGroupLabel className='text-[11px] uppercase tracking-widest text-muted-foreground/60 font-sans font-medium'>
                        Support
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItemsSupport.map((item) => {
                                const isActive =
                                    item.url === '/dashboard'
                                        ? pathname === '/dashboard'
                                        : pathname.startsWith(item.url);

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            tooltip={item.title}
                                        >
                                            <a
                                                href={item.url}
                                                className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors ${
                                                    isActive
                                                        ? 'bg-secondary text-foreground font-medium'
                                                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                                                }`}
                                            >
                                                <item.icon className='h-4 w-4' />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarSeparator className='self-center' />

            <SidebarFooter className='p-3 bg-sidebar-background'>
                <div className='flex items-center gap-3 px-2 py-2 mt-1'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant='ghost'
                                size='icon'
                                className='rounded-full hover:bg-primary/20'
                            >
                                <Avatar>
                                    <AvatarImage src='https://github.com/gitXite.png' />
                                    <AvatarFallback className='text-sm font-medium text-secondary-foreground'>
                                        JD
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-32'>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>Profil</DropdownMenuItem>
                                <DropdownMenuItem>Placeholder</DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    variant='destructive'
                                    onClick={() =>
                                        navigate('https://archway.no')
                                    }
                                >
                                    Logg av
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium text-foreground truncate'>
                            John Doe
                        </p>
                        <p className='text-xs text-muted-foreground truncate'>
                            john@studio.com
                        </p>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
