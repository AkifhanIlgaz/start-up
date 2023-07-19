import { IonCard, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react'
import React from 'react'

export const NotAuthorized = ({ onSubmit, children }) => {
	return (
		<IonPage>
			<IonContent color="tertiary" className="ion-padding" scrollY={false}>
				<form onSubmit={onSubmit}>
					<IonGrid className="ion-align-items-center ion-justify-content-center ion-height">
						<IonRow class="ion-align-items-center ion-justify-content-center ion-height">
							<IonCol size="12" sizeMd="6" sizeLg="4">
								<IonCard className="auth-card ion-transparent">{children}</IonCard>
							</IonCol>
						</IonRow>
					</IonGrid>
				</form>
			</IonContent>
		</IonPage>
	)
}

export default NotAuthorized
