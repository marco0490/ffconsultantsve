function Stepper() {
  return (
    <div>
      <ul
        className="relative m-1 w-full list-none overflow-hidden p-0 md:ps-56"
        data-te-stepper-type="vertical"
      >
        <li className="relative h-fit after:absolute after:left-[2.45rem] after:top-[3.6rem] after:mt-px after:h-[calc(100%-2.45rem)] after:w-px after:bg-primary after:content-['']">
          <div
            data-te-stepper-head-ref
            className="flex cursor-pointer items-center p-6 leading-[1.3rem] no-underline"
          >
            <span
              data-te-stepper-head-icon-ref
              className="mr-3 text-white flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-primary text-xl font-bold"
            >
              1
            </span>
            <span data-te-stepper-head-text-ref className="font-medium text-xl">
              Habla con MaxProtect
            </span>
          </div>
          <div
            data-te-stepper-content-ref
            className="left-0 overflow-hidden pb-6 pl-[3.75rem] text-gray-500 text-left max-w-[400px] pr-6"
          >
            Inicia una conversación con nuestro asistente virtual MaxProtect
            en la página principal para cotizar tu póliza personalizada.
          </div>
        </li>

        <li
          data-te-stepper-step-ref
          className="relative h-fit after:absolute after:left-[2.45rem] after:top-[3.6rem] after:mt-px after:h-[calc(100%-2.45rem)] after:w-px after:bg-primary after:content-[''] className"
        >
          <div
            data-te-stepper-head-ref
            className="flex cursor-pointer items-center p-6 leading-[1.3rem] no-underline"
          >
            <span
              data-te-stepper-head-icon-ref
              className="mr-3 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-primary text-xl text-white font-bold"
            >
              2
            </span>
            <span data-te-stepper-head-text-ref className="font-medium text-xl">
              Responde las preguntas
            </span>
          </div>
          <div
            data-te-stepper-content-ref
            className=" left-0 overflow-hidden pb-6 pl-[3.75rem] text-gray-500 text-left max-w-[400px] pr-6"
          >
            MaxProtect te guiará con preguntas sencillas para recopilar
            la información necesaria según el tipo de seguro que necesitas.
          </div>
        </li>

        <li data-te-stepper-step-ref className="relative h-fit">
          <div
            data-te-stepper-head-ref
            className="flex cursor-pointer items-center p-6 leading-[1.3rem] no-underline after:bg-primary after:content-['']  focus:outline-none className"
          >
            <span
              data-te-stepper-head-icon-ref
              className="mr-3 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-primary text-xl font-bold text-white"
            >
              3
            </span>
            <span data-te-stepper-head-text-ref className="font-medium text-xl">
              Cotización completada
            </span>
          </div>
          <div
            data-te-stepper-content-ref
            className="left-0 overflow-hidden pb-6 pl-[3.75rem] text-gray-500 text-left max-w-[400px] pr-6"
          >
            Una vez completada la conversación, nuestro equipo te contactará
            con las mejores opciones de pólizas adaptadas a tus necesidades.
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Stepper
