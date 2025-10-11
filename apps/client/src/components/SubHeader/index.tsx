import SearchInput from '../search'

const SubHeader = () => {
  return (
    <div className="bg-[#F9FAFB]">
      <div className="max-w-[1440px] w-full m-auto flex items-center justify-between py-4 px-6 gap-6">
        <SearchInput className="max-w-[600px]" />
        {/* <div className="overflow-hidden">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div> */}
      </div>
    </div>
  )
}

export default SubHeader
