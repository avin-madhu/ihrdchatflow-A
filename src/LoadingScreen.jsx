import { useRef, useEffect, useState } from 'react';
import { useSprings, animated } from '@react-spring/web';

const LoadingScreen = ({
  text = 'Campus Data? Just ask me!',
  delay = 200,
  className = '',
  animateBy = 'words', // 'words' or 'letters'
  direction = 'top', // 'top' or 'bottom'
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = 'easeOutCubic',
  onAnimationComplete,
  onComplete
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const animatedCount = useRef(0);

  // Default animations based on direction
  const defaultFrom =
    direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-50px,0)' }
      : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,50px,0)' };

  const defaultTo = [
    {
      filter: 'blur(5px)',
      opacity: 0.5,
      transform: direction === 'top' ? 'translate3d(0,5px,0)' : 'translate3d(0,-5px,0)',
    },
    { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(()=>{
    setTimeout(()=>{
      onComplete();
    },3500)
  })
  const springs = useSprings(
    elements.length,
    elements.map((_, i) => ({
      from: animationFrom || defaultFrom,
      to: inView
        ? async (next) => {
            for (const step of animationTo || defaultTo) {
              await next(step);
            }
            animatedCount.current += 1;
            if (animatedCount.current === elements.length && onAnimationComplete) {
              onAnimationComplete();
            }
          }
        : animationFrom || defaultFrom,
      delay: i * delay,
      config: { easing },
    }))
  );

  return (
    <div className="bg-[#11192e] fixed inset-0 flex items-center justify-center">
      <div
        ref={ref}
        className={`blur-text text-white text-2xl md:text-6xl font-bold ${className}`}
      >
        {springs.map((props, index) => (
          <animated.span
            key={index}
            style={{
              ...props,
              display: 'inline-block',
              willChange: 'transform, filter, opacity',
            }}
          >
            {elements[index] === ' ' ? '\u00A0' : elements[index]}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </animated.span>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;