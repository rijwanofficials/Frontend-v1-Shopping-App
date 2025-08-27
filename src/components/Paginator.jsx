const Paginator = ({ total, page, limit, handlePageClick }) => {
    const totalPages = Math.ceil(total / limit);
    const dummyArray = new Array(totalPages).fill(null);

    return (
        <div className="flex gap-2">
            {dummyArray.map((_, indx) => {
                const selected = indx + 1 === page;
                return (
                    <button
                        key={indx}
                        className={` cursor-pointer mb-5 w-10 h-10 flex items-center justify-center  text-white rounded transition ${selected ? 'bg-pink-900' : 'bg-pink-950 hover:bg-pink-800'
                            }`}
                        onClick={() => handlePageClick(indx + 1)}
                    >
                        {indx + 1}
                    </button>
                );
            })}
        </div>
    );
};

export { Paginator };
