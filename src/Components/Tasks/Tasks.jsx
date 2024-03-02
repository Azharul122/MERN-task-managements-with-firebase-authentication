import { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import useTasks from "../Hooks/useTasks";
import { Link, useNavigate } from "react-router-dom";
import "./Tasks.css";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";

const Tasks = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [cartData, refetch] = useTasks();
  const naviagte = useNavigate();

  useEffect(() => {
    const sortedData = cartData?.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
    setData(sortedData);
  }, [cartData]);

  // Edit
  const handleDelte = (id) => {
    if (user) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`https://task-managementment.vercel.app/tasks/${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.deletedCount > 0) {
                //delete success message
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Data deleted successfully",
                  showClass: {
                    popup: "animate__animated animate__fadeInDown",
                  },
                  hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                  },
                  showConfirmButton: false,
                  timer: 1500,
                });
                refetch();
                // const remaining=toys.filter(toy=>toy._id!==_id)
                // setToys(remaining)
              } else {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Try again",
                  showClass: {
                    popup: "animate__animated animate__fadeInDown",
                  },
                  hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                  },
                  showConfirmButton: false,
                  timer: 1500,
                });
                // setToys(toys)
              }
            });
        }
      });
    } else {
      naviagte("/login");
    }
  };

  const TdStyle = {
    ThStyle: `w-1/6 min-w-[160px] border-1 border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4`,
    TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2  text-base font-medium`,
    TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2  text-base font-medium`,
    TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
  };

  return (
    <div className="w-full">
      {/* Title section */}
      {/* <div className="flex items-center justify-between py-7">
        <p className="text-xl md:text-3xl font-bold">Task Management App</p>
        <Link to={"/create-task"} className="p-5 rounded-full bg-slate-600 plus"><FaPlus className="text-white text-xl spin"/></Link>
        
      </div> */}
      {/* data table */}

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="text-center bg-[#6b26b7]">
            <tr>
              <th className={TdStyle.ThStyle}> Title </th>
              <th className={TdStyle.ThStyle}> Description </th>
              <th className={TdStyle.ThStyle}> Due date </th>
              <th className={TdStyle.ThStyle}> Action </th>
            </tr>
          </thead>

          <tbody>
            {data.map((d) => (
              <tr key={d._id}>
                <td className={TdStyle.TdStyle}>{d.taskTitle}</td>
                <td className={TdStyle.TdStyle2}>
                  {d.TaskDescription.substring(0, 60)}
                </td>
                <td className={TdStyle.TdStyle}>{d.dueDate}</td>

                <td className={TdStyle.TdStyle2}>
                  <div className="flex items-center gap-2 w-full justify-center">
                    <Link to={`/edit-task/${d._id}`} task={d}>
                      <FaEdit className="cursor-pointer text-lg text-[#6b26b7]" />{" "}
                    </Link>

                    <FaTrash
                      onClick={() => handleDelte(d._id)}
                      className="cursor-pointer text-lg text-red-500"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
