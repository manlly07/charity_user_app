import { CalendarIcon } from '@radix-ui/react-icons'

const UpcomingEvents = () => {
  return (
    <div className="p-6 space-y-4 shadow">
      <p className="text-lg font-semibold">Upcoming Events</p>
      <div className="flex gap-3 items-center bg-secondary-bg-color p-3 rounded-md">
        <CalendarIcon width="16" height="16" className="text-secondary-custom-color" />
        <div className="flex-1">
          <p className="text-sm font-medium">Beach Cleanup Drive</p>
          <p className="text-xs font-normal text-[#4B5563]">Tomorrow, 8:00 AM</p>
        </div>
        <span className="text-secondary-custom-color text-xs px-2 py-1 bg-secondary-custom-color/20 rounded-lg h-fit">
          Tomorrow
        </span>
      </div>
      <div className="flex gap-3 items-center bg-secondary-bg-color p-3 rounded-md">
        <CalendarIcon width="16" height="16" className="text-primary-custom-color" />
        <div className="flex-1">
          <p className="text-sm font-medium">Beach Cleanup Drive</p>
          <p className="text-xs font-normal text-[#4B5563]">Tomorrow, 8:00 AM</p>
        </div>
        <span className="text-primary-custom-color text-xs px-2 py-1 bg-primary-custom-color/20 rounded-lg h-fit">
          Upcoming
        </span>
      </div>
    </div>
  )
}

export default UpcomingEvents
