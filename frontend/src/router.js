import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "./Authentication/login";
import AdminDashBoarrd from "./Admin/dashboard";
import RolesManagement from "./Admin/roles_management";
import LoansStatement from "./Admin/loans_statement";
import AccountStatement from "./Admin/account_statement";
import StatementTracker from "./Admin/statementTracker";
import ProtectedRoute from "./Authentication/ProtectedRouter";
import ConfigMan from "./Admin/configs";
import EmployeeMan from "./Admin/EmployeeManagement";
import PolicyQuestions from "./Admin/policyQuestions";
import StaffPolicyTest from "./Admin/StaffPolicyTest";

function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="dashboard" element={<ProtectedRoute />}>
        <Route path="employees" element={<EmployeeMan />} />
          <Route path="policyQuestions" element={<PolicyQuestions />} />
          <Route path="staffTest" element={<StaffPolicyTest />} />
          <Route path="roles" element={<RolesManagement />} />
          <Route path="loans" element={<LoansStatement />} />
          <Route path="accounts" element={<AccountStatement />} />
          <Route path="statementRecord" element={<StatementTracker />} />
          <Route path="generalConfigs" element={<ConfigMan />} />
        </Route>
        <Route path="*" element={<p>Ivalid url: 404!</p>} />
      </Routes>
    </Router>
  );

  // return Routes;
}
// const AppWrapper = () => {
//   return (
//     <Router>
//       <MainRouter />
//     </Router>
//   );
// };

export default MainRouter;
