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
import { ScrollArea, ScrollAreaProvider } from "@/components/ui/scroll-area";
import { useToast } from '@/components/ui/use-toast';
import produce from 'immer'; // Import 'immer'

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
  rental: any[];
}

interface ApiResponse {
  content: Account[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

interface FieldLimit {
  min?: number;
  max: number;
  pattern?: string;
  patternMessage?: string;
}

const FIELD_LIMITS: Record<string, FieldLimit> = {
  fullName: { max: 100 },
  email: { 
    max: 100, 
    pattern: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$",
    patternMessage: "Email không hợp lệ"
  },
  phoneNumber: { 
    max: 15,
    pattern: "^[0-9+()-]{10,15}$",
    patternMessage: "Số điện thoại không hợp lệ"
  },
  username: { min: 4, max: 50 },
  passwordHash: { min: 6, max: 100 },
  address: { max: 255 },
};

const API_URL = "http://localhost:8080/api/account";

const AccountSettings: React.FC = () => {
  const toast = useToast();
  // State management
  const [accounts, setAccounts] = useState<Account[]>([]);
  const initialFormData: Account = {
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
  };
  const [formData, setFormData] = useState<Account>(initialFormData);
  
  // UI state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof Account, string>>>({});

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // Date formatting utilities
  const formatDateForInput = (dateString: string | null): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  const formatDateForAPI = (dateString: string | null): string | null => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toISOString();
    } catch {
      return null;
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof Account, string>> = {};
    
    Object.entries(FIELD_LIMITS).forEach(([field, limits]) => {
      const value = formData[field as keyof Account] as string;
      
      if (!value && field !== 'address') {
        errors[field as keyof Account] = `${field} không được để trống`;
        return;
      }

      if (value) {
        if (limits.min && value.length < limits.min) {
          errors[field as keyof Account] = `${field} phải có ít nhất ${limits.min} ký tự`;
        }
        
        if (value.length > limits.max) {
          errors[field as keyof Account] = `${field} không được vượt quá ${limits.max} ký tự`;
        }

        if (limits.pattern && !new RegExp(limits.pattern).test(value)) {
          errors[field as keyof Account] = limits.patternMessage || `${field} không hợp lệ`;
        }
      }
    });

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
      
      const formattedAccounts = data.content.map(account => ({
        ...account,
        dateOfBirth: formatDateForInput(account.dateOfBirth)
      }));
      
      setAccounts(formattedAccounts);
      setTotalPages(data.totalPages);
      setCurrentPage(data.number);
    } catch (error) {
      toast({
        title: 'Lỗi khi tải danh sách tài khoản',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createAccount = async (accountData: Account) => {
    const dataToSend = {
      ...accountData,
      dateOfBirth: formatDateForAPI(accountData.dateOfBirth)
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const newAccount = await response.json();
    // Update the state and refetch
    setAccounts(produce(accounts, draft => draft.push(newAccount))); // Immutably update array
    fetchAccounts(); // Fetch updated accounts

    return newAccount;
  };

  const updateAccount = async (accountData: Account) => {
    const dataToSend = {
      ...accountData,
      dateOfBirth: formatDateForAPI(accountData.dateOfBirth)
    };

    const response = await fetch(`${API_URL}/${accountData.accountId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const updatedAccount = await response.json();
    // Update the state and refetch
    setAccounts(produce(accounts, draft => {
      const index = draft.findIndex(acc => acc.accountId === updatedAccount.accountId);
      if (index !== -1) {
        draft[index] = updatedAccount; 
      }
    })); 
    fetchAccounts();

    return updatedAccount;
  };

  const deleteAccount = async (accountId: number) => {
    const response = await fetch(`${API_URL}/${accountId}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Update the state and refetch
    setAccounts(produce(accounts, draft => {
      const index = draft.findIndex(acc => acc.accountId === accountId);
      if (index !== -1) {
        draft.splice(index, 1); // Immutably remove from array
      }
    }));
    fetchAccounts(); 
  };

  // Event handlers
  const handleInputChange = (field: keyof Account, value: string) => {
    const limit = FIELD_LIMITS[field]?.max;
    if (limit && value.length > limit) {
      return; // Prevent input if over max length
    }
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        const updatedAccount = await updateAccount(formData);
        setAccounts(accounts.map(account => 
          account.accountId === updatedAccount.accountId ? updatedAccount : account
        ));
        toast({
          title: 'Cập nhật tài khoản thành công',
          variant: 'success',
        });
      } else {
        const newAccount = await createAccount(formData);
        setAccounts([...accounts, newAccount]);
        toast({
          title: 'Thêm mới tài khoản thành công',
          variant: 'success',
        });
      }
      handleClearForm();
    } catch (error) {
      toast({
        title: `Lỗi khi ${isEditing ? "cập nhật" : "thêm"} tài khoản`,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditAccount = (account: Account) => {
    setIsEditing(true);
    setFormData({
      ...account,
      dateOfBirth: formatDateForInput(account.dateOfBirth)
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
      setAccounts(accounts.filter(account => account.accountId !== accountId));
      toast({
        title: 'Xóa tài khoản thành công',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Lỗi khi xóa tài khoản',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    setFormData(initialFormData);
    setFormErrors({});
    setIsEditing(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Effects
  useEffect(() => {
    fetchAccounts();
  }, [currentPage]); // fetch accounts when currentPage changes

  useEffect(() => {
    // Refetches accounts after a successful account update
    fetchAccounts();
  }, [accounts]); 

  return (
    <ScrollAreaProvider>
      <div className="container mx-auto p-6 space-y-6">
        <ScrollArea className="max-h-screen">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {isEditing ? "Chỉnh sửa tài khoản" : "Thêm mới tài khoản"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Họ và tên</Label>
                    <Input 
                      id="fullName" 
                      type="text" 
                      placeholder="Họ và tên" 
                      value={formData.fullName} 
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={formErrors.fullName ? 'border-red-500' : ''}
                    />
                    {formErrors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Email" 
                      value={formData.email} 
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={formErrors.email ? 'border-red-500' : ''}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Số điện thoại</Label>
                    <Input 
                      id="phoneNumber" 
                      type="tel" 
                      placeholder="Số điện thoại" 
                      value={formData.phoneNumber} 
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className={formErrors.phoneNumber ? 'border-red-500' : ''}
                    />
                    {formErrors.phoneNumber && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.phoneNumber}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="username">Tên đăng nhập</Label>
                    <Input 
                      id="username" 
                      type="text" 
                      placeholder="Tên đăng nhập" 
                      value={formData.username} 
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className={formErrors.username ? 'border-red-500' : ''}
                    />
                    {formErrors.username && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.username}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="passwordHash">Mật khẩu</Label>
                    <Input 
                      id="passwordHash" 
                      type="password" 
                      placeholder="Mật khẩu" 
                      value={formData.passwordHash} 
                      onChange={(e) => handleInputChange('passwordHash', e.target.value)}
                      className={formErrors.passwordHash ? 'border-red-500' : ''}
                    />
                    {formErrors.passwordHash && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.passwordHash}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="address">Địa chỉ</Label>
                    <Input 
                      id="address" 
                      type="text" 
                      placeholder="Địa chỉ" 
                      value={formData.address || ''} 
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={formErrors.address ? 'border-red-500' : ''}
                    />
                    {formErrors.address && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                    <Input 
                      id="dateOfBirth" 
                      type="date" 
                      value={formData.dateOfBirth || ''} 
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className={formErrors.dateOfBirth ? 'border-red-500' : ''}
                    />
                    {formErrors.dateOfBirth && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.dateOfBirth}</p>
                    )}
                  </div>
                </div>

                <Button type="submit" className="w-full" loading={loading}>
                  {isEditing ? "Cập nhật tài khoản" : "Thêm mới tài khoản"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Separator className="my-6" />

          {/* Accounts List */}
          <div>
            <h2 className="text-xl font-bold mb-4">Danh sách tài khoản123</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Họ và tên</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Số điện thoại</th>
                    <th className="px-4 py-2 text-left">Tên đăng nhập</th>
                    <th className="px-4 py-2 text-left">Ngày sinh</th>
                    <th className="px-4 py-2 text-left">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account, index) => (
                    <tr key={account.accountId} className="hover:bg-gray-100">
                      <td className="px-4 py-2">{account.fullName}</td>
                      <td className="px-4 py-2">{account.email}</td>
                      <td className="px-4 py-2">{account.phoneNumber}</td>
                      <td className="px-4 py-2">{account.username}</td>
                      <td className="px-4 py-2">{formatDateForInput(account.dateOfBirth)}</td>
                      <td className="px-4 py-2 flex gap-2">
                        <Button variant="outline" onClick={() => handleEditAccount(account)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" onClick={() => handleDeleteAccount(account.accountId)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end mt-4">
              <Button variant="outline" disabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)}>
                <RefreshCcw className="h-4 w-4 rotate-180" />
              </Button>
              <span className="mx-2">{currentPage + 1} / {totalPages}</span>
              <Button variant="outline" disabled={currentPage === totalPages - 1} onClick={() => handlePageChange(currentPage + 1)}>
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </ScrollAreaProvider>
  );
};

export default AccountSettings;