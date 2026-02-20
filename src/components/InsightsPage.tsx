import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import { Image, Clock, TrendingUp, Zap } from 'lucide-react';

const monthlyRenders = [
    { month: 'Sep', renders: 42 },
    { month: 'Oct', renders: 68 },
    { month: 'Nov', renders: 95 },
    { month: 'Dec', renders: 78 },
    { month: 'Jan', renders: 124 },
    { month: 'Feb', renders: 156 },
];

const timeSavedData = [
    { month: 'Sep', blender: 126, archway: 21 },
    { month: 'Oct', blender: 204, archway: 34 },
    { month: 'Nov', blender: 285, archway: 47.5 },
    { month: 'Dec', blender: 234, archway: 39 },
    { month: 'Jan', blender: 372, archway: 62 },
    { month: 'Feb', blender: 468, archway: 78 },
];

const projectBreakdown = [
    { name: 'Residential', value: 45 },
    { name: 'Commercial', value: 28 },
    { name: 'Interior', value: 18 },
    { name: 'Landscape', value: 9 },
];

const PIE_COLORS = [
    'oklch(0.2376 0 0)',
    'oklch(0.5547 0 0)',
    'oklch(0.9234 0 0)',
    'oklch(0.5982 0 0)',
];

const renderChartConfig: ChartConfig = {
    renders: { label: 'Renders', color: 'oklch(0.2376 0 0)' },
};

const timeChartConfig: ChartConfig = {
    blender: { label: 'Blender (hrs)', color: 'oklch(0.5547 0 0)' },
    archway: { label: 'Archway (hrs)', color: 'oklch(0.6796 0.1935 30.31)' },
};

const stats = [
    {
        label: 'Totale renderinger',
        value: '563',
        change: '+26%',
        icon: Image,
    },
    {
        label: 'Hours Saved',
        value: '1,408',
        change: 'vs Blender avg',
        icon: Clock,
    },
    {
        label: 'Avg. Render Time',
        value: '28s',
        change: '-12% this month',
        icon: Zap,
    },
    {
        label: 'Cost Efficiency',
        value: '6.2×',
        change: 'vs traditional',
        icon: TrendingUp,
    },
];

