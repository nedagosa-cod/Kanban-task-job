import './App.css'
import './index.scss'
import KanbanBoard from './components/KanbanBoard'
import { KanbanProvider } from './context/KanbanContext'

function App() {
  return (
    <div className="app">
      <div id="cloud">
        <div id="cloud_layer1"></div>
        <div id="cloud_layer2"></div>
      </div>
      <div id="sun">
        <div id="sun_layer1"></div>
        <div id="sun_layer2"></div>
        <div id="sun_layer3"></div>
      </div>
      <KanbanProvider>
        <KanbanBoard />
      </KanbanProvider>
    </div>
  )
}

export default App
