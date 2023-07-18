import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonPage, IonRow } from '@ionic/react'
import React from 'react'

const Home = () => {
	return (
		<IonPage>
			<IonContent>
				<IonGrid>
					<IonRow>
						<IonCol>
							<IonInput></IonInput>
							<IonButton onClick={() => console.log('Clicked')}>Click me</IonButton>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	)
}

export default Home
