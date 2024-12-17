import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import DeleteConfirmation from "./DeleteConfirmation";
import UpdateModal from "./UpdateModal";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [semester, setSemester] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const studentsPerPage = 10;

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);


  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/students?page=${currentPage}&limit=${studentsPerPage}&semester=${semester}&subjectCode=${searchCode}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setStudents(response.data.students);
      setTotalPages(Math.ceil(response.data.total / studentsPerPage));
    } catch (error) {
      toast.error("Failed to fetch students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [currentPage, semester, searchCode]);

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/students/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('Student deleted successfully');
      setShowDeleteConfirm(false);
      fetchStudents();
    } catch (error) {
      toast.error('Failed to delete student');
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:3000/students/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('Student updated successfully');
      fetchStudents();
    } catch (error) {
      toast.error('Failed to update student');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Student List</h1>

        <div className="mb-6 flex space-x-4">
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Semesters</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search by Subject Code"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md flex-1"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject Codes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Regulation Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.rollNumber}
                  </td>
                  <td className="px-6 py-4">
                    {student.subjectCodes.join(", ")}
                  </td>
                  <td className="px-6 py-4">{student.regulationYear}</td>
                  <td className="px-6 py-4">{student.semester}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  <button
                      onClick={() => {
                        setSelectedStudent(student);
                        setShowUpdateModal(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md mr-2 transition-colors"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStudent(student);
                        setShowDeleteConfirm(true);
                      }}
                      className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>

      </div>
        {showUpdateModal && selectedStudent && (
          <UpdateModal
            student={selectedStudent}
            onClose={() => {
              setShowUpdateModal(false);
              setSelectedStudent(null);
            }}
            onUpdate={handleUpdate}
          />
        )}

        {showDeleteConfirm && selectedStudent && (
          <DeleteConfirmation
            student={selectedStudent}
            onConfirm={() => handleDelete(selectedStudent._id)}
            onCancel={() => {
              setShowDeleteConfirm(false);
              setSelectedStudent(null);
            }}
          />
        )}
    </div>
  );
}
