import { supabaseClient } from "./supabase-client";

const TODO = "todo";
const TODO_LIST = "todo_list";

export async function createTodoList(title: string, user_id?: string){
    const { data: todoList, error } = await supabaseClient
        .from(TODO_LIST)
        .insert([
            {
                user_id: user_id,
                title: title,
            }
        ])
        .select('* , todo(*)');

    if (error) throw error;
    return todoList;
}

export async function getTodoListsFromUser(user_id?: string){
    const { data: todoLists, error } = await supabaseClient
        .from(TODO_LIST)
        .select('*')
        .eq('user_id', user_id);

    if (error) throw error;
    return todoLists;
}

export async function getTodoListsFromUserWithTodos(user_id?: string){
    const { data: todoLists, error } = await supabaseClient
        .from(TODO_LIST)
        .select('* , todo(*)')
        .eq('user_id', user_id)
        .eq('todo.completed', false);

    if (error) throw error;
    return todoLists;
}

export async function updateTodoList(todoList_id: string, title: string){
    const { data: todoList, error } = await supabaseClient
        .from(TODO_LIST)
        .update({ title: title })
        .eq('id', todoList_id)
        .select();

    if (error) throw error;
    return todoList;
}

export async function deleteTodoList(todoList_id: string){
    const { data: todoList, error } = await supabaseClient
        .from(TODO_LIST)
        .delete()
        .eq('id', todoList_id);
    if (error) throw error;
    return todoList;
}

export async function createTodo(
    todoList_id: string,
    description: string,
    priority?:number,
    start_time?: string,
    end_time?: string,
){
    let priorityValue = priority ? priority : 0;
    priorityValue = priorityValue < 0 ? 0 : priorityValue;
    const { data: todo, error } = await supabaseClient
        .from(TODO)
        .insert([
            {
                todo_list_id: todoList_id,
                description: description,
                priority: priorityValue,
                start_time: start_time,
                end_time: end_time,
                list_position: 0,
            }
        ])
        .select();

    if (error) throw error;
    return todo;
}

export async function getTodosFromTodoList(todoList_id: string){
    const { data: todos, error } = await supabaseClient
        .from(TODO)
        .select('*')
        .eq('todo_list_id', todoList_id);

    if (error) throw error;
    return todos;
}

export async function updateTodo(
    todo_id:string, 
    description?: string, 
    priority?:number, 
    start_time?: string | null, 
    end_time?: string | null,
    completed?: boolean,
){
    const { data: todo, error } = await supabaseClient
    .from(TODO)
    .update({
        description: description,
        priority: priority,
        start_time: start_time,
        end_time: end_time,
        completed: completed,
    })
    .eq('id', todo_id)
    .select();

    if (error) throw error;
    return todo;
}

export async function markTodoAsCompleted(
    todo_id:string,
){
    const { data: todo, error } = await supabaseClient
    .from(TODO)
    .update({ completed: true })
    .eq('id', todo_id)
    .select();

    if (error) throw error;
    return todo;
}

export async function deleteTodo(
    todo_id:string,
){
    const { data: todo, error } = await supabaseClient
    .from(TODO)
    .delete()
    .eq('id', todo_id);

    if (error) throw error;
    return todo;
}
