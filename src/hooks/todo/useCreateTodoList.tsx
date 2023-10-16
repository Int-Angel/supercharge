import { useMutation, useQueryClient } from "react-query";
import { createTodoList } from "../../api/todoApi";

export function useCreateTodoList() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ title, user_id }: { title: string; user_id?: string }) =>
      createTodoList(title, user_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todoLists");
      },
    },
  );
}
