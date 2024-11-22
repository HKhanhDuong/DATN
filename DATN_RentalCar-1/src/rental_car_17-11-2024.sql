create database rentalCar_test

USE [Rentalcar_test]
GO
SET IDENTITY_INSERT [dbo].[accounts] ON 
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (1, N'08 hà văn tính', CAST(N'2024-10-31T07:00:00.0000000' AS DateTime2), N'vietantran1230@gmail.com', N'trần viết an', N'/accountsImg/1b28f142-6249-480d-bf29-b5eb15549d1e_436945734f63ea3db372.jpg', N'123', N'0932398152', N'admin')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (2, N'08 hà văn tính123', CAST(N'2024-11-20T07:00:00.0000000' AS DateTime2), N'vietantran0987123@gmail.com', N'cba123', N'/accountsImg/e4740937-b2df-4bfc-8622-fcff380bd15f_Screenshot%202024-09-26%20214649.png', N'123', N'0932398152', N'anct')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (3, N'123 Street, Hanoi', CAST(N'1990-05-15T07:00:00.0000000' AS DateTime2), N'nguyenvana@example.com', N'Nguyen Van A', N'/accountsImg/d563e36c-640f-4464-8295-17f8d871a45f_61NKaFRAyRL._AC_SL1500_.jpg', N'hashedpassword1', N'0909123456', N'nguyenvana')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (4, N'456 Avenue, Ho Chi Minh', CAST(N'1985-08-10T00:00:00.0000000' AS DateTime2), N'tranb@example.com', N'Tran Thi B', NULL, N'hashedpassword2', N'0909123457', N'tranb')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (5, N'789 Road, Da Nang', CAST(N'1992-11-22T00:00:00.0000000' AS DateTime2), N'lequocc@example.com', N'Le Quoc C', NULL, N'hashedpassword3', N'0909123458', N'lequocc')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (9, N'abs', CAST(N'2023-10-30T19:00:00.0000000' AS DateTime2), N'12345vietantran1230@gmail.com', N'trần viết an', NULL, N'12345', N'123', N'admin123')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (11, N'456 Maple Street', CAST(N'1995-05-15T07:00:00.0000000' AS DateTime2), N'123janedoe@example.com', N'Jane Doe', NULL, N'$2a$10$ABC1234567890abcdef', N'987654321', N'janedoe123')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (12, N'', NULL, N'vietantran3210@gmail.com', N'anct', NULL, N'123', N'0123456789', N'anct00123')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (13, NULL, NULL, N'abc@gmail.com', N'abc', NULL, N'123', N'101010101010', N'abcHandsome')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (19, N'08 hà văn tính', CAST(N'2024-11-16T07:00:00.0000000' AS DateTime2), N'123vietantran1230@gmail.com', N'trần viết an321', NULL, N'123', N'0932398152', N'admin312')
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
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (3, 2)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (9, 1)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (11, 1)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (2, 2)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (2, 3)
GO
SET IDENTITY_INSERT [dbo].[driving_licenses] ON 
GO
INSERT [dbo].[driving_licenses] ([license_id], [date_of_birth], [image_url], [license_number], [license_status], [accountid]) VALUES (3, CAST(N'1990-05-15T00:00:00.0000000' AS DateTime2), N'image1.jpg', N'123456789', N'Ðã xác thực', 1)
GO
INSERT [dbo].[driving_licenses] ([license_id], [date_of_birth], [image_url], [license_number], [license_status], [accountid]) VALUES (4, CAST(N'1985-08-10T00:00:00.0000000' AS DateTime2), N'image2.jpg', N'987654321', N'Chua xác th?c', 2)
GO
SET IDENTITY_INSERT [dbo].[driving_licenses] OFF
GO
SET IDENTITY_INSERT [dbo].[discounts] ON 
GO
INSERT [dbo].[discounts] ([discount_id], [description], [discount_code], [discount_percentage], [end_date], [start_date], [status]) VALUES (1, N'Gi?m giá 10% cho thuê xe', N'DISCOUNT2023', CAST(10.00 AS Numeric(5, 2)), CAST(N'2023-12-31T00:00:00.0000000' AS DateTime2), CAST(N'2023-01-01T00:00:00.0000000' AS DateTime2), N'Còn hi?u l?c')
GO
INSERT [dbo].[discounts] ([discount_id], [description], [discount_code], [discount_percentage], [end_date], [start_date], [status]) VALUES (2, N'Gi?m giá 20% d?p nam m?i', N'NEWYEAR2024', CAST(20.00 AS Numeric(5, 2)), CAST(N'2024-02-01T00:00:00.0000000' AS DateTime2), CAST(N'2024-01-01T00:00:00.0000000' AS DateTime2), N'Còn hi?u l?c')
GO
SET IDENTITY_INSERT [dbo].[discounts] OFF
GO
SET IDENTITY_INSERT [dbo].[rentals] ON 
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (1, CAST(N'2023-11-04T15:30:00.0000000' AS DateTime2), 1, N'Returned', CAST(N'2023-10-30T12:00:00.0000000' AS DateTime2), N'123 Main St, Anytown USA', CAST(N'2023-11-05T12:00:00.0000000' AS DateTime2), CAST(500.00 AS Numeric(10, 2)), 3, 1, NULL)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (2, CAST(N'2023-11-04T15:30:00.0000000' AS DateTime2), 1, N'Returned', CAST(N'2023-10-30T12:00:00.0000000' AS DateTime2), N'123 Main St, Anytown USA', CAST(N'2023-11-05T12:00:00.0000000' AS DateTime2), CAST(500.00 AS Numeric(10, 2)), 3, 1, NULL)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (3, CAST(N'2023-11-04T15:30:00.0000000' AS DateTime2), 1, N'chua tra', CAST(N'2023-10-30T12:00:00.0000000' AS DateTime2), N'12345 Main St, Anytown USA', CAST(N'2023-11-05T12:00:00.0000000' AS DateTime2), CAST(1000.00 AS Numeric(10, 2)), 3, 2, NULL)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (4, CAST(N'2023-11-04T15:30:00.0000000' AS DateTime2), 1, N'chua tra123', CAST(N'2023-10-30T12:00:00.0000000' AS DateTime2), N'12345 Main St, Anytown USA12345', CAST(N'2023-11-05T12:00:00.0000000' AS DateTime2), CAST(1000.00 AS Numeric(10, 2)), 3, 2, N'chua tra123123456')
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (27, NULL, 1, N'PENDING', CAST(N'2024-11-11T23:00:00.0000000' AS DateTime2), N'âsasasasasas', CAST(N'2024-11-14T23:00:00.0000000' AS DateTime2), CAST(2826240.00 AS Numeric(10, 2)), 1, 1, N'')
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (28, NULL, 1, N'PENDING', CAST(N'2024-11-12T03:30:00.0000000' AS DateTime2), N'12312121212121221', CAST(N'2024-11-13T03:30:00.0000000' AS DateTime2), CAST(855680.00 AS Numeric(10, 2)), 1, 1, N'00000')
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (29, NULL, 1, N'PENDING', CAST(N'2024-11-12T03:30:00.0000000' AS DateTime2), N'12312121212121221', CAST(N'2024-11-13T03:30:00.0000000' AS DateTime2), CAST(962640.00 AS Numeric(10, 2)), 1, 1, N'321')
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (30, NULL, 1, N'PENDING', CAST(N'2024-11-12T03:30:00.0000000' AS DateTime2), N'12312121212121221', CAST(N'2024-11-13T03:30:00.0000000' AS DateTime2), CAST(855680.00 AS Numeric(10, 2)), 1, 1, N'dahahavv')
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (31, NULL, 1, N'PENDING', CAST(N'2024-11-12T03:30:00.0000000' AS DateTime2), N'12312121212121221', CAST(N'2024-11-13T03:30:00.0000000' AS DateTime2), CAST(855680.00 AS Numeric(10, 2)), 1, 1, N'dsaasd')
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (32, NULL, 1, N'PENDING', CAST(N'2024-11-12T03:30:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-15T03:30:00.0000000' AS DateTime2), CAST(3024000.00 AS Numeric(10, 2)), 1, 1, N'')
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (33, NULL, 1, N'PENDING', CAST(N'2024-11-12T04:00:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-30T04:00:00.0000000' AS DateTime2), CAST(26928000.00 AS Numeric(10, 2)), 1, 1, N'hello')
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (34, NULL, 1, N'PENDING', CAST(N'2024-11-12T04:00:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-13T04:00:00.0000000' AS DateTime2), CAST(855680.00 AS Numeric(10, 2)), 1, 1, N'')
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (35, NULL, 1, N'PENDING', CAST(N'2024-11-13T08:30:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-14T08:30:00.0000000' AS DateTime2), CAST(855680.00 AS Numeric(10, 2)), 1, 1, N'123')
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (36, NULL, 1, N'PENDING', CAST(N'2024-11-16T15:00:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-17T15:00:00.0000000' AS DateTime2), CAST(855680.00 AS Numeric(10, 2)), 1, 1, N'1234')
GO
SET IDENTITY_INSERT [dbo].[rentals] OFF
GO
SET IDENTITY_INSERT [dbo].[cars] ON 
GO
INSERT [dbo].[cars] ([car_id], [color], [condition], [daily_rate], [detail_car], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [percent_discount], [rentals], [seats], [status], [transmission], [vehicle_location], [year], [car_type]) VALUES (1, N'Black', N'Good', CAST(500000.00 AS Numeric(10, 2)), N'Sedan, 4-door', 2000, N'Air Conditioner, GPS', CAST(8.5 AS Numeric(4, 1)), N'Petrol', N'Tự Động', N'Suzuki-Jimny.jpg,Suzuki-Swift.jpg', N'30A-12345', N'Toyota', 50000, N'Camry', CAST(0.00 AS Numeric(5, 2)), NULL, 5, N'S?n sàng', N'Automatic', N'Hanoi', 2020, NULL)
GO
INSERT [dbo].[cars] ([car_id], [color], [condition], [daily_rate], [detail_car], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [percent_discount], [rentals], [seats], [status], [transmission], [vehicle_location], [year], [car_type]) VALUES (2, N'White', N'New', CAST(600000.00 AS Numeric(10, 2)), N'Sedan, 4-door', 1800, N'Air Conditioner, GPS', CAST(7.5 AS Numeric(4, 1)), N'Petrol', NULL, N'Suzuki-Swift.jpg', N'50A-98765', N'Honda', 30000, N'Civic', CAST(10.00 AS Numeric(5, 2)), NULL, 5, N'Ðang thuê', N'Automatic', N'Ho Chi Minh', 2021, NULL)
GO
INSERT [dbo].[cars] ([car_id], [color], [condition], [daily_rate], [detail_car], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [percent_discount], [rentals], [seats], [status], [transmission], [vehicle_location], [year], [car_type]) VALUES (3, N'Black', N'Good', CAST(500000.00 AS Numeric(10, 2)), N'Sedan, 4-door', 2000, N'Air Conditioner, GPS', CAST(8.5 AS Numeric(4, 1)), N'Petrol', NULL, N'car_image1.jpg', N'30A-12345', N'Toyota', 50000, N'Camry', CAST(20.00 AS Numeric(5, 2)), NULL, 5, N'S?n sàng', N'Automatic', N'Hanoi', 2020, NULL)
GO
SET IDENTITY_INSERT [dbo].[cars] OFF
GO
SET IDENTITY_INSERT [dbo].[motorbikes] ON 
GO
INSERT [dbo].[motorbikes] ([motorbike_id], [color], [condition], [daily_rate], [detail_bike], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [percent_discount], [rentals], [status], [vehicle_location], [year], [motorbike_type]) VALUES (1, N'Blue', N'Good', CAST(100000.00 AS Numeric(10, 2)), N'Sport Bike', 150, N'Helmet, GPS', CAST(2.5 AS Numeric(4, 1)), N'Petrol', NULL, N'ex2010-4.jpg,Ex2015-1.jpg', N'29B1-23456', N'Yamaha', 20000, N'Exciter', NULL, NULL, N'S?n sàng', N'Hanoi', 2019, NULL)
GO
INSERT [dbo].[motorbikes] ([motorbike_id], [color], [condition], [daily_rate], [detail_bike], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [percent_discount], [rentals], [status], [vehicle_location], [year], [motorbike_type]) VALUES (2, N'Red', N'New', CAST(80000.00 AS Numeric(10, 2)), N'Scooter', 125, N'Helmet, GPS', CAST(2.0 AS Numeric(4, 1)), N'Petrol', NULL, N'future-5.jpg', N'43B2-67890', N'Honda', 10000, N'Air Blade', NULL, NULL, N'B?o trì', N'Da Nang', 2020, NULL)
GO
INSERT [dbo].[motorbikes] ([motorbike_id], [color], [condition], [daily_rate], [detail_bike], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [percent_discount], [rentals], [status], [vehicle_location], [year], [motorbike_type]) VALUES (3, N'Blue', N'Good', CAST(100000.00 AS Numeric(10, 2)), N'Sport Bike', 150, N'Helmet, GPS', CAST(2.5 AS Numeric(4, 1)), N'Petrol', NULL, N'bike_image1.jpg', N'29B1-23456', N'Yamaha', 20000, N'Exciter', NULL, NULL, N'S?n sàng', N'Hanoi', 2019, NULL)
GO
INSERT [dbo].[motorbikes] ([motorbike_id], [color], [condition], [daily_rate], [detail_bike], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [percent_discount], [rentals], [status], [vehicle_location], [year], [motorbike_type]) VALUES (4, N'Red', N'New', CAST(80000.00 AS Numeric(10, 2)), N'Scooter', 125, N'Helmet, GPS', CAST(2.0 AS Numeric(4, 1)), N'Petrol', NULL, N'bike_image2.jpg', N'43B2-67890', N'Honda', 10000, N'Air Blade', NULL, NULL, N'B?o trì', N'Da Nang', 2020, NULL)
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
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (2, N'car', 1, 1, NULL, 1)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (3, N'motorbike', NULL, 1, 1, 1)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (4, N'car', 1, 1, NULL, 2)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (7, N'car', 1, 1, NULL, 2)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (8, N'car', 2, NULL, NULL, 27)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (9, N'car', 2, NULL, NULL, 28)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (10, N'car', 2, NULL, NULL, 29)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (11, N'car', 2, NULL, NULL, 30)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (12, N'car', 2, NULL, NULL, 31)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (13, N'car', 1, NULL, NULL, 32)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (14, N'car', 1, NULL, NULL, 33)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (15, N'car', 2, NULL, NULL, 34)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (16, N'car', 2, NULL, NULL, 35)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (17, N'car', 2, NULL, NULL, 36)
GO
SET IDENTITY_INSERT [dbo].[rental_vehicles] OFF
GO
SET IDENTITY_INSERT [dbo].[payments] ON 
GO
INSERT [dbo].[payments] ([payment_id], [amount], [payment_date], [payment_method], [rental_id]) VALUES (1, CAST(3024000.00 AS Numeric(10, 2)), CAST(N'2024-11-12' AS Date), N'prePayment', 32)
GO
INSERT [dbo].[payments] ([payment_id], [amount], [payment_date], [payment_method], [rental_id]) VALUES (3, CAST(700.00 AS Numeric(10, 2)), CAST(N'2024-11-12' AS Date), N'perPayment', 1)
GO
INSERT [dbo].[payments] ([payment_id], [amount], [payment_date], [payment_method], [rental_id]) VALUES (4, CAST(26928000.00 AS Numeric(10, 2)), CAST(N'2024-11-12' AS Date), N'prePayment', 33)
GO
INSERT [dbo].[payments] ([payment_id], [amount], [payment_date], [payment_method], [rental_id]) VALUES (5, CAST(855680.00 AS Numeric(10, 2)), CAST(N'2024-11-12' AS Date), N'prePayment', 34)
GO
INSERT [dbo].[payments] ([payment_id], [amount], [payment_date], [payment_method], [rental_id]) VALUES (6, CAST(855680.00 AS Numeric(10, 2)), CAST(N'2024-11-13' AS Date), N'prePayment', 35)
GO
INSERT [dbo].[payments] ([payment_id], [amount], [payment_date], [payment_method], [rental_id]) VALUES (7, CAST(855680.00 AS Numeric(10, 2)), CAST(N'2024-11-16' AS Date), N'prePayment', 36)
GO
SET IDENTITY_INSERT [dbo].[payments] OFF
GO


