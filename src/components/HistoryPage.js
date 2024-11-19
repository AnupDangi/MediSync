import React from 'react';

const HistoryPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Medical History</h1>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Past Medical Records</h2>
          <div className="border-t pt-2">
            {/* Add your medical history content here */}
            <p className="text-gray-600">No medical records found.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;