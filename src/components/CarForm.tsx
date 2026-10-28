import { DialogContent, TextField } from "@mui/material"
import type { CarData } from "../types"

type CarFormProps = {
    car: CarData
    setCar: React.Dispatch<React.SetStateAction<CarData>>
}

export default function CarForm({ car, setCar }: CarFormProps) {
    return (
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label="Brand"
                fullWidth
                value={car.brand}
                onChange={(event) => setCar({ ...car, brand: event.target.value })}
                required
            />
            <TextField
                margin="dense"
                label="Model"
                fullWidth
                value={car.model}
                onChange={(event) => setCar({ ...car, model: event.target.value })}
                required
            />
            <TextField
                margin="dense"
                label="Color"
                fullWidth
                value={car.color}
                onChange={(event) => setCar({ ...car, color: event.target.value })}
                required
            />
            <TextField
                margin="dense"
                label="Fuel"
                fullWidth
                value={car.fuel}
                onChange={(event) => setCar({ ...car, fuel: event.target.value })}
                required
            />
            <TextField
                margin="dense"
                label="Model year"
                type="number"
                fullWidth
                value={car.modelYear || ""}
                onChange={(event) => setCar({ ...car, modelYear: Number(event.target.value) })}
                required
            />
            <TextField
                margin="dense"
                label="Price"
                type="number"
                fullWidth
                value={car.price || ""}
                onChange={(event) => setCar({ ...car, price: Number(event.target.value) })}
                required
            />
        </DialogContent>
    )
}
