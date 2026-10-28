import { useState, type FormEvent } from "react"
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
} from "@mui/material"
import type { CarData } from "../types"
import addCar from "../carapi"
import CarForm from "./CarForm"

type AddCarProps = {
    onCarAdded: () => void
}

export default function AddCar({ onCarAdded }: AddCarProps) {
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

        addCar(car)
            .then(() => {
                setCar({
                    brand: "",
                    model: "",
                    color: "",
                    fuel: "",
                    modelYear: 0,
                    price: 0
                })
                setOpen(false)
                onCarAdded()
            })
            .catch((err) => console.error(err))
    }

    return (
        <>
            <Button className="add-car-button" onClick={() => setOpen(true)}>Add car</Button>
            <Dialog className="add-car-dialog" open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add car</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <CarForm car={car} setCar={setCar} />
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit">Add car</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
