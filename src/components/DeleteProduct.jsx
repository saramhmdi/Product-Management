import { ToastContainer } from "react-toastify";

import { useDeleteProduct } from "../services/mutations";
import { showToast } from "../utils/functions";

function DeleteProduct({ product, onClose }) {
  const { mutate } = useDeleteProduct();

  const deleteHandler = () => {
    mutate(product.id, {
      onSuccess: () => {
        showToast("محصول با موفقیت حذف شد", "success");
        setTimeout(() => {
          onClose();
        }, 1500);
      },
      onError: () => {
        showToast("متاسفانه مشکلی پیش آمده است", "error");
      },
    });
  };

  return (
    <div>
      <p>آیا از حذف این محصول مطمئنید؟</p>
      <img src="Close.svg" alt="delete-product" />
      <div>
        <button onClick={deleteHandler}>حذف</button>
        <button onClick={onClose}>لغو</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default DeleteProduct;
