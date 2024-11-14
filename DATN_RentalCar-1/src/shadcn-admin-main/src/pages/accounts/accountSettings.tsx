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

interface Role {
  roleId: number;
  roleName: string;
  description: string;
}

interface Account {
  accountId?: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  username: string;
  passwordHash: string;
  roles: Role[];
  address: string;
  dateOfBirth: string | null;
  imageUrl: string | null;
}

const API_URL = "http://localhost:8080/api/account";

const AccountSettings: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [formData, setFormData] = useState<Account>({
    fullName: "",
    email: "",
    phoneNumber: "",
    username: "",
    passwordHash: "",
    roles: [],
    address: "",
    dateOfBirth: null,
    imageUrl: null,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch danh sách tài khoản từ API
  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch accounts");
      }
      const data: Account[] = await response.json();
      setAccounts(data);
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm reset form
  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      username: "",
      passwordHash: "",
      roles: [],
      address: "",
      dateOfBirth: null,
      imageUrl: null,
    });
    setIsEditing(false);
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

      await fetchAccounts();
      resetForm();
    } catch (error) {
      console.error("Lỗi khi submit form:", error);
    }
  };

  // Hàm sửa tài khoản
  const handleEditAccount = (account: Account) => {
    if (account.accountId) {
      setFormData(account);
      setIsEditing(true);
    }
  };

  // Hàm xóa tài khoản
  const handleDeleteAccount = async (accountId: number) => {
    try {
      const response = await fetch(`${API_URL}/${accountId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete account");
      }

      await fetchAccounts();
    } catch (error) {
      console.error("Lỗi khi xóa tài khoản:", error);
    }
  };

  // Hàm đặt lại mật khẩu
  const handleResetPassword = (accountId: number) => {
    console.log(`Đặt lại mật khẩu cho tài khoản ID: ${accountId}`);
  };

  // Fetch dữ liệu khi component được mount
  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {isEditing ? "Chỉnh sửa tài khoản" : "Thêm mới tài khoản"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Form thông tin tài khoản */}
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Họ và tên</Label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Số điện thoại</Label>
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Tên đăng nhập</Label>
                <Input
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Mật khẩu</Label>
                <Input
                  type="password"
                  value={formData.passwordHash}
                  onChange={(e) => setFormData({ ...formData, passwordHash: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={resetForm}>Hủy</Button>
              <Button onClick={handleSubmit}>
                {isEditing ? "Lưu thay đổi" : "Thêm mới"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Bảng danh sách tài khoản */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Danh sách tài khoản</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
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
              {accounts.map((account) => (
                <tr key={account.accountId}>
                  <td className="py-2 px-4 border text-center">{account.accountId}</td>
                  <td className="py-2 px-4 border">{account.fullName}</td>
                  <td className="py-2 px-4 border">{account.email}</td>
                  <td className="py-2 px-4 border flex justify-center space-x-2">
                    <Button size="sm" onClick={() => handleEditAccount(account)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteAccount(account.accountId!)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;
