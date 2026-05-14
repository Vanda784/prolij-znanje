import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Home from './pages/Home'
import RadionicePregled from './pages/radionice/RadionicePregled'
import RadionicaNova from './pages/radionice/RadionicaNova'
import RadionicaPromjena from './pages/radionice/RadionicaPromjena'

function App() {

  return (
    <>
      <Izbornik />
      <Container>
        <Routes>
          <Route path={RouteNames.HOME} element={<Home />} />
          <Route path={RouteNames.RADIONICE} element={<RadionicePregled />} />
          <Route path={RouteNames.RADIONICE_NOVA} element={<RadionicaNova />} />
          <Route path={RouteNames.RADIONICE_PROMJENA} element={<RadionicaPromjena />} />
        </Routes>
        <hr />
        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#6b7280' }}>
          &copy; Prolij znanje za očuvanje | <span>Vanda Zahirović</span>
        </p>
      </Container>
    </>
  )
}

export default App
