import { Link, useNavigate } from 'react-router'
import { Button } from '../ui/button'

const Menu = [
  {
    name: 'News Feed',
    link: '/'
  },
  {
    name: 'Donate',
    link: '/donate'
  },
  {
    name: 'My Account',
    link: '/account'
  }
]

const Headers = () => {
  const navigate = useNavigate()
  return (
    <header className="w-full sticky top-0 z-10 bg-main-bg-color">
      <div className="max-w-[1440px] w-full m-auto flex items-center justify-between bg-main-bg-color py-4 px-6">
        <span className="text-primary-custom-color font-semibold text-2xl">VolunteerHub</span>
        <div className="flex items-center justify-content-center gap-8 text-base">
          {Menu.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="text-sm text-text-custom-color hover:text-primary-custom-color transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Button
          size={'sm'}
          className="bg-primary-custom-color hover:bg-primary-custom-color/80 w-fit shadow-lg shadow-primary-custom-color/20"
          onClick={() => navigate('/request-organize')}
        >
          Become Organization
        </Button>
      </div>
    </header>
  )
}

export default Headers
