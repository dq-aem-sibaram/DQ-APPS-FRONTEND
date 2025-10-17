//component/employee/TimeSheetRegister.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { employeeService } from '@/lib/api/employeeService';
import { TimeSheetModel } from '@/lib/api/types';

const TimeSheetRegister: React.FC = () => {
  const { state } = useAuth();
  const [timeSheets, setTimeSheets] = useState<TimeSheetModel[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<TimeSheetModel>({
  workDate: '',
  taskName: '',
  taskDescription: '',
  hoursWorked: 0,
  status: 'Pending',          // Must provide status
  // employeeId: state.user?.userId || '', // now valid
  });


  /** 🔹 Fetch existing timesheets on load */
  const fetchTimeSheets = async () => {
    try {
      setLoading(true);
      const res = await employeeService.viewTimeSheet(state.user?.userId);
      setTimeSheets(res.response || []);

    } catch (error) {
      console.error('Error fetching timesheets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.user?.userId) fetchTimeSheets();
  }, [state.user?.userId]);

  /** 🔹 Handle input changes */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /** 🔹 Submit or update timesheet */
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await employeeService.registerTimeSheet(formData);
      await fetchTimeSheets();
      setFormData({
        workDate: '',
        taskName: '',
        taskDescription: '',
        hoursWorked: 0,
        status: 'Pending',  
        // employeeId: state.user?.userId || '',
      });
      alert('Timesheet saved successfully!');
    } catch (error) {
      console.error('Error submitting timesheet:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Timesheet Register</h2>

      {/* 🔸 Form */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input
          type="date"
          name="date"
          value={formData.workDate}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          name="taskName"
          placeholder="Project Name"
          value={formData.taskName}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <textarea
          name="taskDescription"
          placeholder="Task Description"
          value={formData.taskDescription}
          onChange={handleChange}
          className="col-span-2 border rounded p-2"
        />
        <input
          type="number"
          name="hoursWorked"
          placeholder="Hours Worked"
          value={formData.hoursWorked}
          onChange={handleChange}
          className="border rounded p-2"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Saving...' : 'Save'}
      </button>

      {/* 🔸 Timesheet List */}
      <h3 className="text-xl font-semibold mt-8 mb-4">Your Timesheets</h3>
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Project</th>
              <th className="p-2 border">Hours</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {timeSheets.map((sheet, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{sheet.workDate}</td>
                <td className="border p-2">{sheet.taskName}</td>
                <td className="border p-2">{sheet.hoursWorked}</td>
                <td className="border p-2">{sheet.taskDescription}</td>
                <td
                  className={`border p-2 font-medium ${
                    sheet.status === 'Approved'
                      ? 'text-green-600'
                      : sheet.status === 'Rejected'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {sheet.status}
                </td>
                <td className="border p-2">
                  {sheet.status === 'Rejected' ? (
                    <button
                      onClick={() => setFormData(sheet)}
                      className="text-blue-600 underline"
                    >
                      Edit & Resubmit
                    </button>
                  ) : sheet.status === 'Approved' ? (
                    <span className="text-gray-500">View Only</span>
                  ) : (
                    <span className="text-yellow-500">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeSheetRegister;
