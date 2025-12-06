function FilterBar({ filters, activeFilter, onFilterChange }) {
    return (
        <div className="filter-bar">
            <button
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => onFilterChange('all')}
            >
                All
            </button>
            {filters.map(filter => (
                <button
                    key={filter}
                    className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => onFilterChange(filter)}
                >
                    {filter}
                </button>
            ))}
        </div>
    )
}

export default FilterBar
