// START CODE & Instructions

// https://github.com/dccircuit/IGME-330-Spring-2024/blob/main/checkoffs/typescript-practice.md

/*
  #1 - Create an interface that describes the structure of the item objects in the `todoItems` array
  Then strongly type the `todoItems` array
*/

interface ToDoItem {
  id: number,
  title: string,
  status: Status,
  completedOn?: Date
}

/*
  #2 - Strongly type the `status` property with an enum
  Note the `status` values below: "done", "in-progess" etc
*/

enum Status {
  done = "done",
  inProg = "in-progress",
  toDo = "todo"
}

/*
  #3 - Strongly type the parameters and return values of `addTodoItem()` and `getNextId()`
*/

// **When you are done, there must not be any errors under the Playground's "Errors" tab**

const todoItems = [
    { id: 1, title: "Learn HTML", status: Status.done, completedOn: new Date("2021-09-11") },
    { id: 2, title: "Learn TypeScript", status: Status.inProg },
    { id: 3, title: "Write the best web app in the world", status: Status.toDo },
]

function addTodoItem(todo: string): ToDoItem {
    const id: number = getNextId(todoItems)

    const newTodo: ToDoItem = {
        id,
        title: todo,
        status: Status.toDo,
    }

    todoItems.push(newTodo)

    return newTodo
}

function getNextId(items: ToDoItem[]) {
    return items.reduce((max, x) => x.id > max ? x.id : max, 0) + 1;
}

const newTodo: ToDoItem = addTodoItem("Buy lots of stuff with all the money we make from the app")

console.log(JSON.stringify(newTodo))