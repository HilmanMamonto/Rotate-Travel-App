import InputCheckBox from 'components/Input/CheckBox/CheckBox';

import TextArea from 'components/Input/TextArea/TextArea';
import TimePicker from 'components/TimePicker/TimePicker';
import Container from 'Layout/Container';
import Grid from 'Layout/Grid';
import React from 'react';
import InputBudget from 'components/Input/Budget/InputBudget';
import { useState } from 'react';
import InputText from 'components/Input/Text/InputText';
import Button from 'components/NewButton/Button';
import Icons from 'components/Icons';
import InputItinerary from 'components/DataDisplay/InputItinerary/InputItinerary';
import { useRef } from 'react';
import { useEffect } from 'react';
import './styles.scss';
import 'animate.css';
import InputNumber from 'components/Input/InputNumber/InputNumber';

const InputDesc = () => {
	const [ value, setValue ] = useState();
	return <TextArea min={20} label="Place Descrition" value={value} onChange={(values) => setValue(values.value)} />;
};

const InputSchedule = () => {
	const getItinerary = JSON.parse(localStorage.getItem('itinerary'));
	const [ storage, setStorage ] = useState(getItinerary);
	const initialTime = storage ? storage[storage.length - 1].time.split(' - ')[1] : '';
	const [ values, setValues ] = useState({ time: initialTime, desc: '', status: '' });
	const [ valid, setValid ] = useState({ time: 'invalid', desc: 'invalid' });

	const handleClick = () => {
		const getItinerary = JSON.parse(localStorage.getItem('itinerary'));
		const result = getItinerary && getItinerary.constructor === Array ? [ ...getItinerary, values ] : [ values ];

		if (validation()) {
			localStorage.setItem('itinerary', JSON.stringify(result));
			setStorage(result);
			setValues({ time: '', desc: '', status: '' });
		}
	};

	const handleChangeTimePicker = (data) => {
		setValues((p) => ({ ...p, time: data.tpStart + ' - ' + data.tpEnd }));
		setValid((p) => ({ ...p, time: data.status }));
	};

	const handleChangeTextArea = (data) => {
		setValues((p) => ({ ...p, desc: data.value }));
		setValid((p) => ({ ...p, desc: data.status }));
	};

	const handleReset = () => {
		localStorage.removeItem('itinerary');
		setStorage(null);
		setValues({ time: '', desc: '', status: '' });
	};

	const validation = () => {
		if (valid.time != 'valid' && valid.desc != 'valid') alert('Input itinerary time and schedule please');
		if (valid.time != 'valid' && valid.desc === 'valid') alert('Input itinerary time please');
		if (valid.time === 'valid' && valid.desc != 'valid') alert('Input schedule please');

		return valid.time === 'valid' && valid.desc === 'valid' ? true : false;
	};

	return (
		<div className="mb-m">
			<div className="mb-s">
				<div className="mb-s">
					<InputItinerary data={storage} onClickReset={handleReset} />
				</div>
				<TimePicker
					timeStart={initialTime}
					size="large"
					value={values.time}
					onChange={handleChangeTimePicker}
					disabled={storage && storage.length > 0}
				/>
			</div>
			<div className="mb-s">
				<TextArea
					placeholder={'Input schedule...'}
					value={values.desc}
					min={50}
					name="shcedule"
					onChange={handleChangeTextArea}
				/>
			</div>
			<Button
				fullWidth
				size="large"
				variant="outline"
				justifyContent="center"
				label="Add Schedule"
				onClick={handleClick}
			/>
		</div>
	);
};

const InputAmenities = () => {
	const [ value, setValue ] = useState();
	const data = [ 'sun screen', 'lunch', 'mineral water' ];
	return <InputCheckBox label="Amenities" data={data} />;
};

const NotInclude = () => {
	const [ value, setValue ] = useState();
	const data = [ 'sun screen', 'lunch', 'mineral water' ];

	return <InputCheckBox label="Not Include" data={data} />;
};

const MaxPax = () => {
	const [ values, setValue ] = useState({ value: '', status: '' });

	return (
		<InputNumber
			max={5}
			label="Max Pax"
			value={values.value}
			onChange={(values) => setValue({ value: values.value, status: values.status })}
		/>
	);
};

const MoreThings = () => {
	const [ values, setValue ] = useState({ value: '', status: '' });

	return (
		<TextArea
			min={20}
			label="More Things Visitors Must To Know"
			value={values.value}
			onChange={(values) => setValue({ value: values.value, status: values.status })}
		/>
	);
};

const Desc = ({ onStatus }) => {
	const initial = { tittle: '', maxPax: '0', budget: '0' };
	const [ values, setValues ] = useState(initial);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<form className="animate__animated animate__fadeIn" onSubmit={handleSubmit}>
			<div className="mb-s">
				<InputText
					label="Tittle"
					minLength={5}
					maxLength={10}
					value={values.tittle}
					onChange={(e) => setValues({ ...values, tittle: e.target.value })}
					required
				/>
			</div>
			<div className="mb-s">
				<Grid colGap={20}>
					<InputBudget
						label="Budget / Pax"
						max={999}
						min={1}
						required
						onChange={(val) => setValues({ ...values, budget: val })}
						value={values.budget}
					/>
					<InputNumber
						max={6}
						min={1}
						label="Max Pax"
						name="max pax"
						required
						value={values.maxPax}
						onChange={(val) => setValues({ ...values, maxPax: val })}
					/>
				</Grid>
			</div>
			<div className="mb-s">
				<Grid colGap={20}>
					<InputAmenities />
					<NotInclude />
				</Grid>
			</div>
			<div className="mb-m">
				<InputDesc />
			</div>
			<InputSchedule />
			<div className="mb-m">
				<MoreThings />
			</div>
			<Button
				fullWidth
				buttonType="submit"
				size="large"
				shadow="medium"
				justifyContent="space-betwen"
				label="Add Desc and Next"
				rightIcon={<Icons size="xlarge" variant="arrow-right-white-rounded" />}
			/>
		</form>
	);
};

export default Desc;
