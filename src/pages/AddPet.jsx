import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'
import userState from '../atoms/user'
import Request from '../api/request'
import { useHistory } from 'react-router'
import catTypes from '../api/catTypes'
import { cloudUploadOutline } from 'ionicons/icons'

const AddPet = ({ isAddPetOpen, setIsAddPetOpen }) => {
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
		data = { ...data, ownerId: user.uid, photoURL: downloadURL }
		// TODO Add location to pet
		const req = new Request()
		await req.addDocument('pets', data)
	}

	const handleFileUpload = async e => {
		const file = e.target.files[0]
		try {
			setLoading(true)
			const req = new Request()
			const downloadURL = await req.uploadFile(`${user.uid}/pets`, file)
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
		<IonModal isOpen={isAddPetOpen}>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Add Pet</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setIsAddPetOpen(false)}>Close</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonGrid className="ion-no-margin">
				<IonRow>
					<IonCol>
						<form onSubmit={handleSubmit(onSubmit)}>
							<IonList lines="full">
								<IonItem>
									{!downloadURL && !loading && (
										<div onClick={() => click()}>
											<div>
												<IonButton>
													Add Pet Image
													<IonIcon icon={cloudUploadOutline} slot="end"></IonIcon>
												</IonButton>
												<input style={{ display: 'none' }} type="file" onChange={handleFileUpload} ref={upload} />
											</div>
										</div>
									)}
									{downloadURL && (
										<div>
											<IonRow>
												<IonCol>
													<img src={downloadURL} alt="" style={{ width: '100px', borderRadius: '50%' }} />
												</IonCol>
											</IonRow>

											<div onClick={() => click()}>
												<IonButton>
													Add Pet Image
													<IonIcon icon={cloudUploadOutline} slot="end"></IonIcon>
												</IonButton>
												<input style={{ display: 'none' }} type="file" onChange={handleFileUpload} ref={upload} />
												{/* <IonAvatar className="ion-margin-end">
												<img src={downloadURL} alt="" style={{ width: '50px' }} />
											</IonAvatar>
											<IonLabel color="success">Yüklendi!</IonLabel> */}
											</div>
										</div>
									)}
								</IonItem>
								<IonItem>
									<IonInput placeholder={formatMessage('Name')} aria-label={formatMessage('Name')} type="text" {...register('name', { required: true })}></IonInput>
								</IonItem>
								<IonItem>
									<IonLabel
										style={{
											color: '#8e8e8e'
										}}
									>
										{formatMessage('Type')}
									</IonLabel>
									<IonSelect {...register('type', { required: true })} interface="action-sheet">
										{catTypes.map(type => {
											return (
												<IonSelectOption key={type} value={type}>
													{type}
												</IonSelectOption>
											)
										})}
									</IonSelect>
								</IonItem>
								<IonItem>
									<IonLabel
										style={{
											color: '#8e8e8e'
										}}
									>
										{formatMessage('Gender')}
									</IonLabel>
									<IonSelect {...register('gender', { required: true })} interface="action-sheet">
										<IonSelectOption value={'Erkek'}>Erkek</IonSelectOption>
										<IonSelectOption value={'Dişi'}>Dişi</IonSelectOption>
									</IonSelect>
								</IonItem>
								<IonItem>
									<IonLabel
										style={{
											color: '#8e8e8e'
										}}
									>
										{formatMessage('Vaccines')}
									</IonLabel>
									<IonSelect {...register('vaccines', { required: true })} interface="action-sheet">
										<IonSelectOption value={'Tam'} color="success">
											Tam
										</IonSelectOption>
										<IonSelectOption value={'Eksik'} color="danger">
											Eksik
										</IonSelectOption>
									</IonSelect>
								</IonItem>
								<IonItem>
									<IonInput placeholder={formatMessage('Age')} aria-label={formatMessage('Age')} type="number" {...register('age', { required: true })}></IonInput>
								</IonItem>
								<IonItem>
									<IonInput placeholder={formatMessage('Info')} aria-label={formatMessage('Info')} type="text" {...register('info', { required: true })}></IonInput>
								</IonItem>
							</IonList>
							<IonButton className="ion-margin-top " type="submit" expand="block" color="secondary" onClick={() => setIsAddPetOpen(false)}>
								<span>{formatMessage('Add')}</span>
							</IonButton>
						</form>
					</IonCol>
				</IonRow>
			</IonGrid>
		</IonModal>
	)
}

export default AddPet
