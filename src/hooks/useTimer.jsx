import { useEffect, useState } from "react";

function useTimer(initialSeconds) {
  const [timer, setTimer] = useState(initialSeconds);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [setTimer]);
  return { timer };
}

export default useTimer;
