import { IonContent, IonPage } from '@ionic/react'
import React from 'react'

const Authorized = ({ children }) => {
	return (
		<IonPage>
			<IonContent color="tertiary" className="ion-padding">
				{children}
			</IonContent>
		</IonPage>
	)
}

export default Authorized
