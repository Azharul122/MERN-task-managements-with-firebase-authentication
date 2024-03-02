import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useTasks from "../Hooks/useTasks";
import { useNavigate } from "react-router-dom";

const TaskInput = () => {
  const [, refetch] = useTasks();
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taskTitle: "",
      TaskDescription: "",
      createdAt: new Date(),
    },
  });

  return (
    <div>
      <div className="md:w-[400px] w-[96%] mx-auto py-5">
        <form
          onSubmit={handleSubmit(async (data) => {
            const newTask={
              taskTitle:data.taskTitle,
              dueDate:data.dueDate,
              TaskDescription:data.TaskDescription,
              createdAt:Date.now()
            }
            try {
              const response = await fetch(
                "https://task-managementment.vercel.app/tasks",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newTask),
                }
              );

              if (response.ok) {
                refetch();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Your work has been saved",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/")
              } else {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Opps!! Try again",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            } catch (error) {
              console.error("An error occurred while saving the task", error);
            }
            reset();
          })}
        >
          <label className="mb-2 font-bold">Task Title</label>
          <input
            className=" block box-border md:w-[400px] w-full px-3 py-2 outline-none bg-slate-400"
            {...register("taskTitle", { required: true })}
            defaultValue="test"
          />
           {(errors.taskTitle) && (
            <p className="text-red-400">This field is required</p>
          )}
          <br />
          <label className="mb-2 font-bold">Due date</label>
          <input
          type="date"
            className=" block box-border md:w-[400px] w-full px-3 py-2 outline-none bg-slate-400"
            {...register("dueDate", { required: true })}
           
          />
           {(errors.dueDate) && (
            <p className="text-red-400">This field is required</p>
          )}
          <br />
          <label className="mb-2 font-bold">Task Description</label>
          <textarea
            className=" block box-border md:w-[400px] w-full px-3 py-2 outline-none bg-slate-400"
            {...register("TaskDescription", { required: true })}
          />
          {(errors.TaskDescription || errors.taskTitle) && (
            <p>This field is required</p>
          )}
          <input
            className="cursor-pointer block text-white box-border md:w-[400px] w-full px-3 py-2 outline-none bg-[#6b26b7] mt-2"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default TaskInput;
