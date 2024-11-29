import React from "react";
import NavBar from "../Header/NavBar";

const Layout = (props) => {
	return (
		<>
			<div className='container mt-5 mb-2'>
				<NavBar/>
				<hr />
			</div>
			{props.children}
		</>
	);
};

export default Layout;
