import './input.css';

export const  CustomInput= ({type, placeholder, img}) => {
    
  return (
    <div className='search'>
        <input type={type} placeholder={placeholder}/>
        <img src={img} alt=''/>
    </div>
  )
}



export const  CustomFormInput= ({type, placeholder,label}) => {
    
  return (
    <div className='formInput'>
      <label>{label}</label>
        <input type={type} placeholder={placeholder}/>
    </div>
  )
}

