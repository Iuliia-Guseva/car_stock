import { AppBar, Container, CssBaseline, Toolbar, Typography } from "@mui/material"
import "./App.css"
import CarList from "./components/CarList"

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" className="app-container">
        <AppBar position="static" className="app-bar">
          <Toolbar className="app-toolbar">
            <Typography variant="h6" className="app-title">Car stock</Typography>
          </Toolbar>
        </AppBar>
        <CarList />
      </Container>
    </>
  )
}

export default App
