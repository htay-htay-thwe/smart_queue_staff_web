import { assignTableToQueue, getQueue } from "@/services/queue.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useFetchQueue = (shopId: string) => {
  return useQuery({
    queryKey: ["queue", shopId],
    queryFn: () => getQueue(shopId),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 1,
  });
};

export const useAssignTable = () => {
  const mutation = useMutation({
    mutationFn: assignTableToQueue,
    onSuccess: (data) => {
      toast.success("Table assigned successfully!", {
        position: "top-right",
        style: {
          color: "green",
        },
      });
        console.log('assigned',data);
      //  router.push("/dashboard/dashboard");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to assign table", {
        position: "top-right",
        style: {
          color: "red",
        },
      });
    },
  });

  return mutation;
};
