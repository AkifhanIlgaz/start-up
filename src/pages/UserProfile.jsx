import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonAlert } from '@ionic/react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'
import Request from '../api/request'
import { userState } from '../atoms/user'
import Authorized from '../layouts/Authorized'
import AddPet from './AddPet'
import { addOutline } from 'ionicons/icons'
import Tabs from './Tabs'
import PetCard from '../components/PetCard'
import MyPets from '../components/MyPets'
import { set } from 'lodash'
import UserPets from '../components/UserPets'
import { useParams } from 'react-router'

const defaultImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtMHFQmELtQP7GiQrvpYQQVYIU_2ZoF-n-I3CqhOs9qaetDVhykH1PSmMSlfD5nCklxY&usqp=CAU'

export const UserProfile = () => {
	const intl = useIntl()
	let { id } = useParams()

	const formatMessage = (id, values) => intl.formatMessage({ id: id }, { ...values })

	const [user, setUser] = useState({})

	useEffect(() => {
		const fetchData = async () => {
			const req = new Request()
			const res = await req.getDocument('users', id)
			setUser(res)
		}

		fetchData()
	}, [user])

	const [lastSegment, setLastSegment] = useState('pets')

	return (
		<Authorized>
			<div className="ion-text-center">
				<img src={user && user.photoURL ? user.photoURL : defaultImg} alt="" style={{ borderRadius: '50%', width: '50%' }} />
			</div>
			<div className="ion-text-center ion-padding-top">
				<span>{user.userName}</span>
			</div>
			<div className="ion-text-center ion-padding-top">
				<span>{user.id}</span>
			</div>
			<IonToolbar color={'transparent'}>
				<IonSegment onIonChange={e => setLastSegment(e.detail.value)}>
					<IonSegmentButton value="pets">
						<IonLabel>Pets</IonLabel>
					</IonSegmentButton>
					<IonSegmentButton value="favorites">
						<IonLabel>History</IonLabel>
					</IonSegmentButton>
				</IonSegment>
			</IonToolbar>
			{lastSegment === 'pets' ? <UserPets user={user} /> : <div>History</div>}
		</Authorized>
	)
}

export default UserProfile
