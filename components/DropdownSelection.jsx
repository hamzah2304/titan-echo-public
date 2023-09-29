import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import styles from '@/styles/Home.module.css'

const DropdownSelection = ({setDropdownState,dropdownname,options}) => {
	var dropdownoptions = [{
		key: dropdownname,
		text: dropdownname,
		value: dropdownname,
	}];
	dropdownoptions = dropdownoptions.concat(options);
	const onChangeDropDown = (event, data) => {
		setDropdownState(data.value)
	}
	return (
		<div className={styles.dropdownwrapper}>
			<Dropdown
				placeholder={dropdownname}
				fluid
				selection
				onChange={onChangeDropDown}
				options={dropdownoptions}
			/>
		</div>
	);
};

export default DropdownSelection