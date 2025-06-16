import Headers from '../headers'
import SubHeader from '../SubHeader'

type Props = {
  children: React.ReactNode
}

const App = (props: Props) => {
  return (
    <div className="max-w-screen min-h-screen">
      <Headers />
      <SubHeader />
      {props.children}
    </div>
  )
}

export default App
