import { useMutation, useQueryClient } from "react-query";
import { updateTodoList } from "../../api/todoApi";

export function useUpdateTodoList() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ todo_section_id, title }: { todo_section_id: string; title: string }) =>
      updateTodoList(todo_section_id, title),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todoLists_simple");
        queryClient.invalidateQueries("todoLists");
      },
    },
  );
}
