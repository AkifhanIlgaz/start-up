import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonLabel, IonList, IonModal, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'
import userState from '../atoms/user'
import Request from '../api/request'
import { useHistory } from 'react-router'

const AddPet = ({ isOpen, setIsOpen }) => {
	const [user, setUser] = useRecoilState(userState)
	const history = useHistory()

	const [downloadURL, setDownloadURL] = useState(null)
	const [loading, setLoading] = useState(false)
	const upload = useRef()

	const intl = useIntl()

	const formatMessage = (id, values) => intl.formatMessage({ id: id }, { ...values })

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const onSubmit = async data => {
		data = { ...data, userId: user.uid, photoURL: downloadURL }
		console.log(data)
		const req = new Request()
		await req.addDocument('pets', data)
	}

	const handleFileUpload = async e => {
		const file = e.target.files[0]
		try {
			setLoading(true)
			const req = new Request()
			const downloadURL = await req.uploadFile(`${user.uid}/pets`, file)
			const res = await req.setDocument('pets', user.uid, { ...user, photoURL: downloadURL })
			setDownloadURL(downloadURL)
			setLoading(false)
		} catch (error) {
			console.error(error)
		}
	}

	const click = () => {
		upload.current.click()
	}

	return (
		<IonModal isOpen={isOpen}>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Add Pet</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<form onSubmit={handleSubmit(onSubmit)}>
				<IonGrid className="ion-align-items-center ion-justify-content-center ion-height ">
					<IonRow className="ion-align-items-center ion-justify-content-center ion-height">
						<IonCol size="12" size-md="6" size-lg="4">
							<IonCard className="ion-transparent">
								<IonCardContent className="card-content">
									<IonRow className="ion-align-items-center">
										<IonCol className="ion-padding-top">
											{!downloadURL && (
												<IonRow className="ion-align-items-center">
													<IonCol className="ion-no-padding">
														{!loading && (
															<div onClick={() => click()}>
																<div>
																	<IonButton>Add Pet Image</IonButton>
																	<input style={{ display: 'none' }} type="file" onChange={handleFileUpload} ref={upload} className="ion-input" />
																</div>
															</div>
														)}
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

											<IonInput label={formatMessage('Name')} type="text" labelPlacement="floating" className="ion-padding-start ion-padding-end ion-input  ion-margin-bottom" {...register('name', { required: true })}></IonInput>
											<IonInput label={formatMessage('Type')} type="text" labelPlacement="floating" className="ion-padding-start ion-padding-end ion-input ion-margin-bottom" {...register('type', { required: true })}></IonInput>
											<IonInput label={formatMessage('Gender')} type="text" labelPlacement="floating" className="ion-padding-start ion-padding-end ion-input ion-margin-bottom" {...register('gender', { required: true })}></IonInput>
											<IonInput label={formatMessage('Age')} type="number" labelPlacement="floating" className="ion-padding-start ion-padding-end ion-input ion-margin-bottom" {...register('age', { required: true })}></IonInput>
											<IonInput label={formatMessage('Info')} type="text" labelPlacement="floating" className="ion-padding-start ion-padding-end ion-input ion-margin-bottom" {...register('info', { required: true })}></IonInput>
											<IonInput label={formatMessage('Vaccines')} type="text" labelPlacement="floating" className="ion-padding-start ion-padding-end ion-input ion-margin-bottom" {...register('vaccines', { required: true })}></IonInput>
											<IonButton className="ion-margin-top " type="submit" expand="block" color="secondary" onClick={() => setIsOpen(false)}>
												<span>{formatMessage('Add')}</span>
											</IonButton>
										</IonCol>
									</IonRow>

									<IonRow className="ion-align-items-center">
										<IonCol className="ion-no-padding"></IonCol>
									</IonRow>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
				</IonGrid>
			</form>
		</IonModal>
	)
}

export default AddPet
