import { useState, useEffect } from 'react';
import { getResidentUser } from '../../data/users';

const MyIssues = () => {
  const residentUser = getResidentUser();
  
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data with 2025 dates
        const mockIssues = [
          {
            id: 4872,
            title: 'Pothole on Main Street',
            description: 'Large pothole causing traffic problems near the intersection with Oak Avenue. Multiple vehicles have been damaged.',
            category: 'Roads and Transport',
            location: '123 Main St, Ward 5',
            severity: 'high',
            status: 'pending',
            submittedDate: '2025-05-24T14:30:00Z', // 2 days ago from May 26, 2025
            lastUpdated: '2025-05-25T09:15:00Z', // 1 day ago
            assignedTo: 'Road Maintenance Team',
            referenceNumber: 'INC-2025-4872'
          },
          {
            id: 4851,
            title: 'Streetlight not working',
            description: 'Streetlight has been out for 3 days causing safety concerns for pedestrians in the evening. The pole number is SL-452.',
            category: 'Electricity',
            location: 'Corner of Oak and Pine, Ward 5',
            severity: 'medium',
            status: 'in-progress',
            submittedDate: '2025-05-18T10:30:00Z', // 8 days ago
            lastUpdated: '2025-05-23T16:45:00Z', // 3 days ago
            assignedTo: 'Electrical Services',
            referenceNumber: 'INC-2025-4851',
            updates: [
              { date: '2025-05-20T09:30:00Z', text: 'Issue verified by municipal inspector' },
              { date: '2025-05-23T16:45:00Z', text: 'Maintenance team scheduled for repair on May 27, 2025' }
            ]
          },
          {
            id: 4803,
            title: 'Garbage not collected',
            description: 'Garbage has not been collected for the past 2 weeks. This is causing hygiene concerns and attracting pests.',
            category: 'Waste Management',
            location: 'Maple Avenue, Ward 5',
            severity: 'medium',
            status: 'resolved',
            submittedDate: '2025-05-12T09:20:00Z', // 14 days ago
            lastUpdated: '2025-05-14T14:30:00Z', // 12 days ago
            assignedTo: 'Waste Management Department',
            resolution: 'Collection schedule updated and garbage collected. Area supervisor has implemented monitoring to prevent recurrence.',
            referenceNumber: 'INC-2025-4803',
            updates: [
              { date: '2025-05-12T15:45:00Z', text: 'Issue logged with Waste Management Department' },
              { date: '2025-05-13T10:20:00Z', text: 'Waste collection team dispatched' },
              { date: '2025-05-14T14:30:00Z', text: 'Issue resolved - waste collected and area cleaned' }
            ],
            satisfaction: {
              rating: 4,
              feedback: 'Quick response once the issue was assigned. Would appreciate more regular collection in future.'
            }
          },
          {
            id: 4756,
            title: 'Water leak on Acacia Drive',
            description: 'Water leaking from a pipe near the sidewalk. The area is becoming muddy and slippery.',
            category: 'Water and Sanitation',
            location: '45 Acacia Drive, Ward 5',
            severity: 'high',
            status: 'resolved',
            submittedDate: '2025-04-30T11:20:00Z', // About 4 weeks ago
            lastUpdated: '2025-05-02T13:45:00Z', // About 3.5 weeks ago
            assignedTo: 'Water Services Department',
            resolution: 'Pipe repaired and area restored. Preventive maintenance scheduled for surrounding infrastructure.',
            referenceNumber: 'INC-2025-4756',
            updates: [
              { date: '2025-04-30T14:30:00Z', text: 'Emergency team dispatched to assess leak' },
              { date: '2025-05-01T08:15:00Z', text: 'Repair work commenced' },
              { date: '2025-05-02T13:45:00Z', text: 'Repair completed and water supply restored' }
            ],
            satisfaction: {
              rating: 5,
              feedback: 'Excellent response time and the team was very professional.'
            }
          }
        ];
        
        setIssues(mockIssues);
        
      } catch (err) {
        console.error('Error fetching issues:', err);
        setError('Failed to load your issues. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchIssues();
  }, []);
  
  // Filter issues based on status
  const filteredIssues = filter === 'all' 
    ? issues 
    : issues.filter(issue => issue.status === filter);
  
  // Format date for display with 2025 context
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date('2025-05-26'); // Current date for the presentation
    
    // Calculate difference in days
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // For very recent dates (last 7 days), show relative time
    if (diffDays < 1) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    }
    
    // For older dates, show formatted date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-ZA', options);
  };
  
  // Get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Issues</h1>
        <a 
          href="/resident/report-issue" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Report New Issue
        </a>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {/* Filter tabs */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'all' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            All Issues
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'pending' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilter('in-progress')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'in-progress' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            In Progress
          </button>
          <button 
            onClick={() => setFilter('resolved')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'resolved' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Resolved
          </button>
        </div>
      </div>
      
      {/* Issues list */}
      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading your issues...</p>
        </div>
      ) : filteredIssues.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-10 text-center">
          <h2 className="text-xl font-medium text-gray-700 mb-2">No issues found</h2>
          <p className="text-gray-500 mb-4">
            {filter === 'all' 
              ? "You haven't reported any issues yet." 
              : `You don't have any ${filter} issues.`}
          </p>
          <a 
            href="/resident/report-issue" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Report an Issue
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredIssues.map(issue => (
            <div key={issue.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">{issue.title}</h2>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <span className="mr-4">ID: #{issue.id}</span>
                      <span>Reported on {formatDate(issue.submittedDate)}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(issue.status)}`}>
                    {issue.status.replace('-', ' ')}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">{issue.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Category</p>
                    <p className="font-medium">{issue.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Location</p>
                    <p className="font-medium">{issue.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Severity</p>
                    <p className="font-medium capitalize">{issue.severity}</p>
                  </div>
                </div>
                
                {issue.status !== 'pending' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Assigned To</p>
                        <p className="font-medium">{issue.assignedTo}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Last Updated</p>
                        <p className="font-medium">{formatDate(issue.lastUpdated)}</p>
                      </div>
                    </div>
                    
                    {issue.resolution && (
                      <div className="mt-2">
                        <p className="text-gray-500">Resolution</p>
                        <p className="font-medium">{issue.resolution}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIssues;