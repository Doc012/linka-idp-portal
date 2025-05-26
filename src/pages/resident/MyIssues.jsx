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
        
        // Mock data - in a real app, this would come from an API
        const mockIssues = [
          {
            id: 1,
            title: 'Pothole on Main Street',
            description: 'Large pothole causing traffic problems',
            category: 'Roads and Transport',
            location: '123 Main St, Ward 2',
            severity: 'high',
            status: 'pending',
            submittedDate: '2023-05-20T14:30:00Z',
            lastUpdated: '2023-05-21T09:15:00Z',
            assignedTo: 'Road Maintenance Team'
          },
          {
            id: 2,
            title: 'Streetlight not working',
            description: 'Streetlight has been out for 3 days causing safety concerns',
            category: 'Electricity',
            location: 'Corner of Oak and Pine, Ward 2',
            severity: 'medium',
            status: 'in-progress',
            submittedDate: '2023-05-15T10:30:00Z',
            lastUpdated: '2023-05-18T16:45:00Z',
            assignedTo: 'Electrical Services'
          },
          {
            id: 3,
            title: 'Garbage not collected',
            description: 'Garbage has not been collected for the past 2 weeks',
            category: 'Waste Management',
            location: 'Maple Avenue, Ward 2',
            severity: 'medium',
            status: 'resolved',
            submittedDate: '2023-05-10T09:20:00Z',
            lastUpdated: '2023-05-12T14:30:00Z',
            assignedTo: 'Waste Management Department',
            resolution: 'Collection schedule updated and garbage collected'
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
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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