import React, { useState, useEffect } from "react";
import { Camera, UserCircle2, Plus, Edit, Trash2, RefreshCcw } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Role {
  roleId: number;
  roleName: string;
  description: string;
}

interface Account {
  accountId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  username: string;
  passwordHash: string;
  roles: Role[];
  address: string | null;
  dateOfBirth: string | null;
  imageUrl: string | null;
  rental: any[]; // Giả sử bạn không cần sử dụng rental
}

const API_URL = "http://localhost:8080/api/account";

const AccountSettings: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [formData, setFormData] = useState<Account>({
    accountId: 0, 
    fullName: "",
    email: "",
    phoneNumber: "",
    username: "",
    passwordHash: "",
    roles: [],
    address: "",
    dateOfBirth: "", 
    imageUrl: null,
    rental: [], 
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch danh sách tài khoản từ API
  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?page=${currentPage}&size=${itemsPerPage}`);
      if (!response.ok) {
        throw new Error("Failed to fetch accounts");
      }
      const data = await response.json();

      setAccounts(data.content); 
      setTotalCount(data.totalElements); 
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
      setAlertType("error");
      setAlertMessage("Lỗi khi tải danh sách tài khoản.");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý form submit
  const handleSubmit = async () => {
    const method = isEditing ? "PUT" : "POST";
    const endpoint = isEditing
      ? `${API_URL}/${formData.accountId}`
      : API_URL;

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      // Đảm bảo data là một đối tượng account
      const data = await response.json();

      // Update hoặc thêm data vào state.
      // Kiểm tra accountId tồn tại ở localState, nếu tồn tại thì update. Nếu không, thêm mới.
      if (isEditing) {
        setAccounts(accounts.map((account) => account.accountId === data.accountId ? data : account));
      } else {
        setAccounts([...accounts, data]); 
      }

      // Hiển thị thông báo thêm/chỉnh sửa thành công
      setAlertType("success");
      setAlertMessage(
        isEditing
          ? "Tài khoản đã được cập nhật."
          : "Tài khoản mới đã được thêm."
      );
      setShowAlert(true);
    } catch (error) {
      console.error("Lỗi khi submit form:", error);
      setAlertType("error");
      setAlertMessage("Lỗi khi lưu thay đổi tài khoản.");
      setShowAlert(true);
    }
  };

  // Hàm xử lý edit tài khoản
  const handleEditAccount = (account: Account) => {
    setIsEditing(true);
    setFormData(account);
  };

  // Hàm xử lý xóa tài khoản
  const handleDeleteAccount = async (accountId: number) => {
    try {
      const response = await fetch(`${API_URL}/${accountId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }
      
      setAccounts(accounts.filter((account) => account.accountId !== accountId));

      setAlertType("success");
      setAlertMessage("Tài khoản đã được xóa thành công.");
      setShowAlert(true);
    } catch (error) {
      console.error("Lỗi khi xóa tài khoản:", error);
      setAlertType("error");
      setAlertMessage("Lỗi khi xóa tài khoản.");
      setShowAlert(true);
    }
  };

  // Fetch dữ liệu khi component được mount
  useEffect(() => {
    fetchAccounts();
  }, []);

  // Hàm chuyển trang - Lưu ý, chúng ta sẽ handle click trang trên localstate thay vì load lại trang.
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchAccounts(); // Fetch lại data với currentPage mới.
  };

  // Hàm clear form và đặt isEditing về false
  const handleClearForm = () => {
    setFormData({
      accountId: 0, // Reset accountId khi hủy
      fullName: "",
      email: "",
      phoneNumber: "",
      username: "",
      passwordHash: "",
      address: "",
      dateOfBirth: "", 
      imageUrl: null,
      roles: [],
      rental: [],
    });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-4xl">
      {showAlert && (
        <Alert variant={alertType}>
          <AlertTitle>{alertType === "success" ? "Thành công" : "Lỗi"}</AlertTitle>
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {isEditing ? "Chỉnh sửa tài khoản" : "Thêm mới tài khoản"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Họ và tên</Label>
                    <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Số điện thoại</Label>
                    <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="username">Tên đăng nhập</Label>
                    <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="passwordHash">Mật khẩu</Label>
                    <Input
                    id="passwordHash"
                    type="password"
                    value={formData.passwordHash}
                    onChange={(e) => setFormData({ ...formData, passwordHash: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                    <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    />
                </div>
                </div>
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={handleClearForm}>Hủy</Button>
              <Button onClick={handleSubmit}>
                {isEditing ? "Lưu thay đổi" : "Thêm mới"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Danh sách tài khoản</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto relative">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
                <tr>
                    <th className="py-2 px-4 border">ID</th>
                    <th className="py-2 px-4 border">Họ và tên</th>
                    <th className="py-2 px-4 border">Email</th>
                    <th className="py-2 px-4 border">Hành động</th>
                </tr>
            </thead>
            <tbody>
              {/* Render table data */}
                {accounts.map((account) => (
                    <tr key={account.accountId}>
                    <td className="py-2 px-4 border text-center">{account.accountId}</td>
                    <td className="py-2 px-4 border">{account.fullName}</td>
                    <td className="py-2 px-4 border">{account.email}</td>
                    <td className="py-2 px-4 border flex justify-center space-x-2">
                        <Button size="sm" onClick={() => handleEditAccount(account)}>
                        <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteAccount(account.accountId)}>
                        <Trash2 className="w-4 h-4" />
                        </Button>
                    </td>
                    </tr>
                ))}
            </tbody>
          </table>
          {/* Phần phân trang */}
          <div className="flex justify-center mt-4 space-x-2">
            <Button
              variant="outline"
              disabled={currentPage === 0}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Trước
            </Button>
            <span className="flex items-center">{`Trang ${currentPage} của ${totalPages}`}</span>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Sau
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;