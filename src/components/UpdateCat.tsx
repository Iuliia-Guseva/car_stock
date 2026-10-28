import { useState, type FormEvent } from "react"
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle
} from "@mui/material"
import type { CarData } from "../types"
import IconButton from "@mui/material/IconButton"
import EditIcon from '@mui/icons-material/Edit';
import CarForm from "./CarForm"

type UpdateCarProps = {
    onCarUpdated: () => void
    carData: CarData
    carUrl: string
}

export default function UpdateCar({ onCarUpdated, carData, carUrl }: UpdateCarProps) {
    const [open, setOpen] = useState(false)
    const [car, setCar] = useState<CarData>({
        brand: "",
        model: "",
        color: "",
        fuel: "",
        modelYear: 0,
        price: 0
    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        fetch(carUrl, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(car)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error when updating a car")
                }
                setOpen(false)
                onCarUpdated()
            })
            .catch((err) => console.error(err))
    }

    return (
        <>
            <IconButton
                aria-label="Edit car"
                onClick={() => {
                    setCar({
                        brand: carData.brand,
                        model: carData.model,
                        color: carData.color,
                        fuel: carData.fuel,
                        modelYear: carData.modelYear,
                        price: carData.price
                    })
                    setOpen(true)
                }}
            >
                <EditIcon />
            </IconButton>
            <Dialog className="add-car-dialog" open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Update car</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <CarForm car={car} setCar={setCar} />
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit">Update car</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
