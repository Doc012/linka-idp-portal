import { useState } from 'react';
import { FaExclamationTriangle, FaCheckCircle, FaMapMarkerAlt, FaCamera, FaInfoCircle } from 'react-icons/fa';

const ReportIssue = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Mock user data - in a real app, this would come from authentication context
  const currentUser = {
    userID: 2,
    name: "Sarah Mthembu",
    wardNumber: 5,
    address: "123 Meyerton Street, Sicelo"
  };
  
  // Mock projects data
  const mockProjects = [
    { id: 101, title: "Sicelo Road Rehabilitation Project", wardId: 5 },
    { id: 105, title: "Meyerton Water Supply Upgrade", wardId: 5 },
    { id: 201, title: "Sicelo Small Business Hub", wardId: 5 },
    { id: 301, title: "Midvaal Mobile App Development", wardId: 5 }
  ];
  
  // Mock issue categories
  const issueCategories = [
    { id: 'ROADS', name: 'Roads & Transport', icon: '🚗' },
    { id: 'WATER', name: 'Water & Sanitation', icon: '💧' },
    { id: 'ELECTRICITY', name: 'Electricity', icon: '⚡' },
    { id: 'WASTE', name: 'Waste Management', icon: '🗑️' },
    { id: 'PUBLIC_SPACES', name: 'Parks & Public Spaces', icon: '🌳' },
    { id: 'SAFETY', name: 'Safety & Security', icon: '🛡️' },
    { id: 'OTHER', name: 'Other', icon: '📋' }
  ];
  
  // Mock recent issues in ward
  const recentIssues = [
    {
      id: 4501,
      category: 'WATER',
      categoryName: 'Water & Sanitation',
      title: 'Water leak on Magnolia Avenue',
      status: 'IN_PROGRESS',
      statusLabel: 'In Progress',
      reportedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
      id: 4498,
      category: 'ROADS',
      categoryName: 'Roads & Transport',
      title: 'Pothole at corner of Oak and Pine Street',
      status: 'RESOLVED',
      statusLabel: 'Resolved',
      reportedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
    },
    {
      id: 4480,
      category: 'ELECTRICITY',
      categoryName: 'Electricity',
      title: 'Street light not working on Dahlia Road',
      status: 'ASSIGNED',
      statusLabel: 'Assigned',
      reportedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    }
  ];
  
  const [issueData, setIssueData] = useState({
    userId: currentUser.userID,
    wardId: currentUser.wardNumber,
    projectId: '',
    category: '',
    title: '',
    description: '',
    location: '',
    useCurrentLocation: false,
    images: [],
    status: 'OPEN'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // For checkbox inputs
      setIssueData({ 
        ...issueData, 
        [name]: checked,
        // If "use current location" is checked, fill with mock location
        ...(name === 'useCurrentLocation' && checked ? { location: currentUser.address } : {})
      });
    } else {
      // For all other inputs
      setIssueData({ ...issueData, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setShowPreview(true);
      
      // In a real app, you would upload this file to a server
      // For this mock version, we just track that an image was added
      setIssueData({
        ...issueData,
        images: [...issueData.images, { 
          id: Date.now(), // Use timestamp as mock ID
          name: file.name,
          size: file.size,
          url: previewUrl
        }]
      });
    }
  };

  const removeImage = (imageId) => {
    setIssueData({
      ...issueData,
      images: issueData.images.filter(img => img.id !== imageId)
    });
    
    if (issueData.images.length <= 1) {
      setShowPreview(false);
      setImagePreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!issueData.title || !issueData.description || !issueData.category) {
      setError('Please fill out all required fields.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Reset form and show success message
      setIssueData({
        userId: currentUser.userID,
        wardId: currentUser.wardNumber,
        projectId: '',
        category: '',
        title: '',
        description: '',
        location: '',
        useCurrentLocation: false,
        images: [],
        status: 'OPEN'
      });
      
      setSuccess(true);
      setShowPreview(false);
      setImagePreview(null);
      setLoading(false);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }, 1500);
  };

  // Format date for display
  const formatDate = (date) => {
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Report an Issue
        </h1>
        <p className="text-gray-600">
          Help improve your community by reporting issues in Ward {currentUser.wardNumber}
        </p>
      </div>

      {/* Success message */}
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-6 flex items-start">
          <FaCheckCircle className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium">Issue reported successfully!</p>
            <p className="text-sm">Your issue has been submitted to the municipality. You can track its progress in the "My Issues" section.</p>
            <p className="text-sm mt-2">Reference number: <span className="font-medium">INC-{Math.floor(100000 + Math.random() * 900000)}</span></p>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 flex items-start">
          <FaExclamationTriangle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium">There was a problem</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-800">Issue Details</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {issueCategories.map(category => (
                      <div 
                        key={category.id}
                        className={`border rounded-lg p-3 text-center cursor-pointer transition-all hover:border-indigo-500 ${
                          issueData.category === category.id 
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                            : 'border-gray-200'
                        }`}
                        onClick={() => setIssueData({...issueData, category: category.id})}
                      >
                        <div className="text-2xl mb-1">{category.icon}</div>
                        <div className="text-sm font-medium">{category.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-5">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Issue Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={issueData.title}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="E.g., Pothole on Main Street"
                    required
                  />
                </div>
                
                <div className="mb-5">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={issueData.description}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Please provide details about the issue, including how long it has existed and any impact on the community."
                    rows="5"
                    required
                  />
                </div>
                
                <div className="mb-5">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                    Location
                  </label>
                  <div className="flex items-center mb-2">
                    <input
                      id="useCurrentLocation"
                      name="useCurrentLocation"
                      type="checkbox"
                      checked={issueData.useCurrentLocation}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="useCurrentLocation" className="ml-2 block text-sm text-gray-700">
                      Use my current address
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={issueData.location}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-3 pl-10 pr-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter the location of the issue"
                      disabled={issueData.useCurrentLocation}
                    />
                  </div>
                </div>
                
                <div className="mb-5">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                    Add Photos
                  </label>
                  <div className="mt-1 flex items-center">
                    <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-indigo-500 focus:outline-none">
                      <div className="flex flex-col items-center space-y-2">
                        <FaCamera className="w-6 h-6 text-gray-400" />
                        <span className="font-medium text-gray-600">
                          {issueData.images.length === 0 
                            ? 'Click to add photos'
                            : 'Add more photos'}
                        </span>
                        <span className="text-xs text-gray-500">
                          Maximum 3 photos (JPG, PNG)
                        </span>
                      </div>
                      <input 
                        type="file" 
                        name="images" 
                        accept="image/*"
                        className="hidden" 
                        onChange={handleImageUpload}
                        disabled={issueData.images.length >= 3}
                      />
                    </label>
                  </div>
                  
                  {/* Image Previews */}
                  {issueData.images.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-3">
                      {issueData.images.map(image => (
                        <div key={image.id} className="relative">
                          <img 
                            src={image.url} 
                            alt="Preview" 
                            className="h-20 w-full object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(image.id)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="mb-5">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectId">
                    Related Project (Optional)
                  </label>
                  <select
                    id="projectId"
                    name="projectId"
                    value={issueData.projectId}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">None (General Issue)</option>
                    {mockProjects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    If this issue is related to a specific project in your ward, please select it.
                  </p>
                </div>
                
                <div className="mb-6">
                  <p className="block text-gray-700 text-sm font-bold mb-2">
                    Ward
                  </p>
                  <div className="bg-gray-100 rounded px-4 py-3 text-gray-700">
                    Ward {currentUser.wardNumber}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Issues are automatically assigned to your ward.
                  </p>
                </div>
                
                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors duration-150 flex items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : 'Submit Issue'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-indigo-50 rounded-lg p-6 sticky top-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">What happens next?</h2>
            
            <ol className="space-y-4">
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-indigo-200 text-indigo-800 font-medium text-sm mr-3">1</div>
                <div className="text-gray-700">
                  <p className="font-medium">Review</p>
                  <p className="text-sm">Your issue will be reviewed by the ward councillor or municipality staff.</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-indigo-200 text-indigo-800 font-medium text-sm mr-3">2</div>
                <div className="text-gray-700">
                  <p className="font-medium">Prioritization</p>
                  <p className="text-sm">The issue will be assigned a priority level based on urgency and impact.</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-indigo-200 text-indigo-800 font-medium text-sm mr-3">3</div>
                <div className="text-gray-700">
                  <p className="font-medium">Updates</p>
                  <p className="text-sm">You'll receive updates on the status of your issue via your account dashboard.</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-indigo-200 text-indigo-800 font-medium text-sm mr-3">4</div>
                <div className="text-gray-700">
                  <p className="font-medium">Resolution</p>
                  <p className="text-sm">Once resolved, you'll be notified of the outcome.</p>
                </div>
              </li>
            </ol>
            
            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="flex">
                <FaInfoCircle className="text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">For emergencies</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    For urgent matters requiring immediate attention, 
                    please call the municipality hotline at:
                  </p>
                  <p className="text-base font-bold text-yellow-800 mt-1">(012) 345-6789</p>
                </div>
              </div>
            </div>
            
            {/* Recent community issues */}
            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-800 mb-3">Recent Issues in Your Ward</h3>
              <div className="space-y-3">
                {recentIssues.map(issue => (
                  <div key={issue.id} className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-indigo-600">{issue.categoryName}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        issue.status === 'RESOLVED' 
                          ? 'bg-green-100 text-green-800' 
                          : issue.status === 'IN_PROGRESS' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                      }`}>
                        {issue.statusLabel}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 mt-1">{issue.title}</p>
                    <p className="text-xs text-gray-500 mt-1">Reported {formatDate(issue.reportedDate)}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <button 
                  type="button"
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View all issues in your ward
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;