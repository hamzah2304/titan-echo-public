import React, { useState } from "react";
import DropdownSelection from 'components/DropdownSelection'

const SportsDropDown = ({dropdown, sports}) => {
  var options = [];
  Object.keys(sports).map((sport) => {
	if (sports[sport][0]){
	  options.push({
		key: sport,
		text: sport,
		value: sport,
	  });
	}
  });
  return (
	<DropdownSelection setDropdownState={dropdown["sport"][1]} dropdownname="Sports – All" options={options}/>
  );
}

export default SportsDropDown