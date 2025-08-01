import React from 'react';
import { useApp } from '../context/AppContext';
import { Rocket, CheckCircle, Clock, Target, Users } from 'lucide-react';

const Innovation = () => {
  const { innovationProjects, ideas, teams } = useApp();

  const getIdeaName = (ideaId) => {
    const idea = ideas.find(i => i.id === ideaId);
    return idea ? idea.name : 'Unknown Idea';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'planning': return '#f59e0b';
      case 'in-progress': return '#3b82f6';
      case 'completed': return '#10b981';
      default: return '#6b7280';
    }
  };

  const calculateProgress = (milestones) => {
    const completed = milestones.filter(m => m.completed).length;
    return Math.round((completed / milestones.length) * 100);
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div className="mb-8">
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            Innovation Pipeline
          </h1>
          <p style={{ color: '#64748b' }}>
            Track and manage the journey from hackathon ideas to implementation
          </p>
        </div>

        {/* Innovation Stats */}
        <div className="grid grid-3 mb-8">
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#fef3c7',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Target size={20} color="#f59e0b" />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>
                  {innovationProjects.filter(p => p.status === 'planning').length}
                </div>
                <div style={{ color: '#64748b', fontSize: '14px' }}>
                  In Planning
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#dbeafe',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Clock size={20} color="#3b82f6" />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6' }}>
                  {innovationProjects.filter(p => p.status === 'in-progress').length}
                </div>
                <div style={{ color: '#64748b', fontSize: '14px' }}>
                  In Progress
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#dcfce7',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircle size={20} color="#10b981" />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>
                  {innovationProjects.filter(p => p.status === 'completed').length}
                </div>
                <div style={{ color: '#64748b', fontSize: '14px' }}>
                  Completed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Innovation Projects */}
        <div className="grid grid-2">
          {innovationProjects.map((project) => {
            const progress = calculateProgress(project.milestones);
            return (
              <div key={project.id} className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Rocket size={20} color="#10b981" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                      {project.name}
                    </h3>
                    <span style={{
                      backgroundColor: `${getStatusColor(project.status)}20`,
                      color: getStatusColor(project.status),
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <p style={{ color: '#64748b', marginBottom: '16px', lineHeight: '1.6' }}>
                  {project.description}
                </p>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                    Based on: {getIdeaName(project.ideaId)}
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>Progress</span>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>{progress}%</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${progress}%`,
                      height: '100%',
                      backgroundColor: '#10b981',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>

                {/* Milestones */}
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                    Milestones
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {project.milestones.map((milestone, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px',
                        backgroundColor: milestone.completed ? '#f0fdf4' : '#f8fafc',
                        borderRadius: '6px'
                      }}>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          backgroundColor: milestone.completed ? '#10b981' : '#cbd5e1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {milestone.completed && <CheckCircle size={12} color="white" />}
                        </div>
                        <span style={{
                          fontSize: '12px',
                          color: milestone.completed ? '#166534' : '#64748b',
                          fontWeight: milestone.completed ? '600' : '400'
                        }}>
                          {milestone.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
                  <button className="btn btn-primary" style={{ fontSize: '12px', padding: '8px 16px' }}>
                    View Details
                  </button>
                  <button className="btn btn-secondary" style={{ fontSize: '12px', padding: '8px 16px' }}>
                    Update Progress
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {innovationProjects.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <Rocket size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              No innovation projects yet
            </h3>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>
              High-scoring ideas from your hackathons will appear here as innovation projects.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button className="btn btn-outline">
                <Users size={16} />
                View Teams
              </button>
              <button className="btn btn-primary">
                <Target size={16} />
                Submit Ideas
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Innovation;