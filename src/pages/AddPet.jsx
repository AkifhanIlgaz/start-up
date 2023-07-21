import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonInput, IonList, IonRow, IonSelect, IonSelectOption } from '@ionic/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'
import userState from '../atoms/user'

const Input = props => {
	return (
		<IonRow className="ion-align-items-center">
			<IonCol className="ion-padding-top">
				<IonInput label={props.label} type={props.type} labelPlacement="floating" className="ion-padding-start ion-padding-end ion-input" {...props.register(props.name, { required: props.required })}></IonInput>
			</IonCol>
		</IonRow>
	)
}

const AddPet = () => {
	const [user, setUser] = useRecoilState(userState)
	console.log(user)
	const intl = useIntl()

	const formatMessage = (id, values) => intl.formatMessage({ id: id }, { ...values })

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const onSubmit = async data => {
		console.log(data)
	}
	const options = ['Apples', 'Oranges', 'Bananas']

	return (
		<IonContent color={'success'}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<IonGrid className="ion-align-items-center ion-justify-content-center ion-height ">
					<IonRow className="ion-align-items-center ion-justify-content-center ion-height">
						<IonCol size="12" size-md="6" size-lg="4">
							<IonCard className="ion-transparent">
								<IonCardContent className="card-content">
									<Input label={formatMessage('Name')} type="text" formLabel="name" name="name" required="true" register={register} />
									<Input label={formatMessage('Type')} type="text" formLabel="type" name="type" required="true" register={register} />
									<Input label={formatMessage('Type')} type="text" formLabel="type" name="age" required="true" register={register} />
									<Input label={formatMessage('Type')} type="text" formLabel="type" name="info" required="true" register={register} />
									<Input label={formatMessage('Type')} type="text" formLabel="type" name="vaccines" required="true" register={register} />
									<IonList>
										<IonRow className="ion-align-items-center">
											<IonCol className="ion-padding-top ">
												<IonSelect interface="popover" placeholder="Select" className="ion-select">
													{options.map(option => {
														return <IonSelectOption cvalue={option.toLowerCase()}>{option}</IonSelectOption>
													})}
												</IonSelect>
											</IonCol>
										</IonRow>
									</IonList>

									<IonRow className="ion-align-items-center">
										<IonCol className="ion-no-padding">
											<IonButton className="ion-margin-top " type="submit" expand="block" color="secondary">
												<span>{formatMessage('Sign In')}</span>
											</IonButton>
										</IonCol>
									</IonRow>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
				</IonGrid>
			</form>
		</IonContent>
	)
}

export default AddPet
