import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white bg-opacity-55 text-black p-10 rounded-lg mx-10">
      <h2 className="font-bold text-4xl pb-10">About</h2>

      <p>Resources:</p>
      <ul className="list-disc ml-6">
        <li>
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
          >
            The Movie Database
          </a>{' '}
          - the API powering this website's searches
        </li>
        <li>
          <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
            Tailwind CSS
          </a>{' '}
          - a utility-first CSS framework
        </li>
        <li>
          <a href="https://vite.dev/" target="_blank" rel="noreferrer">
            Vite JS
          </a>{' '}
          - a frontend build tool
        </li>
        <li>
          <a href="https://react.dev/" target="_blank" rel="noreferrer">
            React JS
          </a>{' '}
          - the library for web and native user interfaces
        </li>
        <li>
          <a
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noreferrer"
          >
            TypeScript
          </a>{' '}
          - JavaScript with syntax for types
        </li>
        <li>
          <a href="https://fontawesome.com/" target="_blank" rel="noreferrer">
            Font Awesome
          </a>{' '}
          - the Internet's icon library
        </li>
        <li>
          <a href="https:/canva.com/" target="_blank" rel="noreferrer">
            Canva
          </a>{' '}
          - a graphic design and stock photo tool
        </li>
      </ul>
      <p className="pt-10">
        <FontAwesomeIcon icon={['fab', 'github']} className="px-2" />
        <a
          href="https://github.com/thetrend/movie-search"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>{' '}
        - view project source code
      </p>
    </div>
  )
}

export default AboutPage
