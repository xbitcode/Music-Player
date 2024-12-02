import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'
import Layout from './components/Layout'
import MusicPlayer from './components/MusicPlayer'
import Home from './pages/Home'
import Search from './pages/Search'
import Library from './pages/Library'
import Liked from './pages/Liked'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/liked" element={<Liked />} />
          </Routes>
          <MusicPlayer />
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
