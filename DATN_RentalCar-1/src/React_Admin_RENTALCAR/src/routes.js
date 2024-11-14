import { any, element } from 'prop-types'
import React from 'react';


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
//Content
const listCar = React.lazy(() => import('./views/content/quanlixehoi/listCar'))
const listMotorbike = React.lazy(() =>  import('./views/content/quanlixemay/listMotorbike'))
const mainTain = React.lazy(() => import('./views/content/maintain/mainTain'))
//staff
const AccountSettings = React.lazy(() => import('./views/staff/account_setting/AccountSettings'))

const Auth = React.lazy(() => import('./views/staff/auth/Auth'))
const listStaff = React.lazy(() => import('./views/staff/liststaff/listStaff'))
//quản lí đơn thuê xe
const RentalHistory = React.lazy(() => import('./views/manageRental/history/RentalHistory'))
const RentalList = React.lazy(() => import('./views/manageRental/LRental/RentalList'))
//Quản lí khách hàng
const listCustomer = React.lazy(() => import ('./views/managecustomer/listcustomer/listCustomer'))
const historyCustomer = React.lazy(() => import('./views/managecustomer/historycustomer/historyCustomer'))
//quản lí tài chính 
const listBill = React.lazy(() => import('./views/managefinancial/listbill/listBill'))
const reportBill = React.lazy(() => import('./views/managefinancial/reportbill/reportBill'))
const Revenue = React.lazy(() => import('./views/managefinancial/revenue/Revenue'))
//quản lí khuyến mãi
const Promotion = React.lazy(() => import('./views/managepromotion/promotion/Promotion'))
const codePromotion = React.lazy(() => import('./views/managepromotion/codepromotion/codePromotion'))
const specialOffer = React.lazy(() => import('./views/managepromotion/specialoffer/specialOffer'))
//Báo cáo và thống kê
const activityReport = React.lazy(() => import('./views/statistical_report/activity_report/activityReport'))
const Analysis = React.lazy(() => import ('./views/statistical_report/analysis/Analysis'))
//Hổ trợ khách hàng
const hotroNguoidung = React.lazy(() => import('./views/hotro/khachhang/hotroNguoidung'))
const tinnhanNguoidung = React.lazy(() => import('./views/hotro/tinnhan/tinnhannguoidung'))
const thongbaoNguoidung = React.lazy(() => import('./views/hotro/thongbao/thongbaonguoidung'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  
  { path: '/dashboard', name: 'Dashboard', element: Dashboard},
  //path Content (đường dẫn, Tên File , Element)
  //content
  { path: '/content/quanlixehoi', name: 'Danh sách xe hơi', element: listCar },
  { path: '/content/quanlixemay', name: 'Danh sách xe máy', element: listMotorbike },
  { path: '/content/maintain', name: 'Bảo trì và sửa chửa', element: mainTain },
  //Staff
  {path: '/staff/account_setting', name: 'Quản lí', element: AccountSettings},
  {path: '/staff/liststaff', name: 'Danh sách nhân sự', element: listStaff},
  {path: '/staff/auth', name: 'Phân Quyền', element: Auth},
  // Quản Lí đơn thuê xe
  {path: '/manageRental/history', name: 'Lịch sử thuê xe', element: RentalHistory},
  {path: '/manageRental/lRental', name: 'Danh sách thuê xe', element: RentalList},
  // Quản lí khách hàng
  {path: '/managecustomer/listcustomer', name: 'Danh sách khách hàng', element: listCustomer},
  {path: '/managecustomer/historycustomer', name: 'Lịch sử khách hàng', element: historyCustomer},
  // Quản lí là tài chính
  {path: '/managefinancial/listbill', name: 'Hoá đơn và thanh toán', element: listBill},
  {path: '/managefinancial/reportbill', name: 'Báo cáo', element: reportBill},
  {path: '/managefinancial/revenue', name: 'Doanh Thu', element: Revenue},
  //quản lí Mã Khuyến mãi
  {path: '/managepromotion/promotion', name: 'chương trình giảm giá và khuyến mãi', element: Promotion},
  {path: '/managepromotion/codepromotion', name: 'Mã Khuyến mãi', element: codePromotion},
  {path: '/managepromotion/specialoffer', name: 'Ưu đãi đặc biệt', element: specialOffer},
  //Báo cáo thống kê
  {path: '/statistical_report/activity_report', name: 'Báo cáo hoạt động', element: activityReport},
  {path: '/statistical_report/analysis', name: 'Phân tích', element: Analysis},
  //hổ trợ khách hàng
  {path: '/hotro/khachhang', name: 'Hổ trợ người dùng', element: hotroNguoidung},
  {path: '/hotro/tinnhan', name: 'Tin nhắn người dùng', element: tinnhanNguoidung},
  {path: '/hotro/thongbao', name: 'Thông báo người dùng', element: thongbaoNguoidung},




  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
