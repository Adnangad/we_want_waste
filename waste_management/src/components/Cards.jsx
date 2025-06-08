import React, { useState, useEffect } from "react";
import { grid } from "ldrs";
import { CiWarning } from "react-icons/ci";
import { FaCartPlus } from "react-icons/fa";

grid.register();

export default function Cards() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [visibleCount, setVisibleCount] = useState(6);
    const [cart, setCart] = useState([]);
    const [sortKey, setSortKey] = useState("");

    const images = [
        { size: 4, image: "../images/first.png" },
        { size: 5, image: "../images/normal.png" },
        { size: 6, image: "../images/normal.png" },
        { size: 8, image: "../images/normal.png" },
        { size: 10, image: "../images/normal.png" },
        { size: 12, image: "../images/normal.png" },
        { size: 14, image: "../images/normal.png" },
        { size: 16, image: "../images/normal.png" },
        { size: 20, image: "../images/large-removebg-preview.png" },
        { size: 40, image: "../images/large2blue.png" },
    ];

    useEffect(() => {
        async function fetchData() {
            try {
                const url = `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft`;
                const response = await fetch(url, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await response.json();
                setData(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError("An error occurred while trying to fetch the data.");
            }
        }
        fetchData();
    }, []);
    const sortedData = [...data];

    if (sortKey === "price-low") {
        sortedData.sort((a, b) => a.price_before_vat - b.price_before_vat);
    } else if (sortKey === "price-high") {
        sortedData.sort((a, b) => b.price_before_vat - a.price_before_vat);
    } else if (sortKey === "skip-big") {
        sortedData.sort((a, b) => b.size - a.size);
    } else if (sortKey === "skip-small") {
        sortedData.sort((a, b) => a.size - b.size);
    }
    const visibleItems = sortedData.slice(0, visibleCount);

    return (
        <div className="bg-gray-300 dark:bg-gray-900 min-h-screen py-6 px-4">
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <l-grid size="60" speed="1.5" color="black" />
                </div>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <div className="flex justify-end mb-6">
                        <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded-md shadow">
                            <label htmlFor="sortBy" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Sort By:
                            </label>
                            <select id="sortBy" name="sortBy" value={sortKey} onChange={(e) => setSortKey(e.target.value)} className="text-sm bg-gray-100 dark:bg-gray-700 border text-black border-gray-300 dark:border-gray-600 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white">
                                <option value="">-- Select --</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="skip-big">Skip Size: Big to Small</option>
                                <option value="skip-small">Skip Size: Small to Big</option>
                            </select>
                        </div>
                    </div>
                    <div className="h-[70vh] overflow-y-auto pr-2 rounded-xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-20 justify-items-center">
                            {visibleItems.map((item) => {
                                const matchedImage = images.find((img) => img.size === item.size);
                                const inCart = cart.some((i) => i.id === item.id);

                                return (
                                    <div
                                        key={item.id}
                                        className="group bg-white dark:bg-gray-700 shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 max-w-sm w-full"
                                    >
                                        {matchedImage && (
                                            <div className="relative">
                                                <img
                                                    src={matchedImage.image}
                                                    alt={`${item.size} yard skip`}
                                                    className="w-full h-50 object-cover transition-opacity duration-300 group-hover:opacity-60"
                                                />

                                                {item.size > 8 && (
                                                    <div className="absolute bottom-0  left-0 w-full bg-black/60 text-yellow-500 text-sm flex items-center justify-center py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <CiWarning className="mr-1 text-lg" />
                                                        Not allowed on the road
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <div className="p-4 justify-center text-center">
                                            <p className="font-bold text-lg text-black dark:text-white">{item.size} yard Skip</p>
                                            <p className="text-lg text-black dark:text-gray-200">{item.hire_period_days} day hire period</p>
                                            <p className="text-blue-600 dark:text-blue-300 font-semibold mt-2">
                                                €{item.price_before_vat}
                                            </p>
                                        </div>
                                        <div
                                            onClick={() =>
                                                !inCart
                                                    ? setCart((prev) => [...prev, item])
                                                    : setCart((prev) => prev.filter((i) => i.id !== item.id))
                                            }
                                            className={`mt-4 mb-5 mx-auto items-center w-2/3 ${!inCart ? "bg-sky-600 hover:bg-green-700 cursor-pointer" : "bg-sky-600 hover:bg-red-700 cursor-pointer"} text-white text-md font-semibold rounded-md flex items-center justify-center py-2 gap-2 transition-all duration-300 shadow-md`}
                                        >
                                            <FaCartPlus className="text-xl" />
                                            <span>{!inCart ? "Add to cart" : "Remove From Cart"}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {visibleCount < data.length && (
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={() => setVisibleCount((prev) => prev + 6)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl shadow transition"
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
            {cart.length > 0 && (
                <div className="flex justify-end mt-10 mr-20">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl shadow transition cursor-pointer">Next</button>
                </div>
            )}
            <div className="flex justify-start mt-10 ml-20">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl shadow transition cursor-pointer">Previous</button>
                </div>
        </div>
    );
}
