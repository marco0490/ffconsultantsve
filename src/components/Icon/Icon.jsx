import { FaRegClock } from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'
import { FiMapPin } from 'react-icons/fi'
import { BsTelephoneForward } from 'react-icons/bs'

function Icon({ icon, ...props }) {
  const icons = {
    FaRegClock: FaRegClock,
    AiOutlineMail: AiOutlineMail,
    FiMapPin: FiMapPin,
    BsTelephoneForward: BsTelephoneForward,
  }

  const DynamicIcon = icons[icon]

  return (
    <DynamicIcon {...props} />
  )
}

export default Icon
