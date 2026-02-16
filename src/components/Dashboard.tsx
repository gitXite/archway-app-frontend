import { useEffect, useState } from 'react';
import { OnboardingModal } from '@/components/modals/Onboarding';


export default function DashboardWithOnboarding() {
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        const onBoarded = localStorage.getItem('archway_onboarded');
        if (!onBoarded) setShowOnboarding(true);
    }, []);

    const handleOnboardingComplete = () => {
        localStorage.setItem('archway_onboarded', 'true');
        setShowOnboarding(false);
    };

    if (!showOnboarding) return null;

    return (
        <OnboardingModal
            open={showOnboarding}
            onComplete={handleOnboardingComplete}
        />
    );
}
