import Headers from '../headers'
import SidebarOrganize from '../sidebar-organization'

type Props = {
  children: React.ReactNode
}

const Organization = (props: Props) => {
  return (
    <div className="max-w-screen min-h-screen">
      <Headers />
      <div className="max-w-[1440px] w-full m-auto grid grid-cols-[280px_1fr] bg-[#FFFFFF ]">
        <SidebarOrganize />
        <div className=" p-10">{props.children}</div>
      </div>
    </div>
  )
}

export default Organization
