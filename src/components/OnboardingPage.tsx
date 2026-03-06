import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload,
    X,
    ImagePlus,
    ArrowRight,
    ArrowLeft,
    Check,
    Building2,
    MapPin,
    Briefcase,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { navigate } from 'astro:transitions/client';

interface UploadedImage {
    id: string;
    file: File;
    preview: string;
}

const STEPS = [
    { label: 'Kontordetaljer', number: 1 },
    { label: 'Last opp portefølje', number: 2 },
    { label: 'Velg en plan', number: 3 },
];

const plans = [
    {
        name: 'Individuell',
        price: 'NOK 499/mnd',
        description: 'For individuelle arkitekter.',
        features: [
            '200 visualiseringer / mnd',
            'Ingen LoRA',
            '1 bruker',
            '5 prosjekter',
            '1024x1024 oppløsning',
            'Email support',
        ],
        popular: false,
    },
    {
        name: 'Profesjonell',
        price: 'NOK 1499/mnd',
        description: 'For bedrifter og kontorer.',
        features: [
            'Ubegrensede visualiseringer',
            '5 LoRA modeller',
            'Opptil 30 brukere',
            'Ubegrensede prosjekter',
            '2K oppløsning',
            'Email support',
            'Admin tilgang',
        ],
        popular: true,
    },
    {
        name: 'Enterprise',
        price: 'Kontakt salg',
        description:
            'For større bedrifter med spesialtilpassede behov.',
        features: [
            'Ubegrensede visualiseringer',
            'Ubegrensede LoRA modeller',
            'Ubegrensede brukere',
            'Ubegrensede prosjekter',
            '4K oppløsning',
            'Dedikert støtte',
            'Tilpassede integrasjoner',
        ],
        popular: false,
    },
];

