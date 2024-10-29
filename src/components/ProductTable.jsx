import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import EditProductForm from "./EditProductForm";

function ProductTable({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseEdit = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>نام کالا</th>
            <th>موجودی</th>
            <th>شناسه کالا</th>
            <th>قیمت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.id}</td>
              <td>{product.price}</td>
              <td>
                <RiDeleteBin5Line />
                <TbEdit onClick={() => handleClick(product)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <EditProductForm
          setIsShowEdit={handleCloseEdit}
          product={selectedProduct}
        />
      )}
    </>
  );
}

export default ProductTable;
