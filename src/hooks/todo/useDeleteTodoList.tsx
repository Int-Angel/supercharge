import { useMutation, useQueryClient } from "react-query";
import { deleteTodoList } from "../../api/todoApi";

export function useDeleteTodoList() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ todoList_id }: { todoList_id: string }) => deleteTodoList(todoList_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todoLists");
      },
    },
  );
}
