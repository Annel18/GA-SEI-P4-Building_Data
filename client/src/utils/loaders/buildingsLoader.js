// Loader for individual buildings page
import axios from "axios"

export async function getIndBuilding(bldgID) {
    const res = await axios.get(`/api/buildings/${bldgID}`)
    //console.log(res.data)
    return res.data
}
