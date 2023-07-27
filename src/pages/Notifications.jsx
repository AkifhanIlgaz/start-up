import { IonContent, IonHeader, IonLabel, IonGrid, IonPage, IonSegment, IonSegmentButton, IonRow, IonToolbar, IonCol, IonCard, IonCardContent } from '@ionic/react'
import React, { useState } from 'react'
import SentRequests from '../components/SentRequests'
import ReceivedRequests from '../components/ReceivedRequests'
import Authorized from '../layouts/Authorized'

const Notifications = () => {
	const [segment, setSegment] = useState('sent')
	return (
		<Authorized>
			<IonToolbar className="ion-no-padding" color={'tertiary'}>
				<IonSegment value={segment} onIonChange={e => setSegment(e.detail.value)}>
					<IonSegmentButton value={'sent'}>
						<IonLabel>Sent</IonLabel>
					</IonSegmentButton>
					<IonSegmentButton value={'received'}>
						<IonLabel>Received</IonLabel>
					</IonSegmentButton>
				</IonSegment>
			</IonToolbar>
			<IonContent color="tertiary" className="ion-no-padding">
				<IonGrid className="ion-align-items ion-justify-content-center ion-height ">
					<IonRow className="ion-justify-content-center ion-height">
						<IonCol size="12" size-md="6" size-lg="4">
							{segment === 'sent' ? <SentRequests /> : <ReceivedRequests />}
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</Authorized>
	)
}

export default Notifications
