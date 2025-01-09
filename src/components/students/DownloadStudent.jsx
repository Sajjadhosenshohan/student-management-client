/* eslint-disable react/prop-types */
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Download } from "lucide-react";
const DownloadStudent = ({ students, searchCode,onClose }) => {
  console.log(students, "students");

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <div className="fixed pt-10  h-full overflow-y-auto inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg translate-y-[30%] p-6 max-w-2xl w-full">
        <div ref={contentRef} className="  mx-auto p-7">
          <h2 className="text-2xl text-center font-semibold mb-4">
            {" "}
            All Student of Subject Code{" "}
            <span className="font-bold"> {searchCode}</span>
          </h2>

          <div className=" grid grid-cols-5  gap-2">
            {students?.map((student) => (
              <div key={student?._id}>
                <h1 className="text-xl font-semibold py-1">
                  {" "}
                  {student?.rollNumber}{" "}
                </h1>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 flex justify-center items-center gap-1 hover:bg-red-700 text-white  font-semibold rounded-md "
          >
            Cancel
          </button>
          <button
            onClick={reactToPrintFn}
            className="px-4 py-2 bg-blue-500 flex justify-center items-center gap-1 hover:bg-blue-700 text-white  font-semibold rounded-md "
          >
            <Download /> <span> Download Now </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadStudent;
