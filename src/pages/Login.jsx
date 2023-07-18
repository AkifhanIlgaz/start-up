import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonPage, IonRow } from '@ionic/react'
import React, { useEffect, useState } from 'react'

const Login = () => {
	const [data, setData] = useState('')

	useEffect(() => {
		console.log(data)
	}, [data])

	return (
		<IonPage>
			<IonContent>
				<IonGrid>
					<IonRow>
						<IonCol>
							<IonInput onIonInput={e => setData(e.detail.value)}></IonInput>
							<IonButton onClick={() => console.log('Clicked')}>Log In</IonButton>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	)
}

export default Login
