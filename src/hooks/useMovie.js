import { useMutation } from "react-query";
import axios from "axios";
import {proxy, API_KEY} from "../utils/constant";

export default function useMovie() {
  return useMutation( async (id) => {
    const res = await axios.get(`${proxy}movie/${id}?api_key=${API_KEY}&append_to_response=images`)
    return res.data
  })
}