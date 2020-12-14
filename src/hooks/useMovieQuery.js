import { useMutation } from "react-query";
import axios from "axios";
import {proxy, API_KEY} from "../utils/constant";

export default function useMovieQuery() {
    return useMutation( async (query) => {
      const res = await axios.get(`${proxy}search/movie?api_key=${API_KEY}&query=${query}`)
      return res.data
    })
}