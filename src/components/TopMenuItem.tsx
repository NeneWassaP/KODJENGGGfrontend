import styles from './topmenu.module.css'
import Link from 'next/link'

export default function TopMenuItem ({title, pageRef}: {title:string, pageRef:string}){
    return(
        <Link className="text-base text-md text-center text-white my-auto mx-4" href={pageRef}>
            {title}
        </Link>
    )
}