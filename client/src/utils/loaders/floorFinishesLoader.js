import axios from "axios"

export async function getIndFloorFinish(floorFinishId) {
      const res = await axios.get(`/api/floorFinishes/${floorFinishId}/`)
      //console.log(res.data)
      return res.data
  }
