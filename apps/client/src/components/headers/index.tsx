import { Link } from 'react-router'
import { Button } from '../ui/button'

const Headers = () => {
  return (
    <header className="w-full">
      <div className="max-w-[1440px] w-full m-auto flex items-center justify-between bg-main-bg-color py-4 px-6">
        <span className="text-primary-custom-color font-semibold">VolunteerHub</span>
        <div className="flex items-center justify-content-center gap-8 text-base">
          <Link to="" className="text-sm text-text-custom-color hover:text-primary-custom-color">
            News Feed
          </Link>
          <Link to="" className="text-sm text-text-custom-color hover:text-primary-custom-color">
            Donate
          </Link>
          <Link to="" className="text-sm text-text-custom-color hover:text-primary-custom-color">
            My Account
          </Link>
        </div>
        <Button
          size={'sm'}
          className="bg-primary-custom-color hover:bg-primary-custom-color/80 w-fit shadow-lg shadow-primary-custom-color/20"
        >
          Become Organization
        </Button>
      </div>
    </header>
  )
}

export default Headers
