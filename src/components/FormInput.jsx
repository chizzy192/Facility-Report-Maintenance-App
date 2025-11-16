

const FormInput = (props) => {
  return (
    <div className='flex flex-col gap-1 w-full'>
      <label className='py-1 px-2 text-sm transition-all duration-300 ease-in-out text-text' htmlFor={props.name}>{props.label}</label>
      <div className='bg-gray-100 dark:bg-gray-900  rounded-xl focus:rounded-xl flex px-2 hover:outline-3 focus-within:outline-3 outline-border text-text-muted shadow-xs items-center'>
        <img src={props.formIcon} alt="" className={props.className}/>

        <input 
            className='text-md p-2 w-full bg-transparent outline-0' 
            type={props.type} 
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            name={props.name}
        />
        <img
            className='cursor-pointer' 
            src={props.eyesIcon} 
            onClick={props.onClick}
        />
      </div>
    </div>
  )
}

export default FormInput
