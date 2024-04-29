import CarCatalog from "@/components/HotelCatalog";
import { render, screen, waitFor } from '@testing-library/react'

const mockResult = {
    success: true,
    count: 2,
    data: [{
        "_id": "65f86303598defbdeac485e6",
        "model": "Accord",
        "description": "Honda Accord",
        "picture": "https://drive.google.com/uc?id=1Vsq3yGo0TbJtNnD-Q-GmIKEPhi774W_O",
        "seats": 4,
        "doors": 4,
        "largebags": 2,
        "smallbags": 2,
        "automatic": true,
        "dayRate": 2500,
        "__v": 0,
        "id": "65f86303598defbdeac485e6"
      },
      {
        "_id": "65f86353598defbdeac485e9",
        "model": "Civic",
        "description": "Honda Civic",
        "picture": "https://drive.google.com/uc?id=1qZjh3CmMFGEik3lcPFZZCif58q4cqSFe",
        "seats": 4,
        "doors": 4,
        "largebags": 2,
        "smallbags": 1,
        "automatic": true,
        "dayRate": 1800,
        "__v": 0,
        "id": "65f86353598defbdeac485e9"
      }
    ]
}

describe('CarCatalog', () => {
    it('should have correct number of car images', async() => {
        const carCatalog = await CarCatalog({carJson: mockResult})
        render(carCatalog)
        await waitFor(
            () => {
                const carImages = screen.queryAllByRole('img')
                expect(carImages.length).toBe(2)
            }
        )
    })
})
