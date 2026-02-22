import { api } from "@/lib/api";
import { getAuthCookie } from "@/lib/cookies";
import { Queue } from "@/types/shopQueue.api.types";

export const getQueue = async (shopId: string): Promise<Queue[]> => {
  const token = await getAuthCookie();
  console.log("token", token);
  const res = await api.get(`/queues/shop/${shopId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
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
