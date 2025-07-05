// src/pages/Todo.jsx
import React, { useState } from "react"

function Todo() {
  const [columns, setColumns] = useState([
    {
      id: "todo",
      title: "To Do",
      tasks: [
        { id: "1", text: "Design new landing page", completed: false },
        { id: "2", text: "Setup project structure", completed: false },
        { id: "3", text: "Create user authentication", completed: false },
      ],
    },
    {
      id: "inprogress",
      title: "In Progress",
      tasks: [
        { id: "4", text: "API integration", completed: false },
        { id: "5", text: "Database optimization", completed: false },
      ],
    },
    {
      id: "done",
      title: "Done",
      tasks: [
        { id: "6", text: "Project planning", completed: true },
        { id: "7", text: "Initial wireframes", completed: true },
      ],
    },
  ])

  const [newTaskText, setNewTaskText] = useState("")
  const [activeColumn, setActiveColumn] = useState(null)

  const addTask = (columnId) => {
    if (!newTaskText.trim()) return
    const newTask = {
      id: Date.now().toString(),
      text: newTaskText,
      completed: false,
    }

    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col
      )
    )

    setNewTaskText("")
    setActiveColumn(null)
  }

  const toggleTask = (columnId, taskId) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : col
      )
    )
  }

  const deleteTask = (columnId, taskId) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter((task) => task.id !== taskId) }
          : col
      )
    )
  }

  return (
    <div className="pt-24 min-h-screen relative overflow-x-hidden">
      <div className="relative z-10 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {columns.map((column, columnIndex) => (
            <div
              key={column.id}
              className={`bg-white rounded-2xl shadow-lg p-6 ${
                columnIndex === 2 ? "lg:max-h-96" : "min-h-[300px]"
              } flex flex-col`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <h2 className="font-bold text-gray-800 text-lg">{column.title}</h2>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {column.tasks.length}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                {activeColumn === column.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      placeholder="Enter task name..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      onKeyDown={(e) => e.key === "Enter" && addTask(column.id)}
                      autoFocus
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => addTask(column.id)}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setActiveColumn(null)
                          setNewTaskText("")
                        }}
                        className="px-3 py-1 bg-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveColumn(column.id)}
                    className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 py-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="font-medium">Add a task</span>
                  </button>
                )}
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto">
                {column.tasks.slice(0, columnIndex === 2 ? 4 : column.tasks.length).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center space-x-3 py-2 group cursor-pointer"
                    onClick={() => toggleTask(column.id, task.id)}
                  >
                    <button
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        task.completed
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-gray-300 hover:border-blue-500"
                      }`}
                    >
                      {task.completed && (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                    <span className={`flex-1 text-sm ${task.completed ? "text-gray-500 line-through" : "text-gray-800"}`}>
                      {task.text}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteTask(column.id, task.id)
                      }}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span>{column.tasks.filter((t) => t.completed).length} completed</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Todo
