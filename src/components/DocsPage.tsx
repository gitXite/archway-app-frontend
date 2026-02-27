import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    BookOpen,
    Lightbulb,
    HelpCircle,
    ChevronRight,
    ExternalLink,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const guides = [
    {
        category: 'Kom I Gang',
        items: [
            {
                title: 'Lag Ditt Første Prosjekt',
                description:
                    'Sett opp ett nytt prosjekt og konfigurer innstillinger.',
                time: '3 min lesetid',
                tag: 'Begynner',
            },
            {
                title: 'Opplasting Av Treningsdata',
                description:
                    'Forbered og last opp bilder av tidligere prosjekter for LoRA trening.',
                time: '5 min lesetid',
                tag: 'Begynner',
            },
        ],
    },
    {
        category: 'Rendering',
        items: [
            {
                title: 'Render Innstillinger Forklart',
                description:
                    'Oppløsning, sampling, presets, og hvordan de påvirker output.',
                time: '6 min lesetid',
                tag: 'Middels',
            },
            {
                title: 'Tips & Triks',
                description:
                    'Samling av tips og triks for å produsere best mulig resultat.',
                time: '3 min lesetid',
                tag: 'Begynner',
            },
            {
                title: 'Post-Prosessering & Eksportering',
                description:
                    'Tilføy justeringer og eksporter i forskjellige formater.',
                time: '3 min lesetid',
                tag: 'Avansert',
            },
        ],
    },
    {
        category: 'Trening & Modeller',
        items: [
            {
                title: 'Tren LoRA Modeller',
                description:
                    'Steg-for-steg veiledning for finjustering av renderinger',
                time: '8 min lesetid',
                tag: 'Middels',
            },
            {
                title: 'Beste Praksis for Treningsdata',
                description:
                    'Bildekvalitet, kvantitet, og retningslinjer for konsistens.',
                time: '5 min lesetid',
                tag: 'Middels',
            },
            {
                title: 'Administrering av LoRA Modeller',
                description: 'Versjoner, oppdateringer, og nye modeller',
                time: '4 min lesetid',
                tag: 'Avansert',
            },
        ],
    },
    {
        category: 'Team & Kollaborasjon',
        items: [
            {
                title: 'Inviter Nye Medlemmer',
                description: 'Legg til brukere og administrer rettigheter',
                time: '2 min lesetid',
                tag: 'Begynner',
            },
            {
                title: 'Roller & Rettigheter',
                description: 'Hva admin, moderator, og brukere får tilgang til',
                time: '3 min lesetid',
                tag: 'Begynner',
            },
        ],
    },
];

const faqs = [
    {
        category: 'Konto & Fakturering',
        questions: [
            {
                q: 'Hvordan endrer jeg betalingsplanen?',
                a: 'Naviger til Fakturering siden fra sidefeltet, og velg planen du vil bytte til. Endringene skjer umiddelbart og prisen endres fra neste fakturering.',
            },
            {
                q: 'Hvordan oppdaterer jeg betalingsmetode?',
                a: "Naviger til Fakturering → Betalingsmetode og klikk 'Oppdater'. Her kan du endre kort eller betalingsmetode.",
            },
        ],
    },
    {
        category: 'Rendering',
        questions: [
            {
                q: 'Hvilke oppløsningsinnstillinger er tilgjengelige?',
                a: 'Vi støtter renderinger fra 512x512 og opp til 2560x1440, avhengig av plan. Som standard er oppløsning avhengig av størrelse på input bilde.',
            },
            {
                q: 'Hvor lang tid tar det å generere en render?',
                a: 'De fleste renderingene fullføres innen 10-15 sekunder avhengig av oppløsning og kompleksitet. Lengre tid kan forventes ved oppstart av servere.',
            },
            {
                q: 'Hvorfor får jeg ikke ønsket resultat?',
                a: 'Det kan være flere grunner til at resultatet ikke blir helt som ønsket, men som regel trenger man et par forsøk. Modellens inferens er optimisert og finjustert for overføring av materialer, fargepalett, stil, og stemning fra en referanse, samtidig som geometrien fra input er bevart. Les mer om hvordan å få best resultat i guiden ',
                link: <a href='/dashboard/dokumentasjon' className='underline'>Tips & Triks.</a>,
            },
        ],
    },
    {
        category: 'Trening',
        questions: [
            {
                q: 'Hvor mange bilder trengs det for LoRA trening?',
                a: 'Vi anbefaler et sted mellom 15-30 høykvalitets bilder for best resultat. Færre enn 10 bilder kan gi inkonsekvente resultater, mens mer enn 50 bilder sjelden gir merkbar kvalitetsforbedring.',
            },
            {
                q: 'Hvor lang tid tar modell-treningen?',
                a: "Kjøretiden vil være avhengig av flere faktorer som for eksempel hardware spesifikasjoner, parametre og dataset, men forventet tid er rundt 1 time. I mellomtiden kan renderinger genereres uten en LoRA og du vil få en notifikasjon når treningen er fullført.",
            },
            {
                q: 'Kan jeg bruke en LoRA modell på tvers av prosjekt?',
                a: "Ja. Så straks en LoRA modell er trent, er den tilgjengelig for bruk i alle prosjekter på tvers av arbeidsområdet. Alle brukere kan benytte seg av en LoRA, men kun Admin og Moderator roller kan igangsette trening.",
            },
        ],
    },
    {
        category: 'Team & Sikkerhet',
        questions: [
            {
                q: "Kan jeg fjerne tilgang til et teammedlem?",
                a: "Ja. Naviger til Team, klikk på de tre prikkene til vedkommende og trykk på 'Fjern'. Deres tilgang til programvaren vil umiddelbart bli fjernet. Her kan også roller og tilgang administreres.",
            },
            {
                q: 'Er treningsdataene mine private?',
                a: 'Absolutt. All opplastet data er kryptert og vil aldri bli delt med andre, eller bli brukt til å trene våre andre modeller. Modellen du trener er helt unik for deg og ditt kontor.',
            },
        ],
    },
];

