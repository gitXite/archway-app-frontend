import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CreditCard, Download, Check, ArrowUpRight } from 'lucide-react';

const plans = [
    {
        name: 'Individuell',
        price: 'NOK 499',
        period: '/mnd',
        description: 'For individuelle arkitekter.',
        features: [
            '50 renderinger / mnd',
            '1 LoRA modell',
            '5 prosjekter',
            '720p output',
            'Email support',
        ],
        current: false,
    },
    {
        name: 'Profesjonell',
        price: 'NOK 1499',
        period: '/mnd',
        description: 'For bedrifter og kontorer.',
        features: [
            'Ubegrensede renderinger',
            '5 LoRA modeller',
            'Ubegrensede prosjekter',
            '4K output',
            'Email support',
            'Admin tilgang',
        ],
        current: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        description: 'For større bedrifter med spesialtilpassede behov.',
        features: [
            'Ubegrensede Renderinger',
            'Ubegrensede LoRA modeller',
            'Ubegrensede prosjekter',
            '4K output',
            'Dedikert støtte',
            'Custom integrasjoner',
        ],
        current: false,
    },
];

const invoices = [
    {
        id: 'INV-2025-006',
        date: 'Feb 1, 2025',
        amount: 'NOK 1499.00',
        status: 'Betalt',
    },
    {
        id: 'INV-2025-005',
        date: 'Jan 1, 2025',
        amount: 'NÒK 1499.00',
        status: 'Betalt',
    },
    {
        id: 'INV-2025-004',
        date: 'Des 1, 2024',
        amount: 'NOK 1499.00',
        status: 'Betalt',
    },
    {
        id: 'INV-2025-003',
        date: 'Nov 1, 2024',
        amount: 'NOK 499.00',
        status: 'Betalt',
    },
    {
        id: 'INV-2025-002',
        date: 'Okt 1, 2024',
        amount: 'NOK 499.00',
        status: 'Betalt',
    },
];

