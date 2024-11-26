import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";
import { Image } from "@/utils/types";

const ImageSlider = ({
  height,
  images,
  onClick,
}: {
  height?: number;
  images: Image[];
  onClick?: () => void;
}) => {
  const [hoved, setHovered] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <Carousel
      setApi={setApi}
      className="relative "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CarouselContent onClick={onClick}>
        {images.map((image) => (
          <CarouselItem
            style={{ height: height ? height : "auto" }}
            key={image.id}
          >
            <img src={image.url} alt="" className="size-full object-cover" loading="lazy" />
          </CarouselItem>
        ))}
        {images.length === 0 && (
          <Skeleton
            className="h-full w-full"
            style={{ height: height ? height : "auto" }}
          />
        )}
      </CarouselContent>
      {hoved && (
        <>
          <div className="absolute z-10 flex items-center justify-center gap-1 py-2 -translate-x-1/2 bottom-2 left-1/2">
            {Array.from(new Array(count)).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full bg-slate-100 ${
                  i + 1 === current ? "!bg-white !h-[10px] !w-[10px]" : ""
                }`}
              ></div>
            ))}
          </div>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </>
      )}
    </Carousel>
  );
};

export default ImageSlider;
