import React, { Suspense } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const SectionSkeleton = () => (
  <div className="w-full h-64 bg-gray-100 animate-pulse rounded-xl my-8 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

export const LazySection = ({ children, height = 'min-h-[50vh]', rootMargin = '200px' }) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ rootMargin });

  return (
    <div ref={elementRef} className={hasIntersected ? '' : height}>
      {hasIntersected ? (
        <Suspense fallback={<SectionSkeleton />}>
          {children}
        </Suspense>
      ) : null}
    </div>
  );
};
