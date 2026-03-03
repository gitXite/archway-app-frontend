import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader, Loader2, Mail, MapPin, Phone, SendHorizonal } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

const contactSchema = z.object({
    name: z.string().trim().min(1, 'Navn er påkrevd').max(100),
    email: z.string().trim().email('Ugyldig email adresse').max(255),
    subject: z.string().trim().min(1, 'Tema er påkrevd').max(200),
    message: z.string().trim().min(1, 'Melding er påkrevd').max(2000),
});

export default function ContactPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [sending, setSending] = useState(false);

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        const result = contactSchema.safeParse(form);
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.errors.forEach((err) => {
                if (err.path[0])
                    fieldErrors[err.path[0] as string] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setForm({ name: '', email: '', subject: '', message: '' });
            toast('Melding sendt', {
                description: "Vi kommer tilbake til deg snarest.",
            });
        }, 1200);
    };

    return (
        <div className='min-h-screen bg-background'>
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

            <div className='max-w-5xl mx-auto px-6 py-16'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className='font-serif font-semibold text-4xl text-foreground mb-2'>
                        Ta kontakt
                    </h1>
                    <p className='text-muted-foreground text-lg mb-12 max-w-xl'>
                        Har du et spørsmål om Archway eller trenger hjelp med et prosjekt?
                        Ta kontakt med oss.
                    </p>

                    <div className='grid md:grid-cols-3 gap-10'>
                        <div className='space-y-8'>
                            {[
                                {
                                    icon: Mail,
                                    label: 'Email',
                                    value: 'hello@archway.studio',
                                },
                                {
                                    icon: MapPin,
                                    label: 'Sted',
                                    value: 'Bergen, Norge',
                                },
                                {
                                    icon: Phone,
                                    label: 'Telefon',
                                    value: '+47 ',
                                },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className='flex items-start gap-3'
                                >
                                    <div className='h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0'>
                                        <item.icon className='h-4 w-4 text-muted-foreground' />
                                    </div>
                                    <div>
                                        <p className='text-sm font-medium text-foreground'>
                                            {item.label}
                                        </p>
                                        <p className='text-sm text-muted-foreground'>
                                            {item.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Card className='md:col-span-2 border-border/60'>
                            <CardHeader>
                                <CardTitle className='font-serif text-xl'>
                                    Send oss en melding
                                </CardTitle>
                                <CardDescription>
                                    Fyll ut skjemaet så svarer vi fortløpende.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={handleSubmit}
                                    className='space-y-5'
                                >
                                    <div className='grid sm:grid-cols-2 gap-4'>
                                        <div className='space-y-1.5'>
                                            <Label htmlFor='name'>Navn</Label>
                                            <Input
                                                id='name'
                                                placeholder='Ditt navn'
                                                value={form.name}
                                                onChange={(e) =>
                                                    handleChange(
                                                        'name',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {errors.name && (
                                                <p className='text-xs text-destructive'>
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>
                                        <div className='space-y-1.5'>
                                            <Label htmlFor='email'>Email</Label>
                                            <Input
                                                id='email'
                                                type='email'
                                                placeholder='eksempel@domene.com'
                                                value={form.email}
                                                onChange={(e) =>
                                                    handleChange(
                                                        'email',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {errors.email && (
                                                <p className='text-xs text-destructive'>
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className='space-y-1.5'>
                                        <Label htmlFor='subject'>Tema</Label>
                                        <Input
                                            id='subject'
                                            placeholder='Hva kan vi hjelpe med?'
                                            value={form.subject}
                                            onChange={(e) =>
                                                handleChange(
                                                    'subject',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {errors.subject && (
                                            <p className='text-xs text-destructive'>
                                                {errors.subject}
                                            </p>
                                        )}
                                    </div>
                                    <div className='space-y-1.5'>
                                        <Label htmlFor='message'>Melding</Label>
                                        <Textarea
                                            id='message'
                                            placeholder='Fortell mer…'
                                            rows={5}
                                            value={form.message}
                                            onChange={(e) =>
                                                handleChange(
                                                    'message',
                                                    e.target.value,
                                                )
                                            }
                                            className='min-h-30'
                                        />
                                        {errors.message && (
                                            <p className='text-xs text-destructive'>
                                                {errors.message}
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        type='submit'
                                        className='w-full sm:w-auto cursor-pointer'
                                        disabled={sending}
                                    >
                                        {sending ? (
                                            <div className='flex items-center gap-2'>
                                                <Loader2 className='animate-spin' /> 
                                                Sender…
                                            </div>
                                        ) : (
                                            <div className='flex items-center gap-2'>
                                                Send melding
                                                <SendHorizonal />
                                            </div>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
