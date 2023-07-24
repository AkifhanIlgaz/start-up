import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonLabel, IonModal, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert } from '@ionic/react'
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

export const Profile = () => {
	const modal = useRef(null)
	const page = useRef(null)
	const [presentingElement, setPresentingElement] = useState(null)

	useEffect(() => {
		setPresentingElement(page.current)
	}, [])

	function dismiss() {
		modal.current.dismiss()
	}

	const intl = useIntl()

	const formatMessage = (id, values) => intl.formatMessage({ id: id }, { ...values })

	const [user, setUser] = useRecoilState(userState)

	const [downloadURL, setDownloadURL] = useState(null)

	const [loading, setLoading] = useState(false)

	const upload = useRef()

	const [isOpen, setIsOpen] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const handleFileUpload = async e => {
		console.log(e)
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

	const onSubmit = async data => {}

	return (
		<Authorized>
			{user !== null && (
				<IonAvatar>
					<img src={user.photoURL} alt="" />
				</IonAvatar>
			)}
			<IonButton onClick={() => setIsOpen(true)} expand="block">
				<IonIcon icon={addOutline}></IonIcon>
				<span>Add Pet</span>
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

				<IonButton>Add pet</IonButton>
			</IonCard>
		</Authorized>
	)
}

export default Profile
