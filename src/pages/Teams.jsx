import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Users, Mail, User } from 'lucide-react';

const Teams = () => {
  const { teams, addTeam } = useApp();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    members: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTeam.name.trim()) return;
    
    addTeam({
      ...newTeam,
      members: newTeam.members.split(',').map(email => email.trim()).filter(email => email)
    });
    
    setNewTeam({ name: '', description: '', members: '' });
    setShowCreateForm(false);
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
                  className="form-input"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                  placeholder="Enter team name"
                  required
                />
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
                  className="form-input"
                  value={newTeam.members}
                  onChange={(e) => setNewTeam({ ...newTeam, members: e.target.value })}
                  placeholder="john@example.com, jane@example.com"
                />
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button type="submit" className="btn btn-primary">
                  Create Team
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-2">
          {teams.map((team) => (
            <div key={team.id} className="card">
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
          ))}
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