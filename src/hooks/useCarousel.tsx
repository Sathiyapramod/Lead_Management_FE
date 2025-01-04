import { useEffect,useState } from 'react';

function useCarousel(slideShow: string[], interval: number) {
  const [currIdx, setCurrIdx] = useState<number>(0);

  useEffect(() => {
    const changeIdx = setInterval(() => {
      setCurrIdx((pv) => (pv + 1) % slideShow.length);
    }, interval);

    return () => clearInterval(changeIdx);
  }, [slideShow.length, interval]);
  return currIdx;
}

export default useCarousel;
