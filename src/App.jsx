import './App.css'
import './index.scss'
import { Routes, Route } from 'react-router-dom'
import { Loading } from './components/Loading/Loading'
import { KanbanProvider } from './context/KanbanContext'
import Kanban from './components/Kanban'
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
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/kanban" element={<Kanban />} />
        </Routes>
      </KanbanProvider>
    </div>
  )
}

export default App
