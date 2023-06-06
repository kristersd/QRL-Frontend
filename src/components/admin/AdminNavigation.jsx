import { Link } from "react-router-dom";
import { useState } from "react";
import { AdminNavItem } from "./AdminNavItem";
import { HouseSvg } from "../svgs/HouseSvg";
import { ArrowSvg } from "../svgs/ArrowSvg";

export function AdminNavigation() {

    const [fiaDropdownIsActive, fiaDropdownSetActive] = useState(
        localStorage.getItem('fiaDropdownIsActive') === 'true'
    );
    const [driversDropdownIsActive, driversDropdownSetActive] = useState(
        localStorage.getItem('driverDropdownIsActive') === 'true'
    );
    const [configurationDropdownIsActive, configurationDropdownSetActive] = useState(
        localStorage.getItem('configurationDropdownIsActive') === 'true'
    );

    const toggleFiaDropdown = () => {
        fiaDropdownSetActive(!fiaDropdownIsActive);
        localStorage.setItem('fiaDropdownIsActive', !fiaDropdownIsActive);
    };

    const toggleDriversDropdown = () => {
        driversDropdownSetActive(!driversDropdownIsActive);
        localStorage.setItem('driverDropdownIsActive', !driversDropdownIsActive);
    }

    const toggleConfigurationDropdown = () => {
        configurationDropdownSetActive(!configurationDropdownIsActive);
        localStorage.setItem('configurationDropdownIsActive', !configurationDropdownIsActive);
    }

	return (
		<>
            <div className={'fixed top-16 h-[calc(100vh-4rem)] w-56'}>

                <ul className={'flex flex-wrap mt-8'}>

                    <li className={'w-full flex flex-nowrap'}>
                        <Link to={'/admin'} className={'w-full text-black flex flex-nowrap m-2 p-2 h-12 border-2 border-blue-normal rounded bg-blue-normal shadow-2xl'}>

                            <HouseSvg classString={'w-6 h-6 m-1 text-off-white'} />

                            <span className={'ml-2 h-8 leading-8 text-off-white'}>
                                Dashboard
                            </span>
                        </Link>
                    </li>

                    <li className={'w-full m-2'}>
                        <button className={'flex flex-nowrap w-full p-2 h-12 border-2 border-blue-normal rounded bg-blue-normal shadow-2xl'} onClick={toggleFiaDropdown}>

                            <HouseSvg classString={'w-6 h-6 m-1 text-off-white'} />

                            <span className={'ml-2 h-8 leading-8 text-off-white'}>Fia</span>

                            <ArrowSvg classString={fiaDropdownIsActive ? "w-6 h-6 m-1 absolute right-5 text-off-white -rotate-180 transition-transform duration-300" : "w-6 h-6 m-1 absolute right-5 text-off-white -rotate-0 transition-transform duration-300"} />
                        </button>

                        <div className={fiaDropdownIsActive ? "max-h-1000 rounded-b max-height-transition-property duration-300" : "max-h-0 overflow-hidden max-height-transition-property duration-300"}>
                            <ul className={'pt-2'}>
                                <AdminNavItem text={'Races'} url={'/admin/f1/races'} />

                                <AdminNavItem text={'Penalty Points'} url={'/admin/f1/penalty-points'} />

                                <AdminNavItem text={'Driver Availability'} url={'/admin/f1/driver-availability'} />
                            </ul>
                        </div>
                    </li>


                    <li className={'w-full m-2'}>
                        <button className={'flex flex-nowrap w-full p-2 h-12 border-2 border-blue-normal rounded bg-blue-normal shadow-2xl'} onClick={toggleDriversDropdown}>

                            <HouseSvg classString={'w-6 h-6 m-1 text-off-white'} />

                            <span className={'ml-2 h-8 leading-8 text-off-white'}>Driver</span>

                            <ArrowSvg classString={driversDropdownIsActive ? "w-6 h-6 m-1 absolute right-5 text-off-white -rotate-180 transition-transform duration-300" : "w-6 h-6 m-1 absolute right-5 text-off-white -rotate-0 transition-transform duration-300"} />
                        </button>

                        <div className={driversDropdownIsActive ? "max-h-1000 rounded-b max-height-transition-property duration-300" : "max-h-0 overflow-hidden max-height-transition-property duration-300"}>
                            <ul className={'pt-2'}>
                                <AdminNavItem text={'Licenses'} url={'/admin/f1/licenses'} />

                                <AdminNavItem text={'Teams'} url={'/admin/f1/teams'} />
                            </ul>
                        </div>
                    </li>

                    <li className={'w-full m-2'}>
                        <button className={'flex flex-nowrap w-full p-2 h-12 border-2 border-blue-normal rounded bg-blue-normal shadow-2xl'} onClick={toggleConfigurationDropdown}>

                            <HouseSvg classString={'w-6 h-6 m-1 text-off-white'} />

                            <span className={'ml-2 h-8 leading-8 text-off-white'}>Configuration</span>

                            <ArrowSvg classString={configurationDropdownIsActive ? "w-6 h-6 m-1 absolute right-5 text-off-white -rotate-180 transition-transform duration-300" : "w-6 h-6 m-1 absolute right-5 text-off-white -rotate-0 transition-transform duration-300"} />
                        </button>

                        <div className={configurationDropdownIsActive ? "max-h-1000 rounded-b max-height-transition-property duration-300" : "max-h-0 overflow-hidden max-height-transition-property duration-300"}>
                            <ul className={'pt-2'}>

                                <AdminNavItem text={'Divisions'} url={'/admin/f1/divisions'} />

                                <AdminNavItem text={'Seasons'} url={'/admin/f1/seasons'} />

                                <AdminNavItem text={'Race Formats'} url={'/admin/f1/race-formats'} />

                                <AdminNavItem text={'tracks'} url={'/admin/f1/tracks'} />
                            </ul>
                        </div>
                    </li>
                </ul>

            </div>

        </>
	)
}