import { Banner2, Event1, Event2, Event3 } from '@/assets'
import { Button } from '@/components/ui/button'
import CharityService from '@/services/charity.service'
import { RootState } from '@/stores/store'
import {
  CalendarIcon,
  CheckCircledIcon,
  ClockIcon,
  HeartIcon,
  PaperPlaneIcon,
  PersonIcon,
  Share1Icon
} from '@radix-ui/react-icons'
import { Avatar, Badge, Progress } from '@radix-ui/themes'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import useSWR from 'swr'

const REQUIREMENTS = [
  'Age 16 or older',
  'Commitment to 2-3 hours/week',
  'Physical ability to work outdoors',
  'Basic gardening knowledge helpful',
  'Willingness to learn and adapt'
]

const WHATWILLIDO = [
  'Plant and maintain garden beds',
  'Participate in community workshops',
  'Help with harvest distribution',
  'Collaborate with local schools',
  'Share gardening knowledge'
]

const CharityDetail = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const { id } = useParams<{ id: string }>()
  const charityId = id ? parseInt(id, 10) : 0

  const { data, error, isLoading, mutate } = useSWR('/events/charity', () =>
    CharityService.getCharityById(charityId, user?.id)
  )

  const charity = useMemo(() => {
    if (error || !data) return null
    return data
  }, [data, error])

  return (
    <>
      <div className="relative">
        <div className="image w-full h-[400px]">
          <img src={Banner2} alt="banner" className="w-full h-full object-cover" />
          <span className="absolute top-0 left-0 right-0 bottom-0 morphing"></span>
        </div>
        <div className="absolute bottom-8 left-8">
          <div className="flex gap-4 items-center">
            <Avatar
              size="6"
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              fallback="A"
            />
            <div className="space-y-1 text-white">
              <p className="text-2xl font-bold p-0">Green Earth Foundation</p>
              <p className="text-base text-white/80">Community Garden Project</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] w-full m-auto py-12 px-8 space-y-12">
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <Badge color="green" radius="full">
              Active Event
            </Badge>
            <div className="flex items-center gap-1.5 text-text-secondary">
              <CalendarIcon />
              <span>Sep 15 - Oct 30, 2023</span>
            </div>
            <div className="flex items-center gap-1.5 text-text-secondary">
              <PersonIcon />
              <span>124 Joined</span>
            </div>
            <div className="flex items-center gap-1.5 text-text-secondary">
              <PaperPlaneIcon />
              <span>San Francisco, CA</span>
            </div>
          </div>
          <p className="text-3xl font-bold">
            Community Garden Project: Growing Together for a Greener Tomorrow
          </p>
          <div className="space-y-4">
            <p className="text-text-secondary text-base font-normal">
              Join us in transforming vacant urban spaces into thriving community gardens. This
              project brings together volunteers, local schools, and community members to create
              sustainable green spaces that benefit our entire neighborhood.
            </p>
            <p className="text-text-secondary text-base font-normal">
              Through this initiative, we aim to promote environmental awareness, provide fresh
              produce to local families, and create opportunities for community engagement and
              learning.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-text-custom-color text-sm">
              <span>Volunteer Spots</span>
              <span>124/150</span>
            </div>
            <div>
              <Progress value={50} radius="full" color="grass" />
            </div>
          </div>
          <div className="flex items-center gap-8">
            <Button className="bg-primary-custom-color hover:bg-primary-custom-color" size={'lg'}>
              Join us Volunteer
            </Button>
            <HeartIcon width={24} height={24} />
            <Share1Icon width={24} height={24} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <div className="h-full col-span-1 p-6 space-y-4 bg-secondary-bg-color rounded">
            <p className="text-lg font-bold">Requirements</p>
            <div className="space-y-3">
              {REQUIREMENTS.map((item) => (
                <div className="flex items-center gap-2" key={item}>
                  <CheckCircledIcon className="text-primary-custom-color" width={20} height={20} />
                  <span className="text-base text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-full col-span-1 p-6 space-y-4 bg-secondary-bg-color rounded">
            <p className="text-lg font-bold">What You'll Do</p>
            <div className="space-y-3">
              {WHATWILLIDO.map((item) => (
                <div className="flex items-center gap-2" key={item}>
                  <CheckCircledIcon className="text-primary-custom-color" width={20} height={20} />
                  <span className="text-base text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-full col-span-1 p-6 space-y-4 bg-secondary-bg-color rounded">
            <p className="text-lg font-bold">About Us</p>
            <div className="space-y-3">
              <p className="text-text-secondary text-base">
                Green Earth Foundation is a non-profit organization dedicated to environmental
                conservation and community development through sustainable practices and education.
              </p>
              <div className="flex items-center gap-2">
                <PersonIcon className="text-custom-color" width={20} height={20} />
                <span className="text-base text-text-secondary">Founded in 2010</span>
              </div>
              <div className="flex items-center gap-2">
                <PaperPlaneIcon className="text-custom-color" width={20} height={20} />
                <span className="text-base text-text-secondary">San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="text-custom-color" width={20} height={20} />
                <span className="text-base text-text-secondary">100+ Completed Projects</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <p className="text-xl font-bold">Similar Events</p>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1 space-y-4">
              <div className="image w-full h-[200px] overflow-hidden rounded">
                <img src={Event1} alt="event" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <div className="text-base font-bold">Urban Forest Conservation</div>
                <div className="text-text-custom-color flex gap-2 text-sm">
                  <CalendarIcon width={16} height={16} />
                  <span>Oct 1 - Nov 15, 2023</span>
                </div>
                <div className="text-primary-custom-color flex gap-2 text-sm">
                  <PersonIcon width={16} height={16} />
                  <span>15 spots left</span>
                </div>
              </div>
            </div>
            <div className="col-span-1 space-y-4">
              <div className="image w-full h-[200px] overflow-hidden rounded">
                <img src={Event2} alt="event" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <div className="text-base font-bold">Community Food Bank</div>
                <div className="text-text-custom-color flex gap-2 text-sm">
                  <CalendarIcon width={16} height={16} />
                  <span>Sep 20 - Oct 30, 2023</span>
                </div>
                <div className="text-primary-custom-color flex gap-2 text-sm">
                  <PersonIcon width={16} height={16} />
                  <span>15 spots left</span>
                </div>
              </div>
            </div>
            <div className="col-span-1 space-y-4">
              <div className="image w-full h-[200px] overflow-hidden rounded">
                <img src={Event3} alt="event" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <div className="text-base font-bold">Youth Mentorship Program</div>
                <div className="text-text-custom-color flex gap-2 text-sm">
                  <CalendarIcon width={16} height={16} />
                  <span>Oct 5 - Nov 20, 2023</span>
                </div>
                <div className="text-primary-custom-color flex gap-2 text-sm">
                  <PersonIcon width={16} height={16} />
                  <span>20 spots left</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CharityDetail
