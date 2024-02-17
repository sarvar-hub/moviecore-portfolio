import GlobalApi from "@/Services/GlobalApi";
import { IMovie } from "@/types/movie";
import { Fragment, useEffect, useRef, useState } from "react";
import MovieCard from "@/components/MovieCard";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import HrMovieCard from "@/components/HrMovieCard";

const MovieList = ({ genreId, index_}: { genreId: number, index_: number }) => {
  const [movieList, setMovieLIst] = useState<IMovie[]>([]);
  const elementRef = useRef<HTMLDivElement>(null);

  const getMovieByGenreId = () => {
    GlobalApi.getMovieByGenreId(genreId).then((resp) => {
      setMovieLIst(resp.data.results);
    });
  };
  
  useEffect(() => {
    getMovieByGenreId();
  }, []);

  const SliderLeft = (element: HTMLDivElement | null) => {
    if(element) element.scrollLeft-=500;
  }
  
  const sliderRight = (element: HTMLDivElement | null) => {
    if(element) element.scrollLeft+=500;
  }


  return (
    <div className="relative">
      <IoChevronBackOutline onClick={() => SliderLeft(elementRef.current)} className={`text-[50px] text-white p-2 z-10 cursor-pointer hidden md:block absolute ${index_%3==0?'mt-[80px]':'mt-[150px]'}`} />
      <div ref={elementRef} className="flex overflow-x-auto gap-8 scrollbar-hide pt-5 px-3 pb-5 scroll-smooth">
        {movieList.map((item) => (
          <Fragment key={item.id}>
           {index_%3==0? <HrMovieCard movie={item} /> : <MovieCard movie={item} />}
          </Fragment>
        ))}
      </div>
      <IoChevronForwardOutline onClick={() => sliderRight(elementRef.current)} className={`text-[50px] text-white hidden md:block p-2 cursor-pointer z-10 top-0 absolute right-0 ${index_%3==0?'mt-[80px]':'mt-[150px]'}`} />
    </div>
  );
};

export default MovieList;
