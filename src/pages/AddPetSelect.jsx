import { IonContent, IonInput, IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'
import userState from '../atoms/user'

const AddPetSelect = () => {
	const [user, setUser] = useRecoilState(userState)
	const [pet, setPet] = useState({ userId: user.uid })
	console.log(user)
	const intl = useIntl()

	const formatMessage = (id, values) => intl.formatMessage({ id: id }, { ...values })

	const options = ['Apples', 'Oranges', 'Bananas']

	return (
		<IonContent color={'success'}>
			<IonList>
				<IonItem>
					<IonSelect shape="round" aria-label="Fruit" placeholder="Select fruit" onIonChange={e => console.log(`ionChange fired with value: ${e.detail.value}`)} onIonCancel={() => console.log('ionCancel fired')} onIonDismiss={() => console.log('ionDismiss fired')}>
						{options.map(option => {
							return <IonSelectOption value={option.toLowerCase()}>{option}</IonSelectOption>
						})}
					</IonSelect>
				</IonItem>
				<IonItem>
					<IonInput label={formatMessage('Password')} type="password" labelPlacement="floating" className="ion-padding-start ion-padding-end ion-input ion-margin-top" />
				</IonItem>
			</IonList>
		</IonContent>
	)
}

export default AddPetSelect
