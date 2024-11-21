import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const DiscountManagement = () => {
  const [discounts, setDiscounts] = useState([]);
  const [currentDiscount, setCurrentDiscount] = useState({
    discountCode: '',
    description: '',
    discountPercentage: 0,
    startDate: '',
    endDate: '',
    status: 'Còn hiệu lực'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/discount');
      setDiscounts(response.data);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách mã giảm giá",
        variant: "destructive"
      });
    }
  };

  const validateForm = () => {
    const errors = [];
    if (!currentDiscount.discountCode.trim()) {
      errors.push("Mã giảm giá không được trống");
    }
    if (currentDiscount.discountPercentage <= 0 || currentDiscount.discountPercentage > 100) {
      errors.push("Phần trăm giảm giá phải từ 1-100");
    }
    if (!currentDiscount.startDate) {
      errors.push("Ngày bắt đầu không được trống");
    }
    if (!currentDiscount.endDate) {
      errors.push("Ngày kết thúc không được trống");
    }
    if (new Date(currentDiscount.startDate) >= new Date(currentDiscount.endDate)) {
      errors.push("Ngày kết thúc phải sau ngày bắt đầu");
    }
    return errors;
  };

  const handleCreate = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      validationErrors.forEach(err => 
        toast({
          title: "Lỗi Nhập Liệu",
          description: err,
          variant: "destructive"
        })
      );
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/discount', currentDiscount);
      fetchDiscounts();
      resetForm();
      setIsDialogOpen(false);
      toast({
        title: "Thành Công",
        description: "Đã thêm mã giảm giá mới",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tạo mã giảm giá",
        variant: "destructive"
      });
    }
  };

  const handleUpdate = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      validationErrors.forEach(err => 
        toast({
          title: "Lỗi Nhập Liệu",
          description: err,
          variant: "destructive"
        })
      );
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/discount/${currentDiscount.discountId}`, currentDiscount);
      fetchDiscounts();
      resetForm();
      setIsDialogOpen(false);
      toast({
        title: "Thành Công",
        description: "Đã cập nhật mã giảm giá",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật mã giảm giá",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa mã giảm giá này?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/discount/${id}`);
        fetchDiscounts();
        toast({
          title: "Thành Công",
          description: "Đã xóa mã giảm giá",
        });
      } catch (error) {
        toast({
          title: "Lỗi",
          description: "Không thể xóa mã giảm giá",
          variant: "destructive"
        });
      }
    }
  };

  const resetForm = () => {
    setCurrentDiscount({
      discountCode: '',
      description: '',
      discountPercentage: 0,
      startDate: '',
      endDate: '',
      status: 'Còn hiệu lực'
    });
    setIsEditing(false);
  };

  const handleEdit = (discount) => {
    setCurrentDiscount({...discount});
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Quản Lý Mã Giảm Giá</CardTitle>
          <div className="mt-4 flex items-center gap-4">
            <Input 
              placeholder="Tìm kiếm theo mã giảm giá" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="flex-4"
            />
            <Select 
              value={selectedStatus} 
              onValueChange={(value) => setSelectedStatus(value)} 
              className="w-5"
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="Còn hiệu lực">Còn hiệu lực</SelectItem>
                <SelectItem value="Hết hiệu lực">Hết hiệu lực</SelectItem>
                <SelectItem value="Chưa có hiệu lực">Chưa có hiệu lực</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}>Thêm Mã Giảm Giá</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{isEditing ? 'Sửa Mã Giảm Giá' : 'Thêm Mã Giảm Giá'}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="discountCode" className="text-right">Mã Giảm Giá</Label>
                  <Input 
                    id="discountCode" 
                    value={currentDiscount.discountCode} 
                    onChange={(e) => setCurrentDiscount({...currentDiscount, discountCode: e.target.value})}
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Mô Tả</Label>
                  <Input 
                    id="description" 
                    value={currentDiscount.description} 
                    onChange={(e) => setCurrentDiscount({...currentDiscount, description: e.target.value})}
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="discountPercentage" className="text-right">% Giảm</Label>
                  <Input 
                    id="discountPercentage" 
                    type="number"
                    value={currentDiscount.discountPercentage} 
                    onChange={(e) => setCurrentDiscount({...currentDiscount, discountPercentage: Number(e.target.value)})}
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startDate" className="text-right">Ngày Bắt Đầu</Label>
                  <Input 
                    id="startDate" 
                    type="datetime-local"
                    value={currentDiscount.startDate} 
                    onChange={(e) => setCurrentDiscount({...currentDiscount, startDate: e.target.value})}
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endDate" className="text-right">Ngày Kết Thúc</Label>
                  <Input 
                    id="endDate" 
                    type="datetime-local"
                    value={currentDiscount.endDate} 
                    onChange={(e) => setCurrentDiscount({...currentDiscount, endDate: e.target.value})}
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">Trạng Thái</Label>
                  <Select 
                    value={currentDiscount.status} 
                    onValueChange={(value) => setCurrentDiscount({...currentDiscount, status: value})}
                    className="col-span-3"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectItem value="Còn hiệu lực">Còn hiệu lực</SelectItem>
                      <SelectItem value="Hết hiệu lực">Hết hiệu lực</SelectItem>
                      <SelectItem value="Chưa có hiệu lực">Chưa có hiệu lực</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  {isEditing ? (
                    <Button onClick={handleUpdate}>Cập Nhật</Button>
                  ) : (
                    <Button onClick={handleCreate}>Thêm</Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Table className="mt-4">
          <TableHeader>
              <TableRow>
                <TableHead>Mã Giảm Giá</TableHead>
                <TableHead>Mô Tả</TableHead>
                <TableHead>% Giảm</TableHead>
                <TableHead>Ngày Bắt Đầu</TableHead>
                <TableHead>Ngày Kết Thúc</TableHead>
                <TableHead>Trạng Thái</TableHead>
                <TableHead>Hành Động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {discounts
                .filter(discount => 
                  discount.discountCode.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  (selectedStatus === "all" || (selectedStatus ? discount.status === selectedStatus : true))
                )
                .map((discount) => (
                  <TableRow key={discount.discountId}>
                    <TableCell>{discount.discountCode}</TableCell>
                    <TableCell>{discount.description}</TableCell>
                    <TableCell>{discount.discountPercentage}%</TableCell>
                    <TableCell>{new Date(discount.startDate).toLocaleString()}</TableCell>
                    <TableCell>{new Date(discount.endDate).toLocaleString()}</TableCell>
                    <TableCell>{discount.status}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEdit(discount)}
                        >
                          Sửa
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => handleDelete(discount.discountId)}
                        >
                          Xóa
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default DiscountManagement;