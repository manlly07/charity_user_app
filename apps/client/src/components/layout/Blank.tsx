type Props = {
  children: React.ReactNode
}

const Blank = (props: Props) => {
  return <div className="w-screen h-screen">{props.children}</div>
}

export default Blank
