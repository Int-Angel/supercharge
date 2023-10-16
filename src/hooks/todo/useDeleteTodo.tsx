import { useMutation, useQueryClient } from "react-query";
import { deleteTodo } from "../../api/todoApi";

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ todo_id }: { todo_id: string }) => deleteTodo(todo_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todoLists");
        queryClient.invalidateQueries("todos");
      },
    },
  );
}
