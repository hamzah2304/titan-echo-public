
import React, { useState, useEffect } from "react";
import DropdownSelection from 'components/DropdownSelection'

const LeaguesDropDown = ({dropdown, sports, leagues, leaguesLoadedState}) => {
  var options = [];
  
  let [leaguesLoaded, setLeaguesLoaded] = leaguesLoadedState;
  
  let dropdownOptionsState = useState([]);
  let [dropdownOptions, setDropdownOptions] = dropdownOptionsState;
  
  let sportBools = Object.keys(sports).map((sport)=>sports[sport][0]);

  useEffect(()=>{
	if (leaguesLoaded){
		options = [];
		if (dropdown["sport"][0]=="Sports – All"){
		  Object.keys(leagues).map((sport) => {
			if (sports[sport][0]){
			  Object.keys(leagues[sport]).map((league) => {
				if (leagues[sport][league]) options.push(league);
			  });
			}
		  });
		} else if (leagues[dropdown["sport"][0]]){
		  Object.keys(leagues[dropdown["sport"][0]]).map((league) => {
			if (leagues[dropdown["sport"][0]][league]) options.push(league);
		  });
		}
		if (!options.includes(dropdown["league"][0])) {
			dropdown["league"][1]("Leagues – All");
		}
		setDropdownOptions(options.map(league => {return {
			key: league,
			text: league,
			value: league,
		}}));
	}
  }, [leaguesLoaded,dropdown['sport'][0],sports,leagues].concat(sportBools));//,sports,leagues
  
  return (
	<DropdownSelection setDropdownState={dropdown["league"][1]} dropdownname="Leagues – All" options={dropdownOptions}/>
  );
}

export default LeaguesDropDown