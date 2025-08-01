import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Users, Mail, User } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import SkeletonCard from '../components/SkeletonCard';
import { useToast } from '../hooks/useToast';

const Teams = () => {
  const { teams, addTeam } = useApp();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { showSuccess, showError } = useToast();
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    members: ''
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!newTeam.name.trim()) {
      newErrors.name = 'Team name is required';
    } else if (newTeam.name.length < 3) {
      newErrors.name = 'Team name must be at least 3 characters';
    }
    
    if (newTeam.members) {
      const emails = newTeam.members.split(',').map(email => email.trim());
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const invalidEmails = emails.filter(email => email && !emailRegex.test(email));
      
      if (invalidEmails.length > 0) {
        newErrors.members = `Invalid email addresses: ${invalidEmails.join(', ')}`;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showError('Please fix the errors before submitting');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addTeam({
        ...newTeam,
        members: newTeam.members.split(',').map(email => email.trim()).filter(email => email)
      });
      
      setNewTeam({ name: '', description: '', members: '' });
      setShowCreateForm(false);
      setErrors({});
      showSuccess('Team created successfully!');
    } catch (error) {
      showError('Failed to create team. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
              Teams
            </h1>
            <p style={{ color: '#64748b' }}>
              Manage hackathon teams and collaboration
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn btn-primary"
          >
            <Plus size={16} />
            Create Team
          </button>
        </div>

        {showCreateForm && (
          <div className="card mb-6">
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
              Create New Team
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Team Name</label>
                <input
                  type="text"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  value={newTeam.name}
                  onChange={(e) => {
                    setNewTeam({ ...newTeam, name: e.target.value });
                    if (errors.name) {
                      setErrors({ ...errors, name: '' });
                    }
                  }}
                  placeholder="Enter team name"
                  required
                />
                {errors.name && (
                  <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.name}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  value={newTeam.description}
                  onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                  placeholder="Describe your team's focus and goals"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Team Members (Email addresses, comma-separated)</label>
                <input
                  type="text"
                  className={`form-input ${errors.members ? 'error' : ''}`}
                  value={newTeam.members}
                  onChange={(e) => {
                    setNewTeam({ ...newTeam, members: e.target.value });
                    if (errors.members) {
                      setErrors({ ...errors, members: '' });
                    }
                  }}
                  placeholder="john@example.com, jane@example.com"
                />
                {errors.members && (
                  <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.members}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="small" color="white" />
                      Creating...
                    </>
                  ) : (
                    'Create Team'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setErrors({});
                    setNewTeam({ name: '', description: '', members: '' });
                  }}
                  className="btn btn-secondary"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-2">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} showAvatar={true} lines={3} />
            ))
          ) : (
            teams.map((team, index) => (
              <div 
                key={team.id} 
                className="card animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#eff6ff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Users size={20} color="#3b82f6" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                    {team.name}
                  </h3>
                  <span className={`status-badge status-${team.status}`}>
                    {team.status}
                  </span>
                </div>
              </div>
              
              <p style={{ color: '#64748b', marginBottom: '16px', lineHeight: '1.6' }}>
                {team.description}
              </p>
              
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={14} />
                  Members ({team.members.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {team.members.map((member, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      color: '#64748b'
                    }}>
                      <Mail size={12} />
                      {member}
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
                <button className="btn btn-secondary" style={{ fontSize: '12px', padding: '8px 16px' }}>
                  View Details
                </button>
                <button className="btn btn-outline" style={{ fontSize: '12px', padding: '8px 16px' }}>
                  Join Team
                </button>
              </div>
              </div>
            ))
          )}
        </div>

        {teams.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <Users size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              No teams yet
            </h3>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>
              Create your first team to start collaborating on innovative ideas.
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn btn-primary"
            >
              <Plus size={16} />
              Create First Team
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
