import { Controller, useFormContext } from 'react-hook-form'

import Input from '@/components/common/Input'
import { errorMessages } from '@/constants/errorMessage'
import { usePlanStore } from '@/store/plan'

function SetInfoForm() {
  const {
    plan: { name, headCount },
    setName,
    setHeadCount,
  } = usePlanStore()
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex flex-col gap-y-8">
      <Controller
        name="name"
        control={control}
        rules={{
          required: { value: true, message: errorMessages.addPlan.name },
          minLength: { value: 1, message: errorMessages.addPlan.name },
        }}
        render={({
          field: { value, onChange, ...props },
          fieldState: { error },
        }) => (
          <Input
            type="text"
            defaultValue={name}
            value={name}
            label="여행명"
            placeholder="여행명을 입력해주세요"
            errorMessage={errors.name && error?.message}
            onChange={(e) => {
              onChange(e)
              setName(e.target.value)
            }}
            {...props}
          />
        )}
      />
      <Controller
        name="headCount"
        control={control}
        rules={{ required: true, min: 1 }}
        render={({ field: { value, ...props } }) => (
          <Input
            type="number"
            value={headCount}
            label="총 인원"
            onNumberChange={(value) => setHeadCount(value)}
            {...props}
          />
        )}
      />
    </div>
  )
}

export default SetInfoForm
