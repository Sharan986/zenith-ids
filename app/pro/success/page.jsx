'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Trophy, Zap, Rocket, Loader, XCircle } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function ProSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const txnId = searchParams.get('txnId');

  const [status, setStatus] = useState('PENDING'); // PENDING | SUCCESS | FAILED
  const [error, setError] = useState(null);
  const pollRef = useRef(null);
  const attemptsRef = useRef(0);
  const MAX_POLL_ATTEMPTS = 10;

  useEffect(() => {
    if (!txnId) {
      setStatus('FAILED');
      setError('No transaction ID found. Please contact support.');
      return;
    }

    const poll = async () => {
      try {
        const res = await fetch(`/api/phonepe/status/${txnId}`);
        const data = await res.json();

        if (data.status === 'SUCCESS') {
          setStatus('SUCCESS');
          clearInterval(pollRef.current);
        } else if (data.status === 'FAILED' || data.status === 'CANCELLED') {
          setStatus('FAILED');
          setError('Payment was not completed. Please try again.');
          clearInterval(pollRef.current);
        } else {
          // Still PENDING
          attemptsRef.current += 1;
          if (attemptsRef.current >= MAX_POLL_ATTEMPTS) {
            setStatus('FAILED');
            setError('Payment verification timed out. If amount was deducted, please contact support.');
            clearInterval(pollRef.current);
          }
        }
      } catch (err) {
        console.error('Payment status poll error:', err);
        // Network error — keep polling
        attemptsRef.current += 1;
        if (attemptsRef.current >= MAX_POLL_ATTEMPTS) {
          setStatus('FAILED');
          setError('Could not verify payment status. Please contact support if amount was deducted.');
          clearInterval(pollRef.current);
        }
      }
    };

    // Poll immediately, then every 3 seconds
    poll();
    pollRef.current = setInterval(poll, 3000);

    return () => clearInterval(pollRef.current);
  }, [txnId]);

  if (status === 'PENDING') {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-bg flex items-center justify-center p-4">
        <Card variant="default" padding="lg" className="max-w-md text-center">
          <div className="flex justify-center mb-6">
            <Loader size={48} className="animate-spin text-purple" />
          </div>
          <h2 className="heading-brutal text-2xl mb-3">VERIFYING PAYMENT</h2>
          <p className="font-mono text-sm text-muted">
            Please wait while we confirm your payment…
          </p>
        </Card>
      </div>
    );
  }

  if (status === 'FAILED') {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-bg flex items-center justify-center p-4">
        <Card variant="default" padding="lg" className="max-w-md text-center">
          <div className="w-20 h-20 bg-black text-red-500 border-brutal mx-auto flex items-center justify-center mb-6">
            <XCircle size={40} />
          </div>
          <h2 className="heading-brutal text-2xl mb-3">PAYMENT FAILED</h2>
          <p className="font-mono text-sm text-muted mb-6">
            {error || 'Something went wrong with your payment.'}
          </p>
          <Button variant="outline" fullWidth onClick={() => router.push('/pro')}>
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-bg flex items-center justify-center p-4">
      <Card variant="purple" padding="lg" className="max-w-md text-center animate-fade-in-up">
        <div className="w-20 h-20 bg-black text-purple border-brutal mx-auto flex items-center justify-center mb-6 animate-pulse-brutal">
          <Trophy size={40} />
        </div>
        <h2 className="heading-brutal text-3xl mb-3">YOU&apos;RE PRO!</h2>
        <p className="font-mono text-sm mb-6">
          Payment confirmed. All premium features are now unlocked. Go build something amazing.
        </p>
        <div className="flex gap-3">
          <Button variant="dark" fullWidth icon={Zap} onClick={() => router.push('/simulator')}>
            Simulator
          </Button>
          <Button variant="outline" fullWidth icon={Rocket} onClick={() => router.push('/dashboard/student')}>
            Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
}
