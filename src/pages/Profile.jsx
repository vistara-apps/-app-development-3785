import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, Building, Award, Edit3, Save, X } from 'lucide-react';

const Profile = () => {
  const { user, setUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    company: user?.company || 'TechCorp Inc.',
    role: user?.role || 'Innovation Manager',
    expertise: user?.expertise || 'Product Strategy, AI/ML, Team Leadership',
    bio: user?.bio || 'Passionate innovation leader with 10+ years of experience driving digital transformation and hackathon programs in enterprise environments.'
  });

  const handleSave = () => {
    setUser(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || 'John Doe',
      email: user?.email || 'john.doe@example.com',
      company: user?.company || 'TechCorp Inc.',
      role: user?.role || 'Innovation Manager',
      expertise: user?.expertise || 'Product Strategy, AI/ML, Team Leadership',
      bio: user?.bio || 'Passionate innovation leader with 10+ years of experience driving digital transformation and hackathon programs in enterprise environments.'
    });
    setIsEditing(false);
  };

  const profileData = user || editData;

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
                Profile
              </h1>
              <p style={{ color: '#64748b' }}>
                Manage your account information and preferences
              </p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-outline"
              >
                <Edit3 size={16} />
                Edit Profile
              </button>
            )}
          </div>

          <div className="card">
            {/* Profile Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#3b82f6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '32px',
                fontWeight: '700'
              }}>
                {profileData.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
                  {profileData.name}
                </h2>
                <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '4px' }}>
                  {profileData.role} at {profileData.company}
                </p>
                <p style={{ color: '#64748b', fontSize: '14px' }}>
                  {profileData.email}
                </p>
              </div>
            </div>

            {/* Profile Form */}
            <div style={{ display: 'grid', gap: '24px' }}>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">
                    <User size={16} style={{ marginRight: '6px' }} />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-input"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  ) : (
                    <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                      {profileData.name}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Mail size={16} style={{ marginRight: '6px' }} />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      className="form-input"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    />
                  ) : (
                    <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                      {profileData.email}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">
                    <Building size={16} style={{ marginRight: '6px' }} />
                    Company
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-input"
                      value={editData.company}
                      onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                    />
                  ) : (
                    <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                      {profileData.company}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Award size={16} style={{ marginRight: '6px' }} />
                    Role
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-input"
                      value={editData.role}
                      onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                    />
                  ) : (
                    <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                      {profileData.role}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Expertise</label>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-input"
                    value={editData.expertise}
                    onChange={(e) => setEditData({ ...editData, expertise: e.target.value })}
                    placeholder="e.g., Product Strategy, AI/ML, Team Leadership"
                  />
                ) : (
                  <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                    {profileData.expertise}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Bio</label>
                {isEditing ? (
                  <textarea
                    className="form-textarea"
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    placeholder="Tell us about yourself and your experience..."
                  />
                ) : (
                  <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', lineHeight: '1.6' }}>
                    {profileData.bio}
                  </div>
                )}
              </div>

              {isEditing && (
                <div style={{ display: 'flex', gap: '16px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
                  <button
                    onClick={handleSave}
                    className="btn btn-primary"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn btn-secondary"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Account Stats */}
          <div className="grid grid-3 mt-6">
            <div className="card text-center">
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6', marginBottom: '4px' }}>
                5
              </div>
              <div style={{ color: '#64748b', fontSize: '14px' }}>
                Hackathons Organized
              </div>
            </div>
            <div className="card text-center">
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981', marginBottom: '4px' }}>
                23
              </div>
              <div style={{ color: '#64748b', fontSize: '14px' }}>
                Ideas Evaluated
              </div>
            </div>
            <div className="card text-center">
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b', marginBottom: '4px' }}>
                8
              </div>
              <div style={{ color: '#64748b', fontSize: '14px' }}>
                Projects Launched
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;