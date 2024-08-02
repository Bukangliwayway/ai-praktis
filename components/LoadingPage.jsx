import Image from 'next/image';
import React from 'react'

const LoadingPage = () => {
  return (
    <div>
      <div className="w-full h-[75vh] flex justify-center items-center">
        <Image
          src="/motion-blur-2-bg.svg"
          className="mx-auto"
          alt="loading"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}

export default LoadingPage
