import './Button.css';

export const CustomButton  = ({children,img, onClick,type}) => {
  return (
    <div className='custombutton'>
      <img src={img} alt="" />
      <button onClick={onClick} type={type}>{children}</button>
    </div>
  )
}

