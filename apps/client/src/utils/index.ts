export const formatVND = (number: number = 0) => {
  return new Intl.NumberFormat('vi-VN').format(number) + 'đ'
}
