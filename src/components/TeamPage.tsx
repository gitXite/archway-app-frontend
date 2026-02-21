import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Mail,
    MoreHorizontal,
    Shield,
    User,
    UserCog,
    Trash2,
    Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type Role = 'admin' | 'redaktør' | 'bruker';

interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: Role;
    status: 'aktiv' | 'pågående';
    joinedAt: string;
}

const initialMembers: TeamMember[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@studio.com',
        role: 'admin',
        status: 'aktiv',
        joinedAt: '2025-09-01',
    },
    {
        id: '2',
        name: 'Sarah Chen',
        email: 'sarah@studio.com',
        role: 'redaktør',
        status: 'aktiv',
        joinedAt: '2025-10-15',
    },
    {
        id: '3',
        name: 'Alex Rivera',
        email: 'alex@studio.com',
        role: 'redaktør',
        status: 'aktiv',
        joinedAt: '2025-11-20',
    },
    {
        id: '4',
        name: '',
        email: 'maya@external.com',
        role: 'bruker',
        status: 'pågående',
        joinedAt: '2026-02-10',
    },
];

const roleConfig: Record<
    Role,
    { label: string; icon: React.ElementType; color: string }
> = {
    admin: {
        label: 'Admin',
        icon: Shield,
        color: 'bg-accent/10 text-accent border-accent/20',
    },
    editor: {
        label: 'Redaktør',
        icon: UserCog,
        color: 'bg-primary/10 text-primary border-primary/20',
    },
    viewer: {
        label: 'Bruker',
        icon: User,
        color: 'bg-muted text-muted-foreground border-border',
    },
};

