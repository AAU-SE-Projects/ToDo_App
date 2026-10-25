const FILTERS = [
    { value: 'all', label: "All" },
    { value: 'active', label: "Active" },
    { value: 'completed', label: "Completed" },
]

export default function FilterBar({ itemsLeft, filter, onFilterChange, hasCompleted, onClearCompleted }){
    return(
        <div className="filter-bar">
            <span>{itemsLeft} {itemsLeft === 1 ? 'item' : 'items'} left</span>
            
            <div className="filters">
                {FILTERS.map(({ value, label }) => (
                    <button
                        key={value}
                        className={filter === value ? 'active' : ''}
                        aria-pressed={filter === value}
                        onClick={() => onFilterChange(value)} 
                    >
                        {label}
                    </button>
                ))}
            </div>
            <button onClick={onClearCompleted} disabled={!hasCompleted}>Clear Completed</button>
        </div>
    )
}