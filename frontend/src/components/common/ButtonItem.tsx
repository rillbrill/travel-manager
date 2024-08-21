import React, { useState } from 'react'

type Props = {
  name: string
  color: string
  onClick: () => void
}

const ButtonItem = ({ name, color, onClick }: Props) => {
  // 버튼이 클릭된 상태를 관리하기 위한 상태 변수
  const [isClicked, setIsClicked] = useState(false)

  // 버튼 클릭 시 호출되는 함수
  const handleClick = () => {
    // 클릭 상태를 반전시킴 (클릭되면 true, 다시 클릭하면 false)
    setIsClicked(!isClicked)
    onClick() // 외부에서 전달된 onClick 함수도 호출
  }

  // 클릭 상태에 따라 추가되는 테두리 검정선 스타일
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

/*
type Props = {
    name: string
    color: string
    onClick: () => void
  }
  const ButtonItem = ({ name, color, onClick }: Props) => {
    const categoryItemStyleClass = `mx-1 rounded-lg px-2 py-1 font-sans text-xs`
  
    return (
      <button
        className={categoryItemStyleClass}
        style={{ backgroundColor: color }}
        onClick={onClick}
      >
        {name}
      </button>
    )
  }
  
  export default ButtonItem
  */
