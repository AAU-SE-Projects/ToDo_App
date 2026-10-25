export default function FilterBar({ itemsLeft }){
    return(
        <div className="filter-bar">
            <span>{itemsLeft} {itemsLeft === 1 ? 'item' : 'items'} left</span>
            <div className="filters">
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
            <button>Clear Completed</button>
        </div>
    )
}