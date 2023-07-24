import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonList, IonModal, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'
import userState from '../atoms/user'
import Request from '../api/request'

const Input = props => {
	return <IonInput label={props.label} type={props.type} labelPlacement="floating" className="ion-padding-start ion-padding-end ion-input" {...props.register(props.name, { required: props.required })}></IonInput>
}

const AddPet = () => {
	const modal = useRef(null)
	const page = useRef(null)
	const [presentingElement, setPresentingElement] = useState(null)

	useEffect(() => {
		setPresentingElement(page.current)
	}, [])

	function dismiss() {
		modal.current.dismiss()
	}

	const [user, setUser] = useRecoilState(userState)

	const intl = useIntl()

	const formatMessage = (id, values) => intl.formatMessage({ id: id }, { ...values })

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const onSubmit = async data => {
		data = { ...data, userId: user.uid }
		const req = new Request()
		await req.addDocument('pets', data)
	}

	return (
		<>
			<IonModal ref={modal} trigger="open-modal" presentingElement={presentingElement}>
				<IonHeader>
					<IonToolbar>
						<IonTitle>Add Pet</IonTitle>
						<IonButtons slot="end">
							<IonButton onClick={dismiss}>Close</IonButton>
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
												<IonInput label={formatMessage('Name')} type="text" labelPlacement="floating" className="ion-padding-start ion-padding-end ion-input  ion-margin-bottom" {...register('name', { required: true })}></IonInput>
												<IonInput label={formatMessage('Type')} type="text" labelPlacement="floating" className="ion-padding-start ion-padding-end ion-input ion-margin-bottom" {...register('type', { required: true })}></IonInput>
												<IonInput label={formatMessage('Gender')} type="text" labelPlacement="floating" className="ion-padding-start ion-padding-end ion-input ion-margin-bottom" {...register('gender', { required: true })}></IonInput>
												<IonInput label={formatMessage('Age')} type="number" labelPlacement="floating" className="ion-padding-start ion-padding-end ion-input ion-margin-bottom" {...register('age', { required: true })}></IonInput>
												<IonInput label={formatMessage('Info')} type="text" labelPlacement="floating" className="ion-padding-start ion-padding-end ion-input ion-margin-bottom" {...register('info', { required: true })}></IonInput>
												<IonInput label={formatMessage('Vaccines')} type="text" labelPlacement="floating" className="ion-padding-start ion-padding-end ion-input ion-margin-bottom" {...register('vaccines', { required: true })}></IonInput>
												<IonButton className="ion-margin-top " type="submit" expand="block" color="secondary">
													<span>{formatMessage('Sign In')}</span>
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
		</>
	)
}

export default AddPet
