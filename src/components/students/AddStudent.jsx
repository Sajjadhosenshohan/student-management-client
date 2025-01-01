import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";

export default function AddStudent() {
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    rollNumber: "",
    subjectCodes: "",
    regulationYear: "",
    semester: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        subjectCodes: formData.subjectCodes
          .split(",")
          .map((code) => code.trim()),
      };

      await axiosSecure.post("/students", dataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Student added successfully!");
      navigate("/students");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add student");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add Student</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Roll Number
              </label>
              <input
                type="text"
                name="rollNumber"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject Codes (comma-separated)
              </label>
              <input
                type="text"
                name="subjectCodes"
                required
                placeholder="e.g., 12345(T), 67890(T)"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Regulation Year
              </label>
              <input
                type="text"
                name="regulationYear"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Semester
              </label>
              <select
                name="semester"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              >
                <option value="">Select Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Student
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
