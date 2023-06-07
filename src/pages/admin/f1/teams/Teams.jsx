import { AdminNavigation } from "../../../../components/admin/AdminNavigation";
import { AdminTopBar } from "../../../../components/admin/AdminTopBar";
import TeamsService from "../../../../services/api/admin/f1/TeamsService";
import {useState, useEffect, useCallback} from "react";
import {Link} from "react-router-dom";
import {TeamsShow} from "./TeamsShow";
import {InfoSvg} from "../../../../components/svgs/InfoSvg";
import {PencilSvg} from "../../../../components/svgs/PencilSvg";
import {TeamsEdit} from "./TeamsEdit";

export function Teams() {

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [showProps, setShowProps] = useState([]);
    const [show, setShow] = useState(false);

    const [editProps, setEditProps] = useState([]);
    const [edit, setEdit] = useState(false);

    const [create, setCreate] = useState(false);
    const [deleteTeam, setDeleteTeam] = useState(false);

    useEffect(() => {

        setLoading(true)

        TeamsService.getAllTeams()
            .then(response => {
                setTeams(response.data)
                setLoading(false);
            })
            .catch(error => {

                setLoading(false);
                setError(true)

                if (!error.response) {

                    setErrorMessage('Connection Error');
                    return;

                }

                setErrorMessage(error.response.data.errors);
            })

    }, []);

    const onButtonClick = useCallback((event, id, name, fullName, powerUnit) => {

        setShowProps([id, name, fullName, powerUnit]);
        setShow(true);

    }, []);

    const onEditButtonClick = useCallback((event, id, name, fullName, powerUnitId) => {

        setEditProps([id, name, fullName, powerUnitId]);
        setEdit(true);

    }, []);

    return (
		<>
            <AdminNavigation />

            <AdminTopBar />

            <div className={'fixed top-16 left-56 w-[calc(100%-14rem)] h-[calc(100%-4rem)] overflow-y-scroll'}>

                <div className="w-fit mt-8 mb-12 bg-white rounded-xl border-transparent shadow-custom-shadow m-auto">

                    { loading ? (

                        <h1 className={'text-2xl text-center mt-3 text-blue-normal font-bold pt-5 pb-5 pl-10 pr-10'}>
                            Loading...
                        </h1>

                    ) : (
                        <>
                            { error ? (

                                <h1 className={'text-2xl text-center mt-3 text-blue-normal font-bold pt-5 pb-5 pl-10 pr-10'}>
                                    { errorMessage }
                                </h1>

                            ) : (

                            <table className={'w-full'}>
                                <thead>
                                    <tr className={'text-center'}>
                                        <th className={'text-left border-transparent text-white p-6 pl-10 bg-blue-normal rounded-tl-xl'}>Name</th>
                                        <th className={'text-left border-transparent text-white p-6 bg-blue-normal'}>Full Name</th>
                                        <th className={'text-left border-transparent text-white p-6 bg-blue-normal'}>Power Unit</th>
                                        <th className={'text-left border-transparent text-white p-6 pl-2 pr-2 bg-blue-normal'}></th>
                                        <th className={'text-left border-transparent text-white p-6 pl-2 pr-2 bg-blue-normal rounded-tr-xl'}></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        teams.map((team, index) => (
                                            <tr key={team.id} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                                                <td className={'p-6 pl-10 text-left text-gray-700'}>{team['name']}</td>
                                                <td className={'p-6 text-left text-gray-700'}>{team["full_name"]}</td>
                                                <td className={'p-6 pr-10 text-left text-gray-700'}>{team["power_unit"]["name"]}</td>
                                                <td className={'p-6 pr-3 pl-3 text-left text-gray-700'}>
                                                    <button onClick={(event) => onButtonClick(
                                                        event,
                                                        team['id'],
                                                        team['name'],
                                                        team["full_name"],
                                                        team["power_unit"]["name"]
                                                    )} className={'bg-blue-light text-white p-2 pr-3 rounded-xl hover:bg-blue-normal flex flex-nowrap'}>
                                                        <InfoSvg classString={'h-6 w-6 mr-3'} />
                                                        <span>More Info</span>
                                                    </button>
                                                </td>

                                                <td className={'p-6 pl-3 pr-3 text-left text-gray-700'}>
                                                    <button onClick={(event) => onEditButtonClick(
                                                        event,
                                                        team['id'],
                                                        team['name'],
                                                        team["full_name"],
                                                        team["power_unit"]['id'],
                                                    )} className={'bg-yellow-500 text-white p-2 pr-3 rounded-xl hover:bg-yellow-700 flex flex-nowrap'}>
                                                        <PencilSvg classString={'h-6 w-6 mr-3'} />
                                                        <span>Edit</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            )}
                        </>
                    )}
                </div>
            </div>

            { show ? (
                <TeamsShow id={showProps[0]} name={showProps[1]} fullName={showProps[2]} powerUnit={showProps[3]} setShow={setShow} />
            ) : (
                <></>
            )}

            { create ? (
                <></>
            ) : (
                <></>
            )}

            { edit ? (
                <TeamsEdit teamId={editProps[0]} teamName={editProps[1]} teamFullName={editProps[2]} teamPowerUnitId={editProps[3]} setEdit={setEdit} />
            ) : (
                <></>
            )}

            { deleteTeam ? (
                <></>
            ) : (
                <></>
            )}
        </>
	)
}
