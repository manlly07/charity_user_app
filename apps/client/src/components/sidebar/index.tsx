import { cn } from '@/lib/utils'
import { BackpackIcon, ExitIcon, GearIcon, HeartIcon, HomeIcon } from '@radix-ui/react-icons'
import { Link, useLocation } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const SIDEBAR = [
  {
    name: 'Account',
    icon: <HomeIcon width={20} height={20} />,
    path: '/account'
  },
  {
    name: 'Charity History',
    icon: <HeartIcon width={20} height={20} />,
    path: '/charity-history'
  },

  {
    name: 'Donation History',
    icon: <BackpackIcon width={20} height={20} />,
    path: '/donation-history'
  },
  {
    name: 'Settings',
    icon: <GearIcon width={20} height={20} />,
    path: '/settings'
  },
  {
    name: 'Log out',
    icon: <ExitIcon width={20} height={20} />,
    path: '/logout'
  }
]

const Sidebar = () => {
  const { pathname } = useLocation()
  return (
    <div className="p-6 border-r border-[#E5E7EB] col-span-1 min-h-[calc(100vh-64px)] relative">
      <div className="fixed w-[calc(280px-2*24px)] h-[calc(100vh-64px-2*24px)]">
        <div className="space-y-8">
          <div className="flex gap-3 flex-col justify-center items-center w-full">
            <Avatar className="w-[120px] h-[120px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-2xl font-semibold">John Anderson</p>
              <p className="text-sm text-text-secondary">john.anderson@email.com</p>
              <span className="block w-fit m-auto mt-1 text-sm rounded-xl px-3 py-1 text-primary-custom-color bg-primary-custom-color/40">
                Active Volunteer
              </span>
            </div>
          </div>
          <div className="space-y-1">
            {SIDEBAR.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex gap-2 items-center rounded-lg duration-300 px-4 py-3 hover:bg-[#DDF3DD] hover:text-primary-custom-color',
                  {
                    'bg-[#DDF3DD] text-primary-custom-color': pathname === item.path
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

export default Sidebar
