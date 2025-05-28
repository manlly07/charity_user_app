import { Route, Routes } from 'react-router'
import { View } from './components'
import routes from './pages/routes'

function App() {
  return (
    <Routes>
      {routes.map(({ component: Component, path, layout, title, is_public }) => {
        return (
          <Route
            key={path}
            path={path}
            element={
              <View display={<Component />} layout={layout} title={title} is_public={is_public} />
            }
          />
        )
      })}
    </Routes>
  )
}

export default App
