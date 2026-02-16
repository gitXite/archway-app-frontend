import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, ImagePlus, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';

interface OnboardingModalProps {
    open: boolean;
    onComplete: () => void;
}

interface UploadedImage {
    id: string;
    file: File;
    preview: string;
}

export function OnboardingModal({ open, onComplete }: OnboardingModalProps) {
    const [images, setImages] = useState<UploadedImage[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFiles = useCallback((files: FileList | File[]) => {
        const newImages: UploadedImage[] = Array.from(files)
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

    const canProceed = images.length >= 10;

    return (
        <Dialog open={open}>
            <DialogContent className='max-w-2xl max-h-[90vh] overflow-hidden bg-popover border-border/60 [&>button]:hidden'>
                <DialogHeader className='pb-2'>
                    <DialogTitle className='font-serif text-2xl'>
                        Welcome to <span className='text-primary'>Archway</span>
                    </DialogTitle>
                    <DialogDescription className='text-muted-foreground text-sm leading-relaxed'>
                        Upload at least{' '}
                        <strong className='text-foreground'>10 images</strong>{' '}
                        of your office's previous work. The AI will learn your
                        firm's visual identity — materials, lighting,
                        composition, and style.
                    </DialogDescription>
                </DialogHeader>

                <div
                    className={`
            relative mt-2 rounded-xl border-2 border-dashed transition-colors cursor-pointer
            ${isDragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'}
          `}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.multiple = true;
                        input.accept = 'image/*';
                        input.onchange = (e) => {
                            const files = (e.target as HTMLInputElement).files;
                            if (files) handleFiles(files);
                        };
                        input.click();
                    }}
                >
                    {images.length === 0 ? (
                        <div className='flex flex-col items-center justify-center py-16 gap-3'>
                            <div className='h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center'>
                                <ImagePlus className='h-6 w-6 text-muted-foreground' />
                            </div>
                            <div className='text-center'>
                                <p className='text-sm font-medium text-foreground'>
                                    Drop images here or click to browse
                                </p>
                                <p className='text-xs text-muted-foreground mt-1'>
                                    PNG, JPG, WEBP — minimum 10 images required
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className='p-3 max-h-[45vh] overflow-y-auto'>
                            <div className='grid grid-cols-4 sm:grid-cols-5 gap-2'>
                                <AnimatePresence>
                                    {images.map((img) => (
                                        <motion.div
                                            key={img.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className='relative group aspect-square rounded-lg overflow-hidden'
                                        >
                                            <img
                                                src={img.preview}
                                                alt='Upload'
                                                className='w-full h-full object-cover'
                                            />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeImage(img.id);
                                                }}
                                                className='absolute top-1 right-1 h-5 w-5 rounded-full bg-foreground/70 text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                                            >
                                                <X className='h-3 w-3' />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                <div className='aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center hover:border-primary/40 transition-colors'>
                                    <Upload className='h-5 w-5 text-muted-foreground' />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className='flex items-center justify-between mt-3'>
                    <div className='flex items-center gap-2'>
                        <span
                            className={`text-sm font-medium ${canProceed ? 'text-primary' : 'text-muted-foreground'}`}
                        >
                            {images.length} / 10 images
                        </span>
                        {canProceed && (
                            <Check className='h-4 w-4 text-primary' />
                        )}
                    </div>
                    <Button
                        onClick={onComplete}
                        disabled={!canProceed}
                        className='bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-6'
                    >
                        Train Model
                        <ArrowRight className='h-4 w-4' />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
