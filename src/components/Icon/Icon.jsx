import { FaRegClock } from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'
import { FiMapPin } from 'react-icons/fi'
import { BsTelephoneForward } from 'react-icons/bs'
import { MdOutlineSos } from 'react-icons/md'

function Icon({ icon, ...props }) {
  const icons = {
    FaRegClock: FaRegClock,
    AiOutlineMail: AiOutlineMail,
    FiMapPin: FiMapPin,
    BsTelephoneForward: BsTelephoneForward,
    MdOutlineSos: MdOutlineSos,
  }

  const DynamicIcon = icons[icon]

  return (
    <DynamicIcon {...props} />
  )
}

export default Icon
