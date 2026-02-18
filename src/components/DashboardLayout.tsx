import { type ReactNode } from 'react';
import {
    SidebarProvider,
    SidebarTrigger,
    SidebarInset,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import DashboardWithOnboarding from '@/components/Dashboard';

interface DashboardLayoutProps {
    children: ReactNode;
    pathname: string;
}

export function DashboardLayout({ children, pathname }: DashboardLayoutProps) {
    // add user verification here to protect dashboard
    
    return (
        <TooltipProvider>
            <SidebarProvider>
                <div className='min-h-screen flex w-full'>
                    <AppSidebar pathname={pathname} />
                    <SidebarInset className='flex flex-col'>
                        <header className='h-14 flex items-center gap-3 px-6 border-b border-border/50'>
                            <SidebarTrigger className='text-muted-foreground hover:bg-secondary' />
                        </header>
                        <main className='flex-1 overflow-auto'>{children}</main>
                        <Toaster position='top-center' />
                        <DashboardWithOnboarding client:load />
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </TooltipProvider>
    );
}
