import type { LoRAModel } from '@/types/LoRAModel';

export const statusColor: Record<LoRAModel['status'], string> = {
    utkast: 'bg-muted text-muted-foreground border-border',
    trener: 'bg-amber-100 text-amber-800 border-amber-500',
    trent: 'bg-emerald-100 text-emerald-800 border-emerald-500',
};
