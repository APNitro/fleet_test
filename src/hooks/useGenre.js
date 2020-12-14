import { useMutation } from "react-query";
import axios from "axios";
import {proxy, API_KEY} from "../utils/constant";

export default function useGenre() {
    return useMutation( async (id) => {
      const res = await axios.get(`${proxy}discover/movie?api_key=${API_KEY}&with_genres=${id}`)
      return res.data
    })
}