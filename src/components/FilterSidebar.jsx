import React from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";



const FilterSidebar = ({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  priceRange = [0, 9999999],
  setPriceRange,
  allProducts = [],
  onClose,
}) => {

  console.log("PRICE RANGE:", priceRange);

  /* categories */
  const categories = allProducts.map((p) => p.category);
  const uniqueCategory = ["All", ...new Set(categories)];

  /*  brands */
  const brands = allProducts.map((p) => p.brand);
  const uniqueBrand = ["All", ...new Set(brands)];

  /* handlers */
  const handleCategoryClick = (val) => {
    setCategory(val);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

 
const handleMinChange = (e) => {
  console.log("MIN SLIDER CHANGED:", e.target.value);
  setPriceRange([Number(e.target.value), priceRange[1]]);
};

const handleMaxChange = (e) => {
  console.log("MAX SLIDER CHANGED:", e.target.value);
  setPriceRange([priceRange[0], Number(e.target.value)]);
};



  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 9999999]);
  };

  return (
    <div className="bg-gray-200 mt-10 p-4 rounded-md h-max md:block w-full md:w-60 md:-ml-0 relative">
      {onClose && (
        <button onClick={onClose} className="absolute top-2 right-2 md:hidden z-10">
          <X size={20} />
        </button>
      )}

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white p-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Category */}
      <div className="mb-6">
        <h1 className="font-semibold text-lg mb-3">Category</h1>
        <div className="flex flex-col gap-2">
          {uniqueCategory.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded">
              <input
                type="radio"
                name="category"
                checked={category === item}
                onChange={() => handleCategoryClick(item)}
                className="text-pink-600 focus:ring-pink-500"
              />
              <span className="text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="mb-6">
        <h1 className="font-semibold text-lg mb-3">Brand</h1>
        <select
          className="bg-white w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={brand}
          onChange={handleBrandChange}
        >
          {uniqueBrand.map((item, index) => (
            <option key={index} value={item}>
              {item.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h1 className="font-semibold text-lg mb-3">Price Range</h1>

        <div className="bg-white p-3 rounded-md border border-gray-300 mb-3">
          <label className="text-sm font-medium">
            ₹ {priceRange[0].toLocaleString()} - ₹ {priceRange[1].toLocaleString()}
          </label>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2 items-center">
            <input
              type="number"
              min="0"
              value={priceRange[0]}
              onChange={handleMinChange}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Min price"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              min="0"
              value={priceRange[1]}
              onChange={handleMaxChange}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Max price"
            />
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min={0}
              max={priceRange[1]}
              step={100}
              value={priceRange[0]}
              onChange={handleMinChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <input
              type="range"
              min={priceRange[0]}
              max={9999999}
              step={100}
              value={priceRange[1]}
              onChange={handleMaxChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>

      {/* Reset */}
      <Button
        onClick={resetFilters}
        className="bg-pink-500 hover:bg-pink-600 cursor-pointer w-full py-3 text-white font-medium"
      >
        Reset Filter
      </Button>
    </div>
  );
};

export default FilterSidebar;
