import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, ImagePlus, RefreshCw, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TrainingImage {
    id: string;
    file: File;
    preview: string;
}

export function TrainingPage() {
    const [images, setImages] = useState<TrainingImage[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isTraining, setIsTraining] = useState(false);

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
        setTimeout(() => setIsTraining(false), 4000);
    };

    const canTrain = images.length >= 10;

    return (
        <div className='flex flex-col h-full'>
            <div className='px-8 pt-8 pb-4 flex items-start justify-between'>
                <div>
                    <h1 className='font-serif text-3xl text-foreground'>
                        Training Data
                    </h1>
                    <p className='text-sm text-muted-foreground mt-1'>
                        Manage the images used to train your LoRA model. Upload
                        at least 10 images.
                    </p>
                </div>
                <div className='flex gap-2'>
                    {images.length > 0 && (
                        <Button
                            variant='outline'
                            onClick={clearAll}
                            className='rounded-full gap-2 border-border text-muted-foreground cursor-pointer'
                        >
                            <X className='h-4 w-4' />
                            Clear All
                        </Button>
                    )}
                    <Button
                        onClick={retrain}
                        disabled={!canTrain || isTraining}
                        className='bg-foreground hover:bg-foreground/90 text-background gap-2 rounded-full cursor-pointer'
                    >
                        {isTraining ? (
                            <>
                                <Loader2 className='h-4 w-4 animate-spin' />
                                Training...
                            </>
                        ) : (
                            <>
                                <RefreshCw className='h-4 w-4' />
                                Retrain Model
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className='flex-1 px-8 pb-8'>
                {/* Status bar */}
                <div className='flex items-center gap-2 mb-8'>
                    <span
                        className={`text-sm font-medium ${canTrain ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                        {images.length} images uploaded
                    </span>
                    {canTrain && <Check className='h-4 w-4 text-primary' />}
                    {!canTrain && images.length > 0 && (
                        <span className='text-xs text-muted-foreground'>
                            ({10 - images.length} more needed)
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
                                    Drop images here or click to browse
                                </p>
                                <p className='text-xs text-muted-foreground mt-1'>
                                    Upload 10+ images of previous projects to
                                    train the model
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
