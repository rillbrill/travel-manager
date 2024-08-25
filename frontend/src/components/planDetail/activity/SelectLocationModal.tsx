import { useState } from 'react'

import { mapClient } from '@/api/mapClient'
import { Button, Input, Modal, SvgLoadingSpinner } from '@/components/common'
import { usePending } from '@/hooks/usePending'
import { HttpStatusCodeEnum } from '@/types'
import { AddActivityReqDto, LocalSearchKeywordResDto } from '@/types/plan'

type Props = {
  closeModal: () => void
  updatePayload: (value: Partial<AddActivityReqDto>) => void
}

function SelectLocationModal({ closeModal, updatePayload }: Props) {
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<LocalSearchKeywordResDto>(
    {} as LocalSearchKeywordResDto
  )
  const { isPending, toggleIsPending } = usePending()

  const handleSearch = async () => {
    toggleIsPending(true)
    const response = await mapClient.get<LocalSearchKeywordResDto>(
      `/keyword.json?query=${query}`
    )

    if (response.status === HttpStatusCodeEnum.OK) {
      setResults(response.data)
      toggleIsPending(false)
    }
  }

  return (
    <Modal title="장소 검색하기" closeModal={closeModal}>
      <div className="flex flex-col gap-y-6 p-2">
        <div className="flex items-center gap-x-3">
          <Input
            value={query}
            className="p-2 text-sm"
            placeholder="키워드 입력"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            isLoading={isPending}
            className="text-nowrap rounded-[4px] px-3 py-1.5 text-sm"
            onClick={handleSearch}
          >
            검색
          </Button>
        </div>

        <div className="flex max-h-60 min-h-20 flex-col gap-y-3 overflow-y-auto no-scrollbar">
          {!results.documents ? (
            <></>
          ) : (
            <>
              {isPending && (
                <SvgLoadingSpinner className="mx-auto fill-blue-500" />
              )}
              {!isPending && results.documents.length === 0 && (
                <p className="my-2 text-center">검색 결과가 없습니다.</p>
              )}
              {!isPending && results.documents.length > 0 && (
                <>
                  {results.documents.map((result) => (
                    <div key={result.id} className="flex items-center">
                      <div className="flex flex-1 flex-col gap-y-1 text-sm">
                        <p>{result.placeName}</p>
                        <p className="text-gray-500">
                          도로명주소: {result.roadAddressName}
                        </p>
                      </div>
                      <Button
                        className="rounded-[4px] border border-blue-500 bg-gray-50 px-3 py-1 text-sm text-blue-500"
                        onClick={() => {
                          updatePayload({
                            activityLocation: `${result.placeName}/${result.roadAddressName}`,
                          })
                          closeModal()
                        }}
                      >
                        선택
                      </Button>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default SelectLocationModal
