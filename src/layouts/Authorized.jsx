import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonTitle } from '@ionic/react'
import React from 'react'

export const Authorized = ({ children }) => {
	return (
		<IonPage>
			<IonContent color="tertiary" className="ion-no-padding">
				<IonGrid className="ion-align-items-center ion-justify-content-center ion-height ">
					<IonRow className="ion-align-items-center ion-justify-content-center ion-height">
						<IonCol size="12" size-md="6" size-lg="4">
							{children}
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	)
}

export default Authorized
