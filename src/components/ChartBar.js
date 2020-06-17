import React, { useState, useRef } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import 'moment/locale/pl';
import moment from 'moment';
import styles from './ChartBar.module.scss';
import InputRadioTimeRange from './Input_Radio_TimeRange';
import { timeRange, pandemicStart } from '../assets/time_range';
import InputRadioCases from './Input_Radio_Cases';


function ChartBar() {


	const [selectedTimeRangeOption, setTimeRangeOption] = useState(pandemicStart);


	const [selectedCaseType, setCaseType] = useState('confirmed');

	// results(countries: [ "${selectedCountry}" ], 

	const getMapData = gql`
	{
		results(countries: [ "Poland" ], 
		date: { gt: "01/01/2020" }) {
				country {
					name
				}
				date
				confirmed
				deaths
				recovered
				growthRate
			}
		}
	`;

	const { data, loading, error, refetch } = useQuery(getMapData);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;
	const chartData = data.results.map((d, index) => {
		if (index > 0) {
			d.newConfirmed =
				data.results[index].confirmed - data.results[index - 1].confirmed;
			d.newDeaths = data.results[index].deaths - data.results[index - 1].deaths;
			d.newRecovered =
				data.results[index].recovered - data.results[index - 1].recovered;
		}
		return d;
	});

	const timeFilterChartData = chartData.filter((d, index) => {
		if (moment(chartData[index].date).isAfter(moment(selectedTimeRangeOption)))
			return d;
	});


	function onChangeTimeRange(selectedTimeRangeOption) {
		setTimeRangeOption(selectedTimeRangeOption);
	}
	function onChangeCaseType(selectedCaseType) {
		setCaseType(selectedCaseType);
	}

	return (
		<section id='chartBar' className={styles.section_wrapper}>

			<InputRadioCases onChangeCaseType={onChangeCaseType} />

			<div className={styles.chartbar_container}>
				<ResponsiveBar
					data={timeFilterChartData}
					keys={[selectedCaseType]}
					indexBy='date'
					margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
					padding={0.3}
					groupMode='grouped'
					minValue={0}
					colors={{ scheme: 'category10' }}
					borderColor={{ from: 'color', modifiers: [['darker', '1.6']] }}
					axisBottom={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: -45,
						legendPosition: 'middle',
						legendOffset: 32,
						renderTick: (tick) => {
							if (tick.tickIndex % 5) {
								return '';
							} else {
								return (
									<g
										transform={`translate(${tick.x},${tick.y + 50}) rotate(${
											tick.rotate
										})`}
									>
										<text style={{ fontSize: 12 }}>{tick.value}</text>
									</g>
								);
							}
						},
					}}
					axisLeft={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legendPosition: 'middle',
						legendOffset: -40,
					}}
					labelSkipWidth={15}
					labelSkipHeight={15}
					labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
					animate={true}
					motionStiffness={115}
					motionDamping={15}
				/>
			</div>
			<InputRadioTimeRange
				onChangeTimeRange={onChangeTimeRange}
			/>
		</section>
	);
}
export default ChartBar;
