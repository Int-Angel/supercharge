import { useMutation, useQueryClient } from "react-query";
import { updateTodo } from "../../api/todoApi";

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      todo_id,
      description,
      priority,
      start_time,
      end_time,
      completed,
    }: {
      todo_id: string;
      description?: string;
      priority?: number;
      start_time?: string | null;
      end_time?: string | null;
      completed?: boolean;
    }) =>
      updateTodo(
        todo_id,
        description,
        priority,
        start_time,
        end_time,
        completed,
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todoLists");
        queryClient.invalidateQueries("todos");
      },
    },
  );
}
