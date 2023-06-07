import {useCallback, useEffect, useLayoutEffect, useState} from "react";
import {XSvg} from "../../../../components/svgs/XSvg";
import PowerUnitsService from "../../../../services/api/admin/f1/PowerUnitsService";
import TeamsService from "../../../../services/api/admin/f1/TeamsService";

export function TeamsEdit({teamId, teamName, teamFullName, teamPowerUnitId, setEdit}) {

    const [powerUnits, setPowerUnits] = useState([]);

    const [error, setError] = useState(false);
    
    const [name, setName] = useState(teamName);
    const [fullName, setFullName] = useState(teamFullName);
    const [powerUnitId, setPowerUnitId] = useState(teamPowerUnitId);

    useLayoutEffect(() => {

            PowerUnitsService.getAllPowerUnits()
                .then(response => {
                    setPowerUnits(response.data);
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
    }, []);

    useEffect(() => () => console.log("unmount"), []);

    const onCloseClick = useCallback(() => {
        setEdit(false);
    }, [setEdit]);

    const updateTeam = useCallback(() => {

        TeamsService.updateTeam(
            {
                id: teamId,
                name: name,
                full_name: fullName,
                power_unit_id: powerUnitId
            }
        )
            .then(response => {
                console.log(response.data);
                // setEdit(false);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <div className={'fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-70 flex justify-center items-center'}>

            <div className={'w-fit bg-white rounded-xl border-transparent shadow-custom-shadow m-auto'}>

                <div className={'w-full h-12 bg-blue-normal rounded-tl-xl rounded-tr-xl relative'}>
                    <div className={'w-12 h-12 '} onClick={onCloseClick}>
                        <XSvg classString={'w-12 h-12 p-2 text-off-white bg-red-500 absolute right-0 rounded-tr-xl hover:bg-red-900'} />
                    </div>
                </div>

                <div>
                    <div className={'flex flex-wrap w-full p-4'}>
                        <label htmlFor="{'name'}" className={'w-full ml-4 mb-3'}>
                            Name
                        </label>
                        <input
                            type="text"
                            value={ name }
                            id={'name'}
                            name={'name'}
                            onChange={event => setName(event.target.value)}
                            className={'w-full p-4 border-2 border-blue-normal rounded-xl focus:border-blue-dark focus:outline-none'} />

                        <label htmlFor="{'fullName'}" className={'w-full mt-8 ml-4 mb-3'}>
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={ fullName }
                            id={'fullName'}
                            name={'fullName'}
                            onChange={(event) => setFullName(event.target.value)}
                            className={'w-full p-4 border-2 border-blue-normal rounded-xl focus:border-blue-dark focus:outline-none'} />

                        <label htmlFor="{'powerUnit'}" className={'w-full mt-8 ml-4 mb-3'}>
                            Power Units
                        </label>
                        <select
                            name="powerUnit"
                            id="powerUnit"
                            onChange={(event) => setPowerUnitId(event.target.value)}
                            className={'w-full p-4 border-2 border-blue-normal rounded-xl focus:border-blue-dark focus:outline-none'}>
                            <option value="None">none</option>
                            {
                                powerUnits.map((powerUnit, index) => (
                                    powerUnit['id'] === powerUnitId ?
                                        <option key={index} value={powerUnit['id']} selected>{powerUnit['name']}</option>
                                        :
                                        <option key={index} value={powerUnit['id']}>{powerUnit['name']}</option>
                                ))
                            }
                        </select>

                        <button onClick={updateTeam} className={'w-full mt-5 bg-blue-normal hover:bg-blue-dark text-off-white font-bold py-2 px-4 rounded'}> Save </button>
                    </div>
                </div>

            </div>

        </div>
	)
}