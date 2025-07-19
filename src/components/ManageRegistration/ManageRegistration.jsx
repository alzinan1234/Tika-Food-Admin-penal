// components/RegistrationTable.js
"use client"; // This is a client component, necessary for useState and event handlers

import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

// Assuming 'eye.svg' is in your public/icon directory
import eyeIcon from "../../../public/icon/eye.svg";

// Dummy data (can be replaced with an actual API call)
const dummyRows = [
  {
    id: "reg-001",
    name: "Robo Gladiators",
    type: "Vendor",
    subscriptionType: "Annual",
    email: "robogladiators@gmail.com",
    registrationDate: "March 15, 2024",
    // Added for modal content, assuming all registrations, regardless of type, have these fields for this display
    venueName: "Urban Palate",
    phoneNumber: "(319) 555-0115",
    location: "Downtown LA",
    hoursOfOperation: 24,
    capacity: 319,
    agreeToDisplayQR: true,
    interestedInAppPromotion: true,
    allowNikoSafeRewards: true,
    allowVenueEvents: true,
  },
  {
    id: "reg-002",
    name: "Robo Gladiators",
    type: "Service Provider", // This will be displayed with venue data from the dummyRows
    subscriptionType: "Annual",
    email: "service@gmail.com",
    registrationDate: "March 15, 2024",
    venueName: "Tech Haven",
    phoneNumber: "(123) 456-7890",
    location: "Cyber City",
    hoursOfOperation: 12,
    capacity: 150,
    agreeToDisplayQR: false,
    interestedInAppPromotion: true,
    allowNikoSafeRewards: false,
    allowVenueEvents: true,
  },
  {
    id: "reg-003",
    name: "Robo Gladiators",
    type: "Service Provider", // This will be displayed with venue data from the dummyRows
    subscriptionType: "Annual",
    email: "provider@gmail.com",
    registrationDate: "March 15, 2024",
    venueName: "Innovate Hub",
    phoneNumber: "(987) 654-3210",
    location: "Innovation Park",
    hoursOfOperation: 16,
    capacity: 500,
    agreeToDisplayQR: true,
    interestedInAppPromotion: false,
    allowNikoSafeRewards: true,
    allowVenueEvents: false,
  },
  {
    id: "reg-004",
    name: "Robo Gladiators",
    type: "Vendor",
    subscriptionType: "Annual",
    email: "vendor@gmail.com",
    registrationDate: "March 15, 2024",
    venueName: "Gadget World",
    phoneNumber: "(555) 111-2222",
    location: "Mall Central",
    hoursOfOperation: 10,
    capacity: 200,
    agreeToDisplayQR: false,
    interestedInAppPromotion: false,
    allowNikoSafeRewards: false,
    allowVenueEvents: false,
  },
];

export default function ManageRegistration() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState(dummyRows);
  const router = useRouter(); // Initialize useRouter

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const newFilteredRows = dummyRows.filter(
      (row) =>
        row.name.toLowerCase().includes(term) ||
        row.type.toLowerCase().includes(term) ||
        row.subscriptionType.toLowerCase().includes(term) ||
        row.email.toLowerCase().includes(term) ||
        row.registrationDate.toLowerCase().includes(term)
    );
    setFilteredRows(newFilteredRows);
  };

  // Action handlers
  const handleView = (rowId) => {
    // Navigate to the dynamic details page
    // IMPORTANT: Ensure this path matches your actual file structure for the dynamic page.
    // If your dynamic page is at app/registrations/[id]/page.js, this path is correct.
    // If it's different, update this path accordingly.
    router.push(`/admin/manage-registrations/${rowId}`);
  };

  const handleDelete = (rowId) => {
    // Replaced window.confirm with a custom modal in a real app.
    // For this example, keeping confirm as per original code, but noting the best practice.
    if (confirm(`Are you sure you want to delete ${rowId}?`)) {
      alert(`Deleting: ${rowId}`); // Replaced window.alert with a custom modal.
      setFilteredRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
    }
  };

  const handleEdit = (rowId) => {
    alert(`Editing: ${rowId}`); // Replaced window.alert with a custom modal.
    // Implement edit form/modal logic here
  };

  const handleFilterClick = () => {
    alert("Filter button clicked! (Implement your filter modal/logic here)"); // Replaced window.alert with a custom modal.
    // This button could open a modal for advanced filtering,
    // or apply predefined filters based on application needs.
  };

  return (
    <div className="bg-[#343434] p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[20px] font-semibold text-white">
          Manage Registrations
        </h2>

        {/* Search Input Field and Filter Button */}
        <div className="flex items-center">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 bg-[#F3FAFA1A] rounded-tl-[7.04px] rounded-bl-[7.04px] border-[1px] border-[#0000001A] text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <button
            onClick={handleFilterClick}
            className="hover:bg-gray-700 transition-colors bg-[#2A2A2A] p-[5px] rounded-tr-[7.04px] rounded-br-[7.04px]"
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
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M4 16.5L14 16.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <ellipse
                cx="7"
                cy="8.5"
                rx="3"
                ry="3"
                transform="rotate(90 7 8.5)"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <ellipse
                cx="17"
                cy="16.5"
                rx="3"
                ry="3"
                transform="rotate(90 17 16.5)"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Info row before table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-white bg-[#00C1C980] border-b border-gray-700 ">
              <th className="py-2 font-[700] text-[14px] text-center">Name</th>
              <th className="text-center">Type</th>
              <th className="text-center">Subscription Type</th>
              <th className="text-center">Email</th>
              <th className="text-center">Registration Date</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row) => (
                <tr key={row.id} className="border-b border-gray-700 text-white">
                  <td className="py-2 text-center">{row.name}</td>
                  <td className="text-center">
                    <span className={row.type === "Vendor" ? "text-[#FF4D00]" : "text-[#4976F4]"}>
                      {row.type}
                    </span>
                  </td>
                  <td className="text-center">{row.subscriptionType}</td>
                  <td className="text-center">{row.email}</td>
                  <td className="text-center">{row.registrationDate}</td>
                  <td className="py-2">
                    <div className="flex items-center justify-center gap-2">
                      {/* Right Arrow Icon (for Edit functionality) */}
                      <Image
                        className="cursor-pointer"
                        src="/icon/right.svg"
                        alt="Edit"
                        width={26}
                        height={26}
                        onClick={() => handleEdit(row.id)}
                      />
                      {/* Trash Icon (for Delete functionality) */}
                      <Image
                        className="cursor-pointer"
                        src="/icon/trash.svg"
                        alt="Delete"
                        width={26}
                        height={26}
                        onClick={() => handleDelete(row.id)}
                      />
                      {/* Eye Icon (for View functionality) */}
                      <Image
                        className="cursor-pointer"
                        src={eyeIcon}
                        alt="View"
                        width={26}
                        height={26}
                        onClick={() => handleView(row.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No matching registrations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
