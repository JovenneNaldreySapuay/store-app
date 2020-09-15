import { useState, useEffect } from "react";

const Lazy = ({ children, waitBeforeShow = 3000 }) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    console.log(waitBeforeShow);

    setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);
  }, [waitBeforeShow]);

  return isShown ? children : null;
};

export default Lazy;
