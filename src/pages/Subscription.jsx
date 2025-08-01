import React, { useState } from 'react';
import { CreditCard, Check, Zap, Users, TrendingUp, Star } from 'lucide-react';
import { usePaymentContext } from '../hooks/usePaymentContext';

const Subscription = () => {
  const [currentPlan, setCurrentPlan] = useState('professional');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [paid, setPaid] = useState(false);

  const { createSession } = usePaymentContext();

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: { monthly: 99, yearly: 950 },
      description: 'Perfect for small hackathons and innovation events',
      features: [
        'Up to 50 participants',
        'Basic team collaboration tools',
        'Standard evaluation system',
        'Email support',
        '5 GB storage',
        'Basic analytics'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: { monthly: 299, yearly: 2870 },
      description: 'Advanced features for growing innovation programs',
      features: [
        'Up to 200 participants',
        'Advanced collaboration features',
        'AI-powered evaluation',
        'Innovation roadmap templates',
        'Priority support',
        '50 GB storage',
        'Advanced analytics',
        'Custom branding'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: { monthly: 599, yearly: 5750 },
      description: 'Complete solution for large-scale innovation programs',
      features: [
        'Unlimited participants',
        'Custom integrations',
        'Advanced AI features',
        'Dedicated account manager',
        'White-label solution',
        'Unlimited storage',
        'Real-time analytics',
        'API access',
        'SSO integration'
      ],
      popular: false
    }
  ];

  const handleUpgrade = async (planId) => {
    try {
      const plan = plans.find(p => p.id === planId);
      const amount = `$${plan.price[billingCycle]}`;
      await createSession(amount);
      setPaid(true);
      setCurrentPlan(planId);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const currentPlanData = plans.find(plan => plan.id === currentPlan);

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div className="text-center mb-8">
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            Subscription & Billing
          </h1>
          <p style={{ color: '#64748b' }}>
            Manage your plan and billing preferences
          </p>
        </div>

        {/* Current Plan */}
        <div className="card mb-8">
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
            Current Plan
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#eff6ff',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Star size={24} color="#3b82f6" />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                  {currentPlanData?.name} Plan
                </h3>
                <p style={{ color: '#64748b', fontSize: '14px' }}>
                  ${currentPlanData?.price[billingCycle]}/{billingCycle === 'monthly' ? 'month' : 'year'}
                </p>
              </div>
            </div>
            <span className="status-badge status-active">
              Active
            </span>
          </div>
        </div>

        {/* Billing Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'flex',
            backgroundColor: '#f1f5f9',
            borderRadius: '8px',
            padding: '4px'
          }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '8px 24px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: billingCycle === 'monthly' ? 'white' : 'transparent',
                color: billingCycle === 'monthly' ? '#3b82f6' : '#64748b',
                fontWeight: billingCycle === 'monthly' ? '600' : '400',
                cursor: 'pointer'
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              style={{
                padding: '8px 24px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: billingCycle === 'yearly' ? 'white' : 'transparent',
                color: billingCycle === 'yearly' ? '#3b82f6' : '#64748b',
                fontWeight: billingCycle === 'yearly' ? '600' : '400',
                cursor: 'pointer'
              }}
            >
              Yearly
              <span style={{
                marginLeft: '8px',
                fontSize: '12px',
                backgroundColor: '#10b981',
                color: 'white',
                padding: '2px 6px',
                borderRadius: '4px'
              }}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-3 mb-8">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className="card"
              style={{
                position: 'relative',
                border: plan.popular ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                transform: plan.popular ? 'scale(1.02)' : 'none'
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '6px 20px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  MOST POPULAR
                </div>
              )}

              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
                {plan.name}
              </h3>
              <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
                {plan.description}
              </p>
              
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '32px', fontWeight: '700', color: '#3b82f6' }}>
                  ${plan.price[billingCycle]}
                </span>
                <span style={{ color: '#64748b' }}>
                  /{billingCycle === 'monthly' ? 'month' : 'year'}
                </span>
              </div>

              <ul style={{ listStyle: 'none', marginBottom: '32px' }}>
                {plan.features.map((feature, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    <Check size={14} color="#10b981" />
                    <span style={{ fontSize: '14px' }}>{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.id === currentPlan ? (
                <button 
                  className="btn btn-secondary"
                  style={{ width: '100%' }}
                  disabled
                >
                  Current Plan
                </button>
              ) : (
                <button 
                  onClick={() => handleUpgrade(plan.id)}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  {plan.price[billingCycle] > currentPlanData?.price[billingCycle] ? 'Upgrade' : 'Downgrade'}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Usage Stats */}
        <div className="card">
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
            Current Usage
          </h2>
          <div className="grid grid-2">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px' }}>Participants</span>
                <span style={{ fontSize: '14px', color: '#64748b' }}>45 / 200</span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#f1f5f9',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '22.5%',
                  height: '100%',
                  backgroundColor: '#10b981'
                }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px' }}>Storage</span>
                <span style={{ fontSize: '14px', color: '#64748b' }}>12.5 GB / 50 GB</span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#f1f5f9',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '25%',
                  height: '100%',
                  backgroundColor: '#3b82f6'
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;