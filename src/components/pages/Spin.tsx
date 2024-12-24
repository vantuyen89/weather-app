import React from 'react'
import { ImSpinner8 } from 'react-icons/im';

const Spin = () => {
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <ImSpinner8
        size={25}
        className="flex items-center justify-center animate-spin"
      />
    </div>
  );
}

export default Spin