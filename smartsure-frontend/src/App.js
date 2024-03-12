import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Wrapper from './components/Wrapper';


// Users
import Users from './pages/users/Users';
import Agents from './pages/agents/Agents';
import Brokers from './pages/brokers/Brokers';
import Brokerages from './pages/brokers/Brokerages';

//Policies
import Policies from './pages/policies/Policies';
import PolicyDetails from './pages/policies/PolicyDetails';

//Premiums
import Premiums from './pages/premiums/Premiums';

//Payments
import Payments from './pages/payments/Payments';

//SchemeGroups
import SchemeGroups from './pages/scheme_groups/SchemeGroups';
import SchemeGroupDetail from './pages/scheme_groups/SchemeGroupDetail';

// Schemes
import Schemes from './pages/schemes/Schemes';
import NewScheme from './pages/schemes/NewScheme';
import EditScheme from './pages/schemes/EditScheme';
import SchemeGroupsList from './pages/schemes/SchemeGroupsList';

//Claims
import Claims from './pages/claims/Claims';

//Pricing Plans
import PricingPlans from './pages/pricing/PricingPlans';
import PricingPlanDetail from './pages/pricing/PricingPlanDetail';
import NewPricingPlan from './pages/pricing/NewPricingPlan';

// Sales Flow
import StartSalesFlow from './pages/sales/StartSalesFlow';
import Plans from './pages/sales/retail/Plans';

// Memberships
import MembershipDetails from './pages/memberships/MembershipDetails';
import MemberPremiums from './pages/memberships/MemberPremiums';

// Family Policy Sales
import FSchemeGroup from './pages/sales/lifeinsurance/family/SchemeGroup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Home />} />

        <Route path='/users' element={<Users />} />
        <Route path='/users/agents' element={<Agents />} />
        <Route path='/users/brokers' element={<Brokers />} />
        <Route path='/users/brokerages' element={<Brokerages />} />

        <Route path='/policies' element={<Policies />} />
        <Route path='/policies/:id' element={<PolicyDetails />} />

        <Route path='/schemes' element={<Schemes />} />
        <Route path='/new-scheme' element={<NewScheme />} />
        <Route path='/schemes/edit/:id' element={<EditScheme />} />
        <Route path='/schemes/scheme-groups/:id' element={<SchemeGroupsList />} />
        
        <Route path='/scheme-groups' element={<SchemeGroups />} />
        <Route path='/scheme-groups/:id' element={<SchemeGroupDetail />} />

        <Route path='/membership-details/:membership/:scheme_group' element={<MembershipDetails />} />
        <Route path='/membership-premiums/:membership/:scheme_group' element={<MemberPremiums />} />

        <Route path='/payments' element={<Payments />} />
        <Route path='/premiums' element={<Premiums />} />
        <Route path='/claims' element={<Claims />} />

        <Route path='/pricing-plans' element={<PricingPlans />} />
        <Route path='/pricing-plans/:id' element={<PricingPlanDetail />} />
        <Route path='/new-pricing-plan' element={<NewPricingPlan />} />

        <Route path='/start-sales-flow' element={<StartSalesFlow />} />
        <Route path='/sales-flow/plans' element={<Plans />} />

        <Route path='/sales-flow/family/sg' element={<FSchemeGroup />} />

      </Routes>
    </Router>
  );
}

export default App;
