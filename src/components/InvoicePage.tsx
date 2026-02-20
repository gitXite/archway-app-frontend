import '../styles/global.css';

export function InvoicePage() {
    return (
        <div className='flex flex-col h-full'>
            <div className='px-8 py-8'>
                <h1 className='font-serif text-3xl text-foreground font-medium'>
                    Fakturering
                </h1>
                <p className='text-sm text-muted-foreground mt-1'>
                    Fakturering gir deg full kontroll over abonnement, betalinger og kostnader – samlet på ett sted.
                </p>
            </div>
        </div>
    );
}