import { Link } from 'react-router-dom'


function ActionAgente() {
  return (

    <div className="w-[1440px] h-[360px] px-[304px] pt-[54px] pb-[53px] bg-blue-800 justify-center items-center inline-flex">
      <p className="flex justify-center space-evently">
        Trabajemos juntos.
        <Link to="/cotizador" className="flex ms-2 font-bold hover:text-purple">
          Unete Aqui{' '}
          <span className='inline-block'>
            <BiRightArrowAlt className="text-2xl" />
          </span>
        </Link>
      </p>


    </div>
  );
}
export default ActionAgente