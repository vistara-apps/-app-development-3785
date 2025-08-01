import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, Lightbulb, Rocket, TrendingUp, Calendar, Award } from 'lucide-react';

const Dashboard = () => {
  const { teams, ideas, innovationProjects } = useApp();

  const stats = [
    {
      title: 'Active Teams',
      value: teams.length,
      icon: Users,
      color: '#3b82f6'
    },
    {
      title: 'Ideas Submitted',
      value: ideas.length,
      icon: Lightbulb,
      color: '#f59e0b'
    },
    {
      title: 'Innovation Projects',
      value: innovationProjects.length,
      icon: Rocket,
      color: '#10b981'
    },
    {
      title: 'Average Score',
      value: ideas.length > 0 ? (ideas.reduce((sum, idea) => sum + (idea.score || 0), 0) / ideas.length).toFixed(1) : '0',
      icon: Award,
      color: '#8b5cf6'
    }
  ];

  const recentActivity = [
    {
      type: 'idea_submitted',
      message: 'AI Innovators submitted "AI-Powered Customer Support"',
      time: '2 hours ago',
      icon: Lightbulb
    },
    {
      type: 'team_created',
      message: 'Green Tech Warriors team was created',
      time: '4 hours ago',
      icon: Users
    },
    {
      type: 'idea_evaluated',
      message: 'Smart Energy Management received a score of 7.8',
      time: '6 hours ago',
      icon: Award
    },
    {
      type: 'project_started',
      message: 'AI Support Bot Implementation moved to development',
      time: '1 day ago',
      icon: Rocket
    }
  ];

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div className="mb-8">
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            Dashboard
          </h1>
          <p style={{ color: '#64748b' }}>
            Overview of your innovation program performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-2 mb-8" style={{ marginBottom: '40px' }}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: `${stat.color}15`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={24} color={stat.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: stat.color }}>
                      {stat.value}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '14px' }}>
                      {stat.title}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-2">
          {/* Recent Activity */}
          <div className="card">
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
              Recent Activity
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#f1f5f9',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={16} color="#64748b" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', marginBottom: '2px' }}>
                        {activity.message}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        {activity.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Performing Ideas */}
          <div className="card">
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
              Top Performing Ideas
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {ideas
                .filter(idea => idea.score)
                .sort((a, b) => b.score - a.score)
                .slice(0, 3)
                .map((idea, index) => (
                  <div key={idea.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px'
                  }}>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '14px' }}>
                        {idea.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        Team ID: {idea.teamId}
                      </div>
                    </div>
                    <div style={{
                      backgroundColor: index === 0 ? '#fbbf24' : index === 1 ? '#9ca3af' : '#cd7c2e',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {idea.score}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card mt-6">
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
            Quick Actions
          </h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary">
              <Calendar size={16} />
              Schedule Hackathon
            </button>
            <button className="btn btn-secondary">
              <Users size={16} />
              Invite Participants
            </button>
            <button className="btn btn-secondary">
              <TrendingUp size={16} />
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;