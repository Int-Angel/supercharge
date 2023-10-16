import { useQuery } from "react-query";
import { getTodosFromTodoList } from "../../api/todoApi";

export function useGetTodosFromTodoList(todoList_id: string) {
  return useQuery(
    ["todos", todoList_id],
    () => getTodosFromTodoList(todoList_id),
    {
      enabled: !!todoList_id,
    },
  );
}
