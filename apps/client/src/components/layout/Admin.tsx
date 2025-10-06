import AdminHeader from '../AdminHeader'
import SidebarAdmin from '../AdminSidebar'

type Props = {
  children: React.ReactNode
}

const Admin = (props: Props) => {
  return (
    <div className="max-w-screen min-h-screen">
      <AdminHeader />
      <div className="max-w-[1440px] w-full m-auto grid grid-cols-[280px_1fr] bg-[#FFFFFF ]">
        <SidebarAdmin />
        <div className=" p-10">{props.children}</div>
      </div>
    </div>
  )
}

export default Admin
