import {
  assignTableToQueue,
  getMostQueueUsers,
  getQueue,
  getQueueHistory,
  getQueueRecord,
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
    refetchInterval: 30_000,          // fallback poll every 30s
    refetchIntervalInBackground: true, // keep polling even when tab is backgrounded
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
    onSuccess: (_data, variables) => {
      toast.success("One Table Freed!", {
        position: "top-right",
        style: {
          color: "green",
        },
      });

      // Instantly remove the freed table from the cache so the queue page
      // renders immediately on navigation without waiting for a re-fetch.
      queryClient.setQueryData(
        ["queue", variables.shop_id],
        (old: any) => {
          if (!Array.isArray(old)) return old;
          return old.filter((q: any) => q.table_no !== variables.table_no);
        },
      );

      // Background re-sync to get the server's latest state
      queryClient.invalidateQueries({ queryKey: ["queue"] });
      queryClient.invalidateQueries({ queryKey: ["occupyTable"] });
      queryClient.invalidateQueries({ queryKey: ["queueHistory"] });
      router.push("/dashboard/queue");
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

export const useFetchQueueHistory = (shopId: string) => {
  return useQuery({
    queryKey: ["queueHistory", shopId],
    queryFn: () => getQueueHistory(shopId),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};

export const useFetchMostQueueUsers = (shopId: string) => {
  return useQuery({
    queryKey: ["mostQueueUsers", shopId],
    queryFn: () => getMostQueueUsers(shopId),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};

export const useFetchQueueRecord = (shopId: string) => {
  return useQuery({
    queryKey: ["queueRecord", shopId],
    queryFn: () => getQueueRecord(shopId),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
