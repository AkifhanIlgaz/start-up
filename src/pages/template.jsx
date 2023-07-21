import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'

const Component = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Page Title</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">UI goes here...</IonContent>
		</IonPage>
	)
}

export default Component
