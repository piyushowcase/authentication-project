import React, { useContext } from 'react'
import logo from '../assets/mern-auth-assets/assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {
  const navigate = useNavigate()
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent)
  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
    const {data}= await axios.post(backendUrl+'/api/auth/send-verify-otp')
      if(data.success){
        navigate('/email-verify')
        toast.success(data.message || 'Verification OTP sent successfully')
      } else{
        toast.error(data.message || 'Failed to send verification OTP')
      }
    }
    catch (error) {  
      toast.error(error.response?.data?.message || error.message)
   
      }
    }
  const logout= async()=>{ 
    try{
      axios.defaults.withCredentials=true;
      const {data}= await axios.post(backendUrl+'/api/auth/logout')
      data.success && setIsLoggedin(false)
      data.success && setUserData(null)
      navigate('/')
    }
    catch(error){
      toast.error(error.response?.data?.message || error.message)
      console.error('Logout error:', error)
    }
   }

  return (
    <div className='absolute top-0 flex w-full items-center justify-between p-4 sm:p-6 sm:px-24'>
      <img src={logo} alt='' className='w-28 sm:w-32' />

      {userData ? (
        <div className='group relative flex h-8 w-8 items-center justify-center rounded-full bg-black text-white'>
          {userData.name[0].toUpperCase()}
          <div className='absolute w-20 h20 right-0 top-0 z-10 hidden rounded pt-10 text-black group-hover:block'>
            <ul className='m-0 w-40  list-none bg-gray-100 p-2 text-sm'>
              {!userData.isAccountVerified && (
                <li onClick={sendVerificationOtp} className='cursor-pointer bg-gray-200 px-2 py-1'>verify email</li>
              )}
              <li onClick={logout} className='cursor-pointer bg-gray-200 px-2 py-1'>logout</li>
            </ul>
          </div>
        </div>
      ) : (
        <button onClick={() => navigate('/login')} type='button' className='rounded-full border border-gray-500 px-6 py-2 text-gray-800 transition-all hover:bg-gray-100'>
          Login
        </button>
      )}
    </div>
  )
}

export default Navbar
