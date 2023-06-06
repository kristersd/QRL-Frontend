import {XSvg} from "../../../../components/svgs/XSvg";
import {useCallback} from "react";

export const TeamsShow = ({ id, name, fullName, powerUnit, setShow}) => {

    const onCloseClick = useCallback(() => {
        setShow(false);
    }, []);

    return (
        <div className={'fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-70 flex justify-center items-center'} onClick={onCloseClick}>

            <div className={'w-fit bg-white rounded-xl border-transparent shadow-custom-shadow m-auto'}>

                <div className={'w-full h-12 bg-blue-normal rounded-tl-xl rounded-tr-xl relative'} onClick={onCloseClick}>
                    <XSvg classString={'w-12 h-12 p-2 text-off-white bg-red-500 absolute right-0 rounded-tr-xl hover:bg-red-900'} />
                </div>

                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th className={'p-6 text-left text-gray-700 bg-gray-200'}>ID</th>
                                <td className={'p-6 text-left text-gray-700 bg-gray-200 text-center'}>{ id }</td>
                            </tr>
                            <tr>
                                <th className={'p-6 text-left text-gray-700'}>Name</th>
                                <td className={'p-6 text-left text-gray-700 text-center'}>{ name }</td>
                            </tr>
                            <tr>
                                <th className={'p-6 text-left text-gray-700 bg-gray-200'}>Full Name</th>
                                <td className={'p-6 text-left text-gray-700 bg-gray-200 text-center'}>{ fullName }</td>
                            </tr>
                            <tr>
                                <th className={'p-6 text-left text-gray-700'}>Power Unit</th>
                                <td className={'p-6 text-left text-gray-700 text-center'}>{ powerUnit }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
	)
}