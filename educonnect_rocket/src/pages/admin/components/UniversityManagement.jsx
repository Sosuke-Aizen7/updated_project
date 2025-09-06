import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const UniversityManagement = ({ universities }) => {
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleSelectUniversity = (universityId) => {
    setSelectedUniversities(prev => 
      prev.includes(universityId) 
        ? prev.filter(id => id !== universityId)
        : [...prev, universityId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUniversities.length === universities.length) {
      setSelectedUniversities([]);
    } else {
      setSelectedUniversities(universities.map(university => university.id));
    }
  };

  const filteredUniversities = universities?.filter(university => {
    return filterStatus === 'all' || university.status === filterStatus;
  }) || [];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">University Management</h3>
          <Button className="bg-primary text-white">Add New University</Button>
        </div>
        
        {/* Filters */}
        <div className="flex gap-4 mb-4">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending Verification</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedUniversities.length > 0 && (
          <div className="flex gap-2 mb-4">
            <Button variant="outline" size="sm">Verify Selected</Button>
            <Button variant="outline" size="sm">Suspend Selected</Button>
            <Button variant="outline" size="sm">Delete Selected</Button>
          </div>
        )}
      </div>

      {/* Universities Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedUniversities.length === universities?.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                University
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Courses
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applications
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUniversities.map((university) => (
              <tr key={university.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUniversities.includes(university.id)}
                    onChange={() => handleSelectUniversity(university.id)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{university.name}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {university.country}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    university.status === 'verified' ? 'bg-green-100 text-green-800' : 
                    university.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {university.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {university.coursesCount}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {university.applicationsCount?.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">View Profile</Button>
                    {university.status === 'pending' && (
                      <Button variant="outline" size="sm" className="text-green-600">Verify</Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UniversityManagement;
