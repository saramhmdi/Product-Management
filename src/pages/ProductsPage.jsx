import { useState } from "react";
import { RingLoader } from "react-spinners";
import AddEditProductForm from "../components/AddProductForm";
import ProductTable from "../components/ProductTable";
import SearchBox from "../components/SearchBox";

import { useGetAllProducts } from "../services/queries";

function ProductsPage() {
  const [page, setPage] = useState(1);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const { isLoading, data, error } = useGetAllProducts(page);
  const filteredProducts = data?.data.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  if (isLoading) return <RingLoader color={"#55A3F0"} />;
  if (error)
    return <img src="network-disconnected-svgrepo-com.svg" alt="error" />;

  return (
    <div>
      <SearchBox setSearch={setSearch} />
      <div>
        <div>
          <img src="setting-3.svg" alt="setting-icon" />
          <span>مدیریت کالا</span>
        </div>
        <button onClick={() => setIsShowAdd(true)}>افزودن محصول</button>
      </div>
      <ProductTable products={filteredProducts} />
      {isShowAdd && <AddEditProductForm setIsShowAdd={setIsShowAdd} />}
    </div>
  );
}

export default ProductsPage;