const OnboardingPage = () => {
    // const navigate = useNavigate();
    const [step, setStep] = useState(1);

    // Step 1 state
    const [firmName, setFirmName] = useState('');
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');

    // Step 2 state
    const [images, setImages] = useState<UploadedImage[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);

    // Step 3 state
    const [selectedPlan, setSelectedPlan] = useState('Profesjonell');

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

    const canProceedStep1 = firmName.trim().length > 0;
    const canProceedStep2 = images.length >= 10;

    const handleComplete = () => {
        localStorage.setItem('archway_onboarded', 'true');
        navigate('/');
    };

    const slideVariants = {
        enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
    };

    const [direction, setDirection] = useState(1);

    const goNext = () => {
        setDirection(1);
        setStep((s) => s + 1);
    };
    const goBack = () => {
        setDirection(-1);
        setStep((s) => s - 1);
    };

    return (
        <div className='min-h-screen bg-background flex flex-col'>
            <header className='border-b border-border/50 bg-card'>
                <div className='max-w-5xl mx-auto px-6 py-6 flex items-center justify-between'>
                    <div className='flex items-center gap-2.5 pointer-events-none'>
                        <div className='h-8 w-8 rounded-lg flex items-center justify-center'>
                            <img src="/images/archway-logo.webp" alt="Archway Logo" />
                        </div>
                        <span className='font-serif text-xl text-foreground tracking-tight'>
                            Archway
                        </span>
                    </div>
                    <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => window.history.back()}
                        className='cursor-pointer hover:bg-secondary'
                    >
                        <ArrowLeft />
                        Tilbake
                    </Button>
                </div>
            </header>

            <div className='flex-1 flex flex-col items-center justify-start px-4 py-10'>
                <div className='flex items-center gap-2 mb-10'>
                    {STEPS.map((s, i) => (
                        <div key={s.number} className='flex items-center gap-2'>
                            <div
                                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                                    step >= s.number
                                        ? 'bg-foreground text-background'
                                        : 'bg-secondary text-muted-foreground'
                                }`}
                            >
                                {step > s.number ? (
                                    <Check className='h-4 w-4' />
                                ) : (
                                    s.number
                                )}
                            </div>
                            <span
                                className={`text-sm hidden sm:inline ${
                                    step >= s.number
                                        ? 'text-foreground font-medium'
                                        : 'text-muted-foreground'
                                }`}
                            >
                                {s.label}
                            </span>
                            {i < STEPS.length - 1 && (
                                <div
                                    className={`w-12 h-px mx-1 ${
                                        step > s.number
                                            ? 'bg-foreground'
                                            : 'bg-border'
                                    }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className='w-full max-w-4xl overflow-hidden mt-5 md:mt-10'>
                    <AnimatePresence mode='wait' custom={direction}>
                        {step === 1 && (
                            <motion.div
                                key='step1'
                                custom={direction}
                                variants={slideVariants}
                                initial='enter'
                                animate='center'
                                exit='exit'
                                transition={{ duration: 0.3 }}
                                className='space-y-6'
                            >
                                <div className='text-center mb-8'>
                                    <h2 className='font-serif text-3xl font-bold text-foreground'>
                                        Fortell oss om ditt kontor
                                    </h2>
                                    <p className='text-muted-foreground mt-2'>
                                        Hjelp oss å skreddersy din opplevelse
                                    </p>
                                </div>

                                <div className='max-w-sm mx-auto space-y-5'>
                                    <div className='space-y-2'>
                                        <Label htmlFor='firm'>
                                            Bedriftsnavn
                                        </Label>
                                        <div className='relative'>
                                            <Building2 className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                            <Input
                                                id='firm'
                                                placeholder='Studio Archway'
                                                value={firmName}
                                                onChange={(e) =>
                                                    setFirmName(e.target.value)
                                                }
                                                className='pl-10'
                                            />
                                        </div>
                                    </div>
                                    <div className='space-y-2'>
                                        <Label htmlFor='role'>Din rolle</Label>
                                        <div className='relative'>
                                            <Briefcase className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                            <Input
                                                id='role'
                                                placeholder='Daglig Leder'
                                                value={role}
                                                onChange={(e) =>
                                                    setRole(e.target.value)
                                                }
                                                className='pl-10'
                                            />
                                        </div>
                                    </div>
                                    <div className='space-y-2'>
                                        <Label htmlFor='location'>
                                            Lokasjon
                                        </Label>
                                        <div className='relative'>
                                            <MapPin className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                            <Input
                                                id='location'
                                                placeholder='Bergen, Norge'
                                                value={location}
                                                onChange={(e) =>
                                                    setLocation(e.target.value)
                                                }
                                                className='pl-10'
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='flex justify-center pt-4'>
                                    <Button
                                        onClick={goNext}
                                        disabled={!canProceedStep1}
                                        className='gap-2 px-8 cursor-pointer'
                                        size='lg'
                                    >
                                        Fortsett
                                        <ArrowRight className='h-4 w-4' />
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key='step2'
                                custom={direction}
                                variants={slideVariants}
                                initial='enter'
                                animate='center'
                                exit='exit'
                                transition={{ duration: 0.3 }}
                                className='space-y-4'
                            >
                                <div className='text-center mb-6'>
                                    <h2 className='font-serif text-3xl font-bold text-foreground'>
                                        Last opp deres portefølje
                                    </h2>
                                    <p className='text-muted-foreground mt-2'>
                                        Last opp minst{' '}
                                        <strong className='text-foreground'>
                                            10 bilder
                                        </strong>{' '}
                                        av kontorets tidligere prosjekter.
                                        KI-modellen lærer kontorets visuelle
                                        identitet - materialer, lyssetting,
                                        komposisjon og stil.
                                    </p>
                                </div>

                                <div
                                    className={`
                                        relative rounded-xl border-2 border-dashed transition-colors cursor-pointer
                                        ${isDragOver ? 'border-foreground bg-foreground/5' : 'border-border hover:border-foreground/30'}
                                    `}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setIsDragOver(true);
                                    }}
                                    onDragLeave={() => setIsDragOver(false)}
                                    onDrop={handleDrop}
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
                                    {images.length === 0 ? (
                                        <div className='flex flex-col items-center justify-center py-16 gap-3'>
                                            <div className='h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center'>
                                                <ImagePlus className='h-6 w-6 text-muted-foreground' />
                                            </div>
                                            <p className='text-sm font-medium text-foreground'>
                                                Slipp bilder her eller trykk for å laste opp
                                            </p>
                                            <p className='text-xs text-muted-foreground'>
                                                PNG, JPG, WEBP — minimum 10 bilder kreves
                                            </p>
                                        </div>
                                    ) : (
                                        <div className='p-3 max-h-[40vh] overflow-y-auto'>
                                            <div className='grid grid-cols-4 sm:grid-cols-5 gap-2'>
                                                <AnimatePresence>
                                                    {images.map((img) => (
                                                        <motion.div
                                                            key={img.id}
                                                            initial={{
                                                                opacity: 0,
                                                                scale: 0.9,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                scale: 1,
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                                scale: 0.9,
                                                            }}
                                                            className='relative group aspect-square rounded-lg overflow-hidden'
                                                        >
                                                            <img
                                                                src={
                                                                    img.preview
                                                                }
                                                                alt='Upload'
                                                                className='w-full h-full object-cover'
                                                            />
                                                            <button
                                                                onClick={(
                                                                    e,
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    removeImage(
                                                                        img.id,
                                                                    );
                                                                }}
                                                                className='absolute top-1 right-1 h-5 w-5 rounded-full bg-foreground/70 text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                                                            >
                                                                <X className='h-3 w-3' />
                                                            </button>
                                                        </motion.div>
                                                    ))}
                                                </AnimatePresence>
                                                <div className='aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center hover:border-foreground/30 transition-colors'>
                                                    <Upload className='h-5 w-5 text-muted-foreground' />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className='flex items-center justify-between pt-2'>
                                    <div className='flex items-center gap-1'>
                                        <Button
                                            variant='ghost'
                                            onClick={goBack}
                                            className='gap-2 cursor-pointer hover:bg-secondary'
                                        >
                                            <ArrowLeft className='h-4 w-4' />{' '}
                                            Tilbake
                                        </Button>
                                        <span
                                            className={`text-sm font-medium ${canProceedStep2 ? 'text-foreground' : 'text-muted-foreground'}`}
                                        >
                                            {images.length} / 10 bilder
                                        </span>
                                        {canProceedStep2 && (
                                            <Check className='h-4 w-4 text-foreground' />
                                        )}
                                    </div>
                                    <Button
                                        onClick={goNext}
                                        disabled={!canProceedStep2}
                                        className='gap-2 px-8 cursor-pointer'
                                        size='lg'
                                    >
                                        Fortsett
                                        <ArrowRight className='h-4 w-4' />
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key='step3'
                                custom={direction}
                                variants={slideVariants}
                                initial='enter'
                                animate='center'
                                exit='exit'
                                transition={{ duration: 0.3 }}
                                className='space-y-6 w-full max-sm:flex max-sm:flex-col'
                            >
                                <div className='text-center mb-8'>
                                    <h2 className='font-serif text-3xl font-bold text-foreground'>
                                        Velg en plan
                                    </h2>
                                    <p className='text-muted-foreground mt-2'>
                                        Du kan endre når som helst under faktureringsinnstillinger
                                    </p>
                                </div>

                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                    {plans.map((plan) => {
                                        const isSelected =
                                            selectedPlan === plan.name;
                                        return (
                                            <button
                                                key={plan.name}
                                                onClick={() =>
                                                    setSelectedPlan(plan.name)
                                                }
                                                className={`relative w-70 h-90 text-left rounded-xl bg-card border p-5 transition-all justify-self-center ${
                                                    isSelected
                                                        ? 'border-foreground'
                                                        : 'border-border hover:border-foreground/30'
                                                }`}
                                            >
                                                {plan.popular && (
                                                    <span className='absolute -top-2.5 left-4 bg-foreground text-background text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full'>
                                                        Populær
                                                    </span>
                                                )}
                                                <h3 className='font-serif font-bold text-foreground'>
                                                    {plan.name}
                                                </h3>
                                                <p className='text-2xl font-bold text-foreground mt-1'>
                                                    {plan.price}
                                                </p>
                                                <p className='text-xs text-muted-foreground mt-1 mb-4'>
                                                    {plan.description}
                                                </p>
                                                <ul className='space-y-1.5'>
                                                    {plan.features.map((f) => (
                                                        <li
                                                            key={f}
                                                            className='flex items-center gap-2 text-xs text-muted-foreground'
                                                        >
                                                            <Check className='h-3 w-3 text-foreground shrink-0' />
                                                            {f}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className='flex items-center justify-between pt-2'>
                                    <Button
                                        variant='ghost'
                                        onClick={goBack}
                                        className='gap-2 cursor-pointer hover:bg-secondary'
                                    >
                                        <ArrowLeft className='h-4 w-4' /> Tilbake
                                    </Button>
                                    <Button
                                        onClick={handleComplete}
                                        className='gap-2 px-8 cursor-pointer'
                                        size='lg'
                                    >
                                        Kom i gang
                                        <ArrowRight className='h-4 w-4' />
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;
