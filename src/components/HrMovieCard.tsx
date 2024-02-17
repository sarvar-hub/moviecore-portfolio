import { IMovie } from "@/types/movie";

const HrMovieCard = ({ movie }: { movie: IMovie }) => {
  return <section className="hover:scale-110 transition-all duration-150 ease-in cursor-pointer">

    <img src={import.meta.env.VITE_IMAGE_URL + movie.backdrop_path} className="w-[110px] md:w-[260px] rounded-lg hover:border-[3px] border-gray-400" />
    <h2 className="w-[110px] md:w-[260px] text-white mt-2">{movie.title}</h2>
  </section>
}

export default HrMovieCard;