export function BillingPage() {
    const usedRenders = 312;
    const totalRenders = 500;
    const usagePercent = (usedRenders / totalRenders) * 100;

    return (
        <div className='flex flex-col h-full'>
            <div className='px-8 py-8'>
                <h1 className='text-2xl md:text-3xl font-serif font-semibold text-foreground tracking-tight'>
                    Fakturering
                </h1>
                <p className='text-sm text-muted-foreground mt-1'>
                    Administrer abonnementet, bruken og fakturaene dine.
                </p>
            </div>

            <div className='px-8 pb-8 overflow-auto'>
                <div className='max-w-5xl mx-auto space-y-8'>
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card className='border-border/60'>
                            <CardHeader className='pb-3'>
                                <CardTitle className='text-sm font-medium text-foreground'>
                                    Nåværende Bruk
                                </CardTitle>
                                <CardDescription>
                                    Februar 2025 Faktureringssyklus
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <div>
                                    <div className='flex justify-between text-sm mb-2'>
                                        <span className='text-muted-foreground'>
                                            Renderinger
                                        </span>
                                        <span className='text-foreground font-medium'>
                                            {usedRenders} / {totalRenders}
                                        </span>
                                    </div>
                                    <Progress
                                        value={usagePercent}
                                        className='h-2'
                                    />
                                </div>
                                <div className='grid grid-cols-3 gap-4 pt-2'>
                                    <div>
                                        <p className='text-xs text-muted-foreground'>
                                            LoRA Modeller
                                        </p>
                                        <p className='text-lg font-semibold text-foreground'>
                                            2 / 5
                                        </p>
                                    </div>
                                    <div>
                                        <p className='text-xs text-muted-foreground'>
                                            Lagring
                                        </p>
                                        <p className='text-lg font-semibold text-foreground'>
                                            3.2 GB
                                        </p>
                                    </div>
                                    <div>
                                        <p className='text-xs text-muted-foreground'>
                                            Neste Faktura
                                        </p>
                                        <p className='text-lg font-semibold text-foreground'>
                                            Mar 1
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <div>
                        <h2 className='font-serif text-xl text-foreground mb-4 font-medium'>
                            Betalingsplaner
                        </h2>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            {plans.map((plan, i) => (
                                <motion.div
                                    key={plan.name}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Card
                                        className={`border-border/60 h-full flex flex-col ${
                                            plan.current
                                                ? 'ring-1 ring-foreground'
                                                : ''
                                        }`}
                                    >
                                        <CardHeader className='pb-3'>
                                            <div className='flex items-center justify-between'>
                                                <CardTitle className='text-base font-medium'>
                                                    {plan.name}
                                                </CardTitle>
                                                {plan.current && (
                                                    <Badge
                                                        variant='secondary'
                                                        className='text-xs'
                                                    >
                                                        Nåværende
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className='flex items-baseline gap-0.5 mt-1'>
                                                <span className='text-2xl font-semibold text-foreground'>
                                                    {plan.price}
                                                </span>
                                                <span className='text-sm text-muted-foreground'>
                                                    {plan.period}
                                                </span>
                                            </div>
                                            <CardDescription className='mt-1'>
                                                {plan.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className='flex-1 flex flex-col'>
                                            <ul className='space-y-2 flex-1'>
                                                {plan.features.map((f) => (
                                                    <li
                                                        key={f}
                                                        className='flex items-center gap-2 text-sm text-muted-foreground'
                                                    >
                                                        <Check className='h-3.5 w-3.5 text-foreground shrink-0' />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className='mt-5'>
                                                {plan.current ? (
                                                    <Button
                                                        variant='outline'
                                                        className='w-full'
                                                        disabled
                                                    >
                                                        Nåværende Plan
                                                    </Button>
                                                ) : plan.price === 'Custom' ? (
                                                    <Button
                                                        variant='outline'
                                                        className='w-full gap-1.5 cursor-pointer'
                                                    >
                                                        Kontakt Oss{' '}
                                                        <ArrowUpRight className='h-3.5 w-3.5' />
                                                    </Button>
                                                ) : (
                                                    <Button className='w-full cursor-pointer'>
                                                        Velg
                                                    </Button>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <Card className='border-border/60'>
                        <CardHeader className='pb-3'>
                            <CardTitle className='text-sm font-medium text-foreground'>
                                Betalingsmetode
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-3'>
                                    <div className='h-10 w-14 rounded-lg bg-secondary flex items-center justify-center'>
                                        <CreditCard className='h-5 w-5 text-muted-foreground' />
                                    </div>
                                    <div>
                                        <p className='text-sm font-medium text-foreground'>
                                            •••• •••• •••• 4242
                                        </p>
                                        <p className='text-xs text-muted-foreground'>
                                            Utgår 08/2027
                                        </p>
                                    </div>
                                </div>
                                <Button variant='outline' size='sm'>
                                    Oppdater
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border-border/60'>
                        <CardHeader className='pb-3'>
                            <CardTitle className='text-sm font-medium text-foreground'>
                                Fakturahistorikk
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-0'>
                                {invoices.map((inv) => (
                                    <div
                                        key={inv.id}
                                        className='flex items-center justify-between py-3 border-b border-border/40 last:border-0'
                                    >
                                        <div className='flex items-center gap-4'>
                                            <p className='text-sm font-medium text-foreground w-32'>
                                                {inv.id}
                                            </p>
                                            <p className='text-sm text-muted-foreground'>
                                                {inv.date}
                                            </p>
                                        </div>
                                        <div className='flex items-center gap-2 md:gap-4'>
                                            <p className='text-sm font-medium text-foreground'>
                                                {inv.amount}
                                            </p>
                                            <Badge
                                                variant='secondary'
                                                className='text-xs'
                                            >
                                                {inv.status}
                                            </Badge>
                                            <Button
                                                variant='ghost'
                                                size='icon'
                                                className='h-8 w-8'
                                            >
                                                <Download className='h-3.5 w-3.5' />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
