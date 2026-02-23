import {
  assignTableToQueue,
  getQueue,
  occupyTable,
  releaseTableAndUpdateQueue,
} from "@/services/queue.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useFetchQueue = (shopId: string) => {
  return useQuery({
    queryKey: ["queue", shopId],
    queryFn: () => getQueue(shopId),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 1,
  });
};

export const useAssignTable = (router: ReturnType<typeof useRouter>) => {
  const mutation = useMutation({
    mutationFn: assignTableToQueue,
    onSuccess: (data) => {
      toast.success("Table assigned successfully!", {
        position: "top-right",
        style: {
          color: "green",
        },
      });
      console.log("assigned", data);
      router.push("/dashboard/queue");
      router.refresh();
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

export const useOccupyTable = (shopId: string) => {
  return useQuery({
    queryKey: ["occupyTable", shopId],
    queryFn: () => occupyTable({ shop_id: shopId }),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 1,
  });
};

export const useReleaseTable = (router: ReturnType<typeof useRouter>) => {
  return useMutation({
    mutationFn: releaseTableAndUpdateQueue,
    onSuccess: (data) => {
      toast.success("One Table Freed!", {
        position: "top-right",
        style: {
          color: "green",
        },
      });
      console.log("released", data);
      router.push("/dashboard/queue");
      router.refresh();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to release table", {
        position: "top-right",
        style: {
          color: "red",
        },
      });
    },
  });
};
