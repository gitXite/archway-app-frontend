import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload,
    X,
    ImagePlus,
    RefreshCw,
    Loader2,
    Check,
    Plus,
    Pencil,
    Trash2,
    ChevronDown,
    Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import type { LoRAModel, TrainingImage } from '@/types/LoRAModel';
import { statusColor } from '@/utils/common';

const DEFAULT_LORA: LoRAModel = {
    id: crypto.randomUUID(),
    name: 'LoRA',
    images: [],
    status: 'utkast',
    createdAt: new Date(),
};

export function TrainingPage() {
    const [loras, setLoras] = useState<LoRAModel[]>([DEFAULT_LORA]);
    const [activeId, setActiveId] = useState(DEFAULT_LORA.id);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isTraining, setIsTraining] = useState(false);
    const [renameDialogOpen, setRenameDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [newName, setNewName] = useState('');

    const active = loras.find((l) => l.id === activeId)!;
    const images = active.images;

    const updateActive = (updater: (lora: LoRAModel) => LoRAModel) => {
        setLoras((prev) =>
            prev.map((l) => (l.id === activeId ? updater(l) : l)),
        );
    };

    const handleFiles = useCallback(
        (files: FileList | File[]) => {
            const newImages: TrainingImage[] = Array.from(files)
                .filter((f) => f.type.startsWith('image/'))
                .map((file) => ({
                    id: crypto.randomUUID(),
                    file,
                    preview: URL.createObjectURL(file),
                }));
            setLoras((prev) =>
                prev.map((l) =>
                    l.id === activeId
                        ? { ...l, images: [...l.images, ...newImages] }
                        : l,
                ),
            );
        },
        [activeId],
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragOver(false);
            handleFiles(e.dataTransfer.files);
        },
        [handleFiles],
    );

    const removeImage = (id: string) => {
        updateActive((l) => {
            const img = l.images.find((i) => i.id === id);
            if (img) URL.revokeObjectURL(img.preview);
            return { ...l, images: l.images.filter((i) => i.id !== id) };
        });
    };

    const clearAll = () => {
        updateActive((l) => {
            l.images.forEach((img) => URL.revokeObjectURL(img.preview));
            return { ...l, images: [] };
        });
    };

    const retrain = () => {
        setIsTraining(true);
        updateActive((l) => ({ ...l, status: 'trener' }));
        setTimeout(() => {
            setIsTraining(false);
            toast.success('Modelltrening startet...', {
                description: 'Forventet tid: 1 time',
            });
            updateActive((l) => ({ ...l, status: 'trent' }));
        }, 4000);
    };

    const createNewLora = () => {
        const newLora: LoRAModel = {
            id: crypto.randomUUID(),
            name: `LoRA ${loras.length + 1}`,
            images: [],
            status: 'utkast',
            createdAt: new Date(),
        };
        setLoras((prev) => [...prev, newLora]);
        setActiveId(newLora.id);
    };

    const deleteLora = () => {
        if (loras.length <= 1) return;

        setLoras((prev) => {
            const remaining = prev.filter((l) => l.id !== activeId);
            setActiveId(remaining[0].id);
            return remaining;
        });
        setDeleteDialogOpen(false);
    };

    const openRename = () => {
        setNewName(active.name);
        setRenameDialogOpen(true);
    };

    const saveRename = () => {
        if (newName.trim()) {
            updateActive((l) => ({ ...l, name: newName.trim() }));
        }
        setRenameDialogOpen(false);
    };

    const canTrain = images.length >= 10;

    const openFilePicker = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = 'image/*';
        input.onchange = (e) => {
            const files = (e.target as HTMLInputElement).files;
            if (files) handleFiles(files);
        };
        input.click();
    };

    return (
        <div className='p-6 md:p-10 md:px-15 mx-auto space-y-4'>
            <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4'>
                <div>
                    <h1 className='text-2xl md:text-3xl font-serif font-semibold text-foreground tracking-tight'>
                        Modelltrening
                    </h1>
                    <p className='text-muted-foreground mt-1 text-sm'>
                        Administrer bildene som brukes til å trene LoRA-modellen
                        på nytt. Last opp{' '}
                        <span className='font-bold'>mellom 10-50</span> bilder
                        av høy kvalitet for best resultat.
                    </p>
                </div>
                <div className='flex gap-2 max-sm:flex-col'>
                    {images.length > 0 && (
                        <Button
                            variant='outline'
                            onClick={clearAll}
                            className='gap-2 border-border text-muted-foreground cursor-pointer hover:bg-secondary'
                        >
                            <X className='h-4 w-4' />
                            Fjern Alle
                        </Button>
                    )}
                    <Button
                        onClick={retrain}
                        disabled={!canTrain || isTraining}
                        className='bg-foreground hover:bg-foreground/90 text-background gap-2 cursor-pointer'
                    >
                        {isTraining ? (
                            <>
                                <Loader2 className='h-4 w-4 animate-spin' />
                                Trener...
                            </>
                        ) : (
                            <>
                                <RefreshCw className='h-4 w-4' />
                                Tren Modell
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant='outline'
                            className='rounded-full gap-2 border-border min-w-[200px] justify-between hover:bg-secondary'
                        >
                            <span className='truncate font-medium'>
                                {active.name}
                            </span>
                            <ChevronDown className='h-4 w-4 shrink-0 text-muted-foreground' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start' className='w-[260px]'>
                        {loras.map((lora) => (
                            <DropdownMenuItem
                                key={lora.id}
                                onClick={() => setActiveId(lora.id)}
                                className='flex items-center justify-between gap-2'
                            >
                                <span
                                    className={`truncate ${lora.id === activeId ? 'font-semibold' : ''}`}
                                >
                                    {lora.name}
                                </span>
                                <Badge
                                    variant='secondary'
                                    className={`text-[10px] px-1.5 py-0 ${statusColor[lora.status]}`}
                                >
                                    {lora.status}
                                </Badge>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={createNewLora}
                            className='gap-2 text-primary'
                        >
                            <Plus className='h-4 w-4' />
                            Ny LoRA
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Badge
                    variant='outline'
                    className={`text-xs ${statusColor[active.status]}`}
                >
                    {active.status}
                </Badge>

                <div className='flex gap-1 ml-auto'>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={openRename}
                        className='h-8 w-8 cursor-pointer hover:bg-secondary hover:border'
                    >
                        <Pencil className='h-3.5 w-3.5' />
                    </Button>
                    {loras.length > 1 && (
                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => setDeleteDialogOpen(true)}
                            className='h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/30 cursor-pointer'
                        >
                            <Trash2 className='h-3.5 w-3.5' />
                        </Button>
                    )}
                </div>
            </div>

            <div className='flex-1 pb-8'>
                <div className='flex items-center gap-2 mb-8'>
                    <span
                        className={`text-sm font-medium ${canTrain ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                        {images.length} bilder lastet opp
                    </span>
                    {canTrain && <Check className='h-4 w-4 text-primary' />}
                    {!canTrain && images.length > 0 && (
                        <span className='text-xs text-muted-foreground'>
                            ({10 - images.length} mangler)
                        </span>
                    )}
                </div>

                <div
                    className={`
                        rounded-2xl border-2 border-dashed transition-colors hover:
                        ${isDragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}
                    `}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                >
                    {images.length === 0 ? (
                        <div
                            className='flex flex-col items-center justify-center py-20 gap-3 cursor-pointer'
                            onClick={openFilePicker}
                        >
                            <div className='h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center'>
                                <ImagePlus className='h-6 w-6 text-muted-foreground' />
                            </div>
                            <div className='text-center'>
                                <p className='text-sm font-medium text-foreground'>
                                    Slipp bilder her eller trykk for å laste opp
                                </p>
                                <p className='text-xs text-muted-foreground mt-1'>
                                    Last opp 10+ bilder av tidligere prosjekter
                                    for å trene modellen
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className='p-4'>
                            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3'>
                                <AnimatePresence>
                                    {images.map((img) => (
                                        <motion.div
                                            key={img.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className='relative group aspect-square rounded-xl overflow-hidden'
                                        >
                                            <img
                                                src={img.preview}
                                                alt='Training'
                                                className='w-full h-full object-cover'
                                            />
                                            <button
                                                onClick={() =>
                                                    removeImage(img.id)
                                                }
                                                className='absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-foreground/70 text-background flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity'
                                            >
                                                <X className='h-3 w-3' />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                <div
                                    className='aspect-square rounded-xl border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary/40 transition-colors'
                                    onClick={openFilePicker}
                                >
                                    <Upload className='h-5 w-5 text-muted-foreground' />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
                <DialogContent className='sm:max-w-md'>
                    <DialogHeader>
                        <DialogTitle>Endre navn</DialogTitle>
                        <DialogDescription>
                            Gi LoRAen et beskrivende navn.
                        </DialogDescription>
                    </DialogHeader>
                    <Input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder='Næring, generell'
                        onKeyDown={(e) => e.key === 'Enter' && saveRename()}
                        autoFocus
                    />
                    <DialogFooter>
                        <Button
                            variant='outline'
                            onClick={() => setRenameDialogOpen(false)}
                            className='cursor-pointer hover:bg-secondary'
                        >
                            Avbryt
                        </Button>
                        <Button onClick={saveRename} className='gap-2 cursor-pointer'>
                            <Save className='h-4 w-4' />
                            Lagre
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className='sm:max-w-md'>
                    <DialogHeader>
                        <DialogTitle>Slett LoRA</DialogTitle>
                        <DialogDescription>
                            Er du sikker på at du vil slette "{active.name}"?
                            Denne handlingen kan ikke angres.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant='outline'
                            onClick={() => setDeleteDialogOpen(false)}
                            className='cursor-pointer hover:bg-secondary'
                        >
                            Avbryt
                        </Button>
                        <Button
                            variant='ghost'
                            onClick={deleteLora}
                            className='gap-2 cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/30'
                        >
                            <Trash2 className='h-4 w-4' />
                            Slett
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
