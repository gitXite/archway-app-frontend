import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { navigate } from 'astro:transitions/client';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLong, setIsLong] = useState(false);

    useEffect(() => {
        setIsLong(password.length > 7);
    }, [password]);

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            toast.warning('Passordene stemmer ikke overens', {
                description: 'Vennligst kontroller og prøv igjen'
            });
            setPassword('');
            setConfirmPassword('');
            return;
        } else {
            setPassword('');
            setConfirmPassword('');
            navigate('/onboarding');
        }
    };

    return (
        <div className='min-h-screen flex'>
            <div className='hidden lg:flex lg:w-1/2 bg-foreground relative items-center justify-center overflow-hidden group'>
                <img src="/images/render_134.png" alt="Render" className='absolute' />
                <motion.div className='absolute inset-0 backdrop-blur-xs bg-primary/40 group-hover:backdrop-blur-none group-hover:bg-primary/0 transition-all duration-500' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />
                
                <motion.div
                    className='absolute right-0 bottom-0 py-2 px-4'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <span className='text-xs text-primary-foreground/90'>
                        Generert med Archway
                    </span>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className='relative z-10 text-center px-12'
                >
                    <div className='flex items-center justify-center gap-4 pointer-events-none group-hover:-translate-x-200 transition-transform duration-500'>
                        <div className='flex items-center justify-center h-16 w-16 mb-6'>
                            <img
                                src='/images/archway-logo.webp'
                                alt='Archway Logo'
                            />
                        </div>
                        <h1 className='font-serif text-5xl font-bold text-primary-foreground tracking-tight mb-6'>
                            Archway
                        </h1>
                    </div>
                    <p className='text-primary-foreground/90 text-lg max-w-md group-hover:-translate-x-200 transition-transform duration-500'>
                        Lag imponerende arkitektoniske visualiseringer
                        på få minutter
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
                    <div>
                        <h2 className='font-serif text-3xl font-bold text-foreground'>
                            Opprett Konto
                        </h2>
                        <p className='text-muted-foreground mt-2'>
                            Kom i gang med Archway
                        </p>
                    </div>

                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className='space-y-5'
                    >
                        <div className='space-y-2'>
                            <Label htmlFor='name'>Fullt navn</Label>
                            <div className='relative'>
                                <User className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                <Input
                                    id='name'
                                    type='text'
                                    placeholder='Jane Doe'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='pl-10'
                                />
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='email'>Email</Label>
                            <div className='relative'>
                                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                <Input
                                    id='email'
                                    type='email'
                                    placeholder='eksempel@domene.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='pl-10'
                                />
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='password'>Passord</Label>
                            <div className='relative'>
                                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                <Input
                                    id='password'
                                    type='password'
                                    placeholder='••••••••'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className='pl-10'
                                />
                            </div>
                            <div className='flex items-center gap-1'>
                                {isLong && <Check className='text-muted-foreground' size={16} />}
                                <p className={`text-xs ${isLong ? 'text-muted-foreground' : 'text-destructive'}`}>
                                    Minimum 8 tegn
                                </p>
                            </div>
                            <Label htmlFor='confirm'>Bekreft passord</Label>
                            <div className='relative'>
                                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                <Input
                                    id='confirm'
                                    type='password'
                                    placeholder='••••••••'
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className='pl-10'
                                />
                            </div>
                        </div>

                        <Button
                            className='w-full group cursor-pointer'
                            size='lg'
                            onClick={handleSignUp}
                            disabled={!password || !confirmPassword || !isLong}
                        >
                            Opprett konto
                            <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                        </Button>
                    </form>

                    <div className='relative'>
                        <div className='absolute inset-0 flex items-center'>
                            <span className='w-full border-t border-border' />
                        </div>
                        <div className='relative flex justify-center text-xs uppercase'>
                            <span className='bg-background px-2 text-muted-foreground'>
                                eller
                            </span>
                        </div>
                    </div>

                    <Button
                        variant='outline'
                        className='w-full cursor-pointer hover:bg-secondary'
                        size='lg'
                    >
                        Fortsett med Google
                    </Button>

                    <p className='text-center text-sm text-muted-foreground'>
                        Har du allerede en konto?{' '}
                        <a
                            href='/login'
                            className='text-foreground font-medium hover:underline'
                        >
                            Logg inn
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default RegisterPage;
