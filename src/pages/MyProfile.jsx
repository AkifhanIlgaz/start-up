import { IonCard, IonCardContent, IonCol, IonFab, IonFabButton, IonFabList, IonIcon, IonLabel, IonRow, IonSegment, IonSegmentButton, IonToolbar } from '@ionic/react'
import { addOutline, logOutOutline, pencilOutline, settingsOutline, trashOutline } from 'ionicons/icons'
import { useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { useRecoilState } from 'recoil'
import Request, { MatchRequestCollection, PetsCollection, UsersCollection } from '../api/request'
import { userState } from '../atoms/user'
import AddPet from '../components/AddPet'
import EditProfile from '../components/EditProfile'
import MyPets from '../components/MyPets'
import Authorized from '../layouts/Authorized'

const defaultImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtMHFQmELtQP7GiQrvpYQQVYIU_2ZoF-n-I3CqhOs9qaetDVhykH1PSmMSlfD5nCklxY&usqp=CAU'

export const MyProfile = () => {
	const history = useHistory()
	const req = new Request()

	const [user, setUser] = useRecoilState(userState)
	const [downloadURL, setDownloadURL] = useState(null)
	const [lastSegment, setLastSegment] = useState('pets')
	const [isAddPetOpen, setIsAddPetOpen] = useState(false)
	const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const upload = useRef()

	const handleFileUpload = async e => {
		const file = e.target.files[0]
		try {
			setLoading(true)
			const downloadURL = await req.uploadFile(user.uid, file)
			await req.setDocument(UsersCollection, user.uid, { ...user, photoURL: downloadURL })
			setDownloadURL(downloadURL)
			setUser({
				...user,
				photoURL: downloadURL
			})
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
		await req.deleteDocument(UsersCollection, user.uid)

		await req.firestore
			.collection(PetsCollection)
			.where('ownerId', '==', user.uid)
			.get()
			.docs.forEach(async pet => {
				await req.deleteDocument(PetsCollection, pet.id)
			})

		await req
			.getDocuments(MatchRequestCollection)
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
			<div className="ion-padding-top">
				<div className="ion-text-center ion-margin-bottom">
					<span>{user.username}</span>
				</div>
				<div className="ion-text-center ion-margin-bottom">
					<img src={user && user.photoURL ? user.photoURL : defaultImg} alt="" style={{ borderRadius: '50%', width: '50%' }} />
				</div>

				<div className="ion-margin-bottom">
					<IonToolbar color={'transparent'} className="ion-no-margin">
						<IonSegment value={lastSegment} onIonChange={e => setLastSegment(e.detail.value)}>
							<IonSegmentButton value="pets">
								<IonLabel>Pets</IonLabel>
							</IonSegmentButton>
							<IonSegmentButton value="favorites">
								<IonLabel>History</IonLabel>
							</IonSegmentButton>
						</IonSegment>
					</IonToolbar>
				</div>
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
			</div>
		</Authorized>
	)
}

export default MyProfile
