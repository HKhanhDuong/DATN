import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import axios from 'axios';

const RentalVehiclePage = () => {
  const [rentalVehicles, setRentalVehicles] = useState([]);
  const [carRentalVehicles, setCarRentalVehicles] = useState([]);
  const [motorbikeRentalVehicles, setMotorbikeRentalVehicles] = useState([]);
  const [currentRentalVehicle, setCurrentRentalVehicle] = useState({
    rentalVehicleId: null,
    rental: { rentalId: null },
    car: { carId: null },
    motorbike: null,
    vehicleType: 'car',
    driver: null
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('car');
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('rentalId');
  const [sortOrder, setSortOrder] = useState('desc');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchRentalVehicles();
  }, []);

  const fetchRentalVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/rental-vehicle');
      setRentalVehicles(response.data);
      
      const carVehicles = response.data.filter(rv => rv.vehicleType === 'car');
      const motorbikeVehicles = response.data.filter(rv => rv.vehicleType === 'motorbike');
      
      setCarRentalVehicles(carVehicles);
      setMotorbikeRentalVehicles(motorbikeVehicles);
      
      console.log('Motorbike Vehicles:', motorbikeVehicles);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch rental vehicles",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    setCurrentRentalVehicle(prev => ({
      ...prev,
      [section]: value === '' ? null : {
        ...prev[section],
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare data for submission
      const submissionData = {
        ...currentRentalVehicle,
        driver: currentRentalVehicle.driver?.driverId ? currentRentalVehicle.driver : null,
        vehicleType: activeTab,
        car: activeTab === 'car' ? currentRentalVehicle.car : null,
        motorbike: activeTab === 'motorbike' ? currentRentalVehicle.motorbike : null
      };

      // Validate required fields
      if (activeTab === 'car' && !submissionData.car?.carId) {
        toast({
          title: "Validation Error",
          description: "Car ID is required",
          variant: "destructive"
        });
        return;
      }

      if (activeTab === 'motorbike' && !submissionData.motorbike?.motorbikeId) {
        toast({
          title: "Validation Error",
          description: "Motorbike ID is required",
          variant: "destructive"
        });
        return;
      }

      if (isEditing) {
        await axios.put(`http://localhost:8080/api/rental-vehicle/${submissionData.rentalVehicleId}`, submissionData);
        toast({
          title: "Success",
          description: "Rental vehicle updated successfully"
        });
      } else {
        await axios.post('http://localhost:8080/api/rental-vehicle', submissionData);
        toast({
          title: "Success",
          description: "Rental vehicle created successfully"
        });
      }

      fetchRentalVehicles();
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save rental vehicle",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (vehicle) => {
    setCurrentRentalVehicle({
      ...vehicle,
      rental: vehicle.rental || { rentalId: null },
      car: vehicle.car || { carId: null },
      driver: vehicle.driver || null
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/rental-vehicle/${id}`);
      fetchRentalVehicles();
      toast({
        title: "Success",
        description: "Rental vehicle deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete rental vehicle",
        variant: "destructive"
      });
    }
  };

  const openCreateDialog = () => {
    setCurrentRentalVehicle({
      rentalVehicleId: null,
      rental: { rentalId: null },
      car: { carId: null },
      motorbike: null,
      vehicleType: activeTab,
      driver: null
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const renderVehicleDetails = (vehicle) => {
    if (vehicle.vehicleType === 'car' && vehicle.car) {
      return `(ID: ${vehicle.car.carId}) - ${vehicle.car.make} ${vehicle.car.model} - (${vehicle.car.licensePlate})`;
    } else if (vehicle.vehicleType === 'motorbike' && vehicle.motorbike) {
      return `(ID: ${vehicle.motorbike.motorbikeId}) - ${vehicle.motorbike.make} ${vehicle.motorbike.model} - (${vehicle.motorbike.licensePlate})`;
    }
    return 'N/A';
  };

  const handleRefresh = () => {
    setSearchTerm('');
    fetchRentalVehicles();
  };

  const filteredCarRentalVehicles = carRentalVehicles.filter(vehicle => {
    const matchesStatus = statusFilter === 'all' || vehicle.rental?.renStatus === statusFilter;
    if (matchesStatus) {  
      if (searchType === 'rentalId') {
        return vehicle.rental?.rentalId.toString().includes(searchTerm);
      } else if (searchType === 'vehicleId') {
        return vehicle.car?.carId.toString().includes(searchTerm) || vehicle.motorbike?.motorbikeId.toString().includes(searchTerm);
      } else {
        return renderVehicleDetails(vehicle).toLowerCase().includes(searchTerm.toLowerCase());
      }
    }
    return false;
  });

  const filteredMotorbikeRentalVehicles = motorbikeRentalVehicles.filter(vehicle => {
    const matchesStatus = statusFilter === 'all' || vehicle.rental?.renStatus === statusFilter;
    if (matchesStatus) {
      if (searchType === 'rentalId') {
        return vehicle.rental?.rentalId.toString().includes(searchTerm);
      } else if (searchType === 'vehicleId') {
        return vehicle.car?.carId.toString().includes(searchTerm) || vehicle.motorbike?.motorbikeId.toString().includes(searchTerm);
      } else {
        return renderVehicleDetails(vehicle).toLowerCase().includes(searchTerm.toLowerCase());
      }
    }
    return false;
  });

  const handleSort = (vehicles) => {
    return [...vehicles].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.rentalVehicleId - b.rentalVehicleId;
      } else {
        return b.rentalVehicleId - a.rentalVehicleId;
      }
    });
  };

  return (
    <div className="h-screen overflow-y-auto">
      <Toaster />
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Quản lý xe cho thuê</CardTitle>
          <Button onClick={openCreateDialog}>Thêm xe cho thuê mới</Button>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center mb-4">
            <Button onClick={handleRefresh} className="border rounded p-2 mr-2" variant="outline">Refresh</Button>

            <Input
              placeholder="Tìm kiếm ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mr-2"
            />

            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="border rounded p-2 mr-2"
            >
              <option value="rentalId">Tìm theo ID đơn thuê</option>
              <option value="vehicleId">Tìm theo ID xe</option>
              <option value="vehicleName">Tìm theo tên xe</option>
            </select>
            
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border rounded p-2 ml-2"
            > 
              <option value="desc">Mới nhất</option>
              <option value="asc">Cũ nhất</option>
            </select>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded p-2 ml-2"
            >
              <option value="all">Tất cả</option>
              <option value="Chờ xác nhận">Chờ xác nhận</option>
              <option value="Đang tới">Đang tới</option>
              <option value="Đang thuê">Đang thuê</option>
              <option value="Hoàn tất">Hoàn tất</option>
            </select>
          </div>

          <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="car">Xe ô tô cho thuê</TabsTrigger>
              <TabsTrigger value="motorbike">Xe máy cho thuê</TabsTrigger>
            </TabsList>
            
            <TabsContent value="car">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Chi tiết cho thuê</TableHead>
                    <TableHead>Xe</TableHead>
                    <TableHead>Người lái</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {handleSort(filteredCarRentalVehicles).map((vehicle) => (
                    <TableRow key={vehicle.rentalVehicleId}>
                      <TableCell>{vehicle.rentalVehicleId}</TableCell>
                      <TableCell>
                        Mã cho thuê: {vehicle.rental?.rentalId}<br />
                        Trạng thái: {vehicle.rental?.renStatus}
                      </TableCell>
                      <TableCell>{renderVehicleDetails(vehicle)}</TableCell>
                      <TableCell>
                        {vehicle.driver ? vehicle.driver.fullName : 'Không có tài xế'}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" onClick={() => handleEdit(vehicle)}>Chỉnh sửa</Button>
                        <Button 
                          variant="destructive" 
                          onClick={() => handleDelete(vehicle.rentalVehicleId)}
                          className="ml-2"
                        >
                          Xóa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="motorbike">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Chi tiết cho thuê</TableHead>
                    <TableHead>Xe</TableHead>
                    <TableHead>Người lái</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {handleSort(filteredMotorbikeRentalVehicles).map((vehicle) => (
                    <TableRow key={vehicle.rentalVehicleId}>
                      <TableCell>{vehicle.rentalVehicleId}</TableCell>
                      <TableCell>
                        Mã cho thuê: {vehicle.rental?.rentalId}<br />
                        Trạng thái: {vehicle.rental?.renStatus}
                      </TableCell>
                      <TableCell>{renderVehicleDetails(vehicle)}</TableCell>
                      <TableCell>
                        {vehicle.driver ? vehicle.driver.fullName : 'Không có tài xế'}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" onClick={() => handleEdit(vehicle)}>Chỉnh sửa</Button>
                        <Button 
                          variant="destructive" 
                          onClick={() => handleDelete(vehicle.rentalVehicleId)}
                          className="ml-2"
                        >
                          Xóa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{isEditing ? 'Chỉnh sửa' : 'Tạo mới'} Xe cho thuê</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Mã cho thuê"
                    name="rentalId"
                    value={currentRentalVehicle.rental?.rentalId || ''}
                    onChange={(e) => handleInputChange(e, 'rental')}
                  />

                  {activeTab === 'car' ? (
                    <Input
                      placeholder="ID Xe"
                      name="carId"
                      value={currentRentalVehicle.car?.carId || ''}
                      onChange={(e) => handleInputChange(e, 'car')}
                    />
                  ) : (
                    <Input
                      placeholder="ID Xe máy"
                      name="motorbikeId"
                      value={currentRentalVehicle.motorbike?.motorbikeId || ''}
                      onChange={(e) => setCurrentRentalVehicle(prev => ({
                        ...prev, 
                        motorbike: { motorbikeId: e.target.value || null }
                      }))}
                    />
                  )}

                  <Input
                    placeholder="ID Người lái (tùy chọn)"
                    name="driverId"
                    value={currentRentalVehicle.driver?.driverId || ''}
                    onChange={(e) => handleInputChange(e, 'driver')}
                  />

                  <Button type="submit">
                    {isEditing ? 'Cập nhật' : 'Tạo mới'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog 
              open={!!deleteConfirmation} 
              onOpenChange={() => setDeleteConfirmation(null)}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the rental vehicle.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => {
                      handleDelete(deleteConfirmation);
                      setDeleteConfirmation(null);
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RentalVehiclePage;