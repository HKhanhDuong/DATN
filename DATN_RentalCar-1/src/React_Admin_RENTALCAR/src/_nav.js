import React from 'react'
import CIcon from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faDollarSign, faGift, faUser, faChartBar, faComment, faColonSign, faLock, faKey } from '@fortawesome/free-solid-svg-icons';

import { faCar, faList } from '@fortawesome/free-solid-svg-icons';
import {
  cilSpeedometer,
  
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Bảng Điều Khiển',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Quản Lí Xe Hơi',
    to: '/content',
    icon: <FontAwesomeIcon icon={faCar} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh Sách Xe Oto',
        to: '/content/quanlixehoi',
      },
      {
        component: CNavItem,
        name: 'Danh Sách Xe Máy',
        to: '/content/quanlixemay',
      },
      {
        component: CNavItem,
        name: 'Bảo Dưỡng và Sửa Chữa',
        to: '/content/maintain',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản Lí Đơn Thuê Xe',
    to: '/buttons',
    icon: <FontAwesomeIcon icon={faList} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh Sách',
        to: '/manageRental/lRental',
      },
      {
        component: CNavItem,
        name: 'Lịch Sử Thuê Xe',
        to: '/manageRental/history',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản Lí Khách Hàng',
    to: '/managecustomer',
    //Thiếu To
    icon: <FontAwesomeIcon icon={faUsers} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh Sách Khách Hàng',
        to: '/managecustomer/listcustomer',
      },
      {
        component: CNavItem,
        name: 'Lịch Sử Khách Hàng',
        to: '/managecustomer/historycustomer',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản Lí Tài Chính',
    to: '/managefinancial',
    icon: <FontAwesomeIcon icon={faDollarSign} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Hoá Đơn và Thanh Toán',
        to: '/managefinancial/listbill',
      },
      {
        component: CNavItem,
        name: 'Danh Thu',
        to: '/managefinancial/revenue',
      },
      {
        component: CNavItem,
        name: 'Báo Cáo',
        to: '/managefinancial/reportbill',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản Lí Khuyến Mãi',
    to: '/managepromotion',
    icon: <FontAwesomeIcon icon={faGift} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Chương Trình Mã Khuyến Mãi',
        to: '/managepromotion/promotion',
      },
      {
        component: CNavItem,
        name: 'Mã Giảm Giá',
        to: '/managepromotion/codepromotion',
      },
      {
        component: CNavItem,
        name: 'Ưu Đãi Đặc Biệt',
        to: '/managepromotion/specialoffer',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản Lí Nhân Sự',
    icon: <FontAwesomeIcon icon={faUser} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh Sách Nhân Sự',
        to: '/staff/account_setting',
      },
      {
        component: CNavItem,
        name: 'Phân Quyền',
        to: '/staff/auth',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Báo Cáo Thống Kê',
    to: '/statistical_report',
    icon: <FontAwesomeIcon icon={faChartBar} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Báo Cáo Hoạt Động',
        to: '/statistical_report/activity_report',
      },
      {
        component: CNavItem,
        name: 'Phân Tích',
        to: '/statistical_report/analysis',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Phản Hồi và Hổ Trợ',
    icon: <FontAwesomeIcon icon={faComment} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Khách Hàng',
        to: '/hotro/khachhang',
      },
      {
        component: CNavItem,
        name: 'Tin Nhắn',
        to: '/hotro/tinnhan',
      },
      {
        component: CNavItem,
        name: 'Thông Báo',
        to: '/hotro/thongbao',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Auth',
  },
  {
    component: CNavGroup,
    name: 'Login',
    icon: <FontAwesomeIcon icon={faLock} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Đăng Nhập',
        to: '/login',
        // icon: <FontAwesomeIcon icon={faLock} className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Đăng Ký',
        to: '/register',
        // icon: <FontAwesomeIcon icon={faKey} className="nav-icon" />,
      },
    ],
  },
]

export default _nav
