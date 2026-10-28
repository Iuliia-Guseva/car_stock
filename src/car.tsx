export default function getCars(){
        return fetch(import.meta.env.VITE_API_URL + "/cars")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error when fetching cars!")
                }
                return response.json()
            })
}