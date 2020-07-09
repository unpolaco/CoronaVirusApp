import React from 'react';
import styles from './input_range.module.scss';

export default function InputRange({value, onChange, maxDomainValue}) {
	return (
		<div className={styles.input_range_wrapper}>
			<p className={styles.max_domain_value}>change color scale for better difference display</p>
			<input
				className={styles.input_range}
				type='range'
				max='250000'
				value={value}
				onChange={onChange}
			/>
			<p className={styles.max_domain_value}>max {maxDomainValue} cases</p>
		</div>
	);
}
