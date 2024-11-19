import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import axios from "axios";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  transmission: string;
  fuelType: string;
  fuelConsumption: number;
  dailyRate: number;
  status: string;
  images: string[];
}

const CarManagement: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const [newCar, setNewCar] = useState<Car>({
    id: 0,
    make: "",
    model: "",
    year: new Date().getFullYear(),
    color: "",
    mileage: 0,
    transmission: "Tự động",
    fuelType: "Xăng",
    fuelConsumption: 0,
    dailyRate: 0,
    status: "Sẵn sàng",
    images: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/car")
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file)); // Tạo URL cho mỗi file ảnh
      if (uploadedImages.length + newImages.length <= 5) {  // Kiểm tra nếu tổng số ảnh không vượt quá 5
        setUploadedImages((prevImages) => [...prevImages, ...newImages]);
      }
    }
  };



  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setNewCar((prevCar) => ({ ...prevCar, [id]: id === "year" || id === "mileage" || id === "dailyRate" ? +value : value }));
  };

  const filteredCars = cars.filter(
    (car) =>
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.color.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen overflow-auto">
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Quản Lí Xe Hơi</h2>

        {/* Form Section */}
        <div className="p-6 border border-gray-300 shadow-md rounded-lg bg-white">
          <div className="grid grid-cols-3 gap-6">

            {/* Upload Image Section */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Tải lên ảnh của xe</h3>

              {/* Ảnh Toàn Xe */}
              <div className="border-dashed border-2 border-gray-400 rounded-lg h-48 flex flex-col items-center justify-center text-gray-500 mb-4 relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="opacity-0 absolute h-full w-full cursor-pointer"
                  multiple // Thêm thuộc tính multiple để cho phép chọn nhiều ảnh
                />

                {uploadedImages[0] ? (
                  <img
                    src={uploadedImages[0]}
                    alt="Ảnh Toàn Xe"
                    className="object-cover w-full h-full rounded-lg"
                  />
                ) : (
                  <>
                    <p className="font-medium">Ảnh Toàn Xe</p>
                    <p className="text-sm text-gray-400">Kích thước: 1200 x 600 px • JPG, PNG</p>
                    <p className="text-sm text-gray-400">Dung lượng tối đa: 5 MB</p>
                  </>
                )}
              </div>

              {/* Display uploaded images */}
              <div className="grid grid-cols-2 gap-4">
                {["Ảnh Đầu Xe", "Ảnh Đuôi Xe", "Ảnh Đồng Hồ", "Ảnh Phụ"].map((label, index) => (
                  <div
                    key={index}
                    className="border-dashed border-2 border-gray-400 rounded-lg h-24 flex items-center justify-center text-gray-500 relative"
                  >
                    {uploadedImages[index + 1] ? (
                      <img
                        src={uploadedImages[index + 1]}
                        alt={label}
                        className="object-cover h-full w-full rounded-lg"
                      />
                    ) : (
                      <p className="font-medium">{label}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>


            {/* Car Information Form */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Thông Tin Xe</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="make" className="block font-medium">Hãng xe</label>
                  <input type="text" id="make" value={newCar.make} onChange={handleFormChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label htmlFor="model" className="block font-medium">Mẫu xe</label>
                  <input type="text" id="model" value={newCar.model} onChange={handleFormChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label htmlFor="year" className="block font-medium">Năm sản xuất</label>
                  <input type="number" id="year" value={newCar.year} onChange={handleFormChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label htmlFor="color" className="block font-medium">Màu sắc</label>
                  <input type="text" id="color" value={newCar.color} onChange={handleFormChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label htmlFor="mileage" className="block font-medium">Số Km</label>
                  <input type="number" id="mileage" value={newCar.mileage} onChange={handleFormChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label htmlFor="fuelConsumption" className="block font-medium">Tiêu thụ (L/100km)</label>
                  <input type="number" id="fuelConsumption" value={newCar.fuelConsumption} onChange={handleFormChange} className="w-full p-2 border rounded" />
                </div>
              </form>

            </div>

            {/* Additional Information Form */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Thông Tin Bổ Sung</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="transmission" className="block font-medium">Hộp số</label>
                  <select id="transmission" value={newCar.transmission} onChange={handleFormChange} className="w-full p-2 border rounded">
                    <option value="Tự động">Tự động</option>
                    <option value="Số tay">Số tay</option>
                    <option value="Bán tự động">Bán tự động</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="fuelType" className="block font-medium">Loại Nhiên Liệu</label>
                  <select id="fuelType" value={newCar.fuelType} onChange={handleFormChange} className="w-full p-2 border rounded">
                    <option value="Xăng">Xăng</option>
                    <option value="Dầu">Dầu</option>
                    <option value="Điện">Điện</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="dailyRate" className="block font-medium">Giá thuê mỗi ngày (VND)</label>
                  <input type="number" id="dailyRate" value={newCar.dailyRate} onChange={handleFormChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label htmlFor="status" className="block font-medium">Trạng thái</label>
                  <select id="status" value={newCar.status} onChange={handleFormChange} className="w-full p-2 border rounded">
                    <option value="Sẵn sàng">Sẵn sàng</option>
                    <option value="Đang thuê">Đang thuê</option>
                    <option value="Bảo dưỡng">Bảo dưỡng</option>
                  </select>
                </div>
              </form>

              {/* CRUD Buttons */}
              <div className="flex justify-start space-x-4 mt-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Thêm
                </button>
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Làm Mới
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Tìm Kiếm Xe</h3>
          <input
            type="text"
            placeholder="Tìm kiếm theo hãng xe, mẫu xe hoặc màu sắc..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Table Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Danh sách xe</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left font-medium">Hãng Xe</th>
                  <th className="p-3 text-left font-medium">Mẫu Xe</th>
                  <th className="p-3 text-left font-medium">Năm Sản Xuất</th>
                  <th className="p-3 text-left font-medium">Màu Sắc</th>
                  <th className="p-3 text-left font-medium">Số Km</th>
                  <th className="p-3 text-left font-medium">Hộp Số</th>
                  <th className="p-3 text-left font-medium">Loại Nhiên Liệu</th>
                  <th className="p-3 text-left font-medium">Tiêu Thụ (L/100km)</th>
                  <th className="p-3 text-left font-medium">Giá Thuê (VND)</th>
                  <th className="p-3 text-left font-medium">Trạng Thái</th>
                  <th className="p-3 text-left font-medium">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {filteredCars.map((car) => (
                  <tr key={car.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{car.make}</td>
                    <td className="p-3">{car.model}</td>
                    <td className="p-3">{car.year}</td>
                    <td className="p-3">{car.color}</td>
                    <td className="p-3">{car.mileage.toLocaleString()} km</td>
                    <td className="p-3">{car.transmission}</td>
                    <td className="p-3">{car.fuelType}</td>
                    <td className="p-3">{car.fuelConsumption.toFixed(1)}</td>
                    <td className="p-3">{car.dailyRate.toLocaleString()} VND</td>
                    <td className="p-3">{car.status}</td>
                    <td className="p-3 flex space-x-2">
                      <button className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-lg hover:bg-gray-800">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarManagement;
