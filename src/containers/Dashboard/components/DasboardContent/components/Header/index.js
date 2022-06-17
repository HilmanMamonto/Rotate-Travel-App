import Button from 'components/Button';
import React from 'react';
import { useLocation } from 'react-router-dom';
import './styles.scss';
import 'animate.css';

const Header = (props) => {
	const location = useLocation().pathname;
	return (
		<div id="header-dashboard" className="animate__animated animate__fadeInDown">
			<div className="left">
				<label>
					Dashboard <span>{location.split('/dashboard')}</span>
				</label>
				<span>Welcome Back Moh Sidik</span>
			</div>
			<div className="right">
				<Button type="button" className="btn" onClick={props.onClick}>
					<img src="/plus-white.svg" alt="" />
					<span>Add New Travel Package</span>
				</Button>
			</div>
		</div>
	);
};

export default Header;
