import type { CarData } from "../types"
import { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from '@mui/icons-material/Delete';
import { Snackbar, TextField } from "@mui/material"
import AddCar from "./AddCar"
import UpdateCar from "./UpdateCat"

export default function CarList() {
    const [cars, setCars] = useState<CarData[]>([])
    const[open, setOpen] = useState(false);
    const [search, setSearch] = useState("")
    const searchTerm = search.trim().toLocaleLowerCase()
    const filteredCars = cars.filter((car) =>
        [car.brand, car.model, car.color, car.fuel, car.modelYear, car.price]
            .some((value) => String(value).toLocaleLowerCase().includes(searchTerm))
    )

    const columns: GridColDef[] = [
        { field: "brand", headerName: "Brand", flex: 1 },
        { field: "model", headerName: "Model" },
        { field: "color", headerName: "Color" },
        { field: "fuel", headerName: "Fuel" },
        { field: "modelYear", headerName: "Model year" },
        { field: "price", headerName: "Price" },
        {
            field: "update",
            headerName: " ",
            renderCell: (params: GridRenderCellParams) => (
                <UpdateCar
                    onCarUpdated={fetchCars}
                    carData={params.row}
                    carUrl={params.row._links.self.href}
                />
            )
        },
        {
            field: "delete",
            headerName: " ",
            renderCell: (params: GridRenderCellParams) => (
                <IconButton onClick={() => handleDelete(params.row._links.self.href)}>
                    <DeleteIcon color="error" />
                </IconButton>
            )
        }
    ]

    const fetchCars = () => {
        fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error when fetching cars!")
                }
                return response.json()
            })
            .then((data) => {
                const carRows = (data?._embedded?.cars ?? []).map((car: any, index: number) => ({
                    ...car,
                    id: car?._links?.self?.href ?? `car-${index}`
                }))
                setCars(carRows)
            })
            .catch((err) => console.error(err))
    }

    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure")) {
            deleteCar(url)
                .then(() => {
                    setOpen(true)
                    fetchCars()
                })
                .catch((err) => console.error(err))
        }
    }

    useEffect(() => {
        fetchCars()
    }, [])

    return (
        <>
            <main className="car-list">
                <div className="car-list-toolbar">
                    <div>
                        <h1 className="car-list-heading">Your cars</h1>
                        <p className="car-list-caption">Manage the vehicles in your stock.</p>
                    </div>
                    <AddCar onCarAdded={fetchCars} />
                </div>
                <TextField
                    className="car-search"
                    label="Search cars"
                    placeholder="Brand, model, color, fuel, year or price"
                    size="small"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
                <div className="car-grid">
                    <DataGrid
                        rows={filteredCars}
                        columns={columns}
                        autoPageSize
                        getRowId={(row: any) => row.id}
                        localeText={{ noRowsLabel: searchTerm ? "No matching cars" : "No cars available" }}
                    />
                </div>
            </main>

            <Snackbar 
                open={open}
                message= "Car deleted successfully"
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            />
        </>
    )
}

function deleteCar(url: string) {
    return fetch(url, { method: "DELETE" })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when deleting a car")
            }
        })
}