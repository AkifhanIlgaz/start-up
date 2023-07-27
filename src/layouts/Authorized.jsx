import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonTitle } from '@ionic/react'
import React from 'react'

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