export function InsightsPage() {
    return (
        <div className='flex flex-col h-full'>
            <div className='px-8 py-8'>
                <h1 className='font-serif text-3xl text-foreground font-medium'>
                    Innsikt
                </h1>
                <p className='text-sm text-muted-foreground mt-1'>
                    Få oversikt over bruk, ytelse og spart tid på tvers av arbeidsområdet ditt.
                </p>
            </div>

            <div className='flex-1 px-8 pb-8 overflow-auto'>
                <div className='max-w-6xl mx-auto space-y-6'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Card className='border-border/60'>
                                    <CardContent className='p-5'>
                                        <div className='flex items-start justify-between'>
                                            <div>
                                                <p className='text-xs text-muted-foreground font-medium uppercase tracking-wide'>
                                                    {stat.label}
                                                </p>
                                                <p className='text-2xl font-semibold text-foreground mt-1'>
                                                    {stat.value}
                                                </p>
                                                <p className='text-xs text-muted-foreground mt-1'>
                                                    {stat.change}
                                                </p>
                                            </div>
                                            <div className='h-9 w-9 rounded-xl bg-secondary flex items-center justify-center'>
                                                <stat.icon className='h-4 w-4 text-muted-foreground' />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Charts row */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        {/* Monthly renders */}
                        <Card className='border-border/60'>
                            <CardHeader className='pb-2'>
                                <CardTitle className='text-sm font-medium text-foreground'>
                                    Monthly Renders
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={renderChartConfig}
                                    className='h-[240px] w-full'
                                >
                                    <BarChart data={monthlyRenders}>
                                        <CartesianGrid
                                            vertical={false}
                                            strokeDasharray='3 3'
                                        />
                                        <XAxis
                                            dataKey='month'
                                            tickLine={false}
                                            axisLine={false}
                                            fontSize={12}
                                        />
                                        <YAxis
                                            tickLine={false}
                                            axisLine={false}
                                            fontSize={12}
                                        />
                                        <ChartTooltip
                                            content={<ChartTooltipContent />}
                                        />
                                        <Bar
                                            dataKey='renders'
                                            fill='oklch(0.2376 0 0)'
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        {/* Time saved comparison */}
                        <Card className='border-border/60'>
                            <CardHeader className='pb-2'>
                                <CardTitle className='text-sm font-medium text-foreground'>
                                    Time Comparison — Blender vs Archway
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={timeChartConfig}
                                    className='h-[240px] w-full'
                                >
                                    <LineChart data={timeSavedData}>
                                        <CartesianGrid
                                            vertical={false}
                                            strokeDasharray='3 3'
                                        />
                                        <XAxis
                                            dataKey='month'
                                            tickLine={false}
                                            axisLine={false}
                                            fontSize={12}
                                        />
                                        <YAxis
                                            tickLine={false}
                                            axisLine={false}
                                            fontSize={12}
                                        />
                                        <ChartTooltip
                                            content={<ChartTooltipContent />}
                                        />
                                        <Line
                                            type='monotone'
                                            dataKey='blender'
                                            stroke='oklch(0.5547 0 0)'
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                        <Line
                                            type='monotone'
                                            dataKey='archway'
                                            stroke='oklch(0.6796 0.1935 30.31)'
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Bottom row */}
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                        {/* Project type breakdown */}
                        <Card className='border-border/60'>
                            <CardHeader className='pb-2'>
                                <CardTitle className='text-sm font-medium text-foreground'>
                                    Renders by Category
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='flex items-center justify-center'>
                                <ChartContainer
                                    config={renderChartConfig}
                                    className='h-[200px] w-full'
                                >
                                    <PieChart>
                                        <Pie
                                            data={projectBreakdown}
                                            cx='50%'
                                            cy='50%'
                                            innerRadius={50}
                                            outerRadius={80}
                                            paddingAngle={3}
                                            dataKey='value'
                                        >
                                            {projectBreakdown.map(
                                                (_, index) => (
                                                    <Cell
                                                        key={index}
                                                        fill={
                                                            PIE_COLORS[
                                                                index %
                                                                    PIE_COLORS.length
                                                            ]
                                                        }
                                                    />
                                                ),
                                            )}
                                        </Pie>
                                        <ChartTooltip
                                            content={<ChartTooltipContent />}
                                        />
                                    </PieChart>
                                </ChartContainer>
                            </CardContent>
                            <div className='px-6 pb-4 grid grid-cols-2 gap-2'>
                                {projectBreakdown.map((item, i) => (
                                    <div
                                        key={item.name}
                                        className='flex items-center gap-2'
                                    >
                                        <div
                                            className='h-2.5 w-2.5 rounded-sm shrink-0'
                                            style={{
                                                backgroundColor: PIE_COLORS[i],
                                            }}
                                        />
                                        <span className='text-xs text-muted-foreground'>
                                            {item.name}
                                        </span>
                                        <span className='text-xs font-medium text-foreground ml-auto'>
                                            {item.value}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Recent activity */}
                        <Card className='border-border/60 lg:col-span-2'>
                            <CardHeader className='pb-2'>
                                <CardTitle className='text-sm font-medium text-foreground'>
                                    Recent Activity
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='space-y-3'>
                                    {[
                                        {
                                            action: 'Render completed',
                                            project: 'Fjordheim Residence',
                                            time: '12 min ago',
                                            duration: '24s',
                                        },
                                        {
                                            action: 'Render completed',
                                            project: 'Solstrand Office',
                                            time: '1 hr ago',
                                            duration: '31s',
                                        },
                                        {
                                            action: 'LoRA retrained',
                                            project: '—',
                                            time: '3 hrs ago',
                                            duration: '8 min',
                                        },
                                        {
                                            action: 'Render completed',
                                            project: 'Bryggen Cultural Center',
                                            time: '5 hrs ago',
                                            duration: '27s',
                                        },
                                        {
                                            action: 'New project created',
                                            project: 'Vesterålen Cabin',
                                            time: 'Yesterday',
                                            duration: '—',
                                        },
                                        {
                                            action: 'Render completed',
                                            project: 'Vesterålen Cabin',
                                            time: 'Yesterday',
                                            duration: '22s',
                                        },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className='flex items-center justify-between py-2 border-b border-border/40 last:border-0'
                                        >
                                            <div>
                                                <p className='text-sm text-foreground'>
                                                    {item.action}
                                                </p>
                                                <p className='text-xs text-muted-foreground'>
                                                    {item.project}
                                                </p>
                                            </div>
                                            <div className='text-right'>
                                                <p className='text-xs text-muted-foreground'>
                                                    {item.time}
                                                </p>
                                                <p className='text-xs font-medium text-foreground'>
                                                    {item.duration}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
