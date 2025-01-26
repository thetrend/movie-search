type ErrorMessageProps = {
  error: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => (
  <div className="text-red-600">
    <p>{error}</p>
  </div>
)

export default ErrorMessage
