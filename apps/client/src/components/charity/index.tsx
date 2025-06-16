import { Banner1 } from '@/assets'
import { ClockIcon, RocketIcon } from '@radix-ui/react-icons'
import { Link } from 'react-router'
import FollowIcon from '../follow'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

const Charity = () => {
  return (
    <div className="shadow rounded-lg">
      <Link
        to={'/organize/charity/1'}
        className="image h-[192px] w-full rounded-t-lg overflow-hidden"
      >
        <img src={Banner1} alt="Banner" className="w-full h-full object-cover " />
      </Link>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://github.com/leerob.png" alt="Organization Logo" />
              <AvatarFallback>O</AvatarFallback>
            </Avatar>
            <p className="text-base font-medium">Green Earth Initiative</p>
          </div>
          <FollowIcon />
        </div>
        <div className="space-y-2">
          <h4 className="text-xl font-semibold">Community Garden Project</h4>
          <p className="font-normal text-base">
            Help us create and maintain community gardens to promote sustainable living and food
            security.
          </p>
        </div>
        <div className="p-4 bg-secondary-bg-color rounded-lg">
          <p className="text-base font-medium">Requirements:</p>
          <ul className="list-disc pl-5 space-y-1 text-[#4B5563] marker:text-primary-custom-color">
            <li className="text-sm font-normal">4 hours per week</li>
            <li className="text-sm font-normal">Basic gardening knowledge</li>
            <li className="text-sm font-normal">Own transportation</li>
          </ul>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <RocketIcon width={14} height={14} className="text-primary-custom-color" />
              <p className="text-[#4B5563] text-sm">Central Park, Downtown</p>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon width={14} height={14} className="text-primary-custom-color" />
              <p className="text-[#4B5563] text-sm">Starts Sep 15, 2024</p>
            </div>
          </div>
          <Button className="bg-primary-custom-color hover:bg-primary-custom-color/85 px-6">
            Join Program
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Charity
