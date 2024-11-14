import React, { useState, ChangeEvent } from "react";
import { Camera, UserCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AccountSettings2: React.FC = () => {
  const [avatar, setAvatar] = useState<string>(
    "assets/img/user-icon-on-transparent-background-free-png.png"
  );

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar("assets/img/user-icon-on-transparent-background-free-png.png");
  };

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-8xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Cài đặt tài khoản
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserCircle2 className="w-full h-full text-gray-300" />
                )}
              </div>
              <label
                htmlFor="avatarInput"
                className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90 transition"
              >
                <Camera className="w-5 h-5" />
              </label>
              <input
                type="file"
                id="avatarInput"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
            {avatar && (
              <Button variant="destructive" size="sm" onClick={handleRemoveAvatar}>
                Xóa ảnh
              </Button>
            )}
          </div>

          <Separator />

          {/* Form Section */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Thông tin cá nhân</h3>

                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên</Label>
                  <Input id="name" placeholder="Nhập họ và tên" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" placeholder="Nhập số điện thoại" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input id="address" placeholder="Nhập địa chỉ" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="day">Ngày</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Ngày" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(31)].map((_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1)}>
                            {String(i + 1).padStart(2, "0")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="month">Tháng</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Tháng" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(12)].map((_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1)}>
                            {String(i + 1).padStart(2, "0")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Năm</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Năm" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 50 }, (_, i) => 1980 + i).map((year) => (
                          <SelectItem key={year} value={String(year)}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Thông tin tài khoản</h3>

                <div className="space-y-2">
                  <Label htmlFor="username">Tên đăng nhập</Label>
                  <Input id="username" placeholder="Nhập tên đăng nhập" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Vai trò</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Quản lý</SelectItem>
                      <SelectItem value="employees">Nhân viên</SelectItem>
                      <SelectItem value="driver">Tài xế</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline">Hủy</Button>
              <Button>Lưu thay đổi</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings2;
