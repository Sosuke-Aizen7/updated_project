import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const CourseComparison = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const initialCourseId = location.state?.courseId;
  
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState(
    initialCourseId ? [initialCourseId] : []
  );
  const [loading, setLoading] = useState(true);
  const [compareData, setCompareData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/courses/`);
        setCourses(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Could not load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchCompareData = async () => {
      if (selectedCourses.length === 0) {
        setCompareData([]);
        return;
      }

      try {
        setLoading(true);
        const courseData = await Promise.all(
          selectedCourses.map(async (courseId) => {
            const response = await axios.get(`${API_URL}/api/courses/${courseId}/`);
            return response.data;
          })
        );
        setCompareData(courseData);
      } catch (err) {
        console.error('Error fetching course details:', err);
        setError('Could not load course details for comparison. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompareData();
  }, [selectedCourses]);

  const handleCourseSelect = (e) => {
    const courseId = parseInt(e.target.value);
    if (courseId && !selectedCourses.includes(courseId)) {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const handleRemoveCourse = (courseId) => {
    setSelectedCourses(selectedCourses.filter(id => id !== courseId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Compare Courses</h1>
        
        {!isAuthenticated ? (
          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Please <Link to="/login" className="font-medium underline">log in</Link> to use the course comparison feature.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Select Courses</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Choose up to 3 courses to compare side by side.
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                          Add Course to Compare
                        </label>
                        <select
                          id="course"
                          name="course"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          onChange={handleCourseSelect}
                          value=""
                          disabled={selectedCourses.length >= 3 || loading}
                        >
                          <option value="">Select a course</option>
                          {courses
                            .filter(course => !selectedCourses.includes(course.id))
                            .map((course) => (
                              <option key={course.id} value={course.id}>
                                {course.name} - {course.university_name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    
                    {selectedCourses.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700">Selected courses:</h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {compareData.map((course) => (
                            <div key={course.id} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                              {course.name} - {course.university_name}
                              <button
                                type="button"
                                className="ml-2 inline-flex text-primary-400 hover:text-primary-600"
                                onClick={() => handleRemoveCourse(course.id)}
                              >
                                <span className="sr-only">Remove</span>
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {error && (
              <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {loading && selectedCourses.length > 0 ? (
              <div className="mt-8 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : compareData.length > 0 ? (
              <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Course Comparison
                  </h3>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Feature
                        </th>
                        {compareData.map((course) => (
                          <th key={course.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {course.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          University
                        </td>
                        {compareData.map((course) => (
                          <td key={course.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {course.university_name}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Level
                        </td>
                        {compareData.map((course) => (
                          <td key={course.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {course.level}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Duration
                        </td>
                        {compareData.map((course) => (
                          <td key={course.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {course.duration}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Fees
                        </td>
                        {compareData.map((course) => (
                          <td key={course.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${course.fees}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Actions
                        </td>
                        {compareData.map((course) => (
                          <td key={course.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <Link
                              to={`/courses/${course.id}`}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              View Details
                            </Link>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
                <p className="text-gray-500">Select courses to compare them side by side.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default CourseComparison;
