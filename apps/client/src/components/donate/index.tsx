import { Banner1 } from '@/assets'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Progress } from '@radix-ui/themes'
import { Link } from 'react-router'
import { Button } from '../ui/button'

const DonateItem = () => {
  return (
    <div className="shadow rounded-lg">
      <Link
        to={'/organize/donate/1'}
        className="image block h-[180px] w-full rounded-t-lg overflow-hidden"
      >
        <img src={Banner1} alt="Banner" className="w-full h-full object-cover " />
      </Link>
      <div className="p-4 space-y-3.5">
        <h4 className="text-lg font-medium mb-0">Clean Ocean Initiative</h4>
        <p className="text-[#4B5563] text-sm">
          Help us remove plastic waste from our oceans and protect marine life
        </p>
        <div className="flex items-center gap-2">
          <CalendarIcon width={16} height={16} />
          <span className="text-[#4B5563] text-sm">Jan 1, 2024 - Mar 31, 2024</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm">$37,500 raised</span>
            <span className="font-normal text-sm">of $50,000</span>
          </div>
          <div>
            <Progress value={75} variant="soft" radius="full" color="green" />
          </div>
        </div>
        <Button className="w-full bg-primary-custom-color hover:bg-primary-custom-color">
          Donate Now
        </Button>
      </div>
    </div>
  )
}

export default DonateItem
