import PropTypes from 'prop-types';
import { FaRegStar, FaStar } from 'react-icons/fa'

export const TestimonalCard = ({ rating, user, children }) => {
  return (
    <div className="px-7 py-6 rounded shadow-md flow">

      <div className='rating cluster text-yellow-400 text-xl'>
        {[...Array(5)].map((_, index) => (index < rating ? <FaStar key={index} /> : <FaRegStar key={index} />))}
      </div>
      <p className='text-gray-500'>“{children}”</p>

      <div className='user-info cluster'>
        <img className='h-12 w-12 rounded-full' aria-hidden="true" src={user.picture} alt="" />
        <div>
          <p className='text-primary font-bold'>{user.name}</p>
          <p className='font-semibold'>{user.role}</p>
        </div>
      </div>
    </div>
  )
}

TestimonalCard.propTypes = {
  rating: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};