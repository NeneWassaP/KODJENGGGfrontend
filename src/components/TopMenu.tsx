import styles from './topmenu.module.css'
import Image from 'next/image'
import TopMenuItem from './TopMenuItem'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Link } from '@mui/material'
import { Session } from 'inspector'

export default async function TopMenu(){
    const session = await getServerSession(authOptions)
    

    return (
        <div className={styles.menucontainer}>
            <Link href="/">
            <Image src={'/img/Kodjeng2.png'} className={styles.logoimg} alt='logo' width={0} height={0} sizes='100vh'/>
            </Link>
            
            {
                session? 
                <div className='z-30 flex flex-row w-[100%]'>
                    <div className='flex justify-start items-center h-full mx-2'>
                    <TopMenuItem title='View Hotels' pageRef='/hotels'/>
                    <TopMenuItem title='My Reservation' pageRef='/mybooking'/>
                    </div>
                    
                    <Link href="/mybooking">
                        <div className='flex items-center right-0 absolute h-full px-2 mx-5 text-white text-md'>
                        {session.user?.name}</div>
                    </Link>
                </div>
                
                :   <div  className='flex flex-row items-end justify-end h-full w-[100%] mr-3'>
                    <Link href="/register" className='decoration-none'>                   
                        <div className='px-2 my-2 mr-3 text-white text-md'>Register</div>
                        </Link>
                        <Link href="/api/auth/signin" className='decoration-none'>
                        <div className='px-2 my-2 text-white text-md'>Sign-In</div>
                        </Link>
                    </div>
                
            }
        </div>
    )
}