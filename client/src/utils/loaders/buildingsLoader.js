// Loader for individual buildings page
import axios from "axios"

export async function getIndBuilding(buildingId) {
    const res = await axios.get(`/api/buildings/${buildingId}`)
    //console.log(res.data)
    return res.data
}
