import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import MessagesPage from '../pages/Messages'; // Move this import to the top
import ListStuffAdmin from '../pages/ListStuffAdmin';
import AddListing from '../pages/AddListing';
import EditListing from '../pages/EditListing';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import LoadingSpinner from '../components/LoadingSpinner';
import UserPage from '../pages/UserPage';
import MyListings from '../pages/MyListings';
import ItemsForSale from '../pages/ItemsForSale';
import EditUserPage from '../pages/EditUserPage';
import ContactUs from '../pages/ContactUs';
import TermsOfService from '../pages/TermsOfService';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import MeetTheTeam from '../pages/MeetTheTeam';
import AdminReports from '../pages/AdminReport';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/ItemsForSale" element={<ItemsForSale />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route exact path="/" element={<ProtectedRoute><ItemsForSale /></ProtectedRoute>} />
          <Route exact path="/profile" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
          <Route exact path="/editprofile" element={<ProtectedRoute><EditUserPage /></ProtectedRoute>} />
          <Route exact path="/contactus" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
          <Route exact path="/tos" element={<ProtectedRoute><TermsOfService /></ProtectedRoute>} />
          <Route exact path="/pp" element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
          <Route exact path="/meettheteam" element={<ProtectedRoute><MeetTheTeam /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><ItemsForSale /></ProtectedRoute>} />
          <Route path="/sell" element={<ProtectedRoute><AddListing /></ProtectedRoute>} />
          <Route path="/mylistings" element={<ProtectedRoute><MyListings /></ProtectedRoute>} />
          <Route path="/edit/:_id" element={<ProtectedRoute><EditListing /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminProtectedRoute ready={ready}><ListStuffAdmin /></AdminProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin-reports" element={<AdminProtectedRoute ready={ready}><AdminReports /></AdminProtectedRoute>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
