import type { CarData } from "./types"

export default async function addCar(car: CarData): Promise<void> {
    const response = await fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(car)
    })

    if (!response.ok) {
        throw new Error("Error when adding a car")
    }
}
