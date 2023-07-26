import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonIcon, IonRow } from '@ionic/react'
import React from 'react'
import { heartOutline } from 'ionicons/icons'
import { useHistory } from 'react-router'
import { useRecoilState } from 'recoil'
import userState from '../atoms/user'
import Request, { MatchRequest } from '../api/request'

const PetCard = ({ pet }) => {
	const history = useHistory()
	const [user] = useRecoilState(userState)

	const goProfile = userId => {
		history.push(`/users/${userId}`)
	}

	// TODO : Open a modal when user wants to send match request to select which pet will be used for request
	// For now, assume that every user only has one pet
	const sendMatchRequest = async () => {
		try {
			const req = new Request()
			const matchRequest = new MatchRequest(user.uid, pet.ownerId, 'pending', '')
			const res = await req.addDocument('matchRequests', { ...matchRequest })
			matchRequest.id = res.id
			await req.setDocument('matchRequests', res.id, { ...matchRequest })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<IonCard>
			<img src={pet.photoURL} alt="pet image" style={{ width: '100vh', height: '300px' }} />
			<IonCardHeader className="ion-padding-bottom">
				<IonCardTitle
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<span>{pet.name}</span>
					<IonButton color={'danger'} size="small" onClick={sendMatchRequest}>
						Send Request
						<IonIcon icon={heartOutline}></IonIcon>
					</IonButton>
				</IonCardTitle>
				<IonCardSubtitle>
					<span onClick={() => goProfile(pet.ownerId)}>{pet.ownerName}</span>
				</IonCardSubtitle>
			</IonCardHeader>
			<IonCardContent>
				{pet.info}
				<div className="ion-padding-top">
					<IonChip color={'primary'}>Type: {pet.type}</IonChip>
					<IonChip color={'tertiary'}> Age: {pet.age}</IonChip>
					{pet.vaccines ? <IonChip color={'success'}>Vaccines: Tam</IonChip> : <IonChip color={'danger'}>Vaccines: Eksik</IonChip>}
				</div>
			</IonCardContent>
		</IonCard>
	)
}

export default PetCard
