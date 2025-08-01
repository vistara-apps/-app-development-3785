import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Lightbulb, FileText, Star, Clock, CheckCircle } from 'lucide-react';
import { useAIEvaluation } from '../hooks/useAIEvaluation';

const Ideas = () => {
  const { ideas, teams, addIdea, updateIdeaScore, promoteIdeaToProject } = useApp();
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [newIdea, setNewIdea] = useState({
    name: '',
    description: '',
    teamId: '',
    attachments: ''
  });

  const { evaluateIdea } = useAIEvaluation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newIdea.name.trim() || !newIdea.teamId) return;
    
    const idea = {
      ...newIdea,
      teamId: parseInt(newIdea.teamId),
      attachments: newIdea.attachments.split(',').map(file => file.trim()).filter(file => file)
    };
    
    addIdea(idea);
    
    // Automatically evaluate the idea using AI
    try {
      const score = await evaluateIdea(idea);
      updateIdeaScore(ideas.length + 1, score);
    } catch (error) {
      console.error('Failed to evaluate idea:', error);
    }
    
    setNewIdea({ name: '', description: '', teamId: '', attachments: '' });
    setShowSubmitForm(false);
  };

  const getTeamName = (teamId) => {
    const team = teams.find(t => t.id === teamId);
    return team ? team.name : 'Unknown Team';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return '#f59e0b';
      case 'evaluated': return '#10b981';
      case 'selected': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
              Ideas
            </h1>
            <p style={{ color: '#64748b' }}>
              Submit and evaluate innovative hackathon ideas
            </p>
          </div>
          <button
            onClick={() => setShowSubmitForm(true)}
            className="btn btn-primary"
          >
            <Plus size={16} />
            Submit Idea
          </button>
        </div>

        {showSubmitForm && (
          <div className="card mb-6">
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
              Submit New Idea
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Idea Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={newIdea.name}
                  onChange={(e) => setNewIdea({ ...newIdea, name: e.target.value })}
                  placeholder="Enter your innovative idea name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  value={newIdea.description}
                  onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
                  placeholder="Describe your idea, the problem it solves, and how it works"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Team</label>
                <select
                  className="form-input"
                  value={newIdea.teamId}
                  onChange={(e) => setNewIdea({ ...newIdea, teamId: e.target.value })}
                  required
                >
                  <option value="">Select a team</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Attachments (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  value={newIdea.attachments}
                  onChange={(e) => setNewIdea({ ...newIdea, attachments: e.target.value })}
                  placeholder="file1.pdf, presentation.pptx, prototype.zip"
                />
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button type="submit" className="btn btn-primary">
                  Submit Idea
                </button>
                <button
                  type="button"
                  onClick={() => setShowSubmitForm(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-2">
          {ideas.map((idea) => (
            <div key={idea.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#fef3c7',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Lightbulb size={20} color="#f59e0b" />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                    {idea.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      backgroundColor: `${getStatusColor(idea.status)}20`,
                      color: getStatusColor(idea.status),
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {idea.status}
                    </span>
                    {idea.score && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={14} color="#f59e0b" />
                        <span style={{ fontSize: '14px', fontWeight: '600' }}>
                          {idea.score}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <p style={{ color: '#64748b', marginBottom: '16px', lineHeight: '1.6' }}>
                {idea.description}
              </p>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                  Team: {getTeamName(idea.teamId)}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} />
                  Submitted: {new Date(idea.submittedAt).toLocaleDateString()}
                </div>
              </div>

              {idea.attachments && idea.attachments.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FileText size={12} />
                    Attachments
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    {idea.attachments.join(', ')}
                  </div>
                </div>
              )}
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
                <button className="btn btn-secondary" style={{ fontSize: '12px', padding: '8px 16px' }}>
                  View Details
                </button>
                {idea.status === 'evaluated' && idea.score && idea.score > 7.5 && (
                  <button 
                    onClick={() => promoteIdeaToProject(idea)}
                    className="btn btn-primary" 
                    style={{ fontSize: '12px', padding: '8px 16px' }}
                  >
                    <CheckCircle size={12} />
                    Promote to Project
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {ideas.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <Lightbulb size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              No ideas submitted yet
            </h3>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>
              Submit your first innovative idea to get started with the evaluation process.
            </p>
            <button
              onClick={() => setShowSubmitForm(true)}
              className="btn btn-primary"
            >
              <Plus size={16} />
              Submit First Idea
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ideas;