import { useQuery } from "@tanstack/react-query";
const useTasks = () => {
  const {
    refetch,
    data: cartData = [],
    isLoading: isCardDataLoading,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch(`https://task-managementment.vercel.app/tasks`);
      return res.json();
    },
  });

  return [cartData, refetch, isCardDataLoading];
};

export default useTasks;
