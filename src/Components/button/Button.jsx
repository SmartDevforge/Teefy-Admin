import './Button.css';

export const CustomButton  = ({children,img, onClick}) => {
  return (
    <div className='custombutton'>
      <img src={img} alt="" />
      <button onClick={onClick}>{children}</button>
    </div>
  )
}

