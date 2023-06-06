import {AdminNavigation} from "../../../../components/admin/AdminNavigation";
import {AdminTopBar} from "../../../../components/admin/AdminTopBar";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import LicensesService from "../../../../services/api/admin/f1/LicensesService";

export function Licenses() {

    const [licenses, setLicenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {

        setLoading(true)

        LicensesService.getAllLicenses()
            .then(response => {
                setLicenses(response.data);
                setLoading(false);
            })
            .catch(error => {

                setLoading(false);
                setError(true);

                if (!error.response) {

                    setErrorMessage('Connection Error');
                    return;

                }

                setErrorMessage(error.response.data.errors);
            })
    }, [])

	return (
		<>
            <AdminNavigation />

            <AdminTopBar />


            <div className={'fixed top-16 left-56 w-[calc(100%-14rem)] h-[calc(100%-4rem)] overflow-y-scroll'}>

                <div className="w-fit mt-8 bg-white rounded-xl border-transparent shadow-custom-shadow m-auto">

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
                                        <th className={'text-left border-transparent text-white p-6 pl-10 bg-blue-normal rounded-tl-xl'}>ID</th>
                                        <th className={'text-left border-transparent text-white p-6 bg-blue-normal'}>Driver</th>
                                        <th className={'text-left border-transparent text-white p-6 bg-blue-normal'}>Team</th>
                                        <th className={'text-left border-transparent text-white p-6 bg-blue-normal'}>Active</th>
                                        <th className={'text-left border-transparent text-white p-6 pr-10 bg-blue-normal rounded-tr-xl'}></th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            licenses.map((license, index) => (

                                                <tr key={license.id} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                                                    <td className={'p-6 pl-10 text-left text-gray-700 text-center'}>{license['id']}</td>
                                                    <td className={'p-6 text-left text-gray-700'}>{license['user']['name']}</td>
                                                    <td className={'p-6 text-left text-gray-700'}>{license['team']['name']}</td>
                                                    <td className={'p-6 text-left text-gray-700 text-center'}>{license['active'] ? 'Yes' : 'No'}</td>
                                                    <td className={'p-6 pr-10 text-left text-gray-700'}>
                                                        <Link to={`/admin/f1/teams/${license.id}`} className={'bg-blue-light text-white pt-2 pb-2 pl-4 pr-4 rounded-xl hover:bg-blue-normal'}>
                                                            <span>More info</span>
                                                        </Link>
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

        </>
	)
}