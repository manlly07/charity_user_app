import { Banner4 } from '@/assets'

const RequestOrganization = () => {
  return (
    <>
      <div className="flex">
        <div className="flex-1 flex flex-col justify-center morphing-green space-y-4 pl-16">
          <p className="text-white text-5xl font-bold max-w-[452px]">
            Want to become an Organization?
          </p>
          <p className="text-xl font-normal text-text-custom-color">
            Join our community of changemakers and make a bigger impact
          </p>
          <p className="text-sm font-normal text-text-custom-color max-w-[544px]">
            Transform your passion for helping others into organized action. Get access to powerful
            tools, resources, and a network of like-minded organizations.
          </p>
        </div>
        <div className="relative flex-1">
          <div className="image w-full h-[400px]">
            <img src={Banner4} alt="banner" className="w-full h-full object-cover" />
            <span className="absolute top-0 left-0 right-0 bottom-0 morphing"></span>
          </div>
        </div>
      </div>
      <div className="max-w-[700px] my-16 w-full m-auto p-12 space-y-8 shadow rounded-lg">
        <p className="font-bold text-3xl">Organization Application</p>
      </div>
    </>
  )
}

export default RequestOrganization
