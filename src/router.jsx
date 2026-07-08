import { useEffect, useState, useContext } from "react";
import { RouterContext } from "./routerContext.js";

function getPath() {
  return window.location.hash.replace("#", "") || "/";
}

export function Router({ children }) {
  const [path, setPath] = useState(getPath);

  useEffect(() => {
    const handleHashChange = () => {
      setPath(getPath());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const navigate = (nextPath) => {
    window.location.hash = nextPath;
  };

  const value = {
    path,
    navigate,
  };

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
}

export function Link({ to, className, children }) {
  const routerContext = useContext(RouterContext);
  if (!routerContext) {
    return (
      <a href={`#${to}`} className={className}>
        {children}
      </a>
    );
  }

  const { navigate } = routerContext;


  const handleClick = (event) => {
    event.preventDefault();
    navigate(to);
  };


  return (
    <a
      href={`#${to}`}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}