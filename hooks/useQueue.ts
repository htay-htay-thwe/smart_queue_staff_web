import {
  assignTableToQueue,
  getQueue,
  occupyTable,
  releaseTableAndUpdateQueue,
} from "@/services/queue.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const useFetchQueue = (shopId: string) => {
  return useQuery({
    queryKey: ["queue", shopId],
    queryFn: () => getQueue(shopId),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};

export const useAssignTable = (router: ReturnType<typeof useRouter>) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: assignTableToQueue,
    onSuccess: (data) => {
      toast.success("Table assigned successfully!", {
        position: "top-right",
        style: {
          color: "green",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["queue"] });
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
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};

export const useReleaseTable = (router: ReturnType<typeof useRouter>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: releaseTableAndUpdateQueue,
    onSuccess: (data) => {
      toast.success("One Table Freed!", {
        position: "top-right",
        style: {
          color: "green",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["queue"] });
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
