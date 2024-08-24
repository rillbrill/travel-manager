import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button, Field, Input } from '@/components/common'
import { errorMessages } from '@/constants/errorMessage'
import { DayCategoryEnum, DaysTabEnum } from '@/types/plan'
import { cn } from '@/utils/cn'

import CategoryList from '../activity/CategoryList'

type Props = {
  handleAddExpense: (
    expenseName: string,
    krw: number,
    category: DayCategoryEnum
  ) => void
  handleCancel: () => void
}

type FormData = {
  expenseName: string
  krw?: number
  category: DayCategoryEnum
}

const initialValues: FormData = {
  expenseName: '',
  krw: undefined,
  category: DayCategoryEnum.Etc, // 기본적으로 "기타" 카테고리를 선택
}

function ExpenseForm({ handleAddExpense, handleCancel }: Props) {
  const [expensePayload, setExpensePayload] = useState<FormData>(initialValues)
  const {
    register,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    defaultValues: initialValues,
    mode: 'onChange',
  })

  const isValid = useMemo(
    () => expensePayload.expenseName !== '' && expensePayload.krw > 0,
    [expensePayload]
  )

  const updatePayload = (value: Partial<FormData>) => {
    setExpensePayload({
      ...expensePayload,
      ...value,
    })
  }

  const handleSubmit = () => {
    if (isValid) {
      handleAddExpense(
        expensePayload.expenseName,
        expensePayload.krw,
        expensePayload.category
      )
      setExpensePayload(initialValues) // 폼 제출 후 초기화
    }
  }

  return (
    <form className="rounded-md border border-gray-300 p-4">
      <Field
        name="카테고리"
        value={
          <CategoryList
            currentTab={DaysTabEnum.Expense}
            selectedCategory={expensePayload.category}
            onClick={(category) => updatePayload({ category })}
          />
        }
        isRequired
      />
      <Field
        name="비용 이름"
        value={
          <Input
            {...register('expenseName', {
              required: {
                value: true,
                message: errorMessages.addExpense.nameRequired,
              },
              minLength: {
                value: 1,
                message: errorMessages.addExpense.nameRequired,
              },
              value: expensePayload.expenseName,
              onChange: (e) => updatePayload({ expenseName: e.target.value }),
            })}
            type="text"
            className="p-2 text-sm"
            placeholder="비용 이름을 입력해주세요"
            errorMessage={errors.expenseName && errors.expenseName.message}
          />
        }
        isRequired
      />
      <Field
        name="금액 (KRW)"
        value={
          <Input
            {...register('krw', {
              required: {
                value: true,
                message: '금액을 입력해주세요.',
              },
              valueAsNumber: true,
              onChange: (e) => updatePayload({ krw: Number(e.target.value) }),
            })}
            //type="number"
            className="p-2 text-sm"
            placeholder="금액을 입력해주세요"
            errorMessage={errors.krw && errors.krw.message}
          />
        }
        isRequired
      />

      <div className="mt-2 flex items-center gap-x-3">
        <Button
          type="button"
          className="border border-blue-500 bg-transparent px-0 py-2 text-sm text-blue-500"
          onClick={handleCancel}
        >
          취소
        </Button>
        <Button
          type="button"
          isDisabled={!isValid}
          className={cn([
            isValid ? 'border border-blue-500' : 'border border-gray-400',
            'px-0 py-2 text-sm',
          ])}
          onClick={handleSubmit}
        >
          추가
        </Button>
      </div>
    </form>
  )
}

export default ExpenseForm
