import { type ReactNode } from 'react';
import {
    SidebarProvider,
    SidebarTrigger,
    SidebarInset,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <div className='min-h-screen flex w-full'>
                <AppSidebar />
                <SidebarInset className='flex flex-col'>
                    <header className='h-14 flex items-center gap-3 px-6 border-b border-border/50'>
                        <SidebarTrigger className='text-muted-foreground' />
                    </header>
                    <main className='flex-1 overflow-auto'>{children}</main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
