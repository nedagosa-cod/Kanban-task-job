import './App.css'
import KanbanBoard from './components/KanbanBoard'
import { KanbanProvider } from './context/KanbanContext'

function App() {
  return (
    <div className="app">
      <KanbanProvider>
        <KanbanBoard />
      </KanbanProvider>
    </div>
  )
}

export default App
