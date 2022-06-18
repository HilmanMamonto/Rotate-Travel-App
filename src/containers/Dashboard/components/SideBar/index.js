import Button from 'components/Button';
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './styles.scss';

const packagesItems = [ { name: 'Fushimi Inari Taisha' }, { name: 'Sibuya' }, { name: 'Tokyo' }, { name: 'Kyoto' } ];
const orderedItems = [ { name: 'Fushimi Inari Taisha' }, { name: 'Sibuya' }, { name: 'Tokyo' }, { name: 'Kyoto' } ];
const massagesItems = [ { name: 'Dani Setiawan' }, { name: 'Veronika Mark' }, { name: 'Joe Winata' } ];

const SideBar = () => {
	const [ packagesIsShowed, setPackagesIsShowed ] = useState(true);
	const [ orderedIsShowed, setOrderedIsShowed ] = useState(false);
	const [ messagesIsShowed, setMessagesIsShowed ] = useState(false);
	const [ navActive, setNavActive ] = useState('');
	const { idDashboardItem } = useParams();
	const location = useLocation().pathname;

	return (
		<div id="side-bar">
			<Button textGray type="link" className="btn-home-page" href="/">
				<span>{'<'}</span>
				<span>Home Page</span>
				<span />
			</Button>
			<div className="profile">
				<img src="/andy/andy.jpg" alt="" />
				<div className="tittle">
					<label>Moh Sidik</label>
					<span>Tour Guide</span>
				</div>
			</div>
			<div className="wallet-info">
				<div>
					<label>Total Earn</label>
					<span>$230</span>
				</div>
				<Button
					type="button"
					className="btn-witdraw"
					children={
						<div>
							<span>Witdraw</span>
							<img src="/arrow-right-white.svg" alt="" />
						</div>
					}
				/>
			</div>
			<div className="travel-active">
				<label className="tittle">TRAVEL ACTIVE</label>
				<div className="details">
					<span className="dot" />
					<div className="sub-tittle">
						<label>Fushimi Inari Taisha</label>
						<span>8 Mei 2022</span>
					</div>
				</div>
			</div>
			<div className="packages">
				<label className="tittle">
					<span>PACKAGES</span>
					<Button
						type="button"
						className={packagesIsShowed ? 'active' : ''}
						children={<img src="/arrow-right.svg" alt="" />}
						onClick={() => setPackagesIsShowed(!packagesIsShowed)}
					/>
				</label>
				<div className={packagesIsShowed ? 'items active' : 'items'}>
					{packagesItems.map((item, i) => {
						const cName = item.name.split(' ').join('-').toLowerCase();
						return (
							<Button
								key={'package-' + i}
								textGray
								type="link"
								href={'package/' + cName}
								className={location.match('package') && idDashboardItem === cName ? 'active' : ''}
								children={item.name}
							/>
						);
					})}
				</div>
			</div>
			<div className="ordered">
				<label className="tittle">
					<span>ORDERED</span>
					<Button
						type="button"
						className={orderedIsShowed ? 'active' : ''}
						children={<img src="/arrow-right.svg" alt="" />}
						onClick={() => setOrderedIsShowed(!orderedIsShowed)}
					/>
				</label>
				<div className={orderedIsShowed ? 'items active' : 'items'}>
					{orderedItems.map((item, i) => {
						const cName = item.name.split(' ').join('-').toLowerCase();
						return (
							<Button
								key={'ordered-' + i}
								textGray
								type="link"
								href={'ordered/' + cName}
								className={location.match('ordered') && idDashboardItem === cName ? 'active' : ''}
							>
								<span className="item-tittle">{item.name}</span>
								<span className="date">11 oct</span>
							</Button>
						);
					})}
				</div>
			</div>
			<div className="messages">
				<label className="tittle">
					<span>MESSAGES</span>
					<Button
						type="button"
						className={messagesIsShowed ? 'active' : ''}
						children={<img src="/arrow-right.svg" alt="" />}
						onClick={() => setMessagesIsShowed(!messagesIsShowed)}
					/>
				</label>
				<div className={messagesIsShowed ? 'items active' : 'items'}>
					{massagesItems.map((item, i) => {
						const cName = item.name.split(' ').join('-').toLowerCase();
						return (
							<Button
								key={'massage-' + i}
								textGray
								type="link"
								href={'messages/' + cName}
								className={location.match('messages') && idDashboardItem === cName ? 'active' : ''}
							>
								<div>
									<img src="" alt="" />
									<span>{item.name}</span>
								</div>
								<span className="count">6</span>
							</Button>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default SideBar;