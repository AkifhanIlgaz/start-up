import { IonButton, IonCardContent, IonCol, IonInput, IonRow } from '@ionic/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router'
import Request from '../api/request'
import NotAuthorized from '../layouts/NotAuthorized'

const PasswordReset = () => {
	const history = useHistory()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const intl = useIntl()

	const formatMessage = (id, values) => intl.formatMessage({ id: id }, { ...values })

	const onSubmit = async data => {
		const resetPassword = async () => {
			try {
				const req = new Request()
				const res = await req.resetPasswordWithEmail(data.email)
				if (res === false) {
					alert('HATA', ' ')
					return
				}
				history.push('/login')
			} catch (error) {
				alert('HATA', error.message)
			}
		}

		resetPassword()
	}

	return (
		<NotAuthorized onSubmit={handleSubmit(onSubmit)}>
			<IonCardContent>
				<IonRow className="ion-align-items-center">
					<IonCol className="ion-no-padding">
						<IonInput fill="outline" label={formatMessage('E-Mail')} placeholder="johndoe@gmail.com" type="email" labelPlacement="floating" className="ion-padding-start ion-padding-end" {...register('email', { required: true })}></IonInput>
						{/* <IonInput type="email" placeholder={formatMessage('E-Mail')} className="ion-padding-start ion-padding-end" {...register('email', { required: true })} /> */}
						{errors.email && <IonLabel color="danger">Bu alan gerekli!</IonLabel>}
					</IonCol>
				</IonRow>
				<IonButton className="ion-margin-top " type="submit" expand="block" color="secondary" shape="round">
					<p>{formatMessage('Send')}</p>
				</IonButton>
			</IonCardContent>
		</NotAuthorized>
	)
}

export default PasswordReset
