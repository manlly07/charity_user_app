import Headers from '../headers'

type Props = {
  children: React.ReactNode
}

const App = (props: Props) => {
  return (
    <div className="w-screen min-h-screen">
      <Headers />
      {props.children}
    </div>
  )
}

export default App
