import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Toast, ToastProvider, ToastViewport, ToastTitle, ToastDescription } from "@/components/ui/toast";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [currentPayment, setCurrentPayment] = useState({
    rentalId: '',
    paymentDate: '',
    amount: '',
    paymentMethod: '',
    notes: '',
    idQrCode: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('fullName');

  const [sortField, setSortField] = useState('paymentId');
  const [sortOrder, setSortOrder] = useState('asc');

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    filterPayments();
  }, [payments, searchTerm, searchType]);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/payment');
      setPayments(response.data);
      sortPayments(response.data);
    } catch (error) {
      console.error('Lỗi tải danh sách thanh toán:', error);
    }
  };

  const filterPayments = () => {
    if (!searchTerm) {
      setFilteredPayments(payments);
      return;
    }

    const filtered = payments.filter(payment => {
      const searchValue = searchTerm.toLowerCase();
      switch(searchType) {
        case 'fullName':
          return payment.rental.account.fullName.toLowerCase().includes(searchValue);
        case 'rentalId':
          return payment.rental.rentalId && payment.rental.rentalId.toString().toLowerCase().includes(searchValue);
        case 'date':
          return payment.paymentDate.toLowerCase().includes(searchValue);
        case 'qrCode':
          return payment.idQrCode && payment.idQrCode.toString().toLowerCase().includes(searchValue);
        default:
          return true;
      }
    });

    setFilteredPayments(filtered);
  };

  const openCreateDialog = () => {
    setCurrentPayment({
      rentalId: '',
      paymentDate: '',
      amount: '',
      paymentMethod: '',
      notes: '',
      idQrCode: ''
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPayment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentPayment.rentalId || !currentPayment.paymentDate || !currentPayment.amount) {
      setToastMessage('Vui lòng điền đầy đủ thông tin.');
      setShowToast(true);
      return;
    }
    
    const paymentData = {
      rental: {
        rentalId: currentPayment.rentalId,
      },
      paymentDate: currentPayment.paymentDate,
      amount: currentPayment.amount,
      paymentMethod: currentPayment.paymentMethod,
      notes: currentPayment.notes,
      idQrCode: currentPayment.idQrCode,
    };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:8080/api/payment/${currentPayment.paymentId}`, paymentData);
      } else {
        await axios.post('http://localhost:8080/api/payment', paymentData);
      }
      fetchPayments();
      setIsDialogOpen(false);
      setToastMessage(isEditing ? 'Cập nhật thành công!' : 'Tạo mới thành công!');
      setShowToast(true);
    } catch (error) {
      console.error('Lỗi lưu thanh toán:', error);
      setToastMessage('Lỗi lưu thanh toán: ' + error.message);
      setShowToast(true);
    }
  };

  const handleEdit = (payment) => {
    setCurrentPayment(payment);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedPaymentId) return;

    try {
      await axios.delete(`http://localhost:8080/api/payment/${selectedPaymentId}`);
      fetchPayments();
      setToastMessage('Xóa thành công!');
      setShowToast(true);
      setSelectedPaymentId(null);
    } catch (error) {
      console.error('Lỗi xóa thanh toán:', error);
      setToastMessage('Lỗi xóa thanh toán: ' + error.message);
      setShowToast(true);
    }
  };

  const sortPayments = (paymentsToSort) => {
    const sortedPayments = [...paymentsToSort].sort((a, b) => {
      let aValue, bValue;
      
      switch(sortField) {
        case 'rentalId':
          aValue = a.rental.rentalId;
          bValue = b.rental.rentalId;
          break;
        case 'paymentDate':
          aValue = new Date(a.paymentDate);
          bValue = new Date(b.paymentDate);
          break;
        default:
          aValue = a[sortField];
          bValue = b[sortField];
      }

      if (aValue === bValue) return 0;
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });

    setFilteredPayments(sortedPayments);
  };

  const handleSortChange = (field) => {
    const newOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
    sortPayments(filteredPayments);
  };

  return (
    <ToastProvider>
      <div className="h-screen overflow-y-auto">
        <Card className="w-full max-w-6xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Quản Lý Thanh Toán</CardTitle>
              <Button onClick={openCreateDialog}>
                Tạo Thanh Toán Mới
              </Button>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <div className="flex items-center w-full max-w-md border rounded-md">
                <Search className="ml-2 text-gray-500" />
                <Input 
                  placeholder="Tìm kiếm..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-none focus:outline-none"
                />
              </div>
              <Select 
                value={searchType}
                onValueChange={setSearchType}
              >
                <SelectTrigger className="w-max">
                  <SelectValue placeholder="Tìm kiếm theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fullName">Họ Tên </SelectItem>
                  <SelectItem value="rentalId">Mã Thuê</SelectItem>
                  <SelectItem value="date">Ngày</SelectItem>
                  <SelectItem value="qrCode">Mã Thanh Toán QR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSortChange('paymentId')}>
                    ID {sortField === 'paymentId' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </TableHead>
                  <TableHead onClick={() => handleSortChange('rentalId')}>
                    Mã Thuê {sortField === 'rentalId' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </TableHead>
                  <TableHead onClick={() => handleSortChange('paymentDate')}>
                    Ngày Thanh Toán {sortField === 'paymentDate' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </TableHead>
                  <TableHead>Tên Đầy Đủ</TableHead>
                  <TableHead>SĐT</TableHead>
                  <TableHead>Số Tiền</TableHead>
                  <TableHead>Phương Thức</TableHead>
                  <TableHead>Mã Thanh Toán QR</TableHead>
                  <TableHead>Thao Tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.paymentId}>
                    <TableCell>{payment.paymentId}</TableCell>
                    <TableCell>{payment.rental?.rentalId || 'N/A'}</TableCell>
                    <TableCell>{payment.paymentDate}</TableCell>
                    <TableCell>{payment.rental?.account?.fullName || 'N/A'}</TableCell>
                    <TableCell>{payment.rental?.account?.phoneNumber || 'N/A'}</TableCell>
                    <TableCell>{payment.amount.toLocaleString()} VND</TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell>{payment.idQrCode}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(payment)}
                        >
                          Sửa
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" onClick={() => setSelectedPaymentId(payment.paymentId)}>
                              Xóa
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogTitle>Xác Nhận Xóa</AlertDialogTitle>
                            <AlertDialogDescription>
                              Bạn có chắc chắn muốn xóa thông tin thanh toán này?
                            </AlertDialogDescription>
                            <div className="flex justify-end gap-2">
                              <AlertDialogCancel onClick={() => setSelectedPaymentId(null)}>Hủy</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDelete}>Xóa</AlertDialogAction>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Dialog 
              open={isDialogOpen} 
              onOpenChange={() => setIsDialogOpen(false)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {isEditing ? 'Sửa Thanh Toán' : 'Tạo Thanh Toán Mới'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label>Mã Thuê</Label>
                    <Input
                      name="rentalId"
                      value={currentPayment.rentalId}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Ngày Thanh Toán</Label>
                    <Input
                      type="date"
                      name="paymentDate"
                      value={currentPayment.paymentDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Số Tiền</Label>
                    <Input
                      type="number"
                      name="amount"
                      value={currentPayment.amount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Phương Thức Thanh Toán</Label>
                    <Select
                      name="paymentMethod"
                      value={currentPayment.paymentMethod}
                      onValueChange={(value) => 
                        setCurrentPayment(prev => ({
                          ...prev, 
                          paymentMethod: value
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn Phương Thức Thanh Toán" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prePayment">Trả Trước</SelectItem>
                        <SelectItem value="postPayment">Trả Sau</SelectItem>
                        <SelectItem value="cash">Tiền Mặt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Ghi Chú</Label>
                    <Input
                      name="notes"
                      value={currentPayment.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label>Mã QR</Label>
                    <Input
                      name="idQrCode"
                      value={currentPayment.idQrCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <Button type="submit">
                    {isEditing ? 'Cập Nhật' : 'Tạo'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        {showToast && (
          <Toast>
            <ToastTitle>{toastMessage}</ToastTitle>
            <ToastDescription>Thông báo</ToastDescription>
          </Toast>
        )}
        <ToastViewport />
      </div>
    </ToastProvider>
  );
};

export default PaymentManagement;