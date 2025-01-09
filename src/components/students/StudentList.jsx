/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import DeleteConfirmation from "./DeleteConfirmation";
import UpdateModal from "./UpdateModal";
import Pagination from "../common/Pagination";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Auth/AuthProvider";
import { Download, Trash2 } from "lucide-react";
import DownloadStudent from "./DownloadStudent";

export default function StudentList() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [students, setStudents] = useState([]);
  const [semester, setSemester] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let studentsPerPage = 10;

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [downloadStudent, setDownloadStudent] = useState(false);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get(
        `/student/all?userMail=${user?.email}&page=${currentPage}&limit=${studentsPerPage}&semester=${semester}&subjectCode=${searchCode}`
      );

      // console.log("fetchData");
      if (response) {
        setStudents(response?.data?.data?.res);
        setTotalPages(response?.data?.data?.meta?.totalPage);
      }
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch students");
      setLoading(false);
    }
  };
  // fetch all students
  const fetchAllStudents = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get(
        `/student/all?userMail=${user?.email}&subjectCode=${searchCode}`
      );

      console.log("fetchData");
      if (response) {
        setStudents(response?.data?.data?.res);
        setTotalPages(response?.data?.data?.meta?.totalPage);
      }
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch students");
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchStudents();
    setLoading(false);
  }, [currentPage, semester, searchCode]);
  // delete single student
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axiosSecure.delete(`/student/delete/${id}`, {
        headers: {
          Authorization: ` ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Student deleted successfully");
      setShowDeleteConfirm(false);
      fetchStudents();
      setLoading(false);
    } catch (error) {
      toast.error("Failed to delete student");
      setLoading(false);
    }
  };
  // delete all students by email
  const handleDeleteMany = async () => {
    try {
      setLoading(true);
      await axiosSecure.delete(`/student/deleteMany/${user.email}`);
      toast.success("Student deleted successfully");
      setShowDeleteConfirm(false);
      fetchStudents();
      setLoading(false);
    } catch (error) {
      toast.error("Failed to delete student");
      setLoading(false);
    }
  };
  // update single student
  const handleUpdate = async (id, updatedData) => {
    try {
      setLoading(true);
      await axiosSecure.patch(`/student/update/${id}`, updatedData, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      toast.success("Student updated successfully");
      fetchStudents();
      setLoading(false);
    } catch (error) {
      toast.error("Failed to update student");
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setDownloadStudent(!downloadStudent)
      fetchAllStudents();
    } catch (error) {
      console.log(error);
      toast.error("Download Failed");
    }
  };

  console.log(setShowUpdateModal,setDownloadStudent);
  return (
    <div className="min-h-screen relative bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Student List</h1>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
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
          <button
            onClick={handleDeleteMany}
            className="px-4 py-2 bg-blue-500 flex justify-center items-center gap-1 hover:bg-blue-700 text-white  font-semibold rounded-md "
          >
            <Trash2 /> <span> Delete All </span>
          </button>
          {searchCode && (
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-500 flex justify-center items-center gap-1 hover:bg-blue-700 text-white  font-semibold rounded-md "
            >
              <Download /> <span> Download Student List </span>
            </button>
          )}
        </div>
        {/* student list is here */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          {loading ? (
            <div className="w-full">
              <div className="flex items-center justify-center w-full h-[100vh] text-gray-900 dark:text-gray-100 dark:bg-gray-950">
                <div>
                  <h1 className="text-xl md:text-7xl font-bold flex items-center">
                    L
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 24 24"
                      className="animate-spin"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z"></path>
                    </svg>{" "}
                    ading . . .
                  </h1>
                </div>
              </div>
            </div>
          ) : (
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
                  <tr key={student?._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student?.rollNumber}
                    </td>
                    <td className="px-6 py-4">
                      {student?.subjectCodes?.join(", ")}
                    </td>
                    <td className="px-6 py-4">{student?.regulationYear}</td>
                    <td className="px-6 py-4">{student?.semester}</td>
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
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
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
      {downloadStudent  && (
        <DownloadStudent
          students={students}
          searchCode={searchCode}
          onClose={() => {
            setDownloadStudent(false);
          }}
        />
      )}
    </div>
  );
}