const tagColor: Record<string, string> = {
    Begynner: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
    Middels: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
    Avansert: 'bg-accent/10 text-accent border-accent/20',
};

export default function DocsPage() {
    const [search, setSearch] = useState('');
    const lowerSearch = search.toLowerCase();

    const filteredGuides = guides
        .map((section) => ({
            ...section,
            items: section.items.filter(
                (i) =>
                    i.title.toLowerCase().includes(lowerSearch) ||
                    i.description.toLowerCase().includes(lowerSearch),
            ),
        }))
        .filter((s) => s.items.length > 0);

    const filteredFaqs = faqs
        .map((section) => ({
            ...section,
            questions: section.questions.filter(
                (q) =>
                    q.q.toLowerCase().includes(lowerSearch) ||
                    q.a.toLowerCase().includes(lowerSearch),
            ),
        }))
        .filter((s) => s.questions.length > 0);

    return (
        <div className='p-6 md:p-10 max-w-5xl mx-auto space-y-10'>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className='space-y-2'
            >
                <h1 className='text-2xl md:text-3xl font-serif font-semibold tracking-tight text-foreground'>
                    Dokumentasjon
                </h1>
                <p className='text-muted-foreground text-sm'>
                    Guider, veiledning, og svar på ofte stilte spørsmål.
                </p>
            </motion.div>

            {/* Search */}
            <div className='relative max-w-md'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                    placeholder='Søk etter guider og ofte stilte spørsmål…'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='pl-10'
                />
            </div>

            {/* Guides */}
            <section className='space-y-6'>
                <div className='flex items-center gap-2'>
                    <BookOpen className='h-5 w-5 text-accent' />
                    <h2 className='text-xl font-serif font-semibold text-foreground'>
                        Guider & Veiledning
                    </h2>
                </div>

                <AnimatePresence mode='popLayout'>
                    {filteredGuides.map((section) => (
                        <motion.div
                            key={section.category}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='space-y-3'
                        >
                            <h3 className='text-sm font-medium text-muted-foreground uppercase tracking-widest'>
                                {section.category}
                            </h3>
                            <div className='grid gap-3 sm:grid-cols-2'>
                                {section.items.map((item) => (
                                    <Card
                                        key={item.title}
                                        className='group cursor-pointer hover:border-accent/30 transition-colors'
                                    >
                                        <CardHeader className='p-4 pb-2 flex-row items-start justify-between gap-2'>
                                            <div className='space-y-1 flex-1 min-w-0'>
                                                <CardTitle className='text-sm font-medium leading-snug flex items-center gap-1.5'>
                                                    {item.title}
                                                    <ChevronRight className='h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity' />
                                                </CardTitle>
                                                <CardDescription className='text-xs'>
                                                    {item.description}
                                                </CardDescription>
                                            </div>
                                            <Badge
                                                variant='outline'
                                                className={`text-[10px] shrink-0 ${tagColor[item.tag] ?? ''}`}
                                            >
                                                {item.tag}
                                            </Badge>
                                        </CardHeader>
                                        <CardContent className='px-4 pb-3 pt-0'>
                                            <span className='text-[11px] text-muted-foreground'>
                                                {item.time}
                                            </span>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredGuides.length === 0 && (
                    <p className='text-sm text-muted-foreground py-6 text-center'>
                        Ingen matchende guider for ditt søk.
                    </p>
                )}
            </section>

            {/* FAQ */}
            <section className='space-y-6'>
                <div className='flex items-center gap-2'>
                    <HelpCircle className='h-5 w-5 text-accent' />
                    <h2 className='text-xl font-serif font-semibold text-foreground'>
                        Ofte Stilte Spørsmål
                    </h2>
                </div>

                <AnimatePresence mode='popLayout'>
                    {filteredFaqs.map((section) => (
                        <motion.div
                            key={section.category}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='space-y-2'
                        >
                            <h3 className='text-sm font-medium text-muted-foreground uppercase tracking-widest'>
                                {section.category}
                            </h3>
                            <Accordion type='multiple' className='space-y-1'>
                                {section.questions.map((faq, i) => (
                                    <AccordionItem
                                        key={i}
                                        value={`${section.category}-${i}`}
                                        className='border rounded-lg px-4'
                                    >
                                        <AccordionTrigger className='text-sm font-medium text-foreground hover:no-underline'>
                                            {faq.q}
                                        </AccordionTrigger>
                                        <AccordionContent className='text-sm text-muted-foreground leading-relaxed'>
                                            {faq.a}
                                            {faq.link}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredFaqs.length === 0 && (
                    <p className='text-sm text-muted-foreground py-6 text-center'>
                        Ingen matchende spørsmål for ditt søk.
                    </p>
                )}
            </section>
        </div>
    );
}
