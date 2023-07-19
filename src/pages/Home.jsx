import { useRecoilState } from 'recoil'
import { userState } from '../atoms/user'
import Authorized from '../layouts/Authorized'

export const Home = () => {
	const [user, setUser] = useRecoilState(userState)

	return <Authorized>HOŞ GELDİNİZ : {user.name}</Authorized>
}

export default Home
