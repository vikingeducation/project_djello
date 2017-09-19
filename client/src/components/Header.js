import React from "react";

const Header = ({ showLogout, logout }) => {
	return (
		<div className="header">
			<h1>Djello</h1>
			{showLogout ? <button onClick={logout}>Log Out</button> : null}
		</div>
	);
};

export default Header;
