import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LoadingIndicator: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <FontAwesomeIcon
      icon={['fas', 'spinner']}
      className="text-blue-500 text-4xl"
      spin
      aria-label="Loading"
    />
  </div>
)

export default LoadingIndicator
