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
import { useHistory } from 'react-router'

const defaultImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtMHFQmELtQP7GiQrvpYQQVYIU_2ZoF-n-I3CqhOs9qaetDVhykH1PSmMSlfD5nCklxY&usqp=CAU'

export const MyProfile = () => {
	const history = useHistory()
	const intl = useIntl()

	const formatMessage = (id, values) => intl.formatMessage({ id: id }, { ...values })

	const [user, setUser] = useRecoilState(userState)
	const [downloadURL, setDownloadURL] = useState(null)
	const [lastSegment, setLastSegment] = useState('pets')

	const [loading, setLoading] = useState(false)

	const upload = useRef()

	const [isOpen, setIsOpen] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const handleFileUpload = async e => {
		const file = e.target.files[0]
		try {
			setLoading(true)
			const req = new Request()
			const downloadURL = await req.uploadFile(user.uid, file)
			const res = await req.setDocument('users', user.uid, { ...user, photoURL: downloadURL })
			setDownloadURL(downloadURL)
			setUser({
				...user,
				photoURL: downloadURL
			})
			console.log(res)
			setLoading(false)
		} catch (error) {
			console.error(error)
		}
	}

	const click = () => {
		upload.current.click()
	}

	const signOut = async () => {
		const req = new Request()
		const res = await req.signOut()
		console.log(res)
		setUser(res)
		history.push('/home')
	}

	return (
		<Authorized>
			<div className="ion-text-center">
				<img src={user && user.photoURL ? user.photoURL : defaultImg} alt="" style={{ borderRadius: '50%', width: '50%' }} />
			</div>
			<div className="ion-text-center ion-padding-top">
				<span>{user.username}</span>
			</div>
			<IonToolbar color={'transparent'}>
				<IonSegment value={lastSegment} onIonChange={e => setLastSegment(e.detail.value)}>
					<IonSegmentButton value="pets">
						<IonLabel>Pets</IonLabel>
					</IonSegmentButton>
					<IonSegmentButton value="favorites">
						<IonLabel>History</IonLabel>
					</IonSegmentButton>
				</IonSegment>
			</IonToolbar>
			{lastSegment == 'pets' ? <MyPets user={user} /> : <div>History</div>}
			<IonButton onClick={() => setIsOpen(true)}>
				<IonIcon icon={addOutline}></IonIcon>
			</IonButton>
			<AddPet isOpen={isOpen} setIsOpen={setIsOpen} />
			<IonCard>
				<IonCardContent>
					{!downloadURL && (
						<IonRow className="ion-align-items-center">
							<IonCol className="ion-no-padding">
								{!loading && (
									<div onClick={() => click()}>
										<div>
											Fotoğraf Yükle
											<input type="file" onChange={handleFileUpload} ref={upload} style={{ display: 'none' }} />
										</div>
									</div>
								)}
								{loading && <div>Fotoğraf Yükleniyor...</div>}
							</IonCol>
						</IonRow>
					)}
					{downloadURL && (
						<IonRow>
							<IonCol className="auth-card">
								<IonLabel color="success">Yüklendi!</IonLabel>
								<img src={downloadURL} alt="" style={{ width: '50px' }} />
							</IonCol>
						</IonRow>
					)}
				</IonCardContent>
			</IonCard>
			<IonButton onClick={signOut}>Sign Out</IonButton>
		</Authorized>
	)
}

export default MyProfile
