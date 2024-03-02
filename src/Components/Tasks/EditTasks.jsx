import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTasks from "../Hooks/useTasks";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const EditTasks = () => {
  const { id } = useParams();
  const nevigate = useNavigate();
  const [cartData, refetch] = useTasks();
  const editableData = cartData?.filter((ed) => ed._id == id);
  const { taskTitle, TaskDescription } = editableData[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taskTitle: taskTitle,
      TaskDescription: TaskDescription,
      createdAt: new Date(),
    },
  });

  return (
    <div>
      <div className="md:w-[400px] w-full mx-auto py-5">
        {editableData?.map((ed) => (
          <form
            key={ed._id}
            onSubmit={handleSubmit(async (data) => {
              try {
                const response = await fetch(
                  `https://task-managementment.vercel.app/tasks/${ed._id}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                  }
                );

                if (response.ok) {
                  refetch();
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Updated",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  refetch();
                  nevigate("/");
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
              defaultValue={ed.taskTitle}
            />
            <br />
            <label className="mb-2 font-bold">Task Description</label>
            <textarea
              className=" block box-border md:w-[400px] w-full px-3 py-2 outline-none bg-slate-400"
              {...register("TaskDescription", { required: true })}
            />
            {(errors.TaskDescription || errors.taskTitle) && (
              <p>This field is required</p>
            )}
            <button type="submit" className="cursor-pointer block text-white box-border md:w-[400px] w-full px-3 py-2 outline-none bg-[#6b26b7] mt-2">
                Update
            </button>
            
          </form>
        ))}
      </div>
    </div>
  );
};

export default EditTasks;
