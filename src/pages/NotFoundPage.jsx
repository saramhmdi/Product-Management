import { Link } from "react-router-dom";
function NotFoundPage() {
  return (
    <div className="text-center px-4">
      <img src="/404Icon.svg" alt="404 error" />
      <p className="text-2xl md:text-3xl font-medium text-gray-800 m-8">
        صفحه‌ای که دنبال آن بودید پیدا نشد!
      </p>
      <Link to="/" className=" bg-[#55A3F0] text-[#FFFFFF] rounded-xl p-4">
        صفحه اصلی
      </Link>
    </div>
  );
}

export default NotFoundPage;
