import { useQuery } from "react-query";
import { getTodoListsFromUser } from "../../api/todoApi";

export function useGetTodoListsFromUser(user_id?: string) {
  return useQuery(
    ["todoLists_simple", user_id],
    () => getTodoListsFromUser(user_id),
    {
      enabled: !!user_id,
    },
  );
}
