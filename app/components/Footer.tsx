function ArrowIcon() {
    return (
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
          fill="currentColor"
        />
      </svg>
    )
  }

export default function Footer() {
  return (
    <footer className="mx-auto flex flex-col items-center justify-center bg-blue-950">
      <ul className="text-md mt-10 flex flex-col items-center space-x-0 space-y-2 text-zinc-400 md:flex-row md:space-x-6 md:space-y-0 dark:text-zinc-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="#"
          >
            <ArrowIcon />
            <p className="ml-2 h-7 text-md">Github</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="#"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">PokéAPI</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="#"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">Demo</p>
          </a>
        </li>
      </ul>
      <p className="mt-8 mb-10 text-neutral-600 dark:text-neutral-300 text-center">
        © {new Date().getFullYear()} - PokeNext.js
      </p>
    </footer>
  );
}


