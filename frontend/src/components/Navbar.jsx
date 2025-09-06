import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { Link, useLocation } from 'react-router';
import { BellIcon, LogOutIcon, ShipWheelIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import useLogout from './../hooks/useLogout';

const Navbar = () => {

    const { authUser } = useAuthUser();

    const location = useLocation();

    const isChatPage = location.pathname?.startsWith("/chat");

    const { logoutMutation } = useLogout()

  return (
    <nav className='bg-base-200 border-b border-base-300 sticky top- z-30 h-16 flex items-center'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-center justify-end w-full'>
                {/* Logo -only if in the chat page */}
                { isChatPage && (
                    <div className='pl-5'>
                        <Link to={"/"} className='flex items-center gap-2.5'>
                            <ShipWheelIcon className='size-9 text-primary' />
                            <span className='text-3xl font-bold font-momo bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
                                StreamiFy
                            </span>
                        </Link>
                    </div>
                )}
                <div className='flex items-center gap-3 sm:gap-4 ml-auto'>
                    <Link to={"/notifications"}>
                        <button className='btn btn-ghost btn-circle'>
                            <BellIcon className='h-6 w-6 text-base-content opacity-70' />
                        </button>
                    </Link>
                </div>

                {/* Theme selector component */}

                <ThemeSelector />

                {/* user avatar */}

                <div className='avatar'>
                    <div className='w-11 rounded-full'>
                        <img src={authUser?.profilePic} alt="User avatar" />
                    </div>
                </div>

                {/* Logout button */}

                <button className='btn btn-ghost btn-circle' onClick={logoutMutation}>
                    <LogOutIcon className='h-6 w-6 text-base-content opacity-70' />
                </button>

            </div>
        </div>
    </nav>
  )
}

export default Navbar
