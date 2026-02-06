import GlobalApi from "@/Services/GlobalApi";
import { IMovie } from "@/types/movie";
import { useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Slider = () => {
  const [movieList, setMovieList] = useState<IMovie[]>([]);
  const elementRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = async () => {
    await GlobalApi.getTrendingVideos.then(({ data }) => {
      setMovieList(data.results);
    });
  };

  let rafId: number | null = null;
  let targetLeft = 0;

  const animateScroll = (element: HTMLDivElement, duration = 1000) => {
    if (rafId) cancelAnimationFrame(rafId);

    const startLeft = element.scrollLeft;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      element.scrollLeft = startLeft + (targetLeft - startLeft) * eased;

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
  };

  const sliderRight = (element: HTMLDivElement | null) => {
    if (!element || !containerRef.current) return;

    targetLeft += containerRef.current.clientWidth - 108;
    animateScroll(element);
  };

  const sliderLeft = (element: HTMLDivElement | null) => {
    if (!element || !containerRef.current) return;

    targetLeft -= containerRef.current.clientWidth - 108;
    animateScroll(element);
  };

  return (
    <div ref={containerRef} className="h-[200px] md:h-[500px] relative">
      <button
        className="text-white text-[30px] absolute cursor-pointer z-[2000]"
        onClick={() => sliderLeft(elementRef.current)}
        style={{
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <HiChevronLeft />
      </button>
      <button
        onClick={() => sliderRight(elementRef.current)}
        className=" text-white text-[30px] absolute  cursor-pointer right-0 z-[2000] "
        style={{
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <HiChevronRight />
      </button>

      <div
        ref={elementRef}
        className="flex overflow-x-auto gap-5 w-full px-16 py-4 scrollbar-hide h-full"
      >
        {movieList.map((item, index) => (
          <img
            key={index}
            src={import.meta.env.VITE_IMAGE_URL + item.backdrop_path}
            className="min-w-full md:h-full object-cover select-none
            object-left-top rounded-md hover:border-[4px]
            border-gray-400 "
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
