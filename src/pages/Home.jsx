import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonIcon } from '@ionic/react'
import { heartOutline } from 'ionicons/icons'
import Cat from '../assets/cat.jpg'



const Alert = () => {
	return (
		<div style={{ display: 'inline-block', float: 'right' }}>
			<IonButton id="present-alert" color="danger" expand="size">
				<IonIcon icon={heartOutline}></IonIcon>
			</IonButton>

			<IonAlert
				header="Like"
				trigger="present-alert"
				buttons={[
					{
						text: 'Cancel',
						role: 'cancel',
						handler: () => {
							setHandlerMessage('Alert canceled')
						}
					},
					{
						text: 'OK',
						role: 'confirm',
						handler: () => {
							setHandlerMessage('Alert confirmed')
						}
					}
				]}
				onDidDismiss={({ detail }) => setRoleMessage(`Dismissed with role: ${detail.role}`)}
			></IonAlert>
		</div>
	)
}

export const Home = () => {
	return (
		<IonCard>
			<img src={Cat} alt="Cat" width={'100%'} />
			<IonCardHeader>
				<IonCardTitle>
					Pet Name
					<Alert></Alert>
				</IonCardTitle>
			</IonCardHeader>

			<IonCardContent>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit obcaecati repudiandae excepturi, vero nihil totam?</IonCardContent>
			<div align="center" className="ion-padding-bottom">
				<IonChip color="secondary">Cat</IonChip>
				<IonChip color="secondary">Cat</IonChip>
				<IonChip color="secondary">Cat</IonChip>
				<IonChip color="secondary">Cat</IonChip>
				<IonChip color="secondary">Cat</IonChip>
			</div>
		</IonCard>
	)
}

export default Home
