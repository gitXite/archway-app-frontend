import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className='min-h-screen flex'>
            <div className='hidden lg:flex lg:w-1/2 bg-foreground relative items-center justify-center overflow-hidden group'>
                <img src="/images/interior_render.png" alt="Render" className='absolute w-full' style={{ top: '50%', transform: 'translateY(-60%)' }} />
                <motion.div className='absolute inset-0 backdrop-blur-xs bg-primary/40 group-hover:backdrop-blur-none group-hover:bg-primary/0 transition-all duration-500' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />

                <motion.div 
                    className='absolute right-0 bottom-0 py-2 px-4'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <span className='text-xs text-primary-foreground/90'>Generert med Archway</span>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className='relative z-10 text-center px-12'
                >
                    <div className='flex items-center justify-center gap-4 pointer-events-none group-hover:-translate-x-200 transition-transform duration-500'>
                        <div className='flex items-center justify-center h-16 w-16 mb-6'>
                            <img src="/images/archway-logo.webp" alt="Archway Logo" />
                        </div>
                        <h1 className='font-serif text-5xl font-bold text-primary-foreground tracking-tight mb-6'>
                            Archway
                        </h1>
                    </div>
                    <p className='text-primary-foreground/90 text-lg max-w-md group-hover:-translate-x-200 transition-transform duration-500'>
                        Vi hjelper deg med å få tilgang til kontoen din igjen.
                    </p>
                </motion.div>
            </div>

            <div className='w-full lg:w-1/2 flex items-center justify-center p-8'>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className='w-full max-w-sm space-y-8'
                >
                    {!submitted ? (
                        <>
                            <div>
                                <h2 className='font-serif text-3xl font-bold text-foreground'>
                                    Tilbakestill passord
                                </h2>
                                <p className='text-muted-foreground mt-2'>
                                    Skriv inn e-postadressen din, så sender vi deg en lenke for å tilbakestille passordet ditt.
                                </p>
                            </div>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (email.trim()) setSubmitted(true);
                                }}
                                className='space-y-5'
                            >
                                <div className='space-y-2'>
                                    <Label htmlFor='email'>Email</Label>
                                    <div className='relative'>
                                        <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                        <Input
                                            id='email'
                                            type='email'
                                            placeholder='eksempel@domene.com'
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            className='pl-10'
                                            required
                                        />
                                    </div>
                                </div>

                                <Button className='w-full cursor-pointer' size='lg'>
                                    Send lenke
                                </Button>
                            </form>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className='text-center space-y-4'
                        >
                            <div className='mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center'>
                                <CheckCircle className='h-6 w-6 text-primary' />
                            </div>
                            <h2 className='font-serif text-3xl font-bold text-foreground'>
                                Sjekk din epost
                            </h2>
                            <p className='text-muted-foreground'>
                                Vi har sendt en lenke for å tilbakestille passordet til{' '}
                                <span className='font-medium text-foreground'>
                                    {email}
                                </span>
                                .
                            </p>
                            <Button
                                variant='outline'
                                className='mt-4 cursor-pointer hover:bg-secondary'
                                onClick={() => setSubmitted(false)}
                            >
                                Prøv en annen e-postadresse
                            </Button>
                        </motion.div>
                    )}

                    <a
                        href='/login'
                        className='flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
                    >
                        <ArrowLeft className='h-4 w-4' />
                        Tilbake til login
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
