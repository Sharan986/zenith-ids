'use client';

import { useState } from 'react';
import {
  Crown, Check, X, Zap, Star,
  Rocket, Sparkles
} from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { useToast } from '@/components/ToastContext';
import { PRO_PLAN_PRICE_DISPLAY } from '@/lib/plans';

const freeTier = {
  name: 'Basic',
  price: 'Free',
  description: 'Get started with career readiness.',
  features: [
    { label: 'Access to roadmaps', included: true },
    { label: 'Platform tasks', included: true },
    { label: 'Basic portfolio', included: true },
    { label: 'Leaderboard access', included: true },
    { label: 'Industry simulator (basic)', included: true },
    { label: 'Premium challenges', included: false },
    { label: 'Priority review', included: false },
    { label: 'Verified badge', included: false },
    { label: 'Direct recruiter access', included: false },
  ],
};

const proTier = {
  name: 'Pro',
  price: PRO_PLAN_PRICE_DISPLAY,
  period: '/month',
  description: 'Unlock full career potential.',
  features: [
    { label: 'Everything in Basic', included: true },
    { label: 'All premium challenges', included: true },
    { label: 'Enhanced portfolio', included: true },
    { label: 'Priority review queue', included: true },
    { label: 'Verified PRO badge', included: true },
    { label: 'Advanced simulator', included: true },
    { label: 'Direct recruiter access', included: true },
    { label: 'Career insights', included: true },
    { label: 'Early access to features', included: true },
  ],
};

export default function ProPage() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/phonepe/initiate', { method: 'POST' });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to initiate payment. Please try again.');
        return;
      }

      // Redirect the user to PhonePe checkout
      window.location.href = data.redirectUrl;
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge variant="purple" className="mb-4">
          <Sparkles size={12} className="mr-1" /> PRICING
        </Badge>
        <h1 className="heading-brutal text-4xl sm:text-5xl lg:text-6xl mb-4">
          LEVEL UP YOUR
          <br />
          <span className="text-purple">CAREER GAME</span>
        </h1>
        <p className="font-mono text-sm text-muted max-w-md mx-auto">
          Start free, upgrade when you&apos;re ready to unlock the full Provn experience.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Free Tier */}
        <Card variant="default" padding="lg" className="flex flex-col">
          <div className="mb-6">
            <h3 className="heading-brutal text-2xl mb-1">{freeTier.name}</h3>
            <div className="flex items-baseline gap-1">
              <span className="heading-brutal text-4xl">{freeTier.price}</span>
            </div>
            <p className="font-mono text-xs text-muted mt-2">{freeTier.description}</p>
          </div>
          <div className="flex flex-col gap-3 flex-1 mb-6">
            {freeTier.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                {f.included ? (
                  <Check size={16} className="text-lime shrink-0" />
                ) : (
                  <X size={16} className="text-muted-light shrink-0" />
                )}
                <span className={`font-mono text-xs ${f.included ? 'text-black font-bold' : 'text-muted-light'}`}>
                  {f.label}
                </span>
              </div>
            ))}
          </div>
          <Button variant="outline" fullWidth size="lg" disabled>
            Current Plan
          </Button>
        </Card>

        {/* Pro Tier */}
        <Card variant="purple" padding="lg" className="flex flex-col relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge variant="dark">
              <Star size={10} className="mr-1" /> MOST POPULAR
            </Badge>
          </div>
          <div className="mb-6">
            <h3 className="heading-brutal text-2xl mb-1 flex items-center gap-2">
              {proTier.name} <Crown size={24} />
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="heading-brutal text-4xl">{proTier.price}</span>
              <span className="font-mono text-xs font-bold">{proTier.period}</span>
            </div>
            <p className="font-mono text-xs mt-2">{proTier.description}</p>
          </div>
          <div className="flex flex-col gap-3 flex-1 mb-6">
            {proTier.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check size={16} className="shrink-0" />
                <span className="font-mono text-xs font-bold">{f.label}</span>
              </div>
            ))}
          </div>
          <Button
            variant="dark"
            fullWidth
            size="lg"
            icon={Zap}
            onClick={handleUpgrade}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Upgrade Now'}
          </Button>
        </Card>
      </div>
    </div>
  );
}
