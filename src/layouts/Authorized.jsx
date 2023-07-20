import { IonContent, IonPage } from '@ionic/react'

export const Authorized = ({ children }) => {
	return (
		<IonPage>
			<IonContent color="tertiary" className="ion-no-padding">
				{children}
			</IonContent>
		</IonPage>
	)
}

export default Authorized
