import React from 'react';
import { Users, Lightbulb, Rocket, Award, ArrowRight, CheckCircle } from 'lucide-react';

const LandingPage = ({ setIsAuthenticated }) => {
  const features = [
    {
      icon: Users,
      title: 'Seamless Registration',
      description: 'Intuitive participant registration and check-in system with integration for event ticketing and badging.'
    },
    {
      icon: Lightbulb,
      title: 'Team Collaboration',
      description: 'Real-time tools for ideation, planning, and project management with virtual whiteboards and task boards.'
    },
    {
      icon: Award,
      title: 'AI-Powered Evaluation',
      description: 'Automated scoring and ranking of submissions based on predefined criteria with transparent judging workflows.'
    },
    {
      icon: Rocket,
      title: 'Innovation Roadmap',
      description: 'Structured templates to shepherd promising ideas from hackathons through to implementation.'
    }
  ];

  const plans = [
    {
      name: 'Starter',
      price: '$99',
      period: 'per month',
      features: [
        'Up to 50 participants',
        'Basic team collaboration tools',
        'Standard evaluation system',
        'Email support'
      ]
    },
    {
      name: 'Professional',
      price: '$299',
      period: 'per month',
      featured: true,
      features: [
        'Up to 200 participants',
        'Advanced collaboration features',
        'AI-powered evaluation',
        'Innovation roadmap templates',
        'Priority support'
      ]
    },
    {
      name: 'Enterprise',
      price: '$599',
      period: 'per month',
      features: [
        'Unlimited participants',
        'Custom integrations',
        'Advanced analytics',
        'Dedicated account manager',
        'White-label solution'
      ]
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '100px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            marginBottom: '24px',
            maxWidth: '800px',
            margin: '0 auto 24px'
          }}>
            The all-in-one enterprise platform to power your next hackathon
          </h1>
          <p style={{
            fontSize: '20px',
            marginBottom: '40px',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            Seamlessly manage and scale your innovation programs with our comprehensive hackathon platform.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button 
              onClick={() => setIsAuthenticated(true)}
              className="btn btn-primary"
              style={{
                backgroundColor: 'white',
                color: '#3b82f6',
                fontSize: '16px',
                padding: '16px 32px'
              }}
            >
              Get Started <ArrowRight size={20} />
            </button>
            <button 
              className="btn btn-outline"
              style={{
                borderColor: 'white',
                color: 'white',
                fontSize: '16px',
                padding: '16px 32px'
              }}
            >
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '100px 0', backgroundColor: 'white' }}>
        <div className="container">
          <div className="text-center mb-8">
            <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px' }}>
              Everything you need for successful hackathons
            </h2>
            <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
              Our platform provides all the tools and features to run engaging, productive innovation programs.
            </p>
          </div>
          <div className="grid grid-2" style={{ marginTop: '60px' }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card" style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#eff6ff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}>
                    <Icon size={32} color="#3b82f6" />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{ padding: '100px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="text-center mb-8">
            <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px' }}>
              Choose the perfect plan for your organization
            </h2>
            <p style={{ fontSize: '18px', color: '#64748b' }}>
              Flexible pricing that scales with your innovation programs
            </p>
          </div>
          <div className="grid grid-3" style={{ marginTop: '60px' }}>
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className="card"
                style={{
                  position: 'relative',
                  border: plan.featured ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                  transform: plan.featured ? 'scale(1.05)' : 'none'
                }}
              >
                {plan.featured && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '6px 24px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    MOST POPULAR
                  </div>
                )}
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
                  {plan.name}
                </h3>
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontSize: '36px', fontWeight: '700', color: '#3b82f6' }}>
                    {plan.price}
                  </span>
                  <span style={{ color: '#64748b' }}> {plan.period}</span>
                </div>
                <ul style={{ listStyle: 'none', marginBottom: '32px' }}>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '12px'
                    }}>
                      <CheckCircle size={16} color="#22c55e" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`btn ${plan.featured ? 'btn-primary' : 'btn-outline'}`}
                  style={{ width: '100%' }}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        backgroundColor: '#1e293b',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
            Ready to transform your innovation process?
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.9 }}>
            Join leading enterprises who trust Hackathon Hub for their innovation programs.
          </p>
          <button 
            onClick={() => setIsAuthenticated(true)}
            className="btn btn-primary"
            style={{ fontSize: '16px', padding: '16px 32px' }}
          >
            Start Free Trial <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;