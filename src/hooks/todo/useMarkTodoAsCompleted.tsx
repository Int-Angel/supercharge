import { useMutation, useQueryClient } from "react-query";
import { markTodoAsCompleted } from "../../api/todoApi";

export function useMarkTodoAsCompleted() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ todo_id }: { todo_id: string }) => markTodoAsCompleted(todo_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todoLists");
        queryClient.invalidateQueries("todos");
      },
    },
  );
}
