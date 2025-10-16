import { cn } from '@/lib/utils'
import { BackpackIcon, ExitIcon, HeartIcon, HomeIcon } from '@radix-ui/react-icons'
import { Link, useLocation } from 'react-router'

const SIDEBAR = [
  {
    name: 'Dashboard',
    icon: <HomeIcon width={20} height={20} />,
    path: '/organization/account'
  },
  {
    name: 'Charity List',
    icon: <HeartIcon width={20} height={20} />,
    path: '/organization/charities'
  },
  {
    name: 'Donation List',
    icon: <BackpackIcon width={20} height={20} />,
    path: '/organization/donations'
  },
  {
    name: 'Log out',
    icon: <ExitIcon width={20} height={20} />,
    path: '/logout'
  }
]

const SidebarOrganize = () => {
  const { pathname } = useLocation()
  console.log(pathname)
  return (
    <div className="p-6 border-r border-[#E5E7EB] col-span-1 min-h-[calc(100vh-64px)] relative">
      <div className="fixed w-[calc(280px-2*24px)] h-[calc(100vh-64px-2*24px)]">
        <div className="space-y-8">
          <div className="space-y-1">
            {SIDEBAR.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex gap-2 items-center rounded-lg duration-300 px-4 py-3 hover:bg-[#DDF3DD] hover:text-primary-custom-color mt-auto',
                  {
                    'bg-[#DDF3DD] text-primary-custom-color': pathname.startsWith(item.path)
                  }
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarOrganize
