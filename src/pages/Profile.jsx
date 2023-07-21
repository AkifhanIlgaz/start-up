import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonInput, IonLabel, IonRow, useIonAlert } from '@ionic/react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { useHistory, useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import Request from '../api/request'
import { userState } from '../atoms/user'

const UploadImage = () => {
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
	)
}

const Input = props => {
	return (
		<IonRow className="ion-align-items-center">
			<IonCol className="ion-padding-top">
				<IonInput label={props.label} type={props.type} labelPlacement="floating" className="ion-padding-start ion-padding-end ion-input"></IonInput>
			</IonCol>
		</IonRow>
	)
}

export const Profile = () => {
	const intl = useIntl()

	const formatMessage = (id, values) => intl.formatMessage({ id: id }, { ...values })

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const onSubmit = data => {
		console.log(data)
		console.log('add pet')
	}

	return (
		<IonCardContent>
			<form onSubmit={handleSubmit(onSubmit)}>
				<IonGrid className="ion-align-items-center ion-justify-content-center ion-height ">
					<IonRow className="ion-align-items-center ion-justify-content-center ion-height">
						<IonCol size="12" size-md="6" size-lg="4">
							<IonCard className="ion-transparent">
								<IonCardContent className="card-content">
									<Input label={formatMessage('Name')} type="text" formLabel="name" {...register('name', { required: true })} />
									<Input label={formatMessage('Type')} type="text" formLabel="type" {...register('type', { required: true })} />
									<Input label={formatMessage('Specy')} type="text" formLabel="specy" {...register('specy', { required: true })} />
									<Input label={formatMessage('Age')} type="number" formLabel="age" {...register('age', { required: true })} />
									<Input label={formatMessage('Info')} type="text" formLabel="info" {...register('info', { required: true })} />
									<Input label={formatMessage('Vaccines')} type="text" formLabel="vaccines" />
									<IonRow className="ion-align-items-center">
										<IonCol className="ion-no-padding">
											<IonButton className="ion-margin-top " type="submit" expand="block" color="secondary">
												<span>{formatMessage('Add')}</span>
											</IonButton>
										</IonCol>
									</IonRow>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
				</IonGrid>
			</form>
		</IonCardContent>
	)
}

export default Profile
