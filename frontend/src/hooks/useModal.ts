import { useState } from 'react'

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const openModal = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
    setIsModalOpen(true)
  }

  const closeModal = () => {
    document.getElementsByTagName('body')[0].style.overflowY = 'auto'
    setIsModalOpen(false)
  }

  return { isModalOpen, openModal, closeModal }
}
