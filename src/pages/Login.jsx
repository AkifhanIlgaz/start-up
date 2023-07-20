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

	const goPasswordReset = () => {
		history.push('/password-reset')
	}

	return (
		<NotAuthorized onSubmit={handleSubmit(onSubmit)}>
			<IonCardContent>
				<IonRow className="ion-align-items-center">
					<IonCol className="ion-no-padding">
						<IonInput placeholder={formatMessage('E-Mail')} ariaLabel={formatMessage('E-Mail')} type="email" labelPlacement="floating" className="ion-padding-start ion-padding-end ion-input" {...register('email', { required: true })}></IonInput>
						{/* <IonInput type="email" placeholder={formatMessage('E-Mail')} className="ion-padding-start ion-padding-end" {...register('email', { required: true })} /> */}
						{errors.email && <IonLabel color="danger">Bu alan gerekli!</IonLabel>}
					</IonCol>
				</IonRow>
				<IonRow className="ion-align-items-center">
					<IonCol className="ion-no-padding">
						<IonInput fill="outline" label={formatMessage('Password')} type="password" placeholder="*****" labelPlacement="floating" className="ion-padding-start ion-padding-end ion-margin-top" {...register('password', { required: true })} />
						{errors.password && <IonLabel color="danger">Bu alan gerekli!</IonLabel>}
					</IonCol>
				</IonRow>
				<IonButton className="ion-margin-top " type="submit" expand="block" color="secondary" shape="round">
					<p>{formatMessage('Sign In')}</p>
				</IonButton>

				<div className="ion-text-center ">
					<a className="forgot-font" onClick={goPasswordReset} style={{ textDecoration: 'none', color: '-moz-initial' }}>
						{formatMessage('Forgot your password ?')}
					</a>
				</div>

				<hr />
				<IonButton expand="block" color="secondary" shape="round" onClick={() => goRegister()}>
					<p>{formatMessage('Sign Up')}</p>
				</IonButton>
			</IonCardContent>
		</NotAuthorized>
	)
}

export default Login
