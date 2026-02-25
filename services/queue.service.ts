import { api } from "@/lib/api";
import { getAuthCookie } from "@/lib/cookies";
import { MostQueueUser, Queue, QueueRecord } from "@/types/shopQueue.api.types";
import { useQuery } from "@tanstack/react-query";

export const getQueue = async (shopId: string): Promise<Queue[]> => {
  console.log("Fetching queue for shopId:", shopId);
  const token = await getAuthCookie();
  console.log("token", token);
  const res = await api.get(`queues/shop/${shopId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const getQueueHistory = async (shopId: string): Promise<Queue[]> => {
  console.log("Fetching queue for shopId:", shopId);
  const token = await getAuthCookie();
  console.log("token", token);
  const res = await api.get<Queue[]>(`queues/getQueue-history/${shopId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const assignTableToQueue = async ({
  queue_id,
  table_type_id,
  shop_id,
  table_no,
}: {
  queue_id: string;
  table_type_id: string;
  shop_id: string;
  table_no: string;
}) => {
  const token = await getAuthCookie();
  console.log("Assigning table ", {
    queue_id,
    table_type_id,
    shop_id,
    table_no,
  });
  console.log("Assigning table with token:", token);
  const res = await api.patch(
    `queues/assign-table`,
    { queue_id, table_type_id, shop_id, table_no },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const occupyTable = async ({ shop_id }: { shop_id: string }) => {
  const token = await getAuthCookie();
  console.log("Occupying table with token:", token);
  const res = await api.get(`queues/get-table-status/${shop_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const releaseTableAndUpdateQueue = async ({
  shop_id,
  table_no,
  table_type_id,
}: {
  shop_id: string;
  table_no: string;
  table_type_id: string;
}) => {
  console.log("Releasing table ", {
    shop_id,
    table_no,
    table_type_id,
  });
  const token = await getAuthCookie();
  console.log("Releasing table with token:", token);
  const res = await api.patch(
    `queues/free-table`,
    { shop_id, table_no, table_type_id },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

export const getMostQueueUsers = async (
  shopId: string,
): Promise<MostQueueUser[]> => {
  console.log("Fetching most queue users for shopId:", shopId);
  const token = await getAuthCookie();
  console.log("token", token);
  const res = await api.get<MostQueueUser[]>(
    `shops/most-queue-users/${shopId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const getQueueRecord = async (
  shopId: string,
): Promise<QueueRecord[]> => {
  console.log("Fetching queue record for shopId:", shopId);
  const token = await getAuthCookie();
  console.log("token", token);
  const res = await api.get<QueueRecord[]>(
    `shops/finished-queues-per-month/${shopId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};
