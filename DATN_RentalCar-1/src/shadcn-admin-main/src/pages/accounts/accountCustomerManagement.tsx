import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CalendarIcon, 
  Pencil, 
  Trash, 
  ChevronLeft, 
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const accountCustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { toast } = useToast();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/account');
      console.log(response.data);
      const customerAccounts = response.data.content.filter(account => 
        account.roles.some(role => role.roleName === 'customer')
      );
      setCustomers(customerAccounts);
      setTotalPages(Math.ceil(customerAccounts.length / itemsPerPage));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch customers data",
        variant: "destructive",
      });
    }
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return customers.slice(startIndex, endIndex);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(customers.length / itemsPerPage));
  }, [customers, itemsPerPage]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload image
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'account');

      try {
        const response = await axios.post('http://localhost:8080/api/uploadImg', formData);
        setSelectedCustomer(prev => ({
          ...prev,
          imageUrl: response.data.imageUrl
        }));
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upload image",
          variant: "destructive",
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedCustomer.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!selectedCustomer.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(selectedCustomer.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!selectedCustomer.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(selectedCustomer.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number (10 digits required)';
    }

    if (!selectedCustomer.address?.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!selectedCustomer.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const age = moment().diff(moment(selectedCustomer.dateOfBirth), 'years');
      if (age < 18) {
        newErrors.dateOfBirth = 'Customer must be at least 18 years old';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (customer) => {
    setSelectedCustomer({
      ...customer,
      dateOfBirth: moment(customer.dateOfBirth).toDate()
    });
    setImagePreview(customer.imageUrl ? `http://localhost:8080/assets/images/account/${customer.imageUrl}` : null);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/account/${selectedCustomer.accountId}`, {
        ...selectedCustomer,
        dateOfBirth: moment(selectedCustomer.dateOfBirth).format('YYYY-MM-DD')
      });
      toast({
        title: "Success",
        description: "Customer updated successfully",
      });
      setIsEditDialogOpen(false);
      fetchCustomers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update customer",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/account/${customerToDelete.accountId}`);
      toast({
        title: "Success",
        description: "Customer deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      fetchCustomers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete customer",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleDateSelect = (date) => {
    setSelectedCustomer(prev => ({
      ...prev,
      dateOfBirth: date
    }));
    if (errors.dateOfBirth) {
      setErrors(prev => ({
        ...prev,
        dateOfBirth: undefined
      }));
    }
    setIsCalendarOpen(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Customer Management</h1>
      
      <div className="flex justify-between items-center mb-4">
        <Select 
          value={itemsPerPage.toString()} 
          onValueChange={(value) => {
            setItemsPerPage(Number(value));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select rows" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 rows</SelectItem>
            <SelectItem value="10">10 rows</SelectItem>
            <SelectItem value="20">20 rows</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getCurrentPageData().map((customer) => (
            <TableRow key={customer.accountId}>
              <TableCell>
                <Avatar>
                  <AvatarImage 
                    src={customer.imageUrl ? 
                      `http://localhost:8080/assets/images/account/${customer.imageUrl}` : 
                      undefined
                    } 
                    alt={customer.fullName} 
                  />
                  <AvatarFallback>{customer.fullName?.charAt(0)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{customer.fullName}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phoneNumber}</TableCell>
              <TableCell>{customer.address}</TableCell>
              <TableCell>
                {moment(customer.dateOfBirth).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(customer)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteClick(customer)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage 
                    src={imagePreview} 
                    alt={selectedCustomer?.fullName} 
                  />
                  <AvatarFallback>{selectedCustomer?.fullName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="avatar-upload"
                  onChange={handleImageChange}
                />
                <Label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer"
                >
                  <Pencil className="h-4 w-4" />
                </Label>
              </div>
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                value={selectedCustomer?.fullName || ''}
                onChange={handleInputChange}
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={selectedCustomer?.email || ''}
                onChange={handleInputChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={selectedCustomer?.phoneNumber || ''}
                onChange={handleInputChange}
                className={errors.phoneNumber ? "border-red-500" : ""}
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-500">{errors.phoneNumber}</p>
              )}
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                type="text"
                id="address"
                name="address"
                value={selectedCustomer?.address || ''}
                onChange={handleInputChange}
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address}</p>
              )}
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                type="text"
                id="dateOfBirth"
                name="dateOfBirth"
                value={selectedCustomer?.dateOfBirth ? moment(selectedCustomer.dateOfBirth).format('YYYY-MM-DD') : ''}
                onChange={handleInputChange}
                className={errors.dateOfBirth ? "border-red-500" : ""}
                readOnly
              />
              {errors.dateOfBirth && (
                <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
              )}
              <Button type="button" onClick={() => setIsCalendarOpen(true)}>
                Select Date
              </Button>
            </div>
            {isCalendarOpen && (
              <Calendar
                selected={selectedCustomer?.dateOfBirth}
                onChange={handleDateSelect}
                onClose={() => setIsCalendarOpen(false)}
              />
            )}
            <div className="flex justify-end">
              <Button type="submit">Update Customer</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the customer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default accountCustomerManagement;

