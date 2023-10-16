import { useQuery } from "react-query";
import { getTodoListsFromUserWithTodos } from "../../api/todoApi";

export function useGetTodoListsFromUserWithTodos(user_id?: string) {
  return useQuery(
    ["todoLists", user_id],
    () => getTodoListsFromUserWithTodos(user_id),
    {
      enabled: !!user_id,
    },
  );
}
