import { CheckIcon, IconFacebook2, IconLinked, IconTelegram } from '@/assets'
import { Button } from '@/components/ui/button'
import { DownloadIcon, HomeIcon, Share1Icon } from '@radix-ui/react-icons'
import { Progress } from '@radix-ui/themes'

const Success = () => {
  return (
    <div className="max-w-[650px] w-full m-auto space-y-11 mb-12 py-16">
      <div className="space-y-6 text-center">
        <div>
          <img src={CheckIcon} alt="CHECK" className="block m-auto" width={64} height={64} />
        </div>
        <div className="space-y-4">
          <p className="font-bold text-4xl">Cảm Ơn Bạn Đã Quyên Góp!</p>
          <p className="text-xl text-text-custom-color">
            Sự ủng hộ của bạn sẽ tạo nên những thay đổi ý nghĩa
          </p>
        </div>
      </div>
      <div className="p-9 space-y-6 border border-primary-custom-color/20 rounded-lg">
        <p className="tex-xl font-semibold">Chi Tiết Quyên Góp</p>
        <div className="space-y-4">
          <div className="flex items-center justify-between [&>span]:text-text-custom-color [&>span]:text-base [&>p]:font-medium">
            <span>Người quyên góp:</span>
            <p>@john_doe</p>
          </div>
          <div className="flex items-center justify-between [&>span]:text-text-custom-color [&>span]:text-base [&>p]:font-medium">
            <span>Số tiền:</span>
            <p className="text-primary-custom-color">200.000₫</p>
          </div>
          <div className="flex items-center justify-between [&>span]:text-text-custom-color [&>span]:text-base [&>p]:font-medium">
            <span>Chiến dịch:</span>
            <p>Hỗ Trợ Nạn Nhân Lũ Lụt Miền Trung</p>
          </div>
          <div className="flex items-center justify-between [&>span]:text-text-custom-color [&>span]:text-base [&>p]:font-medium">
            <span>Tổ chức:</span>
            <p>Quỹ Từ Thiện Trái Tim Xanh</p>
          </div>
          <div className="flex items-center justify-between [&>span]:text-text-custom-color [&>span]:text-base [&>p]:font-medium">
            <span>Thời gian:</span>
            <p>15:30, 20/12/2023</p>
          </div>
          <div className="flex items-center justify-between [&>span]:text-text-custom-color [&>span]:text-base [&>p]:font-medium">
            <span>Mã giao dịch:</span>
            <p>#DON-2023120001</p>
          </div>
        </div>
      </div>
      <div className="p-6 border border-border bg-[#F3F4F6] rounded-lg space-y-4">
        <Progress value={60} radius="full" color="grass" />
        <div className="flex items-center justify-between [&>*]:text-sm [&>*]:font-medium">
          <span>180.000.000₫ / 300.000.000₫</span>
          <span className="text-primary-custom-color">Đã đạt được 60% mục tiêu</span>
        </div>
      </div>
      <div className="flex items-center gap-4 [&>button]:flex-1">
        <Button className="bg-primary-custom-color hover:bg-primary-custom-color">
          <DownloadIcon />
          <span>Tải Biên Nhận</span>
        </Button>
        <Button className="bg-white hover:bg-white text-black border">
          <HomeIcon />
          <span>Trở Về Trang Chủ</span>
        </Button>
        <Button className="bg-[#FFD700] hover:bg-[#FFD700] text-black">
          <Share1Icon />
          <span>Chia Sẻ Quyên Góp</span>
        </Button>
      </div>
      <div className="text-center space-y-4">
        <p className="font-semibold text-xl">Lan Tỏa Yêu Thương</p>
        <p className="text-base text-text-secondary">
          Hãy chia sẻ để nhiều người biết về chiến dịch này
        </p>
        <div className="flex items-center justify-center gap-4">
          <img src={IconFacebook2} alt="" width={48} height={48} className="object-cover" />
          <img src={IconTelegram} alt="" width={48} height={48} className="object-cover" />
          <img src={IconLinked} alt="" width={48} height={48} className="object-cover" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-xl text-[#4B5563]">
          Cùng nhau, chúng ta mang đến hy vọng cho những người cần giúp đỡ
        </p>
        <p className="text-base text-[#6B7280]">
          Mỗi đóng góp đều là một bước tiến gần hơn đến mục tiêu
        </p>
      </div>
    </div>
  )
}

export default Success
