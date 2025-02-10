import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthProtector = ({children}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
      if (!token) {
        navigate("/loginUser");
    }
    })

  return (
    <div>
      {children}
    </div>
  )
}

export default AuthProtector
