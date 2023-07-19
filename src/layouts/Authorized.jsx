import { IonContent, IonPage } from '@ionic/react'

export const Authorized = ({ children }) => {
	return (
		<IonPage>
			<IonContent color="tertiary" className="ion-padding">
				{children}
			</IonContent>
		</IonPage>
	)
}

export default Authorized
