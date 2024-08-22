import React from 'react'

type Props = {
  name: string
  value: React.ReactNode | string
}

function Field({ name, value }: Props) {
  return (
    <div className="flex w-full gap-x-4 py-2">
      <span className="inline-block min-w-20 text-nowrap text-gray-500">
        {name}
      </span>

      <div className="w-full">
        {typeof value === 'string' ? (
          <p className="text-gray-700">{value}</p>
        ) : (
          <>{value}</>
        )}
      </div>
    </div>
  )
}

export default Field
