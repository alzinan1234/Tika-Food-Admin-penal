// pages/admin/support/[id].js
"use client";

import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation'; // Import useParams

const SupportDetailsPage = () => {
  const router = useRouter();
  const params = useParams(); // Use useParams to get dynamic route parameters
  const { id } = params; // Extract the 'id' from params

  // In a real application, you would fetch data here using the 'id'
  // For now, we'll simulate fetching by checking if the id matches.
  // This is a very basic dummy data setup.
  // In a real app, you'd likely have a function like `getTicketById(id)`
  // that fetches from an API or a local data source.
  const allDummyTickets = [
    {
      id: "TKT001",
      submittedBy: "John Doe",
      avatar: "/image/userImage.png",
      dateSubmitted: "May 6, 2025",
      issueTitle: "Login Issue",
      userDescription: "I cannot log in to my account. I have tried resetting my password multiple times, but it doesn't work.",
      picture: "/bannerImage/tacos.jpg", // Example picture
    },
    {
      id: "TKT002",
      submittedBy: "Haus & Herz",
      avatar: "/image/userImage.png",
      dateSubmitted: "May 7, 2025",
      issueTitle: "Payment Not Reflected", // Corrected title
      userDescription: "I made a payment using my card, but the order is not showing in my purchase history. I've also not received a confirmation email. Please look into it.",
      picture: "/bannerImage/tacos.jpg", // Replace with an actual path to the image you want to display
    },
    {
      id: "TKT003",
      submittedBy: "Jane Smith",
      avatar: "/image/userImage.png",
      dateSubmitted: "May 8, 2025",
      issueTitle: "Product Delivery Delay",
      userDescription: "My recent order (ORD12345) has been delayed for over a week. The tracking information hasn't updated. Could you please provide an update?",
      picture: "/bannerImage/tacos.jpg", // No picture for this dummy ticket
    },
  ];

  // Find the ticket details based on the dynamic 'id'
  const ticketDetails = allDummyTickets.find(ticket => ticket.id === id);


  if (!ticketDetails) {
    // You might want a better loading state or a "Ticket not found" message
    return <p>Loading or Ticket not found...</p>;
  }

  return (
    <div className="bg-white text-black p-6 sm:p-6 lg:p-8 rounded shadow min-h-screen">
      <div className="flex items-center mb-6 cursor-pointer" onClick={() => router.back()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <h1 className="text-xl font-semibold">Support Details</h1>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="flex-shrink-0 h-24 w-24 rounded-full overflow-hidden border border-gray-300 mb-4">
          <Image
            src={ticketDetails.avatar}
            alt="User Avatar"
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="text-xl font-semibold text-gray-900">{ticketDetails.submittedBy}</p>
        <p className="text-sm text-gray-500">Date Submitted: {ticketDetails.dateSubmitted}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:w-[800px] items-center justify-center mx-auto">
        <div>
          <label htmlFor="issueTitle" className="block text-sm font-medium text-gray-700">Issue Title</label>
          <input
            type="text"
            id="issueTitle"
            readOnly
            value={ticketDetails.issueTitle}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 text-gray-900"
          />
        </div>

        <div>
          <label htmlFor="userDescription" className="block text-sm font-medium text-gray-700">User Description</label>
          <textarea
            id="userDescription"
            readOnly
            rows="5"
            value={ticketDetails.userDescription}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 text-gray-900 resize-none"
          ></textarea>
        </div>

        {ticketDetails.picture && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Picture</label>
            <div className="mt-1 w-64 h-auto border border-gray-300 rounded-md overflow-hidden">
              <Image
                src={ticketDetails.picture}
                alt="Issue Picture"
                width={256}
                height={150} // Adjust height as needed
                layout="responsive"
                objectFit="cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportDetailsPage;