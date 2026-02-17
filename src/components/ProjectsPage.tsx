import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FolderPlus,
    FolderOpen,
    Image,
    MoreHorizontal,
    Trash2,
    ChevronLeft,
    Share,
    Edit,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface Project {
    id: string;
    name: string;
    renders: string[];
    createdAt: Date;
}

const demoProjects: Project[] = [
    {
        id: '1',
        name: 'Villa Nordstrand',
        renders: [],
        createdAt: new Date('2025-01-15'),
    },
    {
        id: '2',
        name: 'Kontorbygg Aker Brygge',
        renders: [],
        createdAt: new Date('2025-02-01'),
    },
];

const itemVariants = {
    initial: {
        opacity: 0,
        y: 14,
        scale: 0.97,
        filter: 'blur(4px)',
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            type: 'spring' as const,
            stiffness: 500,
            damping: 28,
            mass: 0.6,
            opacity: { duration: 0.12 },
            filter: { duration: 0.12 },
        },
    },
    exit: {
        opacity: 0,
        x: -50,
        scale: 0.92,
        filter: 'blur(4px)',
        transition: {
            duration: 0.2,
            ease: [0.4, 0, 1, 1] as const,
        },
    },
};

export function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>(demoProjects);
    const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
    const [showNewShareDialog, setShowNewShareDialog] = useState(false);
    const [showNewRenameDialog, setShowNewRenameDialog] = useState(false);
    const [newName, setNewName] = useState('');
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null,
    );
    const [sharedEmail, setSharedEmail] = useState('');
    const [project, setProject] = useState('');

    const createProject = () => {
        if (!newName.trim()) return;
        setProjects((prev) => [
            {
                id: crypto.randomUUID(),
                name: newName.trim(),
                renders: [],
                createdAt: new Date(),
            },
            ...prev,
        ]);

        // create in database

        setNewName('');
        setShowNewProjectDialog(false);
    };

    const renameProject = (id: string) => {
        if (!newName.trim()) return;
        setProjects((prev) => (
            prev.map((project) => (
                project.id === id
                    ? {...project, name: newName.trim()}
                    : project
            ))
        ));

        // rename into database

        setNewName('');
        setProject('');
        setShowNewRenameDialog(false);
    };

    const deleteProject = (id: string) => {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        if (selectedProject?.id === id) setSelectedProject(null);

        // delete from database
    };

    const shareProject = (id: string, user: string) => {
        if (!sharedEmail.trim()) return;
        // share project with another user
        toast.success('Prosjekt delt med bruker:', {
            description: sharedEmail,
        });

        // change permission in database

        setSharedEmail('');
        setProject('');
        setShowNewShareDialog(false);
    };

    if (selectedProject) {
        return (
            <div className='flex flex-col h-full'>
                <div className='px-8 pt-8 pb-8'>
                    <button
                        onClick={() => setSelectedProject(null)}
                        className='flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3'
                    >
                        <ChevronLeft className='h-4 w-4' />
                        Tilbake til prosjekter
                    </button>
                    <h1 className='font-serif text-3xl text-foreground'>
                        {selectedProject.name}
                    </h1>
                    <p className='text-sm text-muted-foreground mt-1'>
                        {selectedProject.renders.length} renderinger
                    </p>
                </div>
                <div className='flex-1 px-8 pb-8'>
                    <div className='flex flex-col items-center justify-center h-64 text-center'>
                        <div className='h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center mb-3'>
                            <Image className='h-6 w-6 text-muted-foreground' />
                        </div>
                        <p className='text-sm text-muted-foreground'>
                            Renderinger vil havne her etter generering.
                        </p>
                        <p className='text-xs text-muted-foreground/70 mt-1'>
                            Naviger til hovedsiden (Generering) og velg dette
                            prosjektet som destinasjon.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col h-full'>
            <div className='px-8 pt-8 pb-8 flex items-start justify-between'>
                <div>
                    <h1 className='font-serif text-3xl text-foreground font-medium'>
                        Prosjekter
                    </h1>
                    <p className='text-sm text-muted-foreground mt-1'>
                        Organiser dine renderinger i prosjektmapper.
                    </p>
                </div>
                <Button
                    onClick={() => setShowNewProjectDialog(true)}
                    className='bg-foreground hover:bg-foreground/90 text-background gap-2 rounded-full cursor-pointer'
                >
                    <FolderPlus className='h-4 w-4' />
                    Nytt Prosjekt
                </Button>
            </div>

            <div className='flex-1 px-8 pb-8'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <AnimatePresence mode='sync'>
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                variants={itemVariants}
                                initial='initial'
                                animate='animate'
                                exit='exit'
                                onClick={() => setSelectedProject(project)}
                                className='group rounded-2xl border border-border bg-card hover:border-primary/30 transition-all cursor-pointer p-5'
                            >
                                <div className='flex items-start justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <div className='h-10 w-10 rounded-xl bg-secondary flex items-center justify-center'>
                                            <FolderOpen className='h-5 w-5 text-muted-foreground' />
                                        </div>
                                        <div>
                                            <p className='font-medium text-foreground'>
                                                {project.name}
                                            </p>
                                            <p className='text-xs text-muted-foreground'>
                                                {project.renders.length}{' '}
                                                renderinger •{' '}
                                                {project.createdAt.toLocaleDateString(
                                                    'nb-NO',
                                                    {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    },
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger
                                            asChild
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button className='h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100 max-sm:opacity-100'>
                                                <MoreHorizontal className='h-4 w-4' />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align='end'>
                                            <DropdownMenuItem
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setProject(project.id);
                                                    setShowNewRenameDialog(true);
                                                }}
                                                className='text-foreground focus:bg-secondary focus:cursor-pointer transition-colors'
                                            >
                                                <Edit className='h-4 w-4 mr-3 text-foreground' />
                                                Endre navn
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setProject(project.id);
                                                    setShowNewShareDialog(true);
                                                }}
                                                className='text-foreground focus:bg-secondary focus:cursor-pointer transition-colors'
                                            >
                                                <Share className='h-4 w-4 mr-3 text-foreground' />
                                                Del
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteProject(project.id);
                                                }}
                                                className='text-destructive focus:text-destructive focus:bg-destructive/10 focus:cursor-pointer transition-colors'
                                            >
                                                <Trash2 className='h-4 w-4 mr-3 text-destructive' />
                                                Fjern
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <Dialog
                open={showNewRenameDialog}
                onOpenChange={setShowNewRenameDialog}
            >
                <DialogContent className='max-w-md'>
                    <DialogHeader>
                        <DialogTitle className='font-serif text-xl'>
                            Endre Prosjektnavn
                        </DialogTitle>
                        <DialogDescription>
                            Endre navn på prosjektet.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-4 mt-2'>
                        <Input
                            placeholder='Nytt navn'
                            type='text'
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === 'Enter' &&
                                renameProject(project)
                            }
                            className='bg-secondary/50 border-border'
                        />
                        <div className='flex justify-end gap-2'>
                            <Button
                                variant='ghost'
                                onClick={() => setShowNewRenameDialog(false)}
                                className='cursor-pointer hover:bg-secondary'
                            >
                                Avbryt
                            </Button>
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    renameProject(project);
                                }}
                                disabled={!newName.trim()}
                                className='bg-foreground text-background hover:bg-foreground/90 cursor-pointer'
                            >
                                Lagre
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog
                open={showNewShareDialog}
                onOpenChange={setShowNewShareDialog}
            >
                <DialogContent className='max-w-md'>
                    <DialogHeader>
                        <DialogTitle className='font-serif text-xl'>
                            Del Prosjekt
                        </DialogTitle>
                        <DialogDescription>
                            Del prosjektet med en kollega.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-4 mt-2'>
                        <Input
                            placeholder='Email'
                            type='email'
                            value={sharedEmail}
                            onChange={(e) => setSharedEmail(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === 'Enter' &&
                                shareProject(project, sharedEmail)
                            }
                            className='bg-secondary/50 border-border'
                        />
                        <div className='flex justify-end gap-2'>
                            <Button
                                variant='ghost'
                                onClick={() => setShowNewShareDialog(false)}
                                className='cursor-pointer hover:bg-secondary'
                            >
                                Avbryt
                            </Button>
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    shareProject(project, sharedEmail);
                                }}
                                disabled={!sharedEmail.trim()}
                                className='bg-foreground text-background hover:bg-foreground/90 cursor-pointer'
                            >
                                Del
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog
                open={showNewProjectDialog}
                onOpenChange={setShowNewProjectDialog}
            >
                <DialogContent className='max-w-md'>
                    <DialogHeader>
                        <DialogTitle className='font-serif text-xl'>
                            Nytt Prosjekt
                        </DialogTitle>
                        <DialogDescription>
                            Lag en mappe for å organisere renderingene dine.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-4 mt-2'>
                        <Input
                            placeholder='Prosjektnavn'
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === 'Enter' && createProject()
                            }
                            className='bg-secondary/50 border-border'
                        />
                        <div className='flex justify-end gap-2'>
                            <Button
                                variant='ghost'
                                onClick={() => setShowNewProjectDialog(false)}
                                className='cursor-pointer hover:bg-secondary'
                            >
                                Avbryt
                            </Button>
                            <Button
                                onClick={createProject}
                                disabled={!newName.trim()}
                                className='bg-foreground text-background hover:bg-foreground/90 cursor-pointer'
                            >
                                Opprett
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
