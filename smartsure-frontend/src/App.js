import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Wrapper from './components/Wrapper';
import User from './pages/users/User';

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

//Claims
import Claims from './pages/claims/Claims';

//Pricing Plans
import PricingPlans from './pages/pricing/PricingPlans';
import PricingPlanDetail from './pages/pricing/PricingPlanDetail';
import NewPricingPlan from './pages/pricing/NewPricingPlan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/users' element={<User />} />

        <Route path='/policies' element={<Policies />} />
        <Route path='/policies/:id' element={<PolicyDetails />} />

        <Route path='/schemes' element={<Schemes />} />
        <Route path='/new-scheme' element={<NewScheme />} />
        <Route path='/schemes/edit/:id' element={<EditScheme />} />
        
        <Route path='/scheme-groups' element={<SchemeGroups />} />
        <Route path='/scheme-groups/:id' element={<SchemeGroupDetail />} />

        <Route path='/payments' element={<Payments />} />
        <Route path='/premiums' element={<Premiums />} />
        <Route path='/claims' element={<Claims />} />

        <Route path='/pricing-plans' element={<PricingPlans />} />
        <Route path='/pricing-plans/:id' element={<PricingPlanDetail />} />
        <Route path='/new-pricing-plan' element={<NewPricingPlan />} />

      </Routes>
    </Router>
  );
}

export default App;
