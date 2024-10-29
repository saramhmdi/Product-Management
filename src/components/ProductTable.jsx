import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import EditProductForm from "./EditProductForm";
import DeleteProduct from "./DeleteProduct";

function ProductTable({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isShowDelete, setIsShowDelete] = useState(false);

  const handleOpenModal = (product, isDelete) => {
    setSelectedProduct(product);
    setIsShowDelete(isDelete);
  };

  const handleCloseModal = () => {
    setIsShowDelete(false);
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
              <td>{product.price} تومان</td>
              <td>
                <RiDeleteBin5Line
                  onClick={() => handleOpenModal(product, true)}
                />
                <TbEdit onClick={() => handleOpenModal(product, false)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && !isShowDelete && (
        <EditProductForm
          setIsShowEdit={handleCloseModal}
          product={selectedProduct}
        />
      )}

      {isShowDelete && (
        <DeleteProduct product={selectedProduct} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default ProductTable;
