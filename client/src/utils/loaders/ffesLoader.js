// Loader for individual roomType page
import axios from "axios"

export async function getIndFfe(ffeId) {
      const res = await axios.get(`/api/ffes/${ffeId}`)
      //console.log(res.data)
      return res.data
  }
