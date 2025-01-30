import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import type {
  ErrorResponse,
  MovieDetails,
  PersonDetails,
  TvShowDetails,
} from 'tmdb-ts'
import ErrorMessage from '../components/ErrorMessage'
import LoadingIndicator from '../components/LoadingIndicator'
import tmdbClient from '../utils/tmdbClient'

const DetailsPage: React.FC = () => {
  const { id, type } = useParams<{ id: string; type: string }>()
  const [details, setDetails] = useState<
    MovieDetails | TvShowDetails | PersonDetails | null
  >(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<ErrorResponse | null>(null)

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id || !type) {
        setError({
          status_message: 'ID or type is undefined',
          status_code: 400,
          success: false,
        })
        return
      }
      setLoading(true)
      try {
        let response: MovieDetails | TvShowDetails | PersonDetails | null = null
        if (type === 'movie') {
          response = await tmdbClient.movies.details(+id)
        } else if (type === 'tv') {
          response = await tmdbClient.tvShows.details(+id)
        } else if (type === 'person') {
          response = await tmdbClient.people.details(+id)
        }
        if (response) {
          setDetails(response)
        } else {
          setError({
            status_message: 'Details not found',
            status_code: 404,
            success: false,
          })
        }
      } catch (error) {
        setError(error as ErrorResponse)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [id, type])

  return (
    <div>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <ErrorMessage
          error={
            error.status_message || 'Something went wrong. Please try again.'
          }
        />
      ) : details ? (
        <div className="flex bg-white bg-opacity-55 text-black p-10 mx-10 md:flex-row flex-col">
          {('poster_path' in details && details.poster_path) ||
          ('profile_path' in details && details.profile_path) ? (
            <img
              src={`https://image.tmdb.org/t/p/w300${'poster_path' in details ? details.poster_path : (details as PersonDetails).profile_path}`}
              alt={'title' in details ? details.title : details.name}
              className="rounded-2xl md:mr-8"
            />
          ) : (
            <div className="h-64 w-auto bg-gray-300 flex items-center justify-center aspect-[2/3] mr-8 rounded-lg">
              <p className="text-gray-500">No Image Available</p>
            </div>
          )}
          <section className="md:text-left text-center">
            <h2 className="text-4xl font-bold">
              {'title' in details ? details.title : details.name}
            </h2>
            {'tagline' in details && details.tagline && (
              <h3 className="text-2xl italic mb-4">{details.tagline}</h3>
            )}
            {'release_date' in details && details.release_date && (
              <p className="mb-2">
                <strong>Release Date:</strong> {details.release_date}
              </p>
            )}
            {'first_air_date' in details && details.first_air_date && (
              <p className="mb-2">
                <strong>First Air Date:</strong> {details.first_air_date}
              </p>
            )}
            {'known_for_department' in details &&
              details.known_for_department && (
                <p className="mb-2">
                  <strong>Known For:</strong> {details.known_for_department}
                </p>
              )}
            {'genres' in details && details.genres.length > 0 && (
              <p className="mb-2">
                <strong>Genres:</strong>{' '}
                {details.genres.map((genre, index) => (
                  <span className="mr-1" key={genre.id}>
                    {genre.name}
                    {index < details.genres.length - 1 && ','}
                  </span>
                ))}
              </p>
            )}
            {'overview' in details && details.overview && (
              <p className="mb-2 text-left">
                <strong>Overview:</strong> {details.overview}
              </p>
            )}
            {'production_companies' in details &&
              details.production_companies &&
              details.production_companies.length > 0 && (
                <div className="flex flex-col">
                  <strong className="mr-2">Production Companies:</strong>
                  {details.production_companies.map(prod_co => (
                    <div key={prod_co.id} className="mb-2">
                      {prod_co.logo_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w300${prod_co.logo_path}`}
                          alt={prod_co.name}
                          className="mb-2 w-32"
                        />
                      ) : (
                        <i className="italic mb-2">{prod_co.name}</i>
                      )}
                    </div>
                  ))}
                </div>
              )}
          </section>
        </div>
      ) : (
        <p className="text-center w-full text-xl font-bold">
          Details not found!
        </p>
      )}
    </div>
  )
}

export default DetailsPage
