import React from 'react'
import toast from 'react-hot-toast'

const homePage = () => {
  return (
    <div>
      <div>homePage</div>
      <button onClick={()=>{
        toast.success('Hello HomePage', {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#333',
            color: '#fff',
          },
          iconTheme: {
            primary: '#4ade80',
            secondary: '#fff',
          },
        })
      }}>Hello HomePage</button>
    </div>
  )
}

export default homePage