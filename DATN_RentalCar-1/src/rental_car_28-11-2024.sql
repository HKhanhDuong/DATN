USE [rentalCar_test]
GO
SET IDENTITY_INSERT [dbo].[accounts] ON 
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (1, N'08 hà văn tính', NULL, N'vietantran1230@gmail.com', N'trần viết an', NULL, N'123', N'0932398152', N'admin')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (2, N'08 hà văn tính', CAST(N'2024-10-04T07:00:00.0000000' AS DateTime2), N'vietantran0987123@gmail.com', N'cba', NULL, N'123', N'0932398152', N'anct')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (3, N'123 Street, Hanoi', CAST(N'1990-05-15T00:00:00.0000000' AS DateTime2), N'nguyenvana@example.com', N'Nguyen Van A', NULL, N'hashedpassword1', N'0909123456', N'nguyenvana')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (4, N'456 Avenue, Ho Chi Minh', CAST(N'1985-08-10T00:00:00.0000000' AS DateTime2), N'tranb@example.com', N'Tran Thi B', NULL, N'hashedpassword2', N'0909123457', N'tranb')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (5, N'789 Road, Da Nang', CAST(N'1992-11-22T00:00:00.0000000' AS DateTime2), N'lequocc@example.com', N'Le Quoc C', NULL, N'hashedpassword3', N'0909123458', N'lequocc')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (6, N'abs', CAST(N'2024-10-16T22:32:34.4230000' AS DateTime2), N'12vietantran1230@gmail.com', N'tr?n vi?t an', NULL, N'12345', N'123', N'admin12')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (9, N'abs', CAST(N'2023-10-30T19:00:00.0000000' AS DateTime2), N'12345vietantran1230@gmail.com', N'trần viết an', NULL, N'12345', N'123', N'admin123')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (10, N'456 Maple Street', CAST(N'1995-05-15T07:00:00.0000000' AS DateTime2), N'janedoe@example.com', N'Jane Doe', NULL, N'$2a$10$ABC1234567890abcdef', N'987654321', N'janedoe')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (11, N'456 Maple Street', CAST(N'1995-05-15T07:00:00.0000000' AS DateTime2), N'123janedoe@example.com', N'Jane Doe', NULL, N'$2a$10$ABC1234567890abcdef', N'987654321', N'janedoe123')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (15, N'd19 an thuong34', CAST(N'2003-11-07T00:00:00.0000000' AS DateTime2), N'tieuthientd@gmail.com', N'Tiêu Thiên', NULL, N'3fe093ef07b4427b', N'123456789', N'Xiaotian')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (16, N'Ngũ Hành Sơn, Đà Nẵng ', CAST(N'2024-11-25T00:00:00.0000000' AS DateTime2), N'thienptpd07675@fpt.edu.vn', N'Phan Tiểu Thiên', NULL, N'123', N'012346789', N'Test')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (19, NULL, CAST(N'2024-11-25T11:44:39.5670000' AS DateTime2), N'nguyenvanH@example.com', N'Nguyễn Văn H', NULL, N'123', N'0123456789', N'nvH')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (20, NULL, CAST(N'2024-11-26T10:48:13.1420000' AS DateTime2), N'ADB@gmail.com', N'Phan Tiểu Thiên', NULL, N'123', N'0818971103', N'ădads')
GO
SET IDENTITY_INSERT [dbo].[accounts] OFF
GO
SET IDENTITY_INSERT [dbo].[roles] ON 
GO
INSERT [dbo].[roles] ([role_id], [description], [role_name]) VALUES (1, N'Qu?n tr? h? th?ng', N'admin')
GO
INSERT [dbo].[roles] ([role_id], [description], [role_name]) VALUES (2, N'Khách hàng s? d?ng d?ch v?', N'customer')
GO
INSERT [dbo].[roles] ([role_id], [description], [role_name]) VALUES (3, N'Tài x? lái xe', N'driver')
GO
SET IDENTITY_INSERT [dbo].[roles] OFF
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (1, 1)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (1, 2)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (1, 3)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (2, 2)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (2, 3)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (6, 1)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (9, 1)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (10, 1)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (10, 2)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (11, 1)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (1, 1)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (1, 2)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (1, 3)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (2, 2)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (2, 3)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (6, 1)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (9, 1)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (10, 1)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (10, 2)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (11, 1)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (16, 2)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (19, 2)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (20, 2)
GO
SET IDENTITY_INSERT [dbo].[discounts] ON 
GO
INSERT [dbo].[discounts] ([discount_id], [description], [discount_code], [discount_percentage], [end_date], [start_date], [status]) VALUES (1, N'Gi?m giá 10% cho thuê xe', N'DISCOUNT2023', CAST(10.00 AS Numeric(5, 2)), CAST(N'2023-12-31T00:00:00.0000000' AS DateTime2), CAST(N'2023-01-01T00:00:00.0000000' AS DateTime2), N'Còn hi?u l?c')
GO
INSERT [dbo].[discounts] ([discount_id], [description], [discount_code], [discount_percentage], [end_date], [start_date], [status]) VALUES (2, N'Gi?m giá 20% d?p nam m?i', N'NEWYEAR2024', CAST(20.00 AS Numeric(5, 2)), CAST(N'2024-02-01T00:00:00.0000000' AS DateTime2), CAST(N'2024-01-01T00:00:00.0000000' AS DateTime2), N'Còn hi?u l?c')
GO
INSERT [dbo].[discounts] ([discount_id], [description], [discount_code], [discount_percentage], [end_date], [start_date], [status]) VALUES (3, N'5%', N'test', CAST(5.00 AS Numeric(5, 2)), CAST(N'1111-12-11T18:11:00.0000000' AS DateTime2), CAST(N'1111-11-11T18:11:00.0000000' AS DateTime2), N'Chưa có hiệu lực')
GO
SET IDENTITY_INSERT [dbo].[discounts] OFF
GO
SET IDENTITY_INSERT [dbo].[rentals] ON 
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (2, CAST(N'2023-11-04T15:30:00.0000000' AS DateTime2), 1, NULL, N'hoan tat', CAST(N'2023-10-30T12:00:00.0000000' AS DateTime2), N'12345 Main St, Anytown USA', CAST(N'2023-11-05T12:00:00.0000000' AS DateTime2), CAST(1000.00 AS Numeric(10, 2)), 3, 2)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (3, CAST(N'2023-11-04T15:30:00.0000000' AS DateTime2), 1, NULL, N'hoan tat', CAST(N'2023-10-30T12:00:00.0000000' AS DateTime2), N'12345 Main St, Anytown USA', CAST(N'2023-11-05T12:00:00.0000000' AS DateTime2), CAST(1000.00 AS Numeric(10, 2)), 3, 2)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (4, CAST(N'2023-11-04T15:30:00.0000000' AS DateTime2), 1, NULL, N'chua tra', CAST(N'2023-10-30T12:00:00.0000000' AS DateTime2), N'12345 Main St, Anytown USA', CAST(N'2023-11-05T12:00:00.0000000' AS DateTime2), CAST(1000.00 AS Numeric(10, 2)), 3, 2)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (5, CAST(N'2023-11-04T15:30:00.0000000' AS DateTime2), 1, NULL, N'chua tra', CAST(N'2023-10-30T12:00:00.0000000' AS DateTime2), N'12345 Main St, Anytown USA', CAST(N'2023-11-05T12:00:00.0000000' AS DateTime2), CAST(1000.00 AS Numeric(10, 2)), 3, 2)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (6, CAST(N'2023-11-04T15:30:00.0000000' AS DateTime2), 1, NULL, N'chua tra', CAST(N'2023-10-30T12:00:00.0000000' AS DateTime2), N'12345 Main St, Anytown USA', CAST(N'2023-11-05T12:00:00.0000000' AS DateTime2), CAST(1000.00 AS Numeric(10, 2)), 3, 2)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (7, NULL, 1, N'123abc', N'Chờ xác nhận', CAST(N'2024-11-23T14:00:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-24T14:00:00.0000000' AS DateTime2), CAST(962640.00 AS Numeric(10, 2)), 1, 1)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (8, NULL, 1, N'123abc', N'Chờ xác nhận', CAST(N'2024-11-23T14:00:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-24T14:00:00.0000000' AS DateTime2), CAST(962640.00 AS Numeric(10, 2)), 1, 1)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (9, NULL, 1, N'abc', N'Chờ xác nhận', CAST(N'2024-11-23T14:00:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-24T14:00:00.0000000' AS DateTime2), CAST(855680.00 AS Numeric(10, 2)), 1, 2)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (10, NULL, 1, N'123asd', N'Chờ xác nhận', CAST(N'2024-11-23T14:30:00.0000000' AS DateTime2), N'12312121212121221', CAST(N'2024-11-24T14:30:00.0000000' AS DateTime2), CAST(1016120.00 AS Numeric(10, 2)), 1, 3)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (11, NULL, 1, N'ambcabcjc', N'Chờ xác nhận', CAST(N'2024-11-23T14:30:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-24T14:30:00.0000000' AS DateTime2), CAST(855680.00 AS Numeric(10, 2)), 1, 2)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (12, NULL, 1, N'ambcabcjc', N'Chờ xác nhận', CAST(N'2024-11-23T14:30:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-24T14:30:00.0000000' AS DateTime2), CAST(855680.00 AS Numeric(10, 2)), 1, 2)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (13, NULL, 1, N'abcxux', N'Chờ xác nhận', CAST(N'2024-11-23T14:30:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-24T14:30:00.0000000' AS DateTime2), CAST(855680.00 AS Numeric(10, 2)), 1, 2)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (14, NULL, 1, N'abc', N'Chờ xác nhận', CAST(N'2024-11-23T14:30:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-24T14:30:00.0000000' AS DateTime2), CAST(855680.00 AS Numeric(10, 2)), 1, 2)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (15, NULL, 1, N'anv', N'Chờ xác nhận', CAST(N'2024-11-23T14:30:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-24T14:30:00.0000000' AS DateTime2), CAST(855680.00 AS Numeric(10, 2)), 1, 2)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (16, NULL, 1, N'', N'Chờ xác nhận', CAST(N'2024-11-23T15:00:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-27T15:00:00.0000000' AS DateTime2), CAST(4446000.00 AS Numeric(10, 2)), 1, 3)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (17, NULL, 1, N'', N'Chờ xác nhận', CAST(N'2024-11-24T15:30:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-30T15:30:00.0000000' AS DateTime2), CAST(7239000.00 AS Numeric(10, 2)), 1, 3)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (18, NULL, 1, N'', N'Chờ xác nhận', CAST(N'2024-11-24T15:30:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-30T15:30:00.0000000' AS DateTime2), CAST(7239000.00 AS Numeric(10, 2)), 1, 3)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (19, NULL, 1, N'am mnva', N'Chờ xác nhận', CAST(N'2024-11-23T15:30:00.0000000' AS DateTime2), N'18-11-2024', CAST(N'2024-11-30T15:30:00.0000000' AS DateTime2), CAST(9267440.00 AS Numeric(10, 2)), 1, 3)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (20, NULL, 1, N'abc', N'Chờ xác nhận', CAST(N'2024-11-23T15:30:00.0000000' AS DateTime2), N'd19 an thượng 34', CAST(N'2024-11-24T15:30:00.0000000' AS DateTime2), CAST(969000.00 AS Numeric(10, 2)), 1, 3)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (21, NULL, 1, N'', N'Chờ xác nhận', CAST(N'2024-11-28T03:00:00.0000000' AS DateTime2), N'd19 an thượng 34', CAST(N'2024-11-29T03:00:00.0000000' AS DateTime2), CAST(969000.00 AS Numeric(10, 2)), 16, 3)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [notes], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id]) VALUES (22, NULL, 1, N'', N'Chờ xác nhận', CAST(N'2024-11-29T03:00:00.0000000' AS DateTime2), N'd19 an thượng 34', CAST(N'2024-12-01T03:00:00.0000000' AS DateTime2), CAST(2022480.00 AS Numeric(10, 2)), 16, 1)
GO
SET IDENTITY_INSERT [dbo].[rentals] OFF
GO
SET IDENTITY_INSERT [dbo].[cars] ON 
GO
INSERT [dbo].[cars] ([car_id], [car_type], [color], [condition], [daily_rate], [detail_car], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [percent_discount], [rentals], [seats], [status], [transmission], [vehicle_location], [year]) VALUES (1, NULL, N'Black', N'Good', CAST(500000.00 AS Numeric(10, 2)), N'Sedan, 4-door', 2000, N'Air Conditioner, GPS', CAST(8.5 AS Numeric(4, 1)), N'Petrol', N'Tự Động', N'Suzuki-Jimny.jpg,Suzuki-Swift.jpg', N'30A-12345', N'Toyota', 50000, N'Camry', CAST(0.00 AS Numeric(5, 2)), NULL, 5, N'S?n sàng', N'Automatic', N'Hanoi', 2020)
GO
INSERT [dbo].[cars] ([car_id], [car_type], [color], [condition], [daily_rate], [detail_car], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [percent_discount], [rentals], [seats], [status], [transmission], [vehicle_location], [year]) VALUES (2, NULL, N'White', N'New', CAST(600000.00 AS Numeric(10, 2)), N'Sedan, 4-door', 1800, N'Air Conditioner, GPS', CAST(7.5 AS Numeric(4, 1)), N'Petrol', NULL, N'Suzuki-Swift.jpg', N'50A-98765', N'Honda', 30000, N'Civic', CAST(10.00 AS Numeric(5, 2)), NULL, 5, N'Ðang thuê', N'Automatic', N'Ho Chi Minh', 2021)
GO
INSERT [dbo].[cars] ([car_id], [car_type], [color], [condition], [daily_rate], [detail_car], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [percent_discount], [rentals], [seats], [status], [transmission], [vehicle_location], [year]) VALUES (3, NULL, N'Black', N'Good', CAST(500000.00 AS Numeric(10, 2)), N'Sedan, 4-door', 2000, N'Air Conditioner, GPS', CAST(8.5 AS Numeric(4, 1)), N'Petrol', NULL, N'car_image1.jpg', N'30A-12345', N'Toyota', 50000, N'Camry', CAST(20.00 AS Numeric(5, 2)), NULL, 5, N'S?n sàng', N'Automatic', N'Hanoi', 2020)
GO
SET IDENTITY_INSERT [dbo].[cars] OFF
GO
SET IDENTITY_INSERT [dbo].[motorbikes] ON 
GO
INSERT [dbo].[motorbikes] ([motorbike_id], [color], [condition], [daily_rate], [detail_bike], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [motorbike_type], [percent_discount], [rentals], [status], [vehicle_location], [year]) VALUES (1, N'Blue', N'Good', CAST(100000.00 AS Numeric(10, 2)), N'Sport Bike', 150, N'Helmet, GPS', CAST(2.5 AS Numeric(4, 1)), N'Petrol', NULL, N'ex2010-4.jpg,Ex2015-1.jpg', N'29B1-23456', N'Yamaha', 20000, N'Exciter', NULL, CAST(0.00 AS Numeric(5, 2)), NULL, N'S?n sàng', N'Quận Ngũ Hành Sơn TP Đà Nẵng', 2019)
GO
INSERT [dbo].[motorbikes] ([motorbike_id], [color], [condition], [daily_rate], [detail_bike], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [motorbike_type], [percent_discount], [rentals], [status], [vehicle_location], [year]) VALUES (2, N'Red', N'New', CAST(80000.00 AS Numeric(10, 2)), N'Scooter', 125, N'Helmet, GPS', CAST(2.0 AS Numeric(4, 1)), N'Petrol', NULL, N'future-5.jpg', N'43B2-67890', N'Honda', 10000, N'Air Blade', NULL, CAST(0.00 AS Numeric(5, 2)), NULL, N'B?o trì', N'Da Nang', 2020)
GO
INSERT [dbo].[motorbikes] ([motorbike_id], [color], [condition], [daily_rate], [detail_bike], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [motorbike_type], [percent_discount], [rentals], [status], [vehicle_location], [year]) VALUES (3, N'Blue', N'Good', CAST(100000.00 AS Numeric(10, 2)), N'Sport Bike', 150, N'Helmet, GPS', CAST(2.5 AS Numeric(4, 1)), N'Petrol', NULL, N'bike_image1.jpg', N'29B1-23456', N'Yamaha', 20000, N'Exciter', NULL, CAST(0.00 AS Numeric(5, 2)), NULL, N'S?n sàng', N'Hanoi', 2019)
GO
INSERT [dbo].[motorbikes] ([motorbike_id], [color], [condition], [daily_rate], [detail_bike], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [motorbike_type], [percent_discount], [rentals], [status], [vehicle_location], [year]) VALUES (4, N'Red', N'New', CAST(80000.00 AS Numeric(10, 2)), N'Scooter', 125, N'Helmet, GPS', CAST(2.0 AS Numeric(4, 1)), N'Petrol', NULL, N'bike_image2.jpg', N'43B2-67890', N'Honda', 10000, N'Air Blade', NULL, CAST(0.00 AS Numeric(5, 2)), NULL, N'B?o trì', N'Da Nang', 2020)
GO
SET IDENTITY_INSERT [dbo].[motorbikes] OFF
GO
SET IDENTITY_INSERT [dbo].[car_maintenance] ON 
GO
INSERT [dbo].[car_maintenance] ([maintenance_id], [cost], [description], [maintenance_date], [car_id], [motorbike_id]) VALUES (3, CAST(500000.00 AS Numeric(10, 2)), N'Thay d?u d?ng co và ki?m tra l?p xe', CAST(N'2024-09-20T00:00:00.0000000' AS DateTime2), 1, NULL)
GO
INSERT [dbo].[car_maintenance] ([maintenance_id], [cost], [description], [maintenance_date], [car_id], [motorbike_id]) VALUES (4, CAST(300000.00 AS Numeric(10, 2)), N'B?o du?ng xe d?nh k?', CAST(N'2024-09-22T00:00:00.0000000' AS DateTime2), NULL, 1)
GO
SET IDENTITY_INSERT [dbo].[car_maintenance] OFF
GO
SET IDENTITY_INSERT [dbo].[drivers] ON 
GO
INSERT [dbo].[drivers] ([driver_id], [experience_years], [full_name], [image_url], [license_number], [phone_number], [status]) VALUES (1, 5, N'Pham Van D', N'driver_image1.jpg', N'987654321', N'0909345678', N'S?n sàng')
GO
INSERT [dbo].[drivers] ([driver_id], [experience_years], [full_name], [image_url], [license_number], [phone_number], [status]) VALUES (2, 7, N'Nguyen Thi E', N'driver_image2.jpg', N'876543210', N'0909123765', N'B?n')
GO
SET IDENTITY_INSERT [dbo].[drivers] OFF
GO
SET IDENTITY_INSERT [dbo].[rental_vehicles] ON 
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (3, N'Car', 1, 1, NULL, 3)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (4, N'Motorbike', NULL, NULL, 1, 2)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (5, N'car', 2, NULL, NULL, 7)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (6, N'car', 2, NULL, NULL, 8)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (7, N'car', 2, NULL, NULL, 9)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (8, N'car', 2, NULL, NULL, 10)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (9, N'car', 2, NULL, NULL, 11)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (10, N'car', 2, NULL, NULL, 12)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (11, N'car', 2, NULL, NULL, 13)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (13, N'car', 2, NULL, NULL, 15)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (14, N'car', 1, NULL, NULL, 16)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (15, N'car', 1, NULL, NULL, 17)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (16, N'car', 1, NULL, NULL, 18)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (17, N'car', 2, NULL, NULL, 19)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (18, N'car', 1, NULL, NULL, 20)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (19, N'car', 1, NULL, NULL, 21)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (20, N'car', 2, NULL, NULL, 22)
GO
SET IDENTITY_INSERT [dbo].[rental_vehicles] OFF
GO
SET IDENTITY_INSERT [dbo].[feedbacks] ON 
GO
INSERT [dbo].[feedbacks] ([feedback_id], [comment], [feedback_date], [rating], [rental_id]) VALUES (3, N'abc', CAST(N'2023-11-04' AS Date), 5, 2)
GO
INSERT [dbo].[feedbacks] ([feedback_id], [comment], [feedback_date], [rating], [rental_id]) VALUES (4, N'abc', CAST(N'2023-11-04' AS Date), 5, 3)
GO
SET IDENTITY_INSERT [dbo].[feedbacks] OFF
GO
SET IDENTITY_INSERT [dbo].[payments] ON 
GO
INSERT [dbo].[payments] ([payment_id], [amount], [id_qr_code], [notes], [payment_date], [payment_method], [rental_id]) VALUES (8, CAST(855680.00 AS Numeric(10, 2)), N'RC0002A1TRANVIETAN241123T24', NULL, CAST(N'2024-11-23' AS Date), N'prePayment', 15)
GO
INSERT [dbo].[payments] ([payment_id], [amount], [id_qr_code], [notes], [payment_date], [payment_method], [rental_id]) VALUES (9, CAST(4446000.00 AS Numeric(10, 2)), N'RC0001A1TRANVIETAN241123T96', NULL, CAST(N'2024-11-23' AS Date), N'prePayment', 16)
GO
INSERT [dbo].[payments] ([payment_id], [amount], [id_qr_code], [notes], [payment_date], [payment_method], [rental_id]) VALUES (10, CAST(7239000.00 AS Numeric(10, 2)), N'RC0001A1TRANVIETAN241124T144', NULL, CAST(N'2024-11-23' AS Date), N'prePayment', 17)
GO
INSERT [dbo].[payments] ([payment_id], [amount], [id_qr_code], [notes], [payment_date], [payment_method], [rental_id]) VALUES (11, CAST(7239000.00 AS Numeric(10, 2)), N'RC0001A1TRANVIETAN241124T144', NULL, CAST(N'2024-11-23' AS Date), N'prePayment', 18)
GO
INSERT [dbo].[payments] ([payment_id], [amount], [id_qr_code], [notes], [payment_date], [payment_method], [rental_id]) VALUES (12, CAST(9267440.00 AS Numeric(10, 2)), N'RC0002A1TRANVIETAN241123T168', NULL, CAST(N'2024-11-23' AS Date), N'prePayment', 19)
GO
INSERT [dbo].[payments] ([payment_id], [amount], [id_qr_code], [notes], [payment_date], [payment_method], [rental_id]) VALUES (13, CAST(969000.00 AS Numeric(10, 2)), N'RC0001A1TRANVIETAN241123T24', NULL, CAST(N'2024-11-23' AS Date), N'prePayment', 20)
GO
INSERT [dbo].[payments] ([payment_id], [amount], [id_qr_code], [notes], [payment_date], [payment_method], [rental_id]) VALUES (14, CAST(969000.00 AS Numeric(10, 2)), N'RC0001A16PHANTIEUTHIEN241128T24', NULL, CAST(N'2024-11-28' AS Date), N'postPayment', 21)
GO
INSERT [dbo].[payments] ([payment_id], [amount], [id_qr_code], [notes], [payment_date], [payment_method], [rental_id]) VALUES (15, CAST(2022480.00 AS Numeric(10, 2)), N'RC0002A16PHANTIEUTHIEN241129T48', NULL, CAST(N'2024-11-28' AS Date), N'prePayment', 22)
GO
SET IDENTITY_INSERT [dbo].[payments] OFF
GO
