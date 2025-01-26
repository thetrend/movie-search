import { TMDB } from 'tmdb-ts'

const tmdbClient = new TMDB(import.meta.env.VITE_TMDB_API_TOKEN)

export default tmdbClient
