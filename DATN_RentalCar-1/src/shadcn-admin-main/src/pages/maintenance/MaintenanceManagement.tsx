import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface Maintenance {
    maintenanceId: number;
    maintenanceDate: string;
    description: string;
    cost: number;
}

const MaintenanceManagement: React.FC = () => {
    const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [newMaintenance, setNewMaintenance] = useState<Maintenance>({
        maintenanceId: 0,
        maintenanceDate: "",
        description: "",
        cost: 0,
    });
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [notification, setNotification] = useState<string | null>(null); // Thông báo động
    const [loading, setLoading] = useState<boolean>(false); // Trạng thái loading

    useEffect(() => {
        fetchMaintenances();
    }, []);

    // Hiển thị thông báo động
    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000); // Tự động ẩn thông báo sau 3 giây
    };
    

    //reset API
    const handleRefreshClick = (e: React.MouseEvent) => {
        e.preventDefault(); 
        fetchMaintenances(); 
    };
    

    const fetchMaintenances = () => {
        setLoading(true); // Hiển thị loading
        axios
            .get("http://localhost:8080/api/car-maintenance")
            .then((response) => {
                setMaintenances(response.data);
                showNotification("Danh sách bảo dưỡng đã được tải lại.");
            })
            .catch((error) => console.error("Lỗi khi lấy danh sách bảo dưỡng:", error))
            .finally(() => setLoading(false)); // Tắt loading
    };

    const handleDeleteMaintenance = () => {
        if (selectedId !== null) {
            axios
                .delete(`http://localhost:8080/api/car-maintenance/${selectedId}`)
                .then(() => {
                    fetchMaintenances();
                    showNotification(`Bảo dưỡng với ID ${selectedId} đã được xóa.`);
                    setSelectedId(null);
                })
                .catch((error) => console.error("Lỗi khi xóa bảo dưỡng:", error));
        }
    };

    const handleEditMaintenance = (maintenance: Maintenance) => {
        setIsEditing(true);
        setNewMaintenance(maintenance);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setNewMaintenance((prev) => ({
            ...prev,
            [id]: id === "cost" ? Number(value) : value,
        }));
    };

    const handleAddOrUpdateMaintenance = () => {
        if (isEditing) {
            axios
                .put(`http://localhost:8080/api/car-maintenance/${newMaintenance.maintenanceId}`, newMaintenance)
                .then(() => {
                    fetchMaintenances();
                    showNotification(`Bảo dưỡng với ID ${newMaintenance.maintenanceId} đã được cập nhật.`);
                    resetForm();
                })
                .catch((error) => console.error("Lỗi khi cập nhật bảo dưỡng:", error));
        } else {
            axios
                .post("http://localhost:8080/api/car-maintenance", newMaintenance)
                .then(() => {
                    fetchMaintenances();
                    showNotification("Bảo dưỡng mới đã được thêm.");
                    resetForm();
                })
                .catch((error) => console.error("Lỗi khi thêm bảo dưỡng mới:", error));
        }
    };

    const resetForm = () => {
        setNewMaintenance({
            maintenanceId: 0,
            maintenanceDate: "",
            description: "",
            cost: 0,
        });
        setIsEditing(false);
    };

    const filteredMaintenances = maintenances.filter((maintenance) =>
        maintenance.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-screen overflow-auto">
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Quản Lý Bảo Dưỡng Xe</h2>

                {/* Thông báo động */}
                {notification && (
                    <div className="p-4 mb-4 text-white bg-green-500 rounded shadow-md">
                        {notification}
                    </div>
                )}

                {/* Hiển thị trạng thái loading */}
                {loading && (
                    <div className="p-4 mb-4 text-white bg-blue-500 rounded shadow-md">
                        Đang tải dữ liệu...
                    </div>
                )}

                {/* Form Section */}
                <div className="p-6 border border-gray-300 shadow-md rounded-lg mb-6">
                    <h3 className="text-lg font-semibold mb-4">{isEditing ? "Chỉnh sửa bảo dưỡng" : "Thêm mới bảo dưỡng"}</h3>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="maintenanceDate" className="block font-medium">Ngày bảo dưỡng</label>
                            <input
                                type="date"
                                id="maintenanceDate"
                                value={newMaintenance.maintenanceDate}
                                onChange={handleFormChange}
                                className="w-full p-2 bg-muted  border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block font-medium">Mô tả</label>
                            <textarea
                                id="description"
                                value={newMaintenance.description}
                                onChange={handleFormChange}
                                className="w-full p-2 bg-muted  border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="cost" className="block font-medium">Chi phí (VND)</label>
                            <input
                                type="number"
                                id="cost"
                                value={newMaintenance.cost}
                                onChange={handleFormChange}
                                className="w-full p-2 bg-muted  border rounded"
                            />
                        </div>
                        <div className="flex justify-start space-x-4 mt-4">
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={handleAddOrUpdateMaintenance}
                            >
                                {isEditing ? "Cập Nhật" : "Thêm"}
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                onClick={resetForm}
                            >
                                Làm mới
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={handleRefreshClick}
                            >
                                Tải lại danh sách
                            </button>
                        </div>
                    </form>
                </div>

                {/* Table Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-center">Danh sách bảo dưỡng</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border rounded-lg">
                            <thead>
                                <tr>
                                    <th className="p-3 text-left font-medium">ID</th>
                                    <th className="p-3 text-left font-medium">Ngày</th>
                                    <th className="p-3 text-left font-medium">Mô Tả</th>
                                    <th className="p-3 text-left font-medium">Chi Phí (VND)</th>
                                    <th className="p-3 text-left font-medium">Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMaintenances.map((maintenance) => (
                                    <tr key={maintenance.maintenanceId} className="border-t hover:bg-muted/50">
                                        <td className="p-3">{maintenance.maintenanceId}</td>
                                        <td className="p-3">{new Date(maintenance.maintenanceDate).toLocaleDateString()}</td>
                                        <td className="p-3">{maintenance.description}</td>
                                        <td className="p-3">{maintenance.cost.toLocaleString()} VND</td>
                                        <td className="p-3 flex space-x-2">
                                            <button
                                                className="px-2 py-1 bg-black text-white rounded hover:bg-gray-800"
                                                onClick={() => handleEditMaintenance(maintenance)}
                                            >
                                                Sửa
                                            </button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button
                                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                        onClick={() => setSelectedId(maintenance.maintenanceId)}
                                                    >
                                                        Xóa
                                                    </button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Bạn chắc chắn?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Hành động này không thể hoàn tác. Dữ liệu sẽ bị xóa vĩnh viễn.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                                                        <AlertDialogAction onClick={handleDeleteMaintenance}>
                                                            Xóa
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
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

export default MaintenanceManagement;
