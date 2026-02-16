import { useEffect, useState } from 'react';
import { Sparkles, FolderOpen, Database } from 'lucide-react';
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

const navItems = [
    { title: 'Generate', url: '/', icon: Sparkles },
    { title: 'Projects', url: '/projects', icon: FolderOpen },
    { title: 'Training Data', url: '/training', icon: Database },
];

export function AppSidebar() {
    const [pathname, setPathname] = useState('/');

    useEffect(() => {
        setPathname(window.location.pathname);
    }, []);

    return (
        <Sidebar className='border-r-0 overflow-hidden'>
            <SidebarHeader className='p-5'>
                <div className='flex items-center gap-2.5'>
                    <div className='h-8 w-8 rounded-lg flex items-center justify-center'>
                        <img src='/archway-logo.webp' alt='Archway' />
                    </div>
                    <span className='font-serif text-xl text-foreground tracking-tight'>
                        Archway
                    </span>
                </div>
            </SidebarHeader>

            <SidebarSeparator />

            <SidebarContent className='px-2 pt-2'>
                <SidebarGroup>
                    <SidebarGroupLabel className='text-[11px] uppercase tracking-widest text-muted-foreground/60 font-sans font-medium'>
                        Workspace
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => {
                                const isActive =
                                    item.url === '/'
                                        ? pathname === '/'
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

            <SidebarFooter className='p-3'>
                <SidebarSeparator />
                <div className='flex items-center gap-3 px-2 py-2 mt-1'>
                    <div className='h-8 w-8 rounded-full bg-secondary flex items-center justify-center'>
                        <span className='text-sm font-medium text-secondary-foreground'>
                            JD
                        </span>
                    </div>
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
