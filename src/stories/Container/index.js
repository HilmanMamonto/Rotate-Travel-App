import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Container = ({ children, ...props }) => {
	const arrClass = [ props.className ];
	if (props.flex) arrClass.push('flex');
	if (props.direction === 'column') arrClass.push('column');
	if (props.top === 'xsmall') arrClass.push('mt-xs');
	if (props.top === 'small') arrClass.push('mt-s');
	if (props.top === 'medium') arrClass.push('mt-m');
	if (props.top === 'large') arrClass.push('mt-l');
	if (props.top === 'xlarge') arrClass.push('mt-xl');
	if (props.top === 'auto') arrClass.push('mt-auto');
	if (props.bottom === 'xsmall') arrClass.push('mb-xs');
	if (props.bottom === 'small') arrClass.push('mb-s');
	if (props.bottom === 'medium') arrClass.push('mb-m');
	if (props.bottom === 'large') arrClass.push('mb-l');
	if (props.bottom === 'xlarge') arrClass.push('mb-xl');
	if (props.bottom === 'auto') arrClass.push('mb-auto');
	if (props.left === 'xsmall') arrClass.push('ml-xs');
	if (props.left === 'small') arrClass.push('ml-s');
	if (props.left === 'medium') arrClass.push('ml-m');
	if (props.left === 'large') arrClass.push('ml-l');
	if (props.left === 'xlarge') arrClass.push('ml-xl');
	if (props.left === 'auto') arrClass.push('ml-auto');
	if (props.right === 'xsmall') arrClass.push('mr-xs');
	if (props.right === 'small') arrClass.push('mr-s');
	if (props.right === 'medium') arrClass.push('mr-m');
	if (props.right === 'large') arrClass.push('mr-l');
	if (props.right === 'xlarge') arrClass.push('mr-xl');
	if (props.right === 'auto') arrClass.push('mr-auto');
	if (props.mxAuto) arrClass.push('mx-auto');
	if (props.myAuto) arrClass.push('my-auto');
	if (props.absolute) arrClass.push('position-absolute');
	if (props.variant === 'transparent') arrClass.push('bg-transparent');
	if (props.justifyContent === 'center') arrClass.push('jc-center');
	if (props.justifyContent === 'space-betwen') arrClass.push('jc-space-betwen');
	if (props.justifyContent === 'flex-start') arrClass.push('jc-flex-start');
	if (props.justifyContent === 'flex-end') arrClass.push('jc-flex-end');
	if (props.alignItems === 'center') arrClass.push('ai-center');
	if (props.alignItems === 'space-betwen') arrClass.push('ai-space-betwen');
	if (props.alignItems === 'flex-start') arrClass.push('ai-flex-start');
	if (props.alignItems === 'flex-end') arrClass.push('ai-flex-end');
	if (props.height === '100vh') arrClass.push('height-100vh');
	if (props.width === '100vw') arrClass.push('width-100vw');
	if (props.variant === 'black-transparent') arrClass.push('black-transparent');
	if (props.overFlow === 'y-scroll') arrClass.push('y-scroll');
	if (props.overFlow === 'x-scroll') arrClass.push('x-scroll');

	const className = 'container' + arrClass.join(' ');

	const styles = {
		maxWidth: props.maxWidth,
		padding: props.padding,
		zIndex: props.z,
		width: props.fullWidth ? '100%' : null,
		borderRadius: props.borderRadius
	};

	const Result = () => {
		if (props.as === 'div') {
			return (
				<div className={className} style={styles}>
					{children}
				</div>
			);
		}
		if (props.as === 'span') {
			return (
				<span className={className} style={styles}>
					{children}
				</span>
			);
		}
	};

	return <Result />;
};

const Item = ({ children }) => {
	return <div>{children}</div>;
};

Container.defaultProps = {
	flex: false,
	direction: 'row',
	variant: 'white',
	as: 'div'
};

Container.propTypes = {
	top: PropTypes.string,
	bottom: PropTypes.string,
	left: PropTypes.string,
	right: PropTypes.string,
	as: PropTypes.string,
	justifyContent: PropTypes.string,
	alignItems: PropTypes.string,
	fullWidth: PropTypes.bool,
	variant: PropTypes.string,
	height: PropTypes.string,
	width: PropTypes.string,
	overFlow: PropTypes.string,
	borderRadius: PropTypes.number
};

Container.Item = Item;

export default Container;
