import axios from "axios"

export async function getIndRoomType(regsID) {
      const res = await axios.get(`/api/resourcesBuildingRegs/${regsID}/`)
      //console.log(res.data)
      return res.data
  }
