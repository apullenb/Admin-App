import Dashboard from './Pages/Dashboard';
import AccountList from './SkincareChallenge/SCAccountList/AccountList';
import AccountEdit from './SkincareChallenge/SCAccountList/AccountEdit';
import EntryList from './SkincareChallenge/SCEntryList/EntryList';
import EntryEdit from './SkincareChallenge/EntryEdit';
import EditCOA from './COA/EditCOA';
import AddCOA from './COA/AddCOA';
import ShoppingCountries from './ShoppingConfiguration/countries/countries';
import ShoppingKits from './ShoppingConfiguration/kits/kits';
import ShoppingProducts from './ShoppingConfiguration/product/products';
import ShoppingCategories from './ShoppingConfiguration/Catagories/categories';
import StarPointAccountList from './StartPoint/StarPointAccountList';
import EditStarPoint from './StartPoint/EditStarPoint';
import Events from './Events/EventList';
import Incentive from './Incentive/IncentiveList';
import Permissions from './Permissions/PermissionList';
import COA from './COA/COA';
import COAProductList from './COA/COAProductList';
import COADocument from './COA/COADocuments';
import UserAuthorizationStatusTable from './User/UserAuthorizationStatusTable';
import UserAuthorizationStatusAddEdit from './User/UserAuthorizationStatusAddEdit';
import GlowEntryList from './GlowChallenge/GlowEntryList';
import GCEntryEdit from './GlowChallenge/GCEntryEdit';
import GlowEntry from './GlowChallenge/GlowEntry';
import PermissionNotGranted from './GlobalComponents/PermissionNotGranted';

const AllRoutes = [
    {
      path: '/',
      exact: true,
      component: Dashboard,
    },
    {
      path: '/Shopping/Countries',
      exact: true,
      component: ShoppingCountries,
    },
    {
      path: '/Shopping/Kits',
      exact: true,
      component: ShoppingKits,
    },
    {
      path: '/Shopping/Categories',
      exact: true,
      component: ShoppingCategories,
    },
    {
      path: '/Shopping/Products',
      exact: true,
      component: ShoppingProducts,
    },
    {
      exact: true,
      path: '/Challenge/Accounts',
      component: AccountList,
    },
    {
      exact: true,
      path: '/Challenge/Glow-Submission/:submissionId',
      component: GCEntryEdit,
    },
    {
      exact: true,
      path: '/Challenge/Glow-Entry/:accountid',
      component: GlowEntry,
    },
    {
      exact: true,
      path: '/Challenge/Accounts/:accountid',
      component: AccountEdit,
    },
    {
      exact: true,
      path: '/Challenge/Entries',
      component: EntryList,
    },
    {
      exact: true,
      path: '/Challenge/Glow-Entries',
      component: GlowEntryList,
    },
    {
      exact: true,
      path: '/Challenge/Entry/:entryId',
      component: EntryEdit,
    },
    {
      exact: true,
      path: '/Coa/documents/:productID',
      component: COADocument,
    },
    {
      exact: true,
      path: '/COA/edit/:productID/:coaDocumentID',
      component: EditCOA,
    },
    {
      exact: true,
      path: '/COAs',
      component: COAProductList,
    },
    {
      exact: true,
      path: '/Events',
      component: Events,
    },
    {
      exact: true,
      path: '/Incentive',
      component: Incentive,
    },
    {
      exact: true,
      path: '/Permissions',
      component: Permissions,
    },
    {
      exact: true,
      path: '/COA/:productID',
      component: COA,
    },
    {
      exact: true,
      path: '/Settings/users/add',
      component: UserAuthorizationStatusAddEdit,
    },
    {
      exact: true,
      path: '/Settings/users/edit/:userID',
      component: UserAuthorizationStatusAddEdit,
    },
    {
      exact: true,
      path: '/Settings/users',
      component: UserAuthorizationStatusTable,
    },
    {
      exact: true,
      path: '/StarPoint/',
      component: StarPointAccountList,
    },
    {
      exact: true,
      path: '/StartPoint/Edit/:inventoryId',
      component: EditStarPoint,
    },
    {
      exact: true,
      path: '/NoPermission',
      component: PermissionNotGranted,
    },
  ];
  export default AllRoutes