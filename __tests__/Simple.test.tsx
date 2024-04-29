import ReservationMenu from "@/components/ReservationMenu";
import { render, screen } from "@testing-library/react"
import Banner from "@/components/Banner";
import { userEvent } from '@testing-library/user-event'

describe('ReservationMenu', ()=> {
    it('should have title',() => {
        //Arrange
        render(<ReservationMenu/>)
        //Act
        const bannerText = screen.getByText('Sub-Menu Here')
        //Assert
        expect(bannerText).toBeInTheDocument()
    })
})

//Mock useRouter
jest.mock('next/navigation', ()=>({
    useRouter(){
        return{
            prefetch: ()=>null
        }
    }
}))

//Mock useSession
jest.mock('next-auth/react', ()=>({
    useSession(){
        return { data:null, user: {name: "Tester"}}
    }
}))

describe('Banner', ()=>{
    it('should have top banner title', ()=>{
        render(<Banner/>)
        const bannerText = screen.getByText('Your Travel Partner')
        expect(bannerText).toBeInTheDocument()
    })

    it('should change image when click banner', async() => {
        const covers = ['cover.jpg', 'cover2.jpg', 'cover3.jpg']

        render(<Banner/>)
        const banner = screen.getByRole('img') as HTMLImageElement;

        for(let i=0; i<covers.length; i++){
            await userEvent.click(banner)
            expect(banner.src).toContain(covers[(i+1)%3]);
        }
        
    })
})