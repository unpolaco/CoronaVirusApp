import React from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import countries from '../assets/world_countries.json';

const MyResponsiveChoropleth = ({ data }) => (
	<ResponsiveChoropleth
		data={data}
		width={1000}
		height={700}
		features={countries.features}
		margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
		//   colors={['red', 'green', 'blue']}
		colors='YlOrBr'
		//   domain={[ 0, Math.max(...data.map(d => (d.value)))]}
		domain={[0, 300000]}
		unknownColor='#e9e9e9'
		label='data.id'
		valueFormat='.2s'
		projectionType='naturalEarth1'
		projectionTranslation={[0.5, 0.5]}
		projectionRotation={[0, 0, 0]}
		projectionScale={277}
		enableGraticule={true}
		graticuleLineColor='#dddddd'
		borderWidth={1}
		borderColor='#283a44'
		legends={[
			{
				anchor: 'bottom-left',
				direction: 'column',
				justify: false,
				translateX: 22,
				translateY: -14,
				itemsSpacing: 0,
				itemWidth: 94,
				itemHeight: 18,
				itemDirection: 'left-to-right',
				itemTextColor: '#444444',
				itemOpacity: 0.85,
				symbolSize: 15,
				effects: [
					{
						on: 'hover',
						style: {
							itemTextColor: '#000000',
							itemOpacity: 1,
						},
					},
				],
			},
		]}
	/>
);

export default MyResponsiveChoropleth;
