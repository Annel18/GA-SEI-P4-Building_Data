// Loader for individual roomType page
import axios from "axios"

export async function getIndRoomType(roomTypeId) {
      const res = await axios.get(`/api/roomTypes/${roomTypeId}`)
      //console.log(res.data)
      return res.data
  }
