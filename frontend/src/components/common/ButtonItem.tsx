import React, { useState } from 'react'

type Props = {
  name: string
  color: string
  onClick: () => void
}
const ButtonItem = ({ name, color, onClick }: Props) => {
  const [isClicked, setIsClicked] = useState(false)

  // 버튼 클릭 시 호출되는 함수
  const handleClick = () => {
    setIsClicked(!isClicked)
    onClick()
  }

  const categoryItemStyleClass = `mx-1 rounded-lg px-2 py-1 font-sans text-xs ${
    isClicked ? 'border border-black' : ''
  }`

  return (
    <button
      className={categoryItemStyleClass}
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      {name}
    </button>
  )
}

export default ButtonItem
