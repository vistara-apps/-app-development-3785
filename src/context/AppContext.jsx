import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [innovationProjects, setInnovationProjects] = useState([]);
  const [judges, setJudges] = useState([]);

  // Mock data initialization
  useEffect(() => {
    // Initialize with sample data
    setTeams([
      {
        id: 1,
        name: "AI Innovators",
        description: "Exploring AI solutions for business challenges",
        members: ["john@example.com", "sarah@example.com"],
        status: "active"
      },
      {
        id: 2,
        name: "Green Tech Warriors",
        description: "Sustainable technology solutions",
        members: ["mike@example.com", "lisa@example.com"],
        status: "active"
      }
    ]);

    setIdeas([
      {
        id: 1,
        name: "AI-Powered Customer Support",
        description: "Automated customer support using natural language processing",
        teamId: 1,
        score: 8.5,
        status: "evaluated",
        attachments: ["proposal.pdf"],
        submittedAt: new Date().toISOString()
      },
      {
        id: 2,
        name: "Smart Energy Management",
        description: "IoT-based energy optimization for office buildings",
        teamId: 2,
        score: 7.8,
        status: "evaluated",
        attachments: ["presentation.pptx"],
        submittedAt: new Date().toISOString()
      }
    ]);

    setJudges([
      {
        id: 1,
        name: "Dr. Emily Chen",
        email: "emily.chen@techcorp.com",
        expertise: "AI/ML, Product Strategy"
      },
      {
        id: 2,
        name: "Mark Rodriguez",
        email: "mark.r@innovation.com",
        expertise: "Sustainability, IoT"
      }
    ]);

    setInnovationProjects([
      {
        id: 1,
        name: "AI Support Bot Implementation",
        description: "Production deployment of AI customer support system",
        ideaId: 1,
        status: "in-progress",
        milestones: [
          { name: "Technical Specification", completed: true },
          { name: "MVP Development", completed: true },
          { name: "User Testing", completed: false },
          { name: "Production Deployment", completed: false }
        ]
      }
    ]);
  }, []);

  const addTeam = (team) => {
    const newTeam = {
      ...team,
      id: teams.length + 1,
      status: "active"
    };
    setTeams([...teams, newTeam]);
  };

  const addIdea = (idea) => {
    const newIdea = {
      ...idea,
      id: ideas.length + 1,
      score: null,
      status: "submitted",
      submittedAt: new Date().toISOString()
    };
    setIdeas([...ideas, newIdea]);
  };

  const updateIdeaScore = (ideaId, score) => {
    setIdeas(ideas.map(idea => 
      idea.id === ideaId 
        ? { ...idea, score, status: "evaluated" }
        : idea
    ));
  };

  const promoteIdeaToProject = (idea) => {
    const newProject = {
      id: innovationProjects.length + 1,
      name: `${idea.name} Implementation`,
      description: `Production implementation of: ${idea.description}`,
      ideaId: idea.id,
      status: "planning",
      milestones: [
        { name: "Technical Specification", completed: false },
        { name: "MVP Development", completed: false },
        { name: "User Testing", completed: false },
        { name: "Production Deployment", completed: false }
      ]
    };
    setInnovationProjects([...innovationProjects, newProject]);
  };

  const value = {
    user,
    setUser,
    teams,
    setTeams,
    addTeam,
    ideas,
    setIdeas,
    addIdea,
    updateIdeaScore,
    judges,
    setJudges,
    innovationProjects,
    setInnovationProjects,
    promoteIdeaToProject
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};