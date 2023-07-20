import { IonButton, IonCardContent, IonCol, IonInput, IonLabel, IonRow, useIonAlert } from '@ionic/react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { useHistory, useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import Request from '../api/request'
import { userState } from '../atoms/user'
import NotAuthorized from '../layouts/NotAuthorized'

export const Login = () => {
	const history = useHistory()

	const location = useLocation()

	const intl = useIntl()

	const formatMessage = (id, values) => intl.formatMessage({ id: id }, { ...values })

	const [user, setUser] = useRecoilState(userState)

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

	const onSubmit = async data => {
		const fetchData = async () => {
			try {
				const req = new Request()
				const res = await req.signInWithEmail(data.email, data.password)
				if (res === false) {
					alert('HATA', 'kayıt bulunamadı')
					history.push('/register')
					return
				}
				setUser(res)
				history.push('/home')
			} catch (error) {
				alert('HATA', error.message)
			}
		}

		fetchData()
	}

	const goRegister = () => {
		history.push('/register')
	}
	return (
		<NotAuthorized onSubmit={handleSubmit(onSubmit)}>
			<IonCardContent>
				<IonLabel color="light" className="ion-bold">
					{formatMessage('E-Mail')}
				</IonLabel>
				<IonRow className="ion-align-items-center">
					<IonCol className="ion-no-padding">
						<IonInput type="email" placeholder={formatMessage('E-Mail')} className="ion-padding-start ion-padding-end" {...register('email', { required: true })} />
						{errors.email && <IonLabel color="danger">Bu alan gerekli!</IonLabel>}
					</IonCol>
				</IonRow>
				<IonLabel color="light" className="ion-bold">
					{formatMessage('Password')}
				</IonLabel>
				<IonRow className="ion-align-items-center">
					<IonCol className="ion-no-padding">
						<IonInput type="password" placeholder={formatMessage('Password')} className="ion-padding-start ion-padding-end" {...register('password', { required: true })} />
						{errors.password && <IonLabel color="danger">Bu alan gerekli!</IonLabel>}
					</IonCol>
				</IonRow>
				<IonButton type="submit" expand="full" color="secondary">
					<p>GİRİŞ YAP</p>
				</IonButton>
				<IonButton expand="full" color="secondary" onClick={() => goRegister()}>
					<p>KAYIT OL</p>
				</IonButton>
			</IonCardContent>
		</NotAuthorized>
	)
}

export default Login
