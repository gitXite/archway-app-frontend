import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='min-h-screen flex'>
            <div className='hidden lg:flex lg:w-1/2 bg-foreground relative items-center justify-center overflow-hidden group'>
                <img
                    src='/images/render_141.png'
                    alt='Render'
                    className='absolute w-full'
                    style={{ top: '50%', transform: 'translateY(-38%)' }}
                />
                <motion.div
                    className='absolute inset-0 backdrop-blur-xs bg-primary/40 group-hover:backdrop-blur-none group-hover:bg-primary/0 transition-all duration-500'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                />

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
                        Arkitektonisk visualisering drevet av KI
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
                            Velkommen tilbake
                        </h2>
                        <p className='text-muted-foreground mt-2'>
                            Logg inn på kontoen din
                        </p>
                    </div>

                    <form
                        onSubmit={(e) => e.preventDefault()}
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
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='pl-10'
                                />
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <Label htmlFor='password'>Passord</Label>
                                <a
                                    href='glemt-passord'
                                    className='text-xs text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    Glemt passord?
                                </a>
                            </div>
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
                        </div>

                        <Button
                            className='w-full group cursor-pointer'
                            size='lg'
                        >
                            Logg inn
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
                        className='w-full cursor-pointer hover:bg-secondary gap-4'
                        size='lg'
                    >
                        <svg
                            version='1.1'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 48 48'
                            xmlnsXlink='http://www.w3.org/1999/xlink'
                            style={{ display: 'block' }}
                        >
                            <path
                                fill='#EA4335'
                                d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z'
                            ></path>
                            <path
                                fill='#4285F4'
                                d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'
                            ></path>
                            <path
                                fill='#FBBC05'
                                d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'
                            ></path>
                            <path
                                fill='#34A853'
                                d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'
                            ></path>
                            <path fill='none' d='M0 0h48v48H0z'></path>
                        </svg>
                        Fortsett med Google
                    </Button>

                    <p className='text-center text-sm text-muted-foreground'>
                        Har du ikke en konto?{' '}
                        <a
                            href='/registrering'
                            className='text-foreground font-medium hover:underline'
                        >
                            Registrer deg
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginPage;
