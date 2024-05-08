import { useState } from "react";
import { useEffect } from "react";

export  function useLoadingStatus() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

      setTimeout(()=>setIsLoading(false), 200);
    }, []);

    return isLoading;
  }