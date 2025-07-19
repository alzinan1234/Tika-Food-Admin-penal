'use client';

import React, { useState, useMemo } from 'react'; // Added useMemo for performance
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // Importing from heroicons
// Removed Lucide icons for ArrowLeft, Plus, Edit2, Trash2 as they are no longer needed
// import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react';

// Mock user data (now includes a status for blocking and accountType)
const initialUsers = new Array(35).fill(null).map((_, i) => ({ // Increased users for pagination demo
  id: `user-${i + 1}`,
  name: `Robo Gladiator ${i + 1}`,
  email: `robo${i + 1}@gmail.com`,
  accountType: i % 2 === 0 ? 'User' : 'Rider', // Added accountType
  date: `March ${15 + (i % 31)}, 2024`, // Varying date
  avatar: 'https://placehold.co/24x24/cccccc/000000?text=A', // Using a placeholder image URL
  status: 'active', // 'active' or 'blocked'
}));


// UserManagement Component (main component)
const UserManagement = () => {
  // Removed showJobTitlesModal state
  // const [showJobTitlesModal, setShowJobTitlesModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUsers, setCurrentUsers] = useState(initialUsers); // State to manage user data
  const [currentPage, setCurrentPage] = useState(1); // New state for current page
  const itemsPerPage = 5; // Number of items per page

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm) {
      return currentUsers;
    }
    return currentUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.accountType.toLowerCase().includes(searchTerm.toLowerCase()) // Include accountType in search
    );
  }, [searchTerm, currentUsers]);

  // Calculate users for the current page
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsersDisplayed = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle blocking/unblocking a user
  const handleBlockToggle = (userId) => {
    setCurrentUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
          : user
      )
    );
  };

  // Handle viewing user details - now logs to console instead of routing
  const handleViewUser = (userId) => {
    console.log(`Attempting to view details for user ID: ${userId}`);
    // For this isolated environment, direct client-side routing is not available.
    // You could implement a simple custom modal here to display user details if needed.
  };

  // Function to render page numbers dynamically
  const renderPageNumbers = () => {
    const pageNumbers = [];
    // Always show first few pages, and last few pages, with "..." in between if many pages
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) pageNumbers.push('...');
      if (currentPage > 2) pageNumbers.push(currentPage - 1);
      pageNumbers.push(currentPage);
      if (currentPage < totalPages - 1) pageNumbers.push(currentPage + 1);
      if (currentPage < totalPages - 2) pageNumbers.push('...');
      if (currentPage !== totalPages) pageNumbers.push(totalPages);
    }

    return pageNumbers.map((num, index) => (
      num === '...' ? (
        <span key={index} className="px-2 text-gray-500">.....</span>
      ) : (
        <button
          key={index}
          onClick={() => handlePageChange(num)}
          className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
            currentPage === num ? 'bg-[#B92921] text-white' : 'hover:bg-gray-100 text-black'
          }`}
        >
          {num}
        </button>
      )
    ));
  };


  return (
    <>
      <div className="bg-white rounded-lg text-black p-6"> {/* Changed bg to white and text to black */}
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">User Management</h2>
          <div className="flex items-center gap-2">
            {/* Removed "Manage Service provider job titles" button */}
            <div className="flex items-center ">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-tl-[7.04px] rounded-bl-[7.04px] border-[1px] border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-black" // Adjusted for white background
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                />
              </div>
              {/* Filter button with SVG - now acts as a visual trigger for search */}
              <button
                onClick={() => setSearchTerm(searchTerm)} // Re-apply current search term (triggers memoized filter)
                className="hover:bg-gray-200 transition-colors bg-[#C12722] p-[7px] rounded-tr-[7.04px] rounded-br-[7.04px] border-[1px] border-gray-300" // Adjusted for white background
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M11 8.5L20 8.5"
                    stroke="white" // Changed stroke to black
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 16.5L14 16.5"
                    stroke="white" // Changed stroke to black
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <ellipse
                    cx="7"
                    cy="8.5"
                    rx="3"
                    ry="3"
                    transform="rotate(90 7 8.5)"
                    stroke="white" // Changed stroke to black
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <ellipse
                    cx="17"
                    cy="16.5"
                    rx="3"
                    ry="3"
                    transform="rotate(90 17 16.5)"
                    stroke="white" // Changed stroke to black
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#C12722]">
              <tr className="text-sm text-white">
                <th className="py-3 px-4 text-center">User ID</th>
                <th className="py-3 px-4 text-center">Name</th>
                <th className="py-3 px-4 text-center">Email</th>
                <th className="py-3 px-4 text-center">Account Type</th> {/* Added Account Type column */}
                <th className="py-3 px-4 text-center">Registration Date</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsersDisplayed.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-600 border-b border-gray-300"> {/* Adjusted colspan and text color */}
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                currentUsersDisplayed.map((user) => (
                  <tr key={user.id} className="text-sm text-black border-b border-gray-200 hover:bg-gray-50"> {/* Changed text to black and hover bg */}
                    <td className="py-2 px-4 text-center ">
                      {user.id}
                    </td>
                    <td className="py-2 px-4 text-center ">
                      <div className="flex justify-center items-center gap-2">
                        <img
                          src={user.avatar}
                          alt="avatar"
                          width={24}
                          height={24}
                          className="rounded-full"
                          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/24x24/cccccc/000000?text=A" }}
                        />
                        {user.name}
                      </div>
                    </td>
                    <td className="py-2 px-4 text-center ">
                      {user.email}
                    </td>
                    <td className="py-2 px-4 text-center ">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.accountType === 'User'
                            ? 'bg-yellow-100 text-yellow-800' // Example color for User
                            : 'bg-blue-100 text-blue-800' // Example color for Rider
                        }`}>
                        {user.accountType}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-center ">
                      {user.date}
                    </td>
                    <td className="py-2 px-4 text-center ">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleViewUser(user.id)}
                          className="px-3 py-1 text-xs border border-[#C267FF] text-[#C267FF] bg-[#C267FF1A] rounded-full cursor-pointer hover:opacity-80" // Adjusted bg for light theme
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleBlockToggle(user.id)}
                          className={`px-3 py-1 text-xs border rounded-full cursor-pointer hover:opacity-80 ${
                            user.status === 'blocked'
                              ? 'bg-[#B200001A] border-[#FF0000] text-[#FF0000]'
                              : 'bg-green-600/10 border-green-600 text-green-600' // Example active color, adjusted for light theme
                          }`}
                        >
                          {user.status === 'blocked' ? 'Unblock' : 'Block'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-6 gap-2 text-sm text-black"> {/* Changed text to black */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center border border-[#B92921] rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" // Adjusted hover bg
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M6.99995 13C6.99995 13 1.00001 8.58107 0.999999 6.99995C0.999986 5.41884 7 1 7 1" stroke="#B92921" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> {/* Changed stroke to gray-600 */}
          </svg>
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center border border-[#B92921] rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" // Adjusted hover bg
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M1.00005 1C1.00005 1 6.99999 5.41893 7 7.00005C7.00001 8.58116 1 13 1 13" stroke="#B92921" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> {/* Changed stroke to gray-600 */}
          </svg>
        </button>
      </div>
    </>
  );
};

export default UserManagement;