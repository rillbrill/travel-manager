import Button from '@/components/common/Button'

function SetPlaceForm() {
  return (
    <div className="flex w-full flex-1 flex-col justify-between">
      <div className="flex flex-col gap-y-4">
        <Button shape="input">여행지 선택하기</Button>
      </div>
    </div>
  )
}

export default SetPlaceForm
