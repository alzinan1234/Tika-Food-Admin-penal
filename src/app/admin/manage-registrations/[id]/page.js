// app/registrations/[id]/page.js
"use client"; // This is a client component

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation"; // Import useRouter for navigating back
import Image from "next/image"; // Import Image for icons
import { useState } from "react"; // Import useState for the new modal

// Assuming you have check.svg and cross.svg in your public/icon directory
// Note: Using right.svg and trash.svg as checkmark/cross icons based on your previous code.
// For a better visual representation, consider using actual checkmark and cross SVG files.
import checkmarkIcon from "../../../../../public/icon/right.svg";
import crossIcon from "../../../../../public/icon/trash.svg";
import fileIcon from "../../../../../public/icon/file-icon.svg";

// Dummy data (now with distinct fields for Vendor and Service Provider)
const dummyRows = [
  {
    id: "reg-001",
    name: "Robo Gladiators",
    type: "Vendor",
    subscriptionType: "Annual",
    email: "robogladiators@gmail.com",
    registrationDate: "March 15, 2024",
    // Vendor Specific Fields (matching download (30).png)
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
    type: "Service Provider", // This entry is a Service Provider
    subscriptionType: "Annual",
    email: "service@gmail.com",
    registrationDate: "March 15, 2024",
    // Service Provider Specific Fields (matching download (31).png)
    fullName: "Service Provider Inc.",
    phoneNumber: "(123) 456-7890",
    jobTitle: "Trainer",
    location: "Cyber City",
    resumeAvailable: true, // Boolean to simulate resume presence
  },
  {
    id: "reg-003",
    name: "Robo Gladiators",
    type: "Service Provider", // This entry is a Service Provider
    subscriptionType: "Annual",
    email: "provider@gmail.com",
    registrationDate: "March 15, 2024",
    // Service Provider Specific Fields
    fullName: "Provider Solutions",
    phoneNumber: "(987) 654-3210",
    jobTitle: "Consultant",
    location: "Innovation Park",
    resumeAvailable: false,
  },
  {
    id: "reg-004",
    name: "Robo Gladiators",
    type: "Vendor",
    subscriptionType: "Annual",
    email: "vendor@gmail.com",
    registrationDate: "March 15, 2024",
    // Vendor Specific Fields
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

export default function RegistrationDetailsPage() {
  const params = useParams();
  const router = useRouter(); // Initialize useRouter
  const { id } = params;

  const [showRejectReasonModal, setShowRejectReasonModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // Find the registration details based on the ID
  const registration = dummyRows.find((row) => row.id === id);

  if (!registration) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#343434] text-white">
        <div className="bg-[#1E1E1E] p-8 rounded-lg shadow-lg text-center border border-[#3A3A3A]">
          <h1 className="text-3xl font-bold mb-4">Registration Not Found</h1>
          <p className="text-gray-400 mb-6">The registration with ID &quot;{id}&quot; could not be found.</p>
          <button
            onClick={() => router.back()} // Go back to the previous page
            className="bg-[#00C1C9] hover:bg-[#009da3] text-white font-bold py-2 px-6 rounded-md transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Handle Approve action
  const handleApprove = () => {
    alert(`Approved registration: ${registration.id}`);
    // Implement your approval logic here (e.g., API call, state update)
    router.back(); // Go back after action
  };

  // Handle Reject button click to open the modal
  const handleRejectClick = () => {
    setShowRejectReasonModal(true);
  };

  // Handle submission of the reject reason
  const handleSubmitRejectReason = () => {
    if (rejectReason.trim() === "") {
      alert("Please provide a reason for rejection.");
      return;
    }
    alert(`Rejected registration: ${registration.id} with reason: "${rejectReason}"`);
    // Implement your rejection logic here (e.g., API call, state update)
    setShowRejectReasonModal(false); // Close modal
    setRejectReason(""); // Clear reason
    router.back(); // Go back after action
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#343434] p-4 sm:p-8">
      {/* Main Details Modal Container */}
      <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg w-full max-w-md relative border border-[#3A3A3A] font-sans">
        {/* Close Button (X icon) */}
        <button
          onClick={() => router.back()} // Navigates back to the previous page
          className="absolute top-3 right-3 text-white hover:text-gray-300 transition-colors"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Conditional Details Content based on registration type */}
        {registration.type === "Vendor" ? (
          // Vendor Details (matching download (30).png)
          <div className="text-white text-base sm:text-lg space-y-3 mt-4">
            <p>
              <span className="font-semibold text-[#00C1C9]">Venue Name :</span> {registration.venueName}
            </p>
            <p>
              <span className="font-semibold text-[#00C1C9]">Email:</span> {registration.email}
            </p>
            <p>
              <span className="font-semibold text-[#00C1C9]">Phone number:</span> {registration.phoneNumber}
            </p>
            <p>
              <span className="font-semibold text-[#00C1C9]">Location:</span> {registration.location}
            </p>
            <p>
              <span className="font-semibold text-[#00C1C9]">Hours of Operation:</span> {registration.hoursOfOperation}
            </p>
            <p>
              <span className="font-semibold text-[#00C1C9]">Capacity:</span> {registration.capacity}
            </p>

            <p className="flex flex-col gap-2">
              <span className="font-semibold text-white">Agree to display QR codes at Tables / Counters:</span>{" "}
              {registration.agreeToDisplayQR ? (
                <Image src={checkmarkIcon} alt="Yes" width={20} height={20} />
              ) : (
                <Image src={crossIcon} alt="No" width={20} height={20} />
              )}
            </p>
            <p className="flex flex-col gap-2">
              <span className="font-semibold text-white">Interested in-app promotion:</span>{" "}
              {registration.interestedInAppPromotion ? (
                <Image src={checkmarkIcon} alt="Yes" width={20} height={20} />
              ) : (
                <Image src={crossIcon} alt="No" width={20} height={20} />
              )}
            </p>
            <p className="flex flex-col gap-2">
              <span className="font-semibold text-white">Allow users to earn NikoSafe Rewards at this venue:</span>{" "}
              {registration.allowNikoSafeRewards ? (
                <Image src={checkmarkIcon} alt="Yes" width={20} height={20} />
              ) : (
                <Image src={crossIcon} alt="No" width={20} height={20} />
              )}
            </p>
            <p className="flex flex-col gap-2">
              <span className="font-semibold text-white">Allow venue events on activity feed:</span>{" "}
              {registration.allowVenueEvents ? (
                <Image src={checkmarkIcon} alt="Yes" width={20} height={20} />
              ) : (
                <Image src={crossIcon} alt="No" width={20} height={20} />
              )}
            </p>
          </div>
        ) : (
          // Service Provider Details (matching download (31).png)
          <div className="text-white text-base sm:text-lg space-y-3 mt-4">
            <p>
              <span className="font-semibold text-white">Full Name:</span> {registration.fullName}
            </p>
            <p>
              <span className="font-semibold text-white">Email:</span> {registration.email}
            </p>
            <p>
              <span className="font-semibold text-white">Phone number:</span> {registration.phoneNumber}
            </p>
            <p>
              <span className="font-semibold text-white">Job Title:</span> {registration.jobTitle}
            </p>
            <p>
              <span className="font-semibold text-white">Location:</span> {registration.location}
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold text-white">Resume:</span>{" "}
              {registration.resumeAvailable ? (
                <Image src={fileIcon} alt="Resume Available" width={20} height={20} />
              ) : (
                <span className="text-gray-400">N/A</span> // Or a different icon/text for no resume
              )}
            </p>
          </div>
        )}

        {/* Action Buttons at the bottom */}
        <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-[#3A3A3A]">
          <button
            onClick={handleApprove}
            className="flex items-center bg-transparent border border-[#3CC668] text-[#3CC668] px-4 py-2 rounded-full hover:bg-[#3CC668] hover:text-white transition-colors text-sm sm:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 inline-block mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Approve
          </button>
          <button
            onClick={handleRejectClick} // Changed to open the rejection modal
            className="flex items-center bg-transparent border border-[#EF4444] text-[#EF4444] px-4 py-2 rounded-full hover:bg-[#EF4444] hover:text-white transition-colors text-sm sm:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 inline-block mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Reject
          </button>
        </div>
      </div>

      {/* Reject Reason Modal */}
      {showRejectReasonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
          <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg w-full max-w-sm relative border border-[#3A3A3A] font-sans">
            <button
              onClick={() => {
                setShowRejectReasonModal(false);
                setRejectReason(""); // Clear reason on close
              }}
              className="absolute top-3 right-3 text-white hover:text-gray-300 transition-colors"
              aria-label="Close reject reason modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-white text-xl font-semibold mb-4 text-center">Reason for Rejection</h2>
            <textarea
              className="w-full p-3 bg-[#343434] text-white rounded-md border border-[#3A3A3A] focus:outline-none focus:ring-1 focus:ring-[#00C1C9] mb-4 h-28 resize-none"
              placeholder="Enter rejection reason here..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            ></textarea>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowRejectReasonModal(false);
                  setRejectReason(""); // Clear reason on cancel
                }}
                className="bg-transparent border border-gray-600 text-gray-400 px-4 py-2 rounded-full hover:bg-gray-700 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRejectReason}
                className="bg-[#EF4444] text-white px-4 py-2 rounded-full hover:bg-[#DC2626] transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
