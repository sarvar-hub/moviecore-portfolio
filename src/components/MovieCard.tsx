import { IMovie } from "@/types/movie";

const MovieCard = ({ movie }: { movie: IMovie }) => {
  return <>
    <img src={import.meta.env.VITE_IMAGE_URL + movie.poster_path} className="w-[110px] md:w-[200px] rounded-lg hover:border-[3px] border-gray-400 hover:scale-110 transition-all duration-150 ease-in cursor-pointer" />
  </>
}
export default MovieCard;
