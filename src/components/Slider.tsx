import GlobalApi from "@/Services/GlobalApi";
import { IMovie } from "@/types/movie";
import { useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
const screenWidth = window.innerWidth;

const Slider = () => {
  const [movieList, setMovieList] = useState<IMovie[]>([]);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = async () => {
    await GlobalApi.getTrendingVideos.then(({ data }) => {
      setMovieList(data.results);
    });
  };

  const sliderRight = (element: HTMLDivElement | null) => {
    if (element) element.scrollLeft += screenWidth - 121;
  };

  const sliderLeft = (element: HTMLDivElement | null) => {
    if (element) element.scrollLeft -= screenWidth - 121;
  };

  return (
    <div>
      <HiChevronLeft
        onClick={() => sliderLeft(elementRef.current)}
        className="hidden md:block text-white text-[30px] absolute mx-8 mt-[150px] cursor-pointer"
      />
      <HiChevronRight
        onClick={() => sliderRight(elementRef.current)}
        className="hidden md:block text-white text-[30px] absolute mx-8 mt-[150px] cursor-pointer right-0"
      />
      <div
        ref={elementRef}
        className="flex overflow-x-auto w-full px-16 py-4 scrollbar-hide scroll-smooth"
      >
        {movieList.map((item, index) => (
          <img
            key={index}
            src={import.meta.env.VITE_IMAGE_URL + item.backdrop_path}
            className="min-w-full md:h-[310px] object-cover
            object-left-top mr-5 rounded-md hover:border-[4px]
            border-gray-400 transition-all duration-100 ease-in"
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
