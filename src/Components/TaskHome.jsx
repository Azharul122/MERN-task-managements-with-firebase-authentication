import Tasks from "./Tasks/Tasks";

import useTasks from "./Hooks/useTasks";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";


const TaskHome = () => {
  const [cartData] = useTasks();
  console.log(cartData);
  return (
    <div className="w-full">
      <div className="w-[96%] md:w-[90%] mx-auto">
        <div className="flex items-center justify-between py-5">
            <p>Create task</p>
            <Link to={"create-task"}>
            <FaPlus className="text-xl rotate-180 animate-bounce duration-800 hover:animate-none"/></Link>
        </div>
        <Tasks></Tasks>
      </div>
    </div>
  );
};

export default TaskHome;
