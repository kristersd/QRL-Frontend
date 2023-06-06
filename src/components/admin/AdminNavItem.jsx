import {NavLink} from "react-router-dom";

export const AdminNavItem = ({ url, text }) => {
	return (
		<>
            <li>
                <NavLink to={url} className={({ isActive }) => (isActive ?
                    'block pl-4 pt-2 pb-2 w-full bg-blue-200 rounded' :
                    'block pl-4 pt-2 pb-2 w-full hover:bg-blue-200 rounded')}>
                    { text }
                </NavLink>
            </li>
        </>
	)
}