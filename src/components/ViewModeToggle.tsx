type ViewModeToggleProps = {
  viewMode: 'grid' | 'list'
  setViewMode: React.Dispatch<React.SetStateAction<'grid' | 'list'>>
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  viewMode,
  setViewMode,
}) => (
  <div className="flex gap-4 mb-6">
    {(['grid', 'list'] as ViewModeToggleProps['viewMode'][]).map(mode => (
      <button
        key={mode}
        type="button"
        onClick={() => setViewMode(mode)}
        className={`px-4 py-2 rounded-lg ${viewMode === mode ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
      >
        {mode.charAt(0).toUpperCase() + mode.slice(1)} View
      </button>
    ))}
  </div>
)

export default ViewModeToggle
