import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, ImagePlus, RefreshCw, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface TrainingImage {
    id: string;
    file: File;
    preview: string;
}

export function TrainingPage() {
    const [images, setImages] = useState<TrainingImage[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isTraining, setIsTraining] = useState(false);

    // fetch currently trained images from database after initial onboarding
    // show current dataset under image drop zone

    const handleFiles = useCallback((files: FileList | File[]) => {
        const newImages: TrainingImage[] = Array.from(files)
            .filter((f) => f.type.startsWith('image/'))
            .map((file) => ({
                id: crypto.randomUUID(),
                file,
                preview: URL.createObjectURL(file),
            }));
        setImages((prev) => [...prev, ...newImages]);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragOver(false);
            handleFiles(e.dataTransfer.files);
        },
        [handleFiles],
    );

    const removeImage = (id: string) => {
        setImages((prev) => {
            const img = prev.find((i) => i.id === id);
            if (img) URL.revokeObjectURL(img.preview);
            return prev.filter((i) => i.id !== id);
        });
    };

    const clearAll = () => {
        images.forEach((img) => URL.revokeObjectURL(img.preview));
        setImages([]);
    };

    const retrain = () => {
        setIsTraining(true);
        setTimeout(() => {
            setIsTraining(false);
            toast.success('Modelltrening startet...', {
                description: 'Forventet tid: 1 time'
            });
        }, 4000);
    };

    const canTrain = images.length >= 10;

    return (
        <div className='p-6 md:p-10 md:px-15 mx-auto space-y-4'>
            <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4'>
                <div>
                    <h1 className='text-2xl md:text-3xl font-serif font-semibold text-foreground tracking-tight'>
                        Modelltrening
                    </h1>
                    <p className='text-muted-foreground mt-1 text-sm'>
                        Administrer bildene som brukes til å trene LoRA-modellen på nytt. Last opp <span className='font-bold'>mellom 10-50</span> bilder av høy kvalitet for best resultat. 
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

            <div className='flex-1 pb-8'>
                {/* Status bar */}
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

                {/* Drop zone / grid */}
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
                            onClick={() => {
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.multiple = true;
                                input.accept = 'image/*';
                                input.onchange = (e) => {
                                    const files = (e.target as HTMLInputElement)
                                        .files;
                                    if (files) handleFiles(files);
                                };
                                input.click();
                            }}
                        >
                            <div className='h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center'>
                                <ImagePlus className='h-6 w-6 text-muted-foreground' />
                            </div>
                            <div className='text-center'>
                                <p className='text-sm font-medium text-foreground'>
                                    Slipp bilder her eller trykk for å laste opp
                                </p>
                                <p className='text-xs text-muted-foreground mt-1'>
                                    Last opp 10+ bilder av tidligere prosjekter for å trene modellen
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
                                    onClick={() => {
                                        const input =
                                            document.createElement('input');
                                        input.type = 'file';
                                        input.multiple = true;
                                        input.accept = 'image/*';
                                        input.onchange = (e) => {
                                            const files = (
                                                e.target as HTMLInputElement
                                            ).files;
                                            if (files) handleFiles(files);
                                        };
                                        input.click();
                                    }}
                                >
                                    <Upload className='h-5 w-5 text-muted-foreground' />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
