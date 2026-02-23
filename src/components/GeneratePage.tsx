import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ImagePlus, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
} from '@/components/ui/combobox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ImageUploadZoneProps {
    label: string;
    sublabel: string;
    image: string | null;
    onImageSelect: (file: File) => void;
}

const projects: string[] = [
    'Villa Nordstrand',
    'Kontorbygg Aker Brygge'
] as const;

function ImageUploadZone({
    label,
    sublabel,
    image,
    onImageSelect,
}: ImageUploadZoneProps) {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragOver(false);
            const file = e.dataTransfer.files[0];
            if (file?.type.startsWith('image/')) onImageSelect(file);
        },
        [onImageSelect],
    );

    const openPicker = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) onImageSelect(file);
        };
        input.click();
    };

    return (
        <div
            className={`
        relative flex-1 rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden
        ${isDragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}
        ${image ? 'border-solid border-border' : ''}
      `}
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={openPicker}
        >
            {image ? (
                <div className='relative aspect-4/3'>
                    <img
                        src={image}
                        alt={label}
                        className='w-full h-full object-cover rounded-xl'
                    />
                    <div className='absolute inset-0 bg-linear-to-t from-foreground/30 to-transparent rounded-xl' />
                    <div className='absolute bottom-3 left-3'>
                        <span className='text-xs font-medium text-background/90 bg-foreground/50 backdrop-blur-sm px-2.5 py-1 rounded-full'>
                            {label}
                        </span>
                    </div>
                </div>
            ) : (
                <div className='flex aspect-4/3 flex-col items-center justify-center gap-3 p-6'>
                    <div className='h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center'>
                        <ImagePlus className='h-5 w-5 text-muted-foreground' />
                    </div>
                    <div className='text-center'>
                        <p className='text-sm font-medium text-foreground'>
                            {label}
                        </p>
                        <p className='text-xs text-muted-foreground mt-0.5'>
                            {sublabel}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

const categories: string[] = [
    'Bolig',
    'Næring',
    'Interiør',
    'Landskap'
];

export function GeneratePage() {
    const [inputImage, setInputImage] = useState<string | null>(null);
    const [referenceImage, setReferenceImage] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [project, setProject] = useState<string | null>(null);
    const [category, setCategory] = useState<string | null>(null);

    const handleInputSelect = (file: File) => {
        setInputImage(URL.createObjectURL(file));
        setGeneratedImage(null);
    };

    const handleReferenceSelect = (file: File) => {
        setReferenceImage(URL.createObjectURL(file));
        setGeneratedImage(null);
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        // Simulate generation
        setTimeout(() => {
            setIsGenerating(false);
            setGeneratedImage(inputImage); // placeholder — would be API result
            toast.success('Render fullført', {
                description: project,
            });
        }, 3000);
    };

    const canGenerate = inputImage && referenceImage && !isGenerating && project;

    return (
        <div className='flex flex-col h-full'>
            <div className='px-8 py-8'>
                <h1 className='text-2xl md:text-3xl font-serif font-semibold text-foreground tracking-tight'>
                    Rendering
                </h1>
                <p className='text-sm text-muted-foreground mt-1'>
                    Last opp en input-tegning og et referansebilde for å
                    generere en render.
                </p>

                <div className='flex flex-col sm:flex-row gap-0 sm:gap-6'>
                    <Combobox items={projects} onValueChange={(value) => setProject(value as string | null)}>
                        <ComboboxInput placeholder='Velg et prosjekt' className={'w-50 my-4'} />
                        <ComboboxContent>
                            <ComboboxEmpty>Ingen prosjekter funnet</ComboboxEmpty>
                            <ComboboxList>
                                {(prosjekt: string) => (
                                    <ComboboxItem key={prosjekt} value={prosjekt}>
                                        {prosjekt}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                    <Combobox items={categories} onValueChange={(value) => setCategory(value as string | null)}>
                        <ComboboxInput placeholder='Velg en kategori' className={'w-50 my-4'} />
                        <ComboboxContent>
                            <ComboboxEmpty>Ingen kategorier funnet</ComboboxEmpty>
                            <ComboboxList>
                                {(category: string) => (
                                    <ComboboxItem key={category} value={category}>
                                        {category}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </div>
            </div>

            <div className='flex-1 px-8 pb-16'>
                <div className='max-w-5xl mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                        <ImageUploadZone
                            label='Input'
                            sublabel='Fasade, tegning, eller sketch'
                            image={inputImage}
                            onImageSelect={handleInputSelect}
                        />
                        <ImageUploadZone
                            label='Referanse'
                            sublabel='Referansebilde for stil, materialvalg, og komposisjon'
                            image={referenceImage}
                            onImageSelect={handleReferenceSelect}
                        />
                    </div>

                    <div className='flex justify-center mb-8'>
                        <Button
                            onClick={handleGenerate}
                            disabled={!canGenerate}
                            size='lg'
                            className='bg-foreground hover:bg-foreground/90 text-background gap-2.5 px-8 py-6 text-base rounded-full shadow-lg transition-all disabled:opacity-40 cursor-pointer'
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className='h-5 w-5 animate-spin' />
                                    Genererer...
                                </>
                            ) : (
                                <>
                                    Generer Render
                                    <ArrowRight className='h-5 w-5' />
                                </>
                            )}
                        </Button>
                    </div>

                    {(isGenerating || generatedImage) && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='rounded-2xl transition-all border border-border bg-card overflow-hidden hover:border-primary/30'
                        >
                            <div className='px-4 py-3 border-b border-border/50'>
                                <span className='text-xs font-medium text-primary uppercase tracking-wider'>
                                    Output
                                </span>
                            </div>
                            <div className='aspect-video flex items-center justify-center bg-secondary/30'>
                                {isGenerating ? (
                                    <div className='flex flex-col items-center gap-3'>
                                        <div className='relative'>
                                            <div className='h-16 w-16 rounded-full border-2 border-border' />
                                            <div className='absolute inset-0 h-16 w-16 rounded-full border-2 border-primary border-t-transparent animate-spin' />
                                        </div>
                                        <p className='text-sm text-muted-foreground'>
                                            Oppretter din render...
                                        </p>
                                    </div>
                                ) : generatedImage ? (
                                    <a
                                        href={generatedImage}
                                        rel='noopener noreferrer'
                                        target='_blank'
                                        className='w-full h-full'
                                    >
                                        <img
                                            src={generatedImage}
                                            alt='Generated render'
                                            className='w-full h-full object-cover'
                                        />
                                    </a>
                                ) : null}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
