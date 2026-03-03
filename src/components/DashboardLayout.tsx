import { type ReactNode } from 'react';
import {
    SidebarProvider,
    SidebarTrigger,
    SidebarInset,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import "sonner/dist/styles.css";
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    // add user verification here to protect dashboard
    const isMobile = useIsMobile();
    
    return (
        <TooltipProvider>
            <SidebarProvider>
                <div className='min-h-screen flex w-full'>
                    <AppSidebar />
                    <SidebarInset className='flex flex-col'>
                        <header className='h-14 flex items-center gap-1 px-6 border-b border-border/50'>
                            <SidebarTrigger className='text-muted-foreground hover:bg-secondary' />
                            {!isMobile && <span className='text-muted-foreground/50 text-sm pointer-events-none'>⌘+B</span>}
                        </header>
                        <main className='flex-1 overflow-auto'>{children}</main>
                        <Toaster position='top-center' />
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </TooltipProvider>
    );
}
