import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserRoundPlus } from 'lucide-react';

import '@/styles/global.css';

export function TeamPage() {
    const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);


    return (
        <div className='flex flex-col h-full'>
            <div className='px-8 pt-8 pb-4 flex items-start justify-between'>
                <div>
                    <h1 className='font-serif text-3xl text-foreground font-medium'>
                        Team
                    </h1>
                    <p className='text-sm text-muted-foreground mt-1'>
                        Administrer teamet
                    </p>
                </div>
                <Button
                    onClick={() => setShowNewTeamDialog(true)}
                    className='bg-foreground hover:bg-foreground/90 text-background gap-2 rounded-full cursor-pointer'
                >
                    <UserRoundPlus className='h-4 w-4' />
                    Nytt Medlem
                </Button>
            </div>
        </div>
    );
}