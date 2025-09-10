import { CharityEventResponseList } from '@/pages/home'
import { ClockIcon, RocketIcon } from '@radix-ui/react-icons'
import dayjs from 'dayjs'
import { Link } from 'react-router'
import FollowIcon from '../follow'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

const Charity = ({ data }: { data: CharityEventResponseList }) => {
  return (
    <div className="shadow rounded-lg overflow-hidden">
      <Link to={`/organize/charity/${data.id}`} className="image h-[192px] w-full rounded-t-lg ">
        <img src={data.pic} alt="Banner" className="w-full h-full object-cover " />
      </Link>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={data.organization.avatar || undefined}
                alt={data.organization.name}
              />
              <AvatarFallback>{data.organization.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <p className="text-base font-medium">{data.organization.name}</p>
          </div>
          <FollowIcon />
        </div>
        <div className="space-y-2">
          <h4 className="text-xl font-semibold">{data?.name}</h4>
          <p className="font-normal text-base">{data?.description}</p>
        </div>
        <div className="p-4 bg-secondary-bg-color rounded-lg">
          <p className="text-base font-medium">Requirements:</p>
          <ul className="list-disc pl-5 space-y-1 text-[#4B5563] marker:text-primary-custom-color">
            {data.requirement?.split(';').map((req, idx) => (
              <li key={idx} className="text-sm font-normal">
                {req.trim()}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <RocketIcon width={14} height={14} className="text-primary-custom-color" />
              <p className="text-[#4B5563] text-sm">{data.destination}</p>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon width={14} height={14} className="text-primary-custom-color" />
              <p className="text-[#4B5563] text-sm">
                Starts {dayjs(data.dateStart).format('MMM D, YYYY')}
              </p>
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
