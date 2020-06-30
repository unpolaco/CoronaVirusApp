import React, { useState, useContext } from 'react';
import { ResponsiveChoropleth as ResponsiveMap } from '@nivo/geo';
import countries from '../assets/world_countries.json';
import InputRange from './InputRange';
import styles from './Map.module.scss';
import colors from '../assets/colors'
import { useHistory } from 'react-router-dom';
import { CountryContext } from '../context/country_context';
import InputRadioCasesMap from './Input_Radio_Cases_Map'

const mapHeight = '500';
const mapWidth = '850';

function Map({ data }) {
	const history = useHistory();
	const countryContext = useContext(CountryContext);
	const [selectedCaseType, setCaseType] = useState('confirmed');
	const [maxDomainValue, setMaxDomainValue] = useState(250000);

	const mapData = data.countries.map((d) => {
		return { value: d.mostRecent[selectedCaseType], id: d.name };
	});
	const handleDomainValueChange = (e) => {
		setMaxDomainValue(e.target.value);
	};
	const onMapClick = (country) => {
		countryContext.setInputCountry(country);
		history.push('/countryPage');
	}
	function onChangeCaseType(selectedCaseType) {
		setCaseType(selectedCaseType);
		setMaxDomainValue(selectedCaseType === 'deaths' ? 100000 : 250000);
	}

	return (
		<section className={styles.section_map} id='map'>

				<InputRadioCasesMap 
					onChangeCaseType={onChangeCaseType}
				/>
				<InputRange 
					value={maxDomainValue} 
					onChange={handleDomainValueChange}
					maxDomainValue={maxDomainValue} />
			<p className={styles.section_title_small}>{`${selectedCaseType} cases`}</p>
			<div className={styles.map_wrapper}>
				<ResponsiveMap
					data={mapData}
					features={countries.features}
					margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
					colors={colors[selectedCaseType]}
					domain={[0, maxDomainValue]}
					unknownColor='#e9e9e9'
					valueFormat=',.0f'
					projectionType='naturalEarth1'
					projectionTranslation={[0.5, 0.5]}
					projectionRotation={[0, 0, 0]}
					projectionScale={200}
					graticuleLineColor='#dddddd'
					borderWidth={0.2}
					borderColor='#455A64'
					onClick={(data) => onMapClick(data.id)} 
				/>
			</div>
		</section>
	);
}
export default Map;
