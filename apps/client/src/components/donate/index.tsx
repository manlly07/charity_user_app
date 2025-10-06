import { Banner1 } from '@/assets'
import { Donation } from '@/hooks/useDonations'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Progress } from '@radix-ui/themes'
import dayjs from 'dayjs'
import { Link, useNavigate } from 'react-router'
import { Button } from '../ui/button'

const DonateItem = ({ donation }: { donation: Donation }) => {
  const navigate = useNavigate()
  return (
    <div className="shadow rounded-lg">
      <Link
        to={'/organize/donate/' + donation?.id}
        className="image block h-[180px] w-full rounded-t-lg overflow-hidden"
      >
        <img src={donation?.pic ?? Banner1} alt="Banner" className="w-full h-full object-cover " />
      </Link>
      <div className="p-4 space-y-3.5">
        <h4 className="text-lg font-medium mb-0">{donation?.title}</h4>
        <p className="text-[#4B5563] text-sm">{donation?.description}</p>
        <div className="flex items-center gap-2">
          <CalendarIcon width={16} height={16} />
          <span className="text-[#4B5563] text-sm">
            {`${dayjs(donation?.dateStart).format('MMM D, YYYY')}`} -{' '}
            {`${dayjs(donation?.dateEnd).format('MMM D, YYYY')}`}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(
                parseFloat(donation?.totalDonated as string) ||
                  parseFloat(donation?.actualAmount as string) ||
                  0
              )}{' '}
              raised
            </span>
            <span className="font-normal text-sm">
              of{' '}
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(
                parseFloat(donation?.moneyNeed as string) ||
                  parseFloat(donation?.targetAmount as string) ||
                  0
              )}
            </span>
          </div>
          <div>
            <Progress value={75} variant="soft" radius="full" color="green" />
          </div>
        </div>
        <Button
          className="w-full bg-primary-custom-color hover:bg-primary-custom-color"
          onClick={() => navigate('/donate/' + donation?.id)}
        >
          Donate Now
        </Button>
      </div>
    </div>
  )
}

export default DonateItem