export function TeamPage() {
    const [members, setMembers] = useState<TeamMember[]>(initialMembers);
    const [inviteOpen, setInviteOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState<Role>('bruker');

    const handleInvite = () => {
        if (!inviteEmail.trim()) return;
        
        const newMember: TeamMember = {
            id: Date.now().toString(),
            name: '',
            email: inviteEmail.trim(),
            role: inviteRole,
            status: 'pågående',
            joinedAt: new Date().toISOString().split('T')[0],
        };
        setMembers((prev) => [...prev, newMember]);
        setInviteEmail('');
        setInviteRole('bruker');
        setInviteOpen(false);
    };

    const handleRemove = (id: string) => {
        setMembers((prev) => prev.filter((m) => m.id !== id));
    };

    const handleRoleChange = (id: string, role: Role) => {
        setMembers((prev) =>
            prev.map((m) => (m.id === id ? { ...m, role } : m)),
        );
    };

    const activeCount = members.filter((m) => m.status === 'aktiv').length;
    const pendingCount = members.filter((m) => m.status === 'pågående').length;

    const getInitials = (name: string, email: string) => {
        if (name)
            return name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase();
        return email[0].toUpperCase();
    };

    return (
        <div className='p-6 md:p-10 max-w-5xl mx-auto space-y-8'>
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className='flex flex-col sm:flex-row sm:items-end justify-between gap-4'
            >
                <div>
                    <h1 className='text-2xl md:text-3xl font-serif font-semibold text-foreground tracking-tight'>
                        Team
                    </h1>
                    <p className='text-muted-foreground mt-1 text-sm'>
                        Administrer tilgang og brukere i arbeidsområdet.
                    </p>
                </div>
                <Button
                    onClick={() => setInviteOpen(true)}
                    className='gap-2 shrink-0 cursor-pointer'
                >
                    <Plus className='h-4 w-4' />
                    Inviter Bruker
                </Button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className='grid grid-cols-1 sm:grid-cols-3 gap-4'
            >
                <Card className='border-border/60'>
                    <CardContent className='p-5'>
                        <p className='text-xs uppercase tracking-widest text-muted-foreground font-medium'>
                            Antall Brukere
                        </p>
                        <p className='text-2xl font-serif font-semibold text-foreground mt-1'>
                            {members.length}
                        </p>
                    </CardContent>
                </Card>
                <Card className='border-border/60'>
                    <CardContent className='p-5'>
                        <p className='text-xs uppercase tracking-widest text-muted-foreground font-medium'>
                            Aktive Brukere
                        </p>
                        <p className='text-2xl font-serif font-semibold text-foreground mt-1'>
                            {activeCount}
                        </p>
                    </CardContent>
                </Card>
                <Card className='border-border/60'>
                    <CardContent className='p-5'>
                        <p className='text-xs uppercase tracking-widest text-muted-foreground font-medium'>
                            Pågående Invitasjoner
                        </p>
                        <p className='text-2xl font-serif font-semibold text-accent mt-1'>
                            {pendingCount}
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
                <Card className='border-border/60 overflow-hidden'>
                    <Table>
                        <TableHeader>
                            <TableRow className='hover:bg-transparent'>
                                <TableHead className='w-[280px]'>
                                    Bruker
                                </TableHead>
                                <TableHead>Rolle</TableHead>
                                <TableHead className='hidden md:table-cell'>
                                    Status
                                </TableHead>
                                <TableHead className='hidden md:table-cell'>
                                    Dato
                                </TableHead>
                                <TableHead className='w-[50px]' />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence>
                                {members.map((member) => {
                                    const rc = roleConfig[member.role];
                                    return (
                                        <motion.tr
                                            key={member.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className='border-b transition-colors hover:bg-muted/30'
                                        >
                                            <TableCell>
                                                <div className='flex items-center gap-3'>
                                                    <Avatar className='h-8 w-8'>
                                                        <AvatarFallback className='text-xs bg-secondary text-secondary-foreground'>
                                                            {getInitials(
                                                                member.name,
                                                                member.email,
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className='min-w-0'>
                                                        <p className='text-sm font-medium text-foreground truncate'>
                                                            {member.name ||
                                                                'Invitert Bruker'}
                                                        </p>
                                                        <p className='text-xs text-muted-foreground truncate'>
                                                            {member.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant='outline'
                                                    className={`gap-1 text-xs font-normal ${rc.color}`}
                                                >
                                                    <rc.icon className='h-3 w-3' />
                                                    {rc.label}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className='hidden md:table-cell'>
                                                {member.status === 'pågående' ? (
                                                    <span className='flex items-center gap-1.5 text-xs text-accent'>
                                                        <Clock className='h-3 w-3' />{' '}
                                                        Pågående
                                                    </span>
                                                ) : (
                                                    <span className='text-xs text-muted-foreground'>
                                                        Aktiv
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className='hidden md:table-cell text-xs text-muted-foreground'>
                                                {new Date(
                                                    member.joinedAt,
                                                ).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {member.id !== '1' && (
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant='ghost'
                                                                size='icon'
                                                                className='h-8 w-8'
                                                            >
                                                                <MoreHorizontal className='h-4 w-4' />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent
                                                            align='end'
                                                            className='w-44'
                                                        >
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    handleRoleChange(
                                                                        member.id,
                                                                        'admin',
                                                                    )
                                                                }
                                                            >
                                                                <Shield className='h-3.5 w-3.5 mr-2' />{' '}
                                                                Tildel Admin
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    handleRoleChange(
                                                                        member.id,
                                                                        'redaktør',
                                                                    )
                                                                }
                                                            >
                                                                <UserCog className='h-3.5 w-3.5 mr-2' />{' '}
                                                                Tildel Redaktør
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    handleRoleChange(
                                                                        member.id,
                                                                        'bruker',
                                                                    )
                                                                }
                                                            >
                                                                <User className='h-3.5 w-3.5 mr-2' />{' '}
                                                                Tildel Bruker
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    handleRemove(
                                                                        member.id,
                                                                    )
                                                                }
                                                                className='text-destructive focus:text-destructive'
                                                            >
                                                                <Trash2 className='h-3.5 w-3.5 mr-2' />{' '}
                                                                Fjern
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                )}
                                            </TableCell>
                                        </motion.tr>
                                    );
                                })}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </Card>
            </motion.div>

            <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
                <DialogContent className='sm:max-w-md'>
                    <DialogHeader>
                        <DialogTitle className='font-serif'>
                            Inviter Teammedlem
                        </DialogTitle>
                        <DialogDescription>
                            Send en invitasjon til å bli med arbeidsområdet. 
                            De vil motta en email med login instruksjoner. 
                        </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-4 py-2'>
                        <div className='space-y-2'>
                            <label className='text-sm font-medium text-foreground'>
                                Email adresse
                            </label>
                            <div className='relative'>
                                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                <Input
                                    type='email'
                                    placeholder='kollega@bedrift.com'
                                    value={inviteEmail}
                                    onChange={(e) =>
                                        setInviteEmail(e.target.value)
                                    }
                                    className='pl-9'
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' && handleInvite()
                                    }
                                />
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <label className='text-sm font-medium text-foreground'>
                                Rolle
                            </label>
                            <Select
                                value={inviteRole}
                                onValueChange={(v) => setInviteRole(v as Role)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='admin'>
                                        Admin - Full tilgang
                                    </SelectItem>
                                    <SelectItem value='redaktør'>
                                        Redaktør - Kan invitere & administrere brukere
                                    </SelectItem>
                                    <SelectItem value='bruker'>
                                        Bruker - Basis-tilgang
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant='outline'
                            onClick={() => setInviteOpen(false)}
                        >
                            Avbryt
                        </Button>
                        <Button
                            onClick={handleInvite}
                            disabled={!inviteEmail.trim()}
                        >
                            Send Invitasjon
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
