import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';

// Định nghĩa các kiểu dữ liệu cho thông tin API
interface Account {
  accountId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  username: string;
  address: string;
  dateOfBirth: string;
  imageUrl: string | null;
  rental: any[];
  drivingLicense: string | null;
  roles: { roleId: number; roleName: string; description: string }[];
}

interface Discount {
  discountId: number;
  discountCode: string;
  description: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  status: string;
  rental: any[];
}

interface Payment {
  paymentId: number;
  rental: { rentalId: number };
  paymentDate: string;
  amount: number;
  paymentMethod: string;
  notes: string | null;
  idQrCode: string;
}

interface RentalVehicle {
  rentalVehicleId: number;
  rental: { rentalId: number };
  vehicleId: number;
  make: string;
  model: string;
  rentalLocations: string;
  rentalDate: string;
  returnDate: string;
  actualReturnDate: string | null;
  totalCost: number;
  renStatus: string;
  haveDriver: boolean;
  notes: string | null;
  discount: Discount;
}

interface Rental {
  rentalId: number;
  account: Account;
  rentalDate: string;
  returnDate: string;
  actualReturnDate: string | null;
  totalCost: number;
  renStatus: string;
  discount: Discount;
  haveDriver: boolean;
  rentalLocations: string;
  notes: string | null;
  rentalVehicle: RentalVehicle | null;
  payment: Payment | null;
}

const HistoryRental: React.FC = () => {
  const [historyRentals, setHistoryRentals] = useState<Rental[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchType, setSearchType] = useState<'rentalId' | 'vehicleId'>('rentalId');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchHistoryRentals();
  }, []);

  // Lấy dữ liệu từ các API
  const fetchHistoryRentals = async () => {
    try {
      const rentalResponse = await axios.get('http://localhost:8080/api/rental');
      const paymentResponse = await axios.get('http://localhost:8080/api/payment');
      const rentalVehicleResponse = await axios.get('http://localhost:8080/api/rental-vehicle');
      
      const rentalData = rentalResponse.data.content.map((rental: Rental) => {
        const payment = paymentResponse.data.find((p: Payment) => p.rental.rentalId === rental.rentalId);
        const rentalVehicle = rentalVehicleResponse.data.find((rv: RentalVehicle) => rv.rental.rentalId === rental.rentalId);
        
        return {
          ...rental,
          payment,
          rentalVehicle
        };
      });

      setHistoryRentals(rentalData);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tải lịch sử thuê xe",
        variant: "destructive",
      });
    }
  };

  // Logic tìm kiếm
  const filteredRentals = historyRentals.filter((rental) => {
    const matchesStatus = statusFilter === 'all' || rental.renStatus === statusFilter;
    if (matchesStatus) {
      if (searchType === 'rentalId') {
        return rental.rentalId.toString().includes(searchTerm);
      } else if (searchType === 'vehicleId') {
        return rental.rentalVehicle?.vehicleId.toString().includes(searchTerm);
      } else {
        return `${rental.rentalVehicle?.make || ''} ${rental.rentalVehicle?.model || ''}`.toLowerCase().includes(searchTerm.toLowerCase());
      }
    }
    return false;
  });

  // Logic sắp xếp
  const sortedRentals = filteredRentals.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.rentalId - b.rentalId;
    } else {
      return b.rentalId - a.rentalId;
    }
  });

  // Hiển thị thông tin chi tiết xe
  const renderVehicleDetails = (rental: Rental) => {
    if (rental.rentalVehicle) {
      return `${rental.rentalVehicle.vehicleId} - ${rental.rentalVehicle.make} ${rental.rentalVehicle.model}`;
    }
    return 'Không có thông tin';
  };

  // Hiển thị thông tin thanh toán
  const renderPaymentDetails = (payment: Payment | null) => {
    if (payment) {
      return `${payment.paymentMethod} - ${payment.amount} VND - Ngày thanh toán: ${payment.paymentDate}`;
    }
    return 'Chưa thanh toán';
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle>Lịch Sử Thuê Xe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:gap-8 items-start">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-lg w-full sm:w-1/3"
            />
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="p-2 border rounded-lg w-full sm:w-1/3"
            >
              <option value="rentalId">Tìm kiếm theo ID thuê</option>
              <option value="vehicleId">Tìm kiếm theo ID xe</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border rounded-lg w-full sm:w-1/3"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="hoan tat">Hoàn thành</option>
              <option value="Chờ xác nhận">Chờ xác nhận</option>
              <option value="Đã hủy">Đã hủy</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 border rounded-lg w-full sm:w-1/3"
            >
              <option value="asc">Sắp xếp tăng dần</option>
              <option value="desc">Sắp xếp giảm dần</option>
            </select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Thuê</TableHead>
                <TableHead>Ngày Thuê</TableHead>
                <TableHead>Ngày Trả</TableHead>
                <TableHead>Chi Tiết Xe</TableHead>
                <TableHead>Thông Tin Người Thuê</TableHead>
                <TableHead>Thanh Toán</TableHead>
                <TableHead>Trạng Thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedRentals.map((rental) => (
                <TableRow key={rental.rentalId}>
                  <TableCell>{rental.rentalId || 'Không có thông tin'}</TableCell>
                  <TableCell>{rental.rentalDate || 'Không có thông tin'}</TableCell>
                  <TableCell>{rental.returnDate || 'Không có thông tin'}</TableCell>
                  <TableCell>{renderVehicleDetails(rental)}</TableCell>
                  <TableCell>
                    {rental.account.fullName || 'Không có thông tin'}<br />
                    {rental.account.phoneNumber || 'Không có thông tin'}<br />
                    {rental.account.email || 'Không có thông tin'}
                  </TableCell>
                  <TableCell>{renderPaymentDetails(rental.payment)}</TableCell>
                  <TableCell>{rental.renStatus || 'Không có thông tin'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryRental;
