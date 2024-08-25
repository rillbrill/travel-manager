import { InputHTMLAttributes, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { plansApi } from '@/api/plans'
import { Input } from '@/components/common'
import { DateFormatTypeEnum, HttpStatusCodeEnum } from '@/types'
import { Currency } from '@/types/plan'
import { formatDate } from '@/utils/formatDate'

type Props = InputHTMLAttributes<HTMLInputElement>

const KRW = 'KRW'

function ExpenseInput({ type, value, onChange, onBlur, ...props }: Props) {
  const { planId } = useParams()
  const [convertedExpense, setConvertedExpense] = useState<Currency | null>(
    null
  )
  const [countryCode, setCountryCode] = useState<string>('')

  const convertCurrency = async () => {
    const response = await plansApi.convertCurrency({
      from: KRW,
      to: countryCode,
      amount: Number(value),
    })

    if (response?.status === HttpStatusCodeEnum.OK) {
      setConvertedExpense(response.data.converted)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await plansApi.getCountryCode(planId || '')

      if (response?.status === HttpStatusCodeEnum.OK) {
        setCountryCode(response.data)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-col gap-y-2">
      <Input
        value={value}
        onChange={onChange}
        className="p-2 text-sm"
        type="text"
        onBlur={convertCurrency}
        {...props}
      />
      <p className="mr-2 text-right text-sm text-gray-500">
        {formatDate(DateFormatTypeEnum.DateWithDots, new Date())} 기준{' '}
        &nbsp;&nbsp;&nbsp;
        {countryCode} &nbsp;
        {convertedExpense?.value.toFixed(1).toLocaleString() || '-'}
      </p>
    </div>
  )
}

export default ExpenseInput
