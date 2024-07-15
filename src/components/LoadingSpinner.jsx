import React from 'react';
import { GridLoader } from "react-spinners";

const LoadingSpinner = () => (
<div className="flex items-center justify-center h-screen">
  <GridLoader color="#001240" size={20} />
</div>
);

export default LoadingSpinner;