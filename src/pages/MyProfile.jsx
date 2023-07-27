import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonAlert } from '@ionic/react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'
import Request, { MatchRequestCollection } from '../api/request'
import { userState } from '../atoms/user'
import Authorized from '../layouts/Authorized'
import AddPet from './AddPet'
import { addOutline, logOutOutline, pencilOutline, settingsOutline, trashOutline } from 'ionicons/icons'
import Tabs from './Tabs'
import PetCard from '../components/PetCard'
import MyPets from '../components/MyPets'
import { set } from 'lodash'
import { useHistory } from 'react-router'
import firebase from 'firebase/compat/app'
import EditProfile from './EditProfile'

const defaultImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtMHFQmELtQP7GiQrvpYQQVYIU_2ZoF-n-I3CqhOs9qaetDVhykH1PSmMSlfD5nCklxY&usqp=CAU'

export const MyProfile = () => {
	const history = useHistory()
	const intl = useIntl()
	const req = new Request()
	const formatMessage = (id, values) => intl.formatMessage({ id: id }, { ...values })

	const [user, setUser] = useRecoilState(userState)
	const [downloadURL, setDownloadURL] = useState(null)
	const [lastSegment, setLastSegment] = useState('pets')
	const [isAddPetOpen, setIsAddPetOpen] = useState(false)
	const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)

	const [loading, setLoading] = useState(false)

	const upload = useRef()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const handleFileUpload = async e => {
		const file = e.target.files[0]
		try {
			setLoading(true)

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
		const res = await req.signOut()
		setUser(res)
		history.push('/home')
	}

	const deleteAccount = async () => {
		await req.deleteDocument('users', user.uid)
		const pets = await req.firestore.collection('pets').where('ownerId', '==', user.uid).get()
		pets.forEach(async pet => {
			await req.deleteDocument('pets', pet.id)
		})

		const matchRequests = await req.getDocuments(MatchRequestCollection)
		matchRequests
			.filter(matchRequest => {
				return matchRequest.from.ownerId == user.uid || matchRequest.to.ownerId == user.uid
			})
			.forEach(async matchRequest => {
				await req.deleteDocument(MatchRequestCollection, matchRequest.id)
			})

		const res = await req.auth.currentUser.delete()
		setUser(res)
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
			<EditProfile isEditProfileOpen={isEditProfileOpen} setIsEditProfileOpen={setIsEditProfileOpen}></EditProfile>
			<AddPet isAddPetOpen={isAddPetOpen} setIsAddPetOpen={setIsAddPetOpen} />
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

			<IonFab slot="fixed" vertical="bottom" horizontal="start">
				<IonFabButton onClick={() => setIsAddPetOpen(true)}>
					<IonIcon icon={addOutline}></IonIcon>
				</IonFabButton>
			</IonFab>
			<IonFab slot="fixed" vertical="bottom" horizontal="end">
				<IonFabButton>
					<IonIcon icon={settingsOutline}></IonIcon>
				</IonFabButton>
				<IonFabList side="top">
					<IonFabButton color={'primary'} onClick={signOut}>
						<IonIcon icon={logOutOutline}></IonIcon>
					</IonFabButton>
					<IonFabButton color={'success'} onClick={() => setIsEditProfileOpen(true)}>
						<IonIcon icon={pencilOutline}></IonIcon>
					</IonFabButton>
					<IonFabButton color={'danger'} onClick={deleteAccount}>
						<IonIcon icon={trashOutline}></IonIcon>
					</IonFabButton>
				</IonFabList>
			</IonFab>
		</Authorized>
	)
}

export default MyProfile
