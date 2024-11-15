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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from 'moment'; // Thư viện format ngày tháng

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
  password: string; // Đổi tên passwordHash thành password
  roles: Role[];
  address: string | null;
  dateOfBirth: string | null;
  imageUrl: string | null;
  rental: any[];
}

interface ApiResponse {
  content: Account[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

const API_URL = "http://localhost:8080/api/account";

const AccountSettings: React.FC = () => {
  // State management
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [formData, setFormData] = useState<Account>({
    accountId: 0,
    fullName: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    roles: [],
    address: "",
    dateOfBirth: "",
    imageUrl: null,
    rental: [],
  });

  // UI state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof Account, string>>>({});
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // Form validation
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof Account, string>> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Họ và tên không được để trống";
    }

    if (!formData.email.trim()) {
      errors.email = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email không hợp lệ";
    }

    if (!formData.username.trim()) {
      errors.username = "Tên đăng nhập không được để trống";
    }

    if (!isEditing && !formData.password) {
      errors.password = "Mật khẩu không được để trống";
    }

    if (!formData.roles.length) {
      errors.roles = "Vui lòng chọn vai trò";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // API calls
  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?page=${currentPage}&size=${itemsPerPage}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse = await response.json();
      console.log('API Response:', data);
      setAccounts(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(data.number);
    } catch (error) {
      showNotification("Lỗi khi tải danh sách tài khoản", "error");
    } finally {
      setLoading(false);
    }
  };

  const createAccount = async (accountData: Account) => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accountData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newAccount = await response.json();
      setAccounts([...accounts, newAccount]);
      showNotification("Thêm mới tài khoản thành công", "success");
      handleClearForm();
    } catch (error) {
      showNotification(`Lỗi khi thêm tài khoản: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const updateAccount = async (accountData: Account) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${accountData.accountId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accountData),
      });
      
      // Kiểm tra response type
      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Chỉ parse JSON nếu response là JSON
      if (contentType && contentType.includes("application/json")) {
        const updatedAccount = await response.json();
        setAccounts(accounts.map(account => 
          account.accountId === updatedAccount.accountId ? updatedAccount : account
        ));
      } else {
        // Nếu response không phải JSON, có thể là text
        const text = await response.text();
        console.log('Response text:', text);
        // Vẫn cập nhật UI nếu response.ok
        setAccounts(accounts.map(account => 
          account.accountId === accountData.accountId ? accountData : account
        ));
      }
      
      showNotification("Cập nhật tài khoản thành công", "success");
      handleClearForm();
    } catch (error) {
      console.error('Error updating account:', error);
      showNotification(`Lỗi khi cập nhật tài khoản: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async (accountId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${accountId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setAccounts(accounts.filter(account => account.accountId !== accountId));
      showNotification("Xóa tài khoản thành công", "success");
    } catch (error) {
      showNotification("Lỗi khi xóa tài khoản", "error");
    } finally {
      setLoading(false);
    }
  };

  // Event handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Chuyển đổi dateOfBirth sang định dạng yyyy-MM-dd
    const formattedDateOfBirth = formData.dateOfBirth
      ? moment(formData.dateOfBirth).format('YYYY-MM-DD')
      : null;

    const updatedFormData = {
      ...formData,
      dateOfBirth: formattedDateOfBirth,
    };

    setLoading(true);
    try {
      if (isEditing) {
        await updateAccount(updatedFormData);
      } else {
        await createAccount(updatedFormData);
      }
    } catch (error) {
      showNotification(
        `Lỗi khi ${isEditing ? "cập nhật" : "thêm"} tài khoản: ${error.message}`,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditAccount = (account: Account) => {
    setIsEditing(true);
    // Format lại dateOfBirth trước khi gán cho formData
    setFormData({
      ...account,
      dateOfBirth: account.dateOfBirth ? moment(account.dateOfBirth).format('YYYY-MM-DD') : ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteAccount = async (accountId: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      return;
    }

    setLoading(true);
    try {
      await deleteAccount(accountId);
      showNotification("Xóa tài khoản thành công", "success");
    } catch (error) {
      showNotification("Lỗi khi xóa tài khoản", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    setFormData({
      accountId: 0,
      fullName: "",
      email: "",
      phoneNumber: "",
      username: "",
      password: "",
      roles: [],
      address: "",
      dateOfBirth: "",
      imageUrl: null,
      rental: [],
    });
    setFormErrors({});
    setIsEditing(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Utility functions
  const showNotification = (message: string, type: "success" | "error") => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // Effects
  useEffect(() => {
    fetchAccounts();
  }, [currentPage, itemsPerPage]);

  // Định nghĩa danh sách vai trò
  const ROLES = [
    { id: 1, name: 'admin', description: 'Quản trị hệ thống' },
    { id: 2, name: 'customer', description: 'Khách hàng sử dụng dịch vụ' },
    { id: 3, name: 'driver', description: 'Tài xế lái xe' }
  ];

  // Sửa lại hàm xử lý ảnh
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      showNotification("Lỗi khi xử lý ảnh", "error");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-8xl">
      {showAlert && (
        <Alert variant={alertType === "success" ? "default" : "destructive"}>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="relative">
                {formData.imageUrl ? (
                  <img
                    src={formData.imageUrl}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <UserCircle2 className="w-32 h-32" />
                )}
                <label
                  htmlFor="image-upload"
                  className="absolute bottom-0 right-0 p-1 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90"
                >
                  <Camera className="w-4 h-4" />
                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Form fields */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Họ và tên</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={formErrors.fullName ? "border-red-500" : ""}
                />
                {formErrors.fullName && (
                  <p className="text-red-500 text-sm">{formErrors.fullName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={formErrors.email ? "border-red-500" : ""}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm">{formErrors.email}</p>
                )}
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
                  className={formErrors.username ? "border-red-500" : ""}
                />
                {formErrors.username && (
                  <p className="text-red-500 text-sm">{formErrors.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={formErrors.password ? "border-red-500" : ""}
                />
                {formErrors.password && (
                  <p className="text-red-500 text-sm">{formErrors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                  id="address"
                  value={formData.address || ""}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth || ""}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Vai trò</Label>
                <Select
                  value={formData.roles[0]?.roleId.toString() || ""}
                  onValueChange={(value) => {
                    const selectedRole = ROLES.find(role => role.id.toString() === value);
                    if (selectedRole) {
                      setFormData({
                        ...formData,
                        roles: [{
                          roleId: selectedRole.id,
                          roleName: selectedRole.name,
                          description: selectedRole.description
                        }]
                      });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((role) => (
                      <SelectItem key={role.id} value={role.id.toString()}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.roles && (
                  <p className="text-red-500 text-sm">{formErrors.roles}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClearForm}
                disabled={loading}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <RefreshCcw className="w-4 h-4 animate-spin" />
                ) : isEditing ? (
                  "Lưu thay đổi"
                ) : (
                  "Thêm mới"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Danh sách tài khoản</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <div className="flex justify-center p-4">
            <RefreshCcw className="w-6 h-6 animate-spin" />
          </div>}

          <div className="overflow-x-auto relative">
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Ảnh</th>
                  <th className="py-2 px-4 border">Họ và tên</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Số điện thoại</th>
                  <th className="py-2 px-4 border">Vai trò</th>
                  <th className="py-2 px-4 border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.accountId}>
                    <td className="py-2 px-4 border text-center">{account.accountId}</td>
                    <td className="py-2 px-4 border text-center">
                      {account.imageUrl ? (
                        <img
                          src={account.imageUrl}
                          alt={account.fullName}
                          className="w-10 h-10 rounded-full object-cover mx-auto"
                        />
                      ) : (
                        <UserCircle2 className="w-10 h-10 mx-auto" />
                      )}
                    </td>
                    <td className="py-2 px-4 border">{account.fullName}</td>
                    <td className="py-2 px-4 border">{account.email}</td>
                    <td className="py-2 px-4 border">{account.phoneNumber}</td>
                    <td className="py-2 px-4 border">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        {account.roles[0]?.roleName}
                      </span>
                    </td>
                    <td className="py-2 px-4 border flex justify-center space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleEditAccount(account)}
                        disabled={loading}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteAccount(account.accountId)}
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center items-center mt-4 space-x-2">
            <Button
              variant="outline"
              disabled={currentPage === 0 || loading}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Trước
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(i)}
                  disabled={loading}
                  className="w-8 h-8"
                >
                  {i + 1}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              disabled={currentPage === totalPages - 1 || loading}
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