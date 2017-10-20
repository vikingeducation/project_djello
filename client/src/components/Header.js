import React from "react";
import RaisedButton from "material-ui/RaisedButton";

const Header = ({ showLogout, logout }) => {
	return (
		<div className="header title-grid">
			<div>
				<h1>Djello</h1>
			</div>
			<div className="logout">
				{showLogout ? <RaisedButton label="Log Out" onClick={logout} /> : null}
			</div>
		</div>
	);
};

export default Header;
