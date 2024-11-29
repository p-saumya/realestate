import React from "react";
import { Link } from "react-router-dom";
import { Home, Info, ListAlt, ContactMail, AccountCircle, Lock, LockOpen } from "@material-ui/icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../store/actions/auth";

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
    return (
        <nav className="navbar">
            <div className="navbar-links">
            <Link to="/" className="nav-heading font-weight-bolder text-decoration-none">
             Real Estate
                </Link>
                <Link to="/" className="nav-item">
                    <Home /> Home
                </Link>
                <Link to="/listing" className="nav-item">
                    <ListAlt /> Listing
                </Link>
                <Link to="/about" className="nav-item">
                    <Info /> About
                </Link>
                <Link to="/contact" className="nav-item">
                    <ContactMail /> Contact
                </Link>
            </div>
            <div className="navbar-actions">
                {!loading && isAuthenticated ? (
                    <>
                        <button onClick={logout} className="nav-item logout-button">
                             <Lock /> Logout
                        </button>
                        <Link to="/profile" className="nav-item">
                            <AccountCircle /> Profile
                        </Link>
                    </>
                ) : (
                    <Link to="/login" className="nav-item">
                        <LockOpen /> Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

NavBar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
