import { useQuery } from "react-query";
import { getUsername } from "../../api/userApi";

export function useUsername(user_id?: string) {
  return useQuery(["username", user_id], () => getUsername(user_id), {
    enabled: !!user_id,
  });
}
