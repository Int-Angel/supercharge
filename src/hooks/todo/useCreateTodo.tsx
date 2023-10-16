import { useMutation, useQueryClient } from "react-query";
import { createTodo } from "../../api/todoApi";

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      todoList_id,
      description,
      priority,
      start_time,
      end_time,
    }: {
      todoList_id: string;
      description: string;
      priority?: number;
      start_time?: string;
      end_time?: string;
    }) => createTodo(todoList_id, description, priority, start_time, end_time),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todoLists");
        queryClient.invalidateQueries("todos");
      },
    },
  );
}
