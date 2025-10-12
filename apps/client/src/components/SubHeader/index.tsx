import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import SearchInput from '../search'

const SubHeader = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [keyword, setKeyword] = useState(searchParams.get('s') || '')

  useEffect(() => {
    if (keyword.trim() === '') {
      navigate('.', { replace: true }) // xoá query param
    }
  }, [keyword, navigate])

  const handleSearch = () => {
    if (!keyword.trim()) return
    navigate(`?s=${encodeURIComponent(keyword.trim())}`)
  }

  return (
    <div className="bg-[#F9FAFB]">
      <div className="max-w-[1440px] w-full m-auto flex items-center justify-between py-4 px-6 gap-6">
        <SearchInput
          className="max-w-[600px]"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>
    </div>
  )
}

export default SubHeader
