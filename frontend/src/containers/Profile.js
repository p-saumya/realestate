import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Profile = ({ isAuthenticated, email }) => {
    const [userInfo, setUserInfo] = useState({});
    const [bookedHouses, setBookedHouses] = useState([]);

    // Fetch user information
    useEffect(() => {
        const fetchUserInfo = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            };

            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/accounts/${email}/`,
                    config
                );
                setUserInfo(response.data);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        if (isAuthenticated) {
            fetchUserInfo();
        }
    }, [email, isAuthenticated]);

    // Fetch booked houses (orders)
    useEffect(() => {
        const fetchBookedHouses = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            };
    
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/orders/`,
                    config
                );
                console.log("Raw Orders:", response.data.results);
    
                const filteredOrders = response.data.results.filter(
                    (order) => order.buyer.toLowerCase() === email.toLowerCase()
                );
    
                console.log("Filtered Orders for User:", filteredOrders);
    
                setBookedHouses(filteredOrders);
            } catch (error) {
                console.error("Error fetching booked houses:", error);
            }
        };
    
        if (isAuthenticated) {
            fetchBookedHouses();
        }
    }, [email, isAuthenticated]);
    

    return (
        <>
            <Helmet>
                <title>Real Estate - Profile</title>
                <meta name="description" content="User profile page" />
            </Helmet>

            {isAuthenticated ? (
                <div className="container">
                    {/* User Information */}
                    <div className="profile-section">
                        <div className="heading-component">
                            <h1>User Profile</h1>
                        </div>
                        <div className="container px-5 py-5">
                            <div className="row">
                                <div className="col-3">
                                    <h3>ID: </h3>
                                    <h3>Email: </h3>
                                    <h3>Name: </h3>
                                </div>
                                <div className="col-9">
                                    <h3>{userInfo.id}</h3>
                                    <h3>{email}</h3>
                                    <h3>{userInfo.name || "N/A"}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booked Houses Section */}
                    <div className="orders-section">
                        <div className="heading-component mb-4">
                            <h1>Booked Houses</h1>
                        </div>
                        {bookedHouses.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Total Price</th>
                                            <th>Order Date</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookedHouses.map((house, index) => (
                                            <tr key={house.id}>
                                                <td>{index + 1}</td>
                                                <td>{house.title}</td>
                                                <td>${house.total_price}</td>
                                                <td>
                                                    {house.order_date.substring(
                                                        0,
                                                        10
                                                    )}
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/brought/${house.slug}`}
                                                        className="btn btn-primary btn-sm"
                                                    >
                                                        View Details
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <center>
                                <h3>No booked houses yet!</h3>
                            </center>
                        )}
                    </div>
                </div>
            ) : (
                // If not authenticated
                <div className="text-center">
                    <h2>
                        Login to see your profile and booked houses.
                        <br /> <br />
                        <Link to="/login">
                            <button className="btn btn-primary">Login</button>
                        </Link>
                    </h2>
                </div>
            )}
        </>
    );
};

// Map Redux state to props
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    email: state.auth.user,
});

export default connect(mapStateToProps, {})(Profile);
