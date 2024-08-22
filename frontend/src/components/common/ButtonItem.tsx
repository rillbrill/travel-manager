type Props = {
  name: string
  color: string
  onClick: () => void
}
const ButtonItem = ({ name, color, onClick }: Props) => {
  const categoryItemStyleClass = `rounded-lg px-2 py-1 font-sans text-xs`

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
