import { useMemo, useState } from 'react'

import { Button, Field, Input } from '@/components/common'
import { errorMessages } from '@/constants/errorMessage'
import { AddActivityReqDto, DayCategoryEnum, DaysTabEnum } from '@/types/plan'
import { cn } from '@/utils/cn'

import CategoryList from './CategoryList'
import ExpenseInput from './ExpenseInput'
import LocationInput from './LocationInput'

type Props = {
  currentTab: DaysTabEnum
  defaultValues?: AddActivityReqDto
  isEditMode?: boolean
  isLoading?: boolean
  handleCancel: () => void
  handleSave: (payload: AddActivityReqDto) => void
}

const initialValues: AddActivityReqDto = {
  activityName: '',
  detail: '',
  activityLocation: '',
  activityExpenses: null,
  category: '',
}

function ActivityForm({
  currentTab,
  defaultValues,
  isLoading,
  isEditMode,
  handleCancel,
  handleSave,
}: Props) {
  const [activityPayload, setActivityPayload] = useState<AddActivityReqDto>(
    defaultValues || initialValues
  )

  const isValid = useMemo(() => {
    const commonValidation =
      !!activityPayload.activityName &&
      activityPayload.activityName.length <= 15 &&
      !!activityPayload.category
    return currentTab === DaysTabEnum.Activity
      ? commonValidation
      : commonValidation && activityPayload.activityExpenses
  }, [
    activityPayload.activityName,
    activityPayload.category,
    activityPayload.activityExpenses,
    currentTab,
  ])
  const updatePayload = (value: Partial<AddActivityReqDto>) => {
    setActivityPayload({
      ...activityPayload,
      ...value,
    })
  }

  return (
    <form className={isEditMode ? '' : 'rounded-md border border-gray-300 p-4'}>
      <Field
        name="카테고리"
        value={
          <CategoryList
            currentTab={currentTab}
            selectedCategory={activityPayload.category as DayCategoryEnum}
            onClick={(category) => updatePayload({ category })}
          />
        }
        isRequired
      />
      <Field
        name="활동명"
        value={
          <Input
            type="text"
            value={activityPayload.activityName}
            onChange={(e) => updatePayload({ activityName: e.target.value })}
            className="p-2 text-sm"
            placeholder="활동명을 입력해주세요"
            errorMessage={
              activityPayload.activityName.length < 1
                ? errorMessages.addActivity.nameRequired
                : activityPayload.activityName.length > 15
                  ? errorMessages.addActivity.nameMaxLength
                  : undefined
            }
          />
        }
        isRequired
      />
      <Field
        name="장소"
        value={
          <LocationInput
            defaultValue={activityPayload.activityLocation}
            updatePayload={updatePayload}
          />
        }
      />
      <Field
        name="메모"
        value={
          <textarea
            value={activityPayload.detail || ''}
            onChange={(e) => updatePayload({ detail: e.target.value })}
            className="w-full rounded-md border border-gray-300 p-2 text-sm"
          />
        }
      />
      <Field
        name="경비 (KRW)"
        value={
          <ExpenseInput
            value={activityPayload.activityExpenses || ''}
            onChange={(e) =>
              updatePayload({ activityExpenses: Number(e.target.value) })
            }
          />
        }
        isRequired={currentTab === DaysTabEnum.Expense}
      />

      <div className="mt-2 flex items-center gap-x-3">
        <Button
          className="px-0 py-2 text-sm text-blue-500 outline-button"
          isFull
          onClick={handleCancel}
        >
          취소
        </Button>
        <Button
          isDisabled={!isValid}
          isLoading={isLoading}
          className={cn([
            isValid ? 'border border-blue-500' : 'border border-gray-400',
            'px-0 py-2 text-sm',
          ])}
          isFull
          onClick={() => handleSave(activityPayload)}
        >
          저장
        </Button>
      </div>
    </form>
  )
}

export default ActivityForm
