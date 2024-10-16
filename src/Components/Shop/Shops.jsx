import { useEffect, useState } from "react";
import UseProduct from "../../UseHook/UseProduct";
import Product from "../home/Product";

const Shops = () => {
  const [products] = UseProduct();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    categories: {
      table: true,
      chair: true,
      drawing: true,
      bed: true,
      sofa: true,
    },
    color: "white",
    priceRange: { min: "", max: "" },
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "color") {
      setFilters((prev) => ({ ...prev, color: value }));
    } else if (name === "min" || name === "max") {
      setFilters((prev) => ({
        ...prev,
        priceRange: { ...prev.priceRange, [name]: value },
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        categories: { ...prev.categories, [name]: checked },
      }));
    }
  };

  const applyFilters = (e) => {
    e.preventDefault();
    let filtered = products.filter((product) => {
      const matchCategory = filters.categories[product.category];
      const matchColor = product.color === filters.color;
      const matchPrice =
        (filters.priceRange.min === "" || product.price >= filters.priceRange.min) &&
        (filters.priceRange.max === "" || product.price <= filters.priceRange.max);
      return matchCategory && matchColor && matchPrice;
    });

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); 
    applyFilters(e); 
  };

  return (
    <div>
      <div className="shopBack">
        <div className="text-center text-4xl py-[110px]">Shop</div>
      </div>
      <div className="flex justify-between bg-[#FFF3E3] p-4">
        <div>
          <details className="dropdown">
            <summary className="m-1">Filter</summary>
            <ul className="menu dropdown-content bg-white rounded-box z-[1] w-52 p-4 shadow">
              <form onSubmit={applyFilters}>
                <div>
                  <h1 className="mt-6 text-lg font-semibold pl-1">Category</h1>
                  {Object.keys(filters.categories).map((category) => (
                    <div className="form-control" key={category}>
                      <label className="label cursor-pointer">
                        <span className="label-text capitalize">{category}</span>
                        <input
                          type="checkbox"
                          name={category}
                          checked={filters.categories[category]}
                          onChange={handleFilterChange}
                          className="checkbox"
                        />
                      </label>
                    </div>
                  ))}
                </div>
                <hr />
                <h1 className="mt-6 text-lg font-semibold pl-1">Color select</h1>
                {["white", "red", "black"].map((color) => (
                  <div className="form-control" key={color}>
                    <label className="label cursor-pointer">
                      <span className="label-text capitalize">{color}</span>
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        checked={filters.color === color}
                        onChange={handleFilterChange}
                        className={`radio checked:bg-${color}`}
                      />
                    </label>
                  </div>
                ))}
                <hr />
                <h1 className="mt-6 text-lg font-semibold pl-1">Price Range</h1>
                <div>
                  <label>
                    Min
                    <input
                      className="bg-white border rounded-sm p-1"
                      type="text"
                      name="min"
                      value={filters.priceRange.min}
                      onChange={handleFilterChange}
                    />
                  </label>
                  <label>
                    Max
                    <input
                      className="bg-white border rounded-sm p-1"
                      type="text"
                      name="max"
                      value={filters.priceRange.max}
                      onChange={handleFilterChange}
                    />
                  </label>
                </div>
                <button className="bg-[#B88E2F] py-1 px-5 text-white mt-5" type="submit">
                  Apply
                </button>
              </form>
            </ul>
          </details>
        </div>
        <div>
          {/* Search Your Product */}
          <form className="flex" onSubmit={handleSearchSubmit}>
            <label>
              <input
                type="text"
                placeholder="Search Your Product"
                className="input input-bordered w-full max-w-xs bg-white"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </label>
            <input className="bg-green-400 p-2 rounded-md" type="submit" value="Search" />
          </form>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 my-11 lg:mx-[100px]">
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shops;
