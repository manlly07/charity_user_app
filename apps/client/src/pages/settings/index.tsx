import { AccountForm, PasswordForm } from '@/components'

const DonationHistory = () => {
  return (
    <div className="space-y-4 mb-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">User Settings</p>
        </div>
      </div>
      <AccountForm />
      <PasswordForm />
    </div>
  )
}

export default DonationHistory
