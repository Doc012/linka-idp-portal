import { useState, useEffect } from 'react';
import { FaStar, FaRegStar, FaComment, FaShare, FaThumbsUp, FaDownload, FaCalendarAlt } from 'react-icons/fa';

const StrategicPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [userRatings, setUserRatings] = useState({});
  const [sortBy, setSortBy] = useState('date');

  // Mock user data - in a real app, this would come from authentication context
  const currentUser = {
    id: 'user123',
    name: 'John Resident',
    wardNumber: 5,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock strategic plan data
        const mockPlans = [
          {
            id: 1,
            title: "Ward 5 Infrastructure Development Framework",
            description: "A comprehensive plan to improve and expand infrastructure across the ward, focusing on road networks, water supply systems, and public facilities to enhance service delivery and quality of life for residents.",
            category: "INFRASTRUCTURE",
            status: "ACTIVE",
            startDate: "2023-01-15",
            endDate: "2025-12-31",
            wardId: 5,
            keyObjectives: [
              "Upgrade 70% of road infrastructure within the ward by 2025",
              "Improve water supply reliability to reduce outages by 90%",
              "Construct 3 new community facilities to serve underserved areas",
              "Upgrade stormwater management systems to prevent flooding"
            ],
            responsibleDepartment: "Infrastructure Development",
            leadOfficial: "James Mokoena",
            budget: 45000000,
            contactEmail: "infrastructure@midvaal.gov.za",
            relatedProjects: [
              { id: 101, name: "Sicelo Road Rehabilitation Project" },
              { id: 105, name: "Meyerton Water Supply Upgrade" }
            ],
            stakeholders: ["Municipal Infrastructure Department", "Local Business Chamber", "Resident Associations"],
            documents: [
              { name: "Infrastructure Master Plan", url: "#", type: "pdf", size: "4.2 MB" },
              { name: "Technical Specifications", url: "#", type: "pdf", size: "2.8 MB" },
              { name: "Budget Breakdown", url: "#", type: "xlsx", size: "1.5 MB" }
            ],
            publicComments: [
              { 
                id: "c1", 
                userId: "user456", 
                userName: "Sarah Mthembu", 
                userAvatar: "https://randomuser.me/api/portraits/women/45.jpg",
                date: "2023-03-15", 
                text: "I'm concerned about the impact of construction on daily commutes. Will there be traffic management plans?",
                likes: 8,
                replies: [
                  {
                    userId: "admin1",
                    userName: "Municipal Manager",
                    userAvatar: "https://randomuser.me/api/portraits/men/78.jpg",
                    date: "2023-03-16",
                    text: "Yes, we have comprehensive traffic management plans for all construction periods. These include alternative routes and scheduled work during off-peak hours."
                  }
                ]
              },
              { 
                id: "c2", 
                userId: "user789", 
                userName: "Thomas van der Merwe", 
                userAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
                date: "2023-04-02", 
                text: "The water supply improvements are urgently needed in the eastern section of our ward. I hope this gets prioritized early in the implementation schedule.",
                likes: 12,
                replies: []
              }
            ],
            updates: [
              { date: "2023-02-10", text: "Initial assessment of road infrastructure completed" },
              { date: "2023-04-15", text: "First phase of water supply upgrades commenced" },
              { date: "2023-06-20", text: "Site selection for new community centers finalized" },
              { date: "2023-09-05", text: "Community consultation sessions held with 120+ attendees" }
            ],
            averageRating: 4.2,
            ratingCount: 45,
            ratingDistribution: [2, 3, 5, 15, 20],
            engagementScore: 87
          },
          {
            id: 2,
            title: "Ward 5 Economic Growth and Job Creation Initiative",
            description: "A strategic plan to stimulate local economic development, attract investment, and create sustainable employment opportunities while supporting small businesses and entrepreneurship within the ward.",
            category: "ECONOMIC_DEVELOPMENT",
            status: "ACTIVE",
            startDate: "2023-03-01",
            endDate: "2026-02-28",
            wardId: 5,
            keyObjectives: [
              "Attract at least 5 new businesses to the ward by 2025",
              "Create 500+ new jobs through economic development initiatives",
              "Establish a small business support center",
              "Develop skills training programs targeting youth unemployment"
            ],
            responsibleDepartment: "Economic Development",
            leadOfficial: "Sarah Johnson",
            budget: 28000000,
            contactEmail: "economic@midvaal.gov.za",
            relatedProjects: [
              { id: 201, name: "Sicelo Small Business Hub" }
            ],
            stakeholders: ["Chamber of Commerce", "Small Business Development Agency", "Local Training Institutions"],
            documents: [
              { name: "Economic Development Strategy", url: "#", type: "pdf", size: "3.5 MB" },
              { name: "Investment Prospectus", url: "#", type: "pdf", size: "8.2 MB" },
              { name: "Small Business Support Guide", url: "#", type: "pdf", size: "1.1 MB" }
            ],
            publicComments: [
              { 
                id: "c3", 
                userId: "user321", 
                userName: "Nomsa Dlamini", 
                userAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
                date: "2023-04-10", 
                text: "We need skills development programs specifically for digital careers. The tech sector offers great opportunities but requires specific training.",
                likes: 15,
                replies: [
                  {
                    userId: "admin2",
                    userName: "Economic Development Officer",
                    userAvatar: "https://randomuser.me/api/portraits/women/58.jpg",
                    date: "2023-04-12",
                    text: "Thank you for your suggestion. We're currently exploring partnerships with tech companies to develop specialized training programs. We'd love to hear more about specific skills you think would be valuable."
                  }
                ]
              },
              { 
                id: "c4", 
                userId: "user654", 
                userName: "James Smith", 
                userAvatar: "https://randomuser.me/api/portraits/men/42.jpg",
                date: "2023-05-22", 
                text: "The small business support center would greatly help local entrepreneurs like myself. When is the expected completion date?",
                likes: 7,
                replies: []
              }
            ],
            updates: [
              { date: "2023-03-15", text: "Economic baseline assessment completed" },
              { date: "2023-05-10", text: "First business investment seminar held with 45 attendees" },
              { date: "2023-07-01", text: "Site secured for small business development center" },
              { date: "2023-08-22", text: "Partnership agreement signed with 3 skills development providers" }
            ],
            averageRating: 4.0,
            ratingCount: 32,
            ratingDistribution: [1, 4, 6, 12, 9],
            engagementScore: 75
          },
          {
            id: 3,
            title: "Community Health and Social Wellbeing Program",
            description: "A holistic approach to improving health outcomes, social cohesion, and quality of life for all residents through enhanced social services, healthcare access, and community engagement initiatives.",
            category: "SOCIAL_SERVICES",
            status: "PLANNED",
            startDate: "2023-10-15",
            endDate: "2026-10-14",
            wardId: 5,
            keyObjectives: [
              "Improve access to primary healthcare services by 50%",
              "Establish 3 new recreational facilities for youth and seniors",
              "Implement community safety initiatives to reduce crime by 30%",
              "Create support programs for vulnerable populations"
            ],
            responsibleDepartment: "Social Development",
            leadOfficial: "Dr. Thabo Nkosi",
            budget: 32000000,
            contactEmail: "social@midvaal.gov.za",
            relatedProjects: [],
            stakeholders: ["Department of Health", "Social Services Agency", "Community Organizations", "Local Schools"],
            documents: [
              { name: "Social Development Framework", url: "#", type: "pdf", size: "2.7 MB" },
              { name: "Community Health Assessment", url: "#", type: "pdf", size: "5.3 MB" }
            ],
            publicComments: [
              { 
                id: "c5", 
                userId: "user111", 
                userName: "Elizabeth Khumalo", 
                userAvatar: "https://randomuser.me/api/portraits/women/23.jpg",
                date: "2023-08-30", 
                text: "I'm glad to see mental health services included in this plan. Will there be support specifically for youth mental health?",
                likes: 9,
                replies: []
              }
            ],
            updates: [
              { date: "2023-07-10", text: "Community needs assessment completed" },
              { date: "2023-07-25", text: "Draft implementation plan developed" },
              { date: "2023-09-01", text: "Budget approval secured" }
            ],
            averageRating: 3.8,
            ratingCount: 16,
            ratingDistribution: [1, 2, 4, 6, 3],
            engagementScore: 62
          },
          {
            id: 4,
            title: "Environmental Sustainability and Climate Resilience Plan",
            description: "A forward-looking strategy to enhance environmental protection, promote sustainable practices, and build resilience against climate change impacts within the ward.",
            category: "ENVIRONMENTAL",
            status: "PLANNED",
            startDate: "2023-11-01",
            endDate: "2026-10-31",
            wardId: 5,
            keyObjectives: [
              "Increase green spaces by 25% across the ward",
              "Implement waste reduction and recycling programs",
              "Develop climate resilience strategies for extreme weather events",
              "Promote water conservation and sustainable resource management"
            ],
            responsibleDepartment: "Environmental Management",
            leadOfficial: "Elizabeth Maluleke",
            budget: 18000000,
            contactEmail: "environment@midvaal.gov.za",
            relatedProjects: [],
            stakeholders: ["Environmental Protection Agency", "Conservation Groups", "Residents' Associations"],
            documents: [
              { name: "Environmental Master Plan", url: "#", type: "pdf", size: "3.8 MB" },
              { name: "Climate Resilience Strategy", url: "#", type: "pdf", size: "2.2 MB" }
            ],
            publicComments: [],
            updates: [
              { date: "2023-08-05", text: "Environmental impact assessment initiated" },
              { date: "2023-09-15", text: "Stakeholder consultation meetings scheduled" }
            ],
            averageRating: 4.5,
            ratingCount: 12,
            ratingDistribution: [0, 0, 1, 5, 6],
            engagementScore: 58
          },
          {
            id: 5,
            title: "Municipal Service Delivery Enhancement Program",
            description: "A comprehensive plan to improve governance, optimize service delivery, and enhance citizen participation in municipal affairs to create a more responsive and efficient local government.",
            category: "GOVERNANCE",
            status: "COMPLETED",
            startDate: "2022-01-10",
            endDate: "2023-01-09",
            actualEndDate: "2023-01-15",
            wardId: 5,
            keyObjectives: [
              "Reduce service request response time by 60%",
              "Implement digital service delivery platforms",
              "Enhance public participation in decision-making processes",
              "Improve municipal staff capacity and performance"
            ],
            responsibleDepartment: "Municipal Administration",
            leadOfficial: "Daniel van Niekerk",
            budget: 12000000,
            spent: 11500000,
            contactEmail: "administration@midvaal.gov.za",
            relatedProjects: [
              { id: 301, name: "Midvaal Mobile App Development" }
            ],
            stakeholders: ["Municipal Manager's Office", "IT Department", "Customer Service", "Residents"],
            documents: [
              { name: "Service Delivery Improvement Plan", url: "#", type: "pdf", size: "1.9 MB" },
              { name: "Digital Transformation Strategy", url: "#", type: "pdf", size: "2.4 MB" },
              { name: "Final Project Report", url: "#", type: "pdf", size: "3.6 MB" }
            ],
            publicComments: [
              { 
                id: "c6", 
                userId: "user222", 
                userName: "Lunga Dlamini", 
                userAvatar: "https://randomuser.me/api/portraits/men/55.jpg",
                date: "2022-06-10", 
                text: "The new online reporting system has made it much easier to log service requests.",
                likes: 13,
                replies: []
              },
              { 
                id: "c7", 
                userId: "user333", 
                userName: "Pieter Botha", 
                userAvatar: "https://randomuser.me/api/portraits/men/62.jpg",
                date: "2022-08-15", 
                text: "Response times have improved, but there's still room for improvement in water-related issues.",
                likes: 8,
                replies: [
                  {
                    userId: "admin3",
                    userName: "Service Delivery Manager",
                    userAvatar: "https://randomuser.me/api/portraits/men/82.jpg",
                    date: "2022-08-16",
                    text: "Thank you for your feedback. We've noted this gap and have implemented additional measures specifically for water service issues in our follow-up plans."
                  }
                ]
              },
              { 
                id: "c8", 
                userId: "user444", 
                userName: "Kamini Naidoo", 
                userAvatar: "https://randomuser.me/api/portraits/women/62.jpg",
                date: "2023-01-20", 
                text: "Overall this has been a successful initiative. The mobile app is particularly useful.",
                likes: 17,
                replies: []
              }
            ],
            updates: [
              { date: "2022-01-10", text: "Program officially launched" },
              { date: "2022-04-15", text: "Digital service platform implemented" },
              { date: "2022-07-20", text: "Staff training program completed" },
              { date: "2022-11-05", text: "Final assessment initiated" },
              { date: "2023-01-15", text: "Program completed with 92% of objectives achieved" }
            ],
            outcomes: [
              "Reduced average service request response time from 72 hours to 28 hours",
              "Implemented new digital service platform with 65% adoption rate",
              "Conducted 12 public participation forums with over 800 total attendees",
              "Trained 45 municipal staff in improved service delivery methods"
            ],
            averageRating: 4.3,
            ratingCount: 56,
            ratingDistribution: [2, 4, 6, 18, 26],
            engagementScore: 92
          }
        ];
        
        setPlans(mockPlans);
        
        // Initialize user ratings from localStorage or set empty
        const savedRatings = JSON.parse(localStorage.getItem('userPlanRatings') || '{}');
        setUserRatings(savedRatings);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching strategic plans:', err);
        setError('Failed to load strategic plans. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlans();
  }, []);

  // Filter plans based on category and status
  const filteredPlans = plans.filter(plan => {
    const categoryMatch = filter === 'all' || plan.category === filter;
    const statusMatch = statusFilter === 'all' || plan.status === statusFilter;
    return categoryMatch && statusMatch;
  });
  
  // Sort plans based on selected criteria
  const sortedPlans = [...filteredPlans].sort((a, b) => {
    switch(sortBy) {
      case 'date':
        return new Date(b.startDate) - new Date(a.startDate);
      case 'rating':
        return b.averageRating - a.averageRating;
      case 'engagement':
        return b.engagementScore - a.engagementScore;
      case 'budget':
        return b.budget - a.budget;
      default:
        return 0;
    }
  });

  // Function to display category with color
  const getCategoryDisplay = (category) => {
    const categoryConfig = {
      'INFRASTRUCTURE': { color: 'bg-blue-100 text-blue-800', label: 'Infrastructure' },
      'ECONOMIC_DEVELOPMENT': { color: 'bg-green-100 text-green-800', label: 'Economic Development' },
      'SOCIAL_SERVICES': { color: 'bg-purple-100 text-purple-800', label: 'Social Services' },
      'ENVIRONMENTAL': { color: 'bg-teal-100 text-teal-800', label: 'Environmental' },
      'GOVERNANCE': { color: 'bg-gray-100 text-gray-800', label: 'Governance' }
    };
    
    const config = categoryConfig[category] || { color: 'bg-gray-100 text-gray-800', label: category };
    
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Function to get status display with color
  const getStatusDisplay = (status) => {
    const statusConfig = {
      'ACTIVE': { color: 'bg-green-100 text-green-800', label: 'Active' },
      'PLANNED': { color: 'bg-blue-100 text-blue-800', label: 'Planned' },
      'COMPLETED': { color: 'bg-gray-100 text-gray-800', label: 'Completed' }
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', label: status };
    
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-ZA', {
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    });
  };

  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', { 
      style: 'currency', 
      currency: 'ZAR',
      maximumFractionDigits: 0 
    }).format(amount);
  };

  // Function to calculate plan timeframe
  const getPlanTimeframe = (plan) => {
    const startDate = new Date(plan.startDate);
    const endDate = new Date(plan.endDate);
    
    const durationInDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    if (durationInDays < 365) {
      return 'Short Term';
    } else if (durationInDays < 365 * 3) {
      return 'Medium Term';
    } else {
      return 'Long Term';
    }
  };

  // Helper function to check if a plan is currently active
  const isActivePlan = (plan) => {
    const now = new Date();
    const startDate = new Date(plan.startDate);
    const endDate = new Date(plan.endDate);
    
    return startDate <= now && now <= endDate;
  };

  // Helper function to check if a plan is in the future
  const isFuturePlan = (plan) => {
    const now = new Date();
    const startDate = new Date(plan.startDate);
    
    return startDate > now;
  };

  // Helper function to calculate plan progress based on dates
  const calculateProgress = (startDate, endDate) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const today = new Date().getTime();
    
    if (today <= start) return 0;
    if (today >= end) return 100;
    
    const totalDuration = end - start;
    const elapsed = today - start;
    
    return Math.round((elapsed / totalDuration) * 100);
  };

  // Function to open plan detail view
  const openPlanDetails = (plan) => {
    setSelectedPlan(plan);
    setShowDetailModal(true);
    // Reset comment text when opening a plan detail
    setCommentText('');
  };

  // Function to handle user rating
  const handleRating = (planId, rating) => {
    const newRatings = { ...userRatings, [planId]: rating };
    setUserRatings(newRatings);
    
    // In a real app, you would send this to an API
    // For demo, save to localStorage
    localStorage.setItem('userPlanRatings', JSON.stringify(newRatings));
    
    // Update the plan's rating in the plans array
    const updatedPlans = plans.map(plan => {
      if (plan.id === planId) {
        // Calculate new average and update distribution
        const oldTotal = plan.averageRating * plan.ratingCount;
        const newCount = plan.ratingCount + (userRatings[planId] ? 0 : 1);
        const newAverage = (oldTotal + rating - (userRatings[planId] || 0)) / newCount;
        
        // Update rating distribution
        const newDistribution = [...plan.ratingDistribution];
        if (userRatings[planId]) {
          // Remove old rating from distribution
          newDistribution[userRatings[planId] - 1]--;
        } else {
          // This is a new rating (not an update)
          plan.ratingCount += 1;
        }
        // Add new rating to distribution
        newDistribution[rating - 1]++;
        
        return {
          ...plan,
          averageRating: parseFloat(newAverage.toFixed(1)),
          ratingCount: newCount,
          ratingDistribution: newDistribution
        };
      }
      return plan;
    });
    
    setPlans(updatedPlans);
  };

  // Function to handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    if (!commentText.trim()) return;
    
    // Create a new comment object
    const newComment = {
      id: `c${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      date: new Date().toISOString().split('T')[0],
      text: commentText,
      likes: 0,
      replies: []
    };
    
    // Update the plan's comments in the plans array
    const updatedPlans = plans.map(plan => {
      if (plan.id === selectedPlan.id) {
        return {
          ...plan,
          publicComments: [newComment, ...plan.publicComments],
          engagementScore: Math.min(100, plan.engagementScore + 2) // Increase engagement score
        };
      }
      return plan;
    });
    
    setPlans(updatedPlans);
    
    // Update the selected plan for immediate UI update
    setSelectedPlan({
      ...selectedPlan,
      publicComments: [newComment, ...selectedPlan.publicComments]
    });
    
    // Reset comment input
    setCommentText('');
  };

  // Function to handle like/unlike a comment
  const handleLikeComment = (commentId) => {
    // Update the plans array
    const updatedPlans = plans.map(plan => {
      if (plan.id === selectedPlan.id) {
        const updatedComments = plan.publicComments.map(comment => {
          if (comment.id === commentId) {
            return { ...comment, likes: comment.likes + 1 };
          }
          return comment;
        });
        
        return { ...plan, publicComments: updatedComments };
      }
      return plan;
    });
    
    setPlans(updatedPlans);
    
    // Update the selected plan for immediate UI update
    const updatedComments = selectedPlan.publicComments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    });
    
    setSelectedPlan({ ...selectedPlan, publicComments: updatedComments });
  };

  // Function to handle document download
  const handleDownloadDocument = (document) => {
    // In a real app, this would trigger a download
    alert(`Downloading ${document.name} (${document.size})`);
  };

  // Function to handle plan sharing
  const handleSharePlan = (plan) => {
    // In a real app, this would open a share dialog
    const message = `Check out this strategic plan: ${plan.title}`;
    alert(`Sharing: ${message}`);
  };

  // Render star rating component
  const StarRating = ({ rating, maxRating = 5, onRate, interactive = false, size = "text-lg" }) => {
    return (
      <div className="flex">
        {[...Array(maxRating)].map((_, i) => (
          <button
            key={i}
            onClick={() => interactive && onRate(i + 1)}
            className={`${size} ${interactive ? "cursor-pointer" : "cursor-default"} focus:outline-none`}
            disabled={!interactive}
          >
            {i < Math.floor(rating) ? (
              <FaStar className="text-yellow-500" />
            ) : (
              <FaRegStar className="text-yellow-500" />
            )}
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Strategic Plans for Ward {currentUser.wardNumber}
          </h1>
          <p className="text-gray-600">
            Review and engage with the strategic development plans that will shape the future of your community
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Active Plans</p>
                <p className="text-xl font-bold text-gray-800">{plans.filter(p => p.status === 'ACTIVE').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Planned</p>
                <p className="text-xl font-bold text-gray-800">{plans.filter(p => p.status === 'PLANNED').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center">
              <div className="bg-gray-100 p-3 rounded-full mr-4">
                <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-xl font-bold text-gray-800">{plans.filter(p => p.status === 'COMPLETED').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Budget</p>
                <p className="text-xl font-bold text-gray-800">
                  {formatCurrency(plans.reduce((sum, plan) => sum + plan.budget, 0))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and sort controls */}
        <div className="mb-6 bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-700 font-medium">Filter by category:</span>
              
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  filter === 'all' 
                    ? 'bg-indigo-100 text-indigo-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              
              <button
                onClick={() => setFilter('INFRASTRUCTURE')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  filter === 'INFRASTRUCTURE' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Infrastructure
              </button>
              
              <button
                onClick={() => setFilter('ECONOMIC_DEVELOPMENT')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  filter === 'ECONOMIC_DEVELOPMENT' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Economic
              </button>
              
              <button
                onClick={() => setFilter('SOCIAL_SERVICES')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  filter === 'SOCIAL_SERVICES' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Social
              </button>
              
              <button
                onClick={() => setFilter('ENVIRONMENTAL')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  filter === 'ENVIRONMENTAL' 
                    ? 'bg-teal-100 text-teal-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Environmental
              </button>
              
              <button
                onClick={() => setFilter('GOVERNANCE')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  filter === 'GOVERNANCE' 
                    ? 'bg-gray-300 text-gray-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Governance
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-700 font-medium">Status:</span>
              
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  statusFilter === 'all' 
                    ? 'bg-indigo-100 text-indigo-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              
              <button
                onClick={() => setStatusFilter('ACTIVE')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  statusFilter === 'ACTIVE' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active
              </button>
              
              <button
                onClick={() => setStatusFilter('PLANNED')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  statusFilter === 'PLANNED' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Planned
              </button>
              
              <button
                onClick={() => setStatusFilter('COMPLETED')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  statusFilter === 'COMPLETED' 
                    ? 'bg-gray-300 text-gray-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Completed
              </button>
            </div>
            
            <div className="flex items-center">
              <label htmlFor="sort-select" className="text-gray-700 font-medium mr-2">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="date">Date (newest)</option>
                <option value="rating">Rating (highest)</option>
                <option value="engagement">Engagement (highest)</option>
                <option value="budget">Budget (highest)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Strategic Plans list */}
        {sortedPlans.length > 0 ? (
          <div className="space-y-6">
            {sortedPlans.map(plan => (
              <div 
                key={plan.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between md:items-center">
                  <h2 className="text-lg font-medium text-gray-800 mb-2 md:mb-0">
                    {plan.title}
                  </h2>
                  <div className="flex items-center gap-2">
                    {getCategoryDisplay(plan.category)}
                    {getStatusDisplay(plan.status)}
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded-full font-medium">
                      {getPlanTimeframe(plan)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center mb-4">
                    <div className="flex items-center md:mr-6 mb-2 md:mb-0">
                      <StarRating rating={plan.averageRating} />
                      <span className="ml-2 text-sm text-gray-600">
                        {plan.averageRating.toFixed(1)} ({plan.ratingCount} ratings)
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-4">
                        <FaComment className="inline mr-1 text-gray-400" /> 
                        {plan.publicComments?.length || 0} comments
                      </span>
                      <span className="text-sm text-gray-600">
                        <FaCalendarAlt className="inline mr-1 text-gray-400" /> 
                        {formatDate(plan.startDate)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6">
                    {plan.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-6">
                    <div>
                      <p className="text-gray-500">Timeline</p>
                      <p className="font-medium text-gray-700">
                        {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500">Department</p>
                      <p className="font-medium text-gray-700">
                        {plan.responsibleDepartment}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500">Budget</p>
                      <p className="font-medium text-gray-700">
                        {formatCurrency(plan.budget)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-700 mb-2">Key Objectives</h3>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      {plan.keyObjectives.slice(0, 2).map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                      {plan.keyObjectives.length > 2 && (
                        <li className="text-indigo-600">
                          +{plan.keyObjectives.length - 2} more objectives
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  {isActivePlan(plan) && (
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-700 mb-2">Plan Progress</p>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500" 
                          style={{ 
                            width: `${calculateProgress(plan.startDate, plan.endDate)}%` 
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{formatDate(plan.startDate)}</span>
                        <span>{calculateProgress(plan.startDate, plan.endDate)}% Complete</span>
                        <span>{formatDate(plan.endDate)}</span>
                      </div>
                    </div>
                  )}
                  
                  {plan.status === 'COMPLETED' && plan.outcomes && (
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-700 mb-2">Key Outcomes</h3>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        {plan.outcomes.slice(0, 2).map((outcome, index) => (
                          <li key={index}>{outcome}</li>
                        ))}
                        {plan.outcomes.length > 2 && (
                          <li className="text-indigo-600">
                            +{plan.outcomes.length - 2} more outcomes
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  {/* User rating section */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-3">Your Rating</h3>
                    <div className="flex items-center">
                      <StarRating 
                        rating={userRatings[plan.id] || 0} 
                        onRate={(rating) => handleRating(plan.id, rating)} 
                        interactive={true} 
                      />
                      <span className="ml-3 text-sm text-gray-600">
                        {userRatings[plan.id] 
                          ? `You rated this ${userRatings[plan.id]} star${userRatings[plan.id] !== 1 ? 's' : ''}` 
                          : 'Rate this plan'
                        }
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex flex-wrap justify-between items-center">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => openPlanDetails(plan)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium focus:outline-none flex items-center"
                    >
                      <FaComment className="mr-2" />
                      <span>Comment</span>
                    </button>
                    
                    <button 
                      onClick={() => handleSharePlan(plan)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium focus:outline-none flex items-center"
                    >
                      <FaShare className="mr-2" />
                      <span>Share</span>
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => openPlanDetails(plan)}
                    className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span>View full plan details</span>
                    <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 7h6" />
            </svg>
            
            <h3 className="text-lg font-medium text-gray-800 mb-2">No strategic plans found</h3>
            
            <p className="text-gray-600">
              {filter === 'all' && statusFilter === 'all'
                ? 'There are currently no strategic plans for your ward.'
                : `There are no ${filter !== 'all' ? filter.toLowerCase().replace('_', ' ') : ''} plans
                   ${statusFilter !== 'all' ? ` with ${statusFilter.toLowerCase()} status` : ''}
                   in your ward at this time.`
              }
            </p>
          </div>
        )}

        {/* Information about strategic plans */}
        <div className="mt-8 bg-indigo-50 rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-2">Understanding Strategic Plans</h2>
          
          <p className="text-gray-700 mb-4">
            Strategic plans outline the municipality's vision and direction for development in your ward. 
            These plans guide resource allocation, project prioritization, and service delivery improvements.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-medium text-gray-800 mb-1">How Plans Are Developed</h3>
              <ol className="list-decimal pl-5 text-gray-700 space-y-1">
                <li>Community needs assessment</li>
                <li>Stakeholder consultation</li>
                <li>Resource evaluation</li>
                <li>Draft plan development</li>
                <li>Public review and feedback</li>
                <li>Council approval</li>
                <li>Implementation and monitoring</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Your Role as a Resident</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Attend public participation meetings</li>
                <li>Provide feedback on draft plans</li>
                <li>Monitor implementation progress</li>
                <li>Report issues or concerns</li>
                <li>Suggest improvements or new initiatives</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-4">
            <a 
              href="/resident/participation"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Participate in Plan Development
            </a>
          </div>
        </div>

        {/* Plan Detail Modal */}
        {showDetailModal && selectedPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-bold text-gray-800">{selectedPlan.title}</h2>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 160px)' }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                  {/* Main content column */}
                  <div className="md:col-span-2">
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {getCategoryDisplay(selectedPlan.category)}
                        {getStatusDisplay(selectedPlan.status)}
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded-full font-medium">
                          {getPlanTimeframe(selectedPlan)}
                        </span>
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <StarRating rating={selectedPlan.averageRating} />
                        <span className="ml-2 text-sm text-gray-600">
                          {selectedPlan.averageRating.toFixed(1)} ({selectedPlan.ratingCount} ratings)
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{selectedPlan.description}</p>
                      
                      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                        <h3 className="font-medium text-gray-800 mb-3">Key Objectives</h3>
                        <ul className="list-disc pl-5 text-gray-700 space-y-2">
                          {selectedPlan.keyObjectives.map((objective, index) => (
                            <li key={index}>{objective}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {isActivePlan(selectedPlan) && (
                        <div className="mb-6">
                          <h3 className="font-medium text-gray-800 mb-3">Plan Progress</h3>
                          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-500" 
                              style={{ 
                                width: `${calculateProgress(selectedPlan.startDate, selectedPlan.endDate)}%` 
                              }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{formatDate(selectedPlan.startDate)}</span>
                            <span>{calculateProgress(selectedPlan.startDate, selectedPlan.endDate)}% Complete</span>
                            <span>{formatDate(selectedPlan.endDate)}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* KPI section for all plans */}
                      {selectedPlan.kpis && selectedPlan.kpis.length > 0 && (
                        <div className="mb-6">
                          <h3 className="font-medium text-gray-800 mb-3">Key Performance Indicators</h3>
                          <div className="space-y-4">
                            {selectedPlan.kpis.map((kpi, index) => (
                              <div key={index}>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium text-gray-700">{kpi.name}</span>
                                  <span className="text-sm text-gray-600">
                                    {selectedPlan.status === 'COMPLETED' 
                                      ? `Target: ${kpi.target}, Achieved: ${kpi.achieved || 'N/A'}`
                                      : `Current: ${kpi.current}, Target: ${kpi.target}`
                                    }
                                  </span>
                                </div>
                                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${selectedPlan.status === 'COMPLETED' 
                                      ? 'bg-green-500' 
                                      : 'bg-indigo-500'}`} 
                                    style={{ 
                                      width: `${selectedPlan.status === 'COMPLETED' 
                                        ? ((kpi.achieved || 0) / kpi.target) * 100
                                        : (kpi.current / kpi.target) * 100
                                      }%` 
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Timeline/Updates */}
                      <div className="mb-6">
                        <h3 className="font-medium text-gray-800 mb-3">Plan Updates</h3>
                        <div className="relative">
                          <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200"></div>
                          <div className="space-y-6">
                            {selectedPlan.updates.map((update, index) => (
                              <div key={index} className="relative flex items-start">
                                <div className="flex-shrink-0">
                                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center ring-4 ring-white z-10">
                                    <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <p className="text-sm font-medium text-gray-900">{formatDate(update.date)}</p>
                                  <p className="mt-1 text-sm text-gray-700">{update.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Completed Plan Outcomes */}
                      {selectedPlan.status === 'COMPLETED' && selectedPlan.outcomes && (
                        <div className="mb-6 bg-green-50 p-4 rounded-lg">
                          <h3 className="font-medium text-gray-800 mb-3">Key Outcomes</h3>
                          <ul className="list-disc pl-5 text-gray-700 space-y-2">
                            {selectedPlan.outcomes.map((outcome, index) => (
                              <li key={index}>{outcome}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* User rating section */}
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-800 mb-3">Your Rating</h3>
                        <div className="flex items-center">
                          <StarRating 
                            rating={userRatings[selectedPlan.id] || 0} 
                            onRate={(rating) => handleRating(selectedPlan.id, rating)} 
                            interactive={true} 
                          />
                          <span className="ml-3 text-sm text-gray-600">
                            {userRatings[selectedPlan.id] 
                              ? `You rated this ${userRatings[selectedPlan.id]} star${userRatings[selectedPlan.id] !== 1 ? 's' : ''}` 
                              : 'Rate this plan'
                            }
                          </span>
                        </div>
                        
                        {/* Rating distribution */}
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Community Rating Distribution</h4>
                          <div className="space-y-1">
                            {[5, 4, 3, 2, 1].map((star) => (
                              <div key={star} className="flex items-center">
                                <span className="w-8 text-sm text-gray-600">{star} ★</span>
                                <div className="flex-1 h-2 mx-2 bg-gray-200 rounded">
                                  <div 
                                    className="h-full bg-yellow-400 rounded" 
                                    style={{ 
                                      width: `${(selectedPlan.ratingDistribution[star-1] / selectedPlan.ratingCount) * 100}%` 
                                    }}
                                  />
                                </div>
                                <span className="w-8 text-xs text-gray-500 text-right">
                                  {selectedPlan.ratingDistribution[star-1]}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Public Comments Section */}
                      <div className="mb-6">
                        <h3 className="font-medium text-gray-800 mb-3">Public Comments</h3>
                        
                        {/* Comment form */}
                        <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow">
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Leave a Comment</h4>
                          <form onSubmit={handleCommentSubmit}>
                            <textarea
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-20"
                              placeholder="Share your thoughts or questions about this plan"
                              required
                            />
                            <div className="flex justify-end gap-2 mt-2">
                              <button
                                type="button"
                                onClick={() => setShowDetailModal(false)}
                                className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
                              >
                                Cancel
                              </button>
                              
                              <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Submit Comment
                              </button>
                            </div>
                          </form>
                        </div>
                        
                        {/* Existing comments */}
                        {selectedPlan.publicComments.length > 0 ? (
                          <div className="space-y-4">
                            {selectedPlan.publicComments.map(comment => (
                              <div key={comment.id} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
                                <div className="flex-shrink-0">
                                  <img src={comment.userAvatar} alt={comment.userName} className="h-10 w-10 rounded-full" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-center mb-1">
                                    <div className="text-sm font-medium text-gray-800">
                                      {comment.userName}
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-gray-500">
                                        {formatDate(comment.date)}
                                      </span>
                                      
                                      <button
                                        onClick={() => handleLikeComment(comment.id)}
                                        className="flex items-center text-gray-500 hover:text-gray-700 text-xs"
                                      >
                                        <FaThumbsUp className="mr-1" />
                                        {comment.likes}
                                      </button>
                                    </div>
                                  </div>
                                  
                                  <p className="text-gray-700 text-sm mb-2">
                                    {comment.text}
                                  </p>
                                  
                                  {/* Replies section */}
                                  {comment.replies.length > 0 && (
                                    <div className="ml-4 mt-2 border-l border-gray-200 pl-4">
                                      {comment.replies.map(reply => (
                                        <div key={reply.id} className="flex gap-3 py-2">
                                          <div className="flex-shrink-0">
                                            <img src={reply.userAvatar} alt={reply.userName} className="h-8 w-8 rounded-full" />
                                          </div>
                                          
                                          <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                              <div className="text-sm font-medium text-gray-800">
                                                {reply.userName}
                                              </div>
                                              
                                              <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-500">
                                                  {formatDate(reply.date)}
                                                </span>
                                                
                                                <button
                                                  onClick={() => handleLikeComment(reply.id)}
                                                  className="flex items-center text-gray-500 hover:text-gray-700 text-xs"
                                                >
                                                  <FaThumbsUp className="mr-1" />
                                                  {reply.likes}
                                                </button>
                                              </div>
                                            </div>
                                            
                                            <p className="text-gray-700 text-sm">
                                              {reply.text}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm text-center">
                            No comments yet. Be the first to comment!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StrategicPlans;