import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FolderPlus,
    FolderOpen,
    Image,
    MoreHorizontal,
    Trash2,
    ChevronLeft,
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

export function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>(demoProjects);
    const [showNewDialog, setShowNewDialog] = useState(false);
    const [newName, setNewName] = useState('');
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null,
    );

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
        setNewName('');
        setShowNewDialog(false);
    };

    const deleteProject = (id: string) => {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        if (selectedProject?.id === id) setSelectedProject(null);
    };

    if (selectedProject) {
        return (
            <div className='flex flex-col h-full'>
                <div className='px-8 pt-8 pb-4'>
                    <button
                        onClick={() => setSelectedProject(null)}
                        className='flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3'
                    >
                        <ChevronLeft className='h-4 w-4' />
                        Back to projects
                    </button>
                    <h1 className='font-serif text-3xl text-foreground'>
                        {selectedProject.name}
                    </h1>
                    <p className='text-sm text-muted-foreground mt-1'>
                        {selectedProject.renders.length} renders
                    </p>
                </div>
                <div className='flex-1 px-8 pb-8'>
                    <div className='flex flex-col items-center justify-center h-64 text-center'>
                        <div className='h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center mb-3'>
                            <Image className='h-6 w-6 text-muted-foreground' />
                        </div>
                        <p className='text-sm text-muted-foreground'>
                            Renders will appear here after generation.
                        </p>
                        <p className='text-xs text-muted-foreground/70 mt-1'>
                            Go to Generate and select this project as the
                            destination.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col h-full'>
            <div className='px-8 pt-8 pb-4 flex items-start justify-between'>
                <div>
                    <h1 className='font-serif text-3xl text-foreground'>
                        Projects
                    </h1>
                    <p className='text-sm text-muted-foreground mt-1'>
                        Organize your renders into project folders.
                    </p>
                </div>
                <Button
                    onClick={() => setShowNewDialog(true)}
                    className='bg-foreground hover:bg-foreground/90 text-background gap-2 rounded-full cursor-pointer'
                >
                    <FolderPlus className='h-4 w-4' />
                    New Project
                </Button>
            </div>

            <div className='flex-1 px-8 pb-8'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <AnimatePresence>
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
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
                                                {project.renders.length} renders
                                                •{' '}
                                                {project.createdAt.toLocaleDateString(
                                                    'nb-NO',
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger
                                            asChild
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button className='h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100'>
                                                <MoreHorizontal className='h-4 w-4' />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align='end'>
                                            <DropdownMenuItem
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteProject(project.id);
                                                }}
                                                className='text-destructive focus:text-destructive'
                                            >
                                                <Trash2 className='h-4 w-4 mr-2' />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
                <DialogContent className='max-w-md'>
                    <DialogHeader>
                        <DialogTitle className='font-serif text-xl'>
                            New Project
                        </DialogTitle>
                        <DialogDescription>
                            Create a folder to organize your renders.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-4 mt-2'>
                        <Input
                            placeholder='Project name'
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
                                onClick={() => setShowNewDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={createProject}
                                disabled={!newName.trim()}
                                className='bg-foreground text-background hover:bg-foreground/90'
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