USE [Rentalcar_test]
GO
SET IDENTITY_INSERT [dbo].[accounts] ON 
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (1, N'08 hà văn tính', CAST(N'2024-10-31T07:00:00.0000000' AS DateTime2), N'vietantran1230@gmail.com', N'trần viết an', N'/accountsImg/1b28f142-6249-480d-bf29-b5eb15549d1e_436945734f63ea3db372.jpg', N'123', N'0932398152', N'admin')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (2, N'08 hà văn tính123', CAST(N'2024-11-20T07:00:00.0000000' AS DateTime2), N'vietantran0987123@gmail.com', N'cba123', N'/accountsImg/e4740937-b2df-4bfc-8622-fcff380bd15f_Screenshot%202024-09-26%20214649.png', N'123', N'0932398152', N'anct')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (3, N'123 Street, Hanoi', CAST(N'1990-05-15T07:00:00.0000000' AS DateTime2), N'nguyenvana@example.com', N'Nguyen Van A', N'/accountsImg/d563e36c-640f-4464-8295-17f8d871a45f_61NKaFRAyRL._AC_SL1500_.jpg', N'hashedpassword1', N'0909123456', N'nguyenvana')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (4, N'456 Avenue, Ho Chi Minh', CAST(N'1985-08-10T00:00:00.0000000' AS DateTime2), N'tranb@example.com', N'Tran Thi B', NULL, N'hashedpassword2', N'0909123457', N'tranb')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (5, N'789 Road, Da Nang', CAST(N'1992-11-22T00:00:00.0000000' AS DateTime2), N'lequocc@example.com', N'Le Quoc C', NULL, N'hashedpassword3', N'0909123458', N'lequocc')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (9, N'abs', CAST(N'2023-10-30T19:00:00.0000000' AS DateTime2), N'12345vietantran1230@gmail.com', N'trần viết an', NULL, N'12345', N'123', N'admin123')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (11, N'456 Maple Street', CAST(N'1995-05-15T07:00:00.0000000' AS DateTime2), N'123janedoe@example.com', N'Jane Doe', NULL, N'$2a$10$ABC1234567890abcdef', N'987654321', N'janedoe123')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (12, N'', NULL, N'vietantran3210@gmail.com', N'anct', NULL, N'123', N'0123456789', N'anct00123')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (13, NULL, NULL, N'abc@gmail.com', N'abc', NULL, N'123', N'101010101010', N'abcHandsome')
GO
INSERT [dbo].[accounts] ([account_id], [address], [date_of_birth], [email], [full_name], [image_url], [password_hash], [phone_number], [username]) VALUES (19, N'08 hà văn tính', CAST(N'2024-11-16T07:00:00.0000000' AS DateTime2), N'123vietantran1230@gmail.com', N'trần viết an321', NULL, N'123', N'0932398152', N'admin312')
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
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (3, 2)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (9, 1)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (11, 1)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (2, 2)
GO
INSERT [dbo].[account_roles] ([account_id], [role_id]) VALUES (2, 3)
GO
SET IDENTITY_INSERT [dbo].[driving_licenses] ON 
GO
INSERT [dbo].[driving_licenses] ([license_id], [date_of_birth], [image_url], [license_number], [license_status], [accountid]) VALUES (3, CAST(N'1990-05-15T00:00:00.0000000' AS DateTime2), N'image1.jpg', N'123456789', N'Ðã xác thực', 1)
GO
INSERT [dbo].[driving_licenses] ([license_id], [date_of_birth], [image_url], [license_number], [license_status], [accountid]) VALUES (4, CAST(N'1985-08-10T00:00:00.0000000' AS DateTime2), N'image2.jpg', N'987654321', N'Chua xác th?c', 2)
GO
SET IDENTITY_INSERT [dbo].[driving_licenses] OFF
GO
SET IDENTITY_INSERT [dbo].[discounts] ON 
GO
INSERT [dbo].[discounts] ([discount_id], [description], [discount_code], [discount_percentage], [end_date], [start_date], [status]) VALUES (1, N'Gi?m giá 10% cho thuê xe', N'DISCOUNT2023', CAST(10.00 AS Numeric(5, 2)), CAST(N'2023-12-31T00:00:00.0000000' AS DateTime2), CAST(N'2023-01-01T00:00:00.0000000' AS DateTime2), N'Còn hi?u l?c')
GO
INSERT [dbo].[discounts] ([discount_id], [description], [discount_code], [discount_percentage], [end_date], [start_date], [status]) VALUES (2, N'Gi?m giá 20% d?p nam m?i', N'NEWYEAR2024', CAST(20.00 AS Numeric(5, 2)), CAST(N'2024-02-01T00:00:00.0000000' AS DateTime2), CAST(N'2024-01-01T00:00:00.0000000' AS DateTime2), N'Còn hi?u l?c')
GO
SET IDENTITY_INSERT [dbo].[discounts] OFF
GO
SET IDENTITY_INSERT [dbo].[rentals] ON 
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (1, CAST(N'2023-11-04T15:30:00.0000000' AS DateTime2), 1, N'Returned', CAST(N'2023-10-30T12:00:00.0000000' AS DateTime2), N'123 Main St, Anytown USA', CAST(N'2023-11-05T12:00:00.0000000' AS DateTime2), CAST(500.00 AS Numeric(10, 2)), 3, 1, NULL)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (2, CAST(N'2023-11-04T15:30:00.0000000' AS DateTime2), 1, N'Returned', CAST(N'2023-10-30T12:00:00.0000000' AS DateTime2), N'123 Main St, Anytown USA', CAST(N'2023-11-05T12:00:00.0000000' AS DateTime2), CAST(500.00 AS Numeric(10, 2)), 3, 1, NULL)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (3, CAST(N'2023-11-04T15:30:00.0000000' AS DateTime2), 1, N'chua tra', CAST(N'2023-10-30T12:00:00.0000000' AS DateTime2), N'12345 Main St, Anytown USA', CAST(N'2023-11-05T12:00:00.0000000' AS DateTime2), CAST(1000.00 AS Numeric(10, 2)), 3, 2, NULL)
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (4, CAST(N'2023-11-04T15:30:00.0000000' AS DateTime2), 1, N'chua tra123', CAST(N'2023-10-30T12:00:00.0000000' AS DateTime2), N'12345 Main St, Anytown USA12345', CAST(N'2023-11-05T12:00:00.0000000' AS DateTime2), CAST(1000.00 AS Numeric(10, 2)), 3, 2, N'chua tra123123456')
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (27, NULL, 1, N'PENDING', CAST(N'2024-11-11T23:00:00.0000000' AS DateTime2), N'âsasasasasas', CAST(N'2024-11-14T23:00:00.0000000' AS DateTime2), CAST(2826240.00 AS Numeric(10, 2)), 1, 1, N'')
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (28, NULL, 1, N'PENDING', CAST(N'2024-11-12T03:30:00.0000000' AS DateTime2), N'12312121212121221', CAST(N'2024-11-13T03:30:00.0000000' AS DateTime2), CAST(855680.00 AS Numeric(10, 2)), 1, 1, N'00000')
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (29, NULL, 1, N'PENDING', CAST(N'2024-11-12T03:30:00.0000000' AS DateTime2), N'12312121212121221', CAST(N'2024-11-13T03:30:00.0000000' AS DateTime2), CAST(962640.00 AS Numeric(10, 2)), 1, 1, N'321')
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (30, NULL, 1, N'PENDING', CAST(N'2024-11-12T03:30:00.0000000' AS DateTime2), N'12312121212121221', CAST(N'2024-11-13T03:30:00.0000000' AS DateTime2), CAST(855680.00 AS Numeric(10, 2)), 1, 1, N'dahahavv')
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (31, NULL, 1, N'PENDING', CAST(N'2024-11-12T03:30:00.0000000' AS DateTime2), N'12312121212121221', CAST(N'2024-11-13T03:30:00.0000000' AS DateTime2), CAST(855680.00 AS Numeric(10, 2)), 1, 1, N'dsaasd')
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (32, NULL, 1, N'PENDING', CAST(N'2024-11-12T03:30:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-15T03:30:00.0000000' AS DateTime2), CAST(3024000.00 AS Numeric(10, 2)), 1, 1, N'')
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (33, NULL, 1, N'PENDING', CAST(N'2024-11-12T04:00:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-30T04:00:00.0000000' AS DateTime2), CAST(26928000.00 AS Numeric(10, 2)), 1, 1, N'hello')
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (34, NULL, 1, N'PENDING', CAST(N'2024-11-12T04:00:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-13T04:00:00.0000000' AS DateTime2), CAST(855680.00 AS Numeric(10, 2)), 1, 1, N'')
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (35, NULL, 1, N'PENDING', CAST(N'2024-11-13T08:30:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-14T08:30:00.0000000' AS DateTime2), CAST(855680.00 AS Numeric(10, 2)), 1, 1, N'123')
GO
INSERT [dbo].[rentals] ([rental_id], [actual_return_date], [have_driver], [ren_status], [rental_date], [rental_locations], [return_date], [total_cost], [account_id], [discount_id], [notes]) VALUES (36, NULL, 1, N'PENDING', CAST(N'2024-11-16T15:00:00.0000000' AS DateTime2), N'08 hà văn tính, hòa khánh nam, liên chiểu, TP đà nẵng', CAST(N'2024-11-17T15:00:00.0000000' AS DateTime2), CAST(855680.00 AS Numeric(10, 2)), 1, 1, N'1234')
GO
SET IDENTITY_INSERT [dbo].[rentals] OFF
GO
SET IDENTITY_INSERT [dbo].[cars] ON 
GO
INSERT [dbo].[cars] ([car_id], [color], [condition], [daily_rate], [detail_car], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [percent_discount], [rentals], [seats], [status], [transmission], [vehicle_location], [year], [car_type]) VALUES (1, N'Black', N'Good', CAST(500000.00 AS Numeric(10, 2)), N'Sedan, 4-door', 2000, N'Air Conditioner, GPS', CAST(8.5 AS Numeric(4, 1)), N'Petrol', N'Tự Động', N'Suzuki-Jimny.jpg,Suzuki-Swift.jpg', N'30A-12345', N'Toyota', 50000, N'Camry', CAST(0.00 AS Numeric(5, 2)), NULL, 5, N'S?n sàng', N'Automatic', N'Hanoi', 2020, NULL)
GO
INSERT [dbo].[cars] ([car_id], [color], [condition], [daily_rate], [detail_car], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [percent_discount], [rentals], [seats], [status], [transmission], [vehicle_location], [year], [car_type]) VALUES (2, N'White', N'New', CAST(600000.00 AS Numeric(10, 2)), N'Sedan, 4-door', 1800, N'Air Conditioner, GPS', CAST(7.5 AS Numeric(4, 1)), N'Petrol', NULL, N'Suzuki-Swift.jpg', N'50A-98765', N'Honda', 30000, N'Civic', CAST(10.00 AS Numeric(5, 2)), NULL, 5, N'Ðang thuê', N'Automatic', N'Ho Chi Minh', 2021, NULL)
GO
INSERT [dbo].[cars] ([car_id], [color], [condition], [daily_rate], [detail_car], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [percent_discount], [rentals], [seats], [status], [transmission], [vehicle_location], [year], [car_type]) VALUES (3, N'Black', N'Good', CAST(500000.00 AS Numeric(10, 2)), N'Sedan, 4-door', 2000, N'Air Conditioner, GPS', CAST(8.5 AS Numeric(4, 1)), N'Petrol', NULL, N'car_image1.jpg', N'30A-12345', N'Toyota', 50000, N'Camry', CAST(20.00 AS Numeric(5, 2)), NULL, 5, N'S?n sàng', N'Automatic', N'Hanoi', 2020, NULL)
GO
SET IDENTITY_INSERT [dbo].[cars] OFF
GO
SET IDENTITY_INSERT [dbo].[motorbikes] ON 
GO
INSERT [dbo].[motorbikes] ([motorbike_id], [color], [condition], [daily_rate], [detail_bike], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [percent_discount], [rentals], [status], [vehicle_location], [year], [motorbike_type]) VALUES (1, N'Blue', N'Good', CAST(100000.00 AS Numeric(10, 2)), N'Sport Bike', 150, N'Helmet, GPS', CAST(2.5 AS Numeric(4, 1)), N'Petrol', NULL, N'ex2010-4.jpg,Ex2015-1.jpg', N'29B1-23456', N'Yamaha', 20000, N'Exciter', NULL, NULL, N'S?n sàng', N'Hanoi', 2019, NULL)
GO
INSERT [dbo].[motorbikes] ([motorbike_id], [color], [condition], [daily_rate], [detail_bike], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [percent_discount], [rentals], [status], [vehicle_location], [year], [motorbike_type]) VALUES (2, N'Red', N'New', CAST(80000.00 AS Numeric(10, 2)), N'Scooter', 125, N'Helmet, GPS', CAST(2.0 AS Numeric(4, 1)), N'Petrol', NULL, N'future-5.jpg', N'43B2-67890', N'Honda', 10000, N'Air Blade', NULL, NULL, N'B?o trì', N'Da Nang', 2020, NULL)
GO
INSERT [dbo].[motorbikes] ([motorbike_id], [color], [condition], [daily_rate], [detail_bike], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [percent_discount], [rentals], [status], [vehicle_location], [year], [motorbike_type]) VALUES (3, N'Blue', N'Good', CAST(100000.00 AS Numeric(10, 2)), N'Sport Bike', 150, N'Helmet, GPS', CAST(2.5 AS Numeric(4, 1)), N'Petrol', NULL, N'bike_image1.jpg', N'29B1-23456', N'Yamaha', 20000, N'Exciter', NULL, NULL, N'S?n sàng', N'Hanoi', 2019, NULL)
GO
INSERT [dbo].[motorbikes] ([motorbike_id], [color], [condition], [daily_rate], [detail_bike], [engine_capacity], [facilities], [fuel_consumption], [fuel_type], [gear_box], [image_url], [license_plate], [make], [mileage], [model], [percent_discount], [rentals], [status], [vehicle_location], [year], [motorbike_type]) VALUES (4, N'Red', N'New', CAST(80000.00 AS Numeric(10, 2)), N'Scooter', 125, N'Helmet, GPS', CAST(2.0 AS Numeric(4, 1)), N'Petrol', NULL, N'bike_image2.jpg', N'43B2-67890', N'Honda', 10000, N'Air Blade', NULL, NULL, N'B?o trì', N'Da Nang', 2020, NULL)
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
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (2, N'car', 1, 1, NULL, 1)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (3, N'motorbike', NULL, 1, 1, 1)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (4, N'car', 1, 1, NULL, 2)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (7, N'car', 1, 1, NULL, 2)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (8, N'car', 2, NULL, NULL, 27)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (9, N'car', 2, NULL, NULL, 28)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (10, N'car', 2, NULL, NULL, 29)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (11, N'car', 2, NULL, NULL, 30)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (12, N'car', 2, NULL, NULL, 31)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (13, N'car', 1, NULL, NULL, 32)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (14, N'car', 1, NULL, NULL, 33)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (15, N'car', 2, NULL, NULL, 34)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (16, N'car', 2, NULL, NULL, 35)
GO
INSERT [dbo].[rental_vehicles] ([rental_vehicle_id], [vehicle_type], [car_id], [driver_id], [motorbike_id], [rental_id]) VALUES (17, N'car', 2, NULL, NULL, 36)
GO
SET IDENTITY_INSERT [dbo].[rental_vehicles] OFF
GO
SET IDENTITY_INSERT [dbo].[payments] ON 
GO
INSERT [dbo].[payments] ([payment_id], [amount], [payment_date], [payment_method], [rental_id]) VALUES (1, CAST(3024000.00 AS Numeric(10, 2)), CAST(N'2024-11-12' AS Date), N'prePayment', 32)
GO
INSERT [dbo].[payments] ([payment_id], [amount], [payment_date], [payment_method], [rental_id]) VALUES (3, CAST(700.00 AS Numeric(10, 2)), CAST(N'2024-11-12' AS Date), N'perPayment', 1)
GO
INSERT [dbo].[payments] ([payment_id], [amount], [payment_date], [payment_method], [rental_id]) VALUES (4, CAST(26928000.00 AS Numeric(10, 2)), CAST(N'2024-11-12' AS Date), N'prePayment', 33)
GO
INSERT [dbo].[payments] ([payment_id], [amount], [payment_date], [payment_method], [rental_id]) VALUES (5, CAST(855680.00 AS Numeric(10, 2)), CAST(N'2024-11-12' AS Date), N'prePayment', 34)
GO
INSERT [dbo].[payments] ([payment_id], [amount], [payment_date], [payment_method], [rental_id]) VALUES (6, CAST(855680.00 AS Numeric(10, 2)), CAST(N'2024-11-13' AS Date), N'prePayment', 35)
GO
INSERT [dbo].[payments] ([payment_id], [amount], [payment_date], [payment_method], [rental_id]) VALUES (7, CAST(855680.00 AS Numeric(10, 2)), CAST(N'2024-11-16' AS Date), N'prePayment', 36)
GO
SET IDENTITY_INSERT [dbo].[payments] OFF
GO
SET IDENTITY_INSERT [dbo].[feedbacks] ON 
GO
INSERT [dbo].[feedbacks] ([feedback_id], [comment], [feedback_date], [rating], [rental_id]) VALUES (3, N'abc', CAST(N'2023-11-04' AS Date), 5, 2)
GO
INSERT [dbo].[feedbacks] ([feedback_id], [comment], [feedback_date], [rating], [rental_id]) VALUES (4, N'abc', CAST(N'2023-11-04' AS Date), 5, 3)
GO
SET IDENTITY_INSERT [dbo].[feedbacks] OFF
GO
