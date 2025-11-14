import React from 'react'

export const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <a href="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/tasks" className="block py-2 px-4 rounded hover:bg-gray-700">
              Tarefas
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
