type Props = {
  children: React.ReactNode
}

const Blank = (props: Props) => {
  return <div className="max-w-screen min-h-screen">{props.children}</div>
}

export default Blank
