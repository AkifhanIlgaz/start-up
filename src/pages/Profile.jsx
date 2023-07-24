import { IonAvatar, IonCard, IonCardContent, IonCol, IonInput, IonLabel, IonRow, useIonAlert } from '@ionic/react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { useHistory, useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import Request from '../api/request'
import { userState } from '../atoms/user'
import Authorized from '../layouts/Authorized'

const ProfileImage = () => {}

export const Profile = () => {
	const history = useHistory()

	const location = useLocation()

	const intl = useIntl()

	const formatMessage = (id, values) => intl.formatMessage({ id: id }, { ...values })

	const [user, setUser] = useRecoilState(userState)

	const [downloadURL, setDownloadURL] = useState(null)

	const [loading, setLoading] = useState(false)

	const upload = useRef()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const [presentAlert] = useIonAlert()

	const alert = (title, message) => {
		presentAlert({
			header: title,
			message: message,
			buttons: [formatMessage('Ok')]
		})
	}

	const uploadFile = async (storagePath, file) => {
		try {
			const req = new Request()
			const res = await req.uploadFile(storagePath, file)
			return res
		} catch (error) {
			throw error
		}
	}

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
		</Authorized>
	)
}

export default Profile
