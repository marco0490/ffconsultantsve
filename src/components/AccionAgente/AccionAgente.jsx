import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";



function AccionAgente() {
  return (

    <div className="hidden md:block w-full py-2 bg-primary text-blue">
      <div>
        <p className="flex justify-center">
          Trabajemos juntos.
          <Link to="/cotizador" className="flex ms-2 font-bold hover:text-purple">
            Unete Aqui{' '}
            <span className='inline-block'>
              <BiRightArrowAlt className="text-2xl" />
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
export default AccionAgente