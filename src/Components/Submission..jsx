import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("https://portfolio-backend-3vft.onrender.com/api/submissions");
        setSubmissions(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching submissions:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchSubmissions();

    // Set up socket connection
    const socketConnection = io("https://portfolio-backend-3vft.onrender.com");

    // Listen for new submissions and update the state
    socketConnection.on("newSubmission", (newSubmission) => {
      setSubmissions((prevSubmissions) => [...prevSubmissions, newSubmission]);
    });

    // Cleanup socket connection on component unmount
    return () => {
      socketConnection.disconnect();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8">Submissions</h1>
      
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Date of Birth</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Department</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Comments</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {submissions.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">No submissions available</td>
              </tr>
            ) : (
              submissions.map((submission) => (
                <tr key={submission._id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{submission.name}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{submission.email}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {new Date(submission.dob).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{submission.department}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{submission.comments}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Submissions;
