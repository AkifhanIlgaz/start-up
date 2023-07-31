import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonIcon, IonToast } from '@ionic/react'
import { heartOutline } from 'ionicons/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useRecoilState } from 'recoil'
import Request, { MatchRequest } from '../api/request'
import userState from '../atoms/user'

const PetCard = ({ pet }) => {
	const history = useHistory()
	const [user] = useRecoilState(userState)
	const [isToastOpen, setIsToastOpen] = useState(false)
	const [toastMessage, setToastMessage] = useState('Request is successfully sent!')

	const goProfile = userId => {
		history.push(`/users/${userId}`)
	}

	// TODO : Open a modal when user wants to send match request to select which pet will be used for request
	// For now, assume that every user only has one pet
	const sendMatchRequest = async () => {
		try {
			const req = new Request()
			const matchRequest = new MatchRequest(user.uid, user.photoURL, pet.ownerId, pet.photoURL, 'pending', '')
			const res = await req.addDocument('matchRequests', { ...matchRequest })
			matchRequest.id = res.id
			await req.setDocument('matchRequests', res.id, { ...matchRequest })
		} catch (error) {
			throw error
		}
	}

	return (
		<IonCard>
			<img src={pet.photoURL} alt="pet image" style={{ width: '100vh', height: '250px' }} />
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
					<IonButton
						id="send-match-request"
						color={'danger'}
						size="small"
						onClick={() => {
							sendMatchRequest()
								.then(() => setIsToastOpen(true))
								.catch(err => {
									console.log(err)
									setToastMessage('Error occurred when sending match request')
								})
						}}
					>
						<IonIcon icon={heartOutline}></IonIcon>
					</IonButton>
					<IonToast color={toastMessage === 'Request is successfully sent!' ? 'success' : 'danger'} position="top" isOpen={isToastOpen} message={toastMessage} onDidDismiss={() => setIsToastOpen(false)} duration={2000}></IonToast>
				</IonCardTitle>
				<IonCardSubtitle>
					<span onClick={() => goProfile(pet.ownerId)}>{pet.ownerName}</span>
				</IonCardSubtitle>
			</IonCardHeader>
			<IonCardContent>
				{pet.info}
				<div className="ion-padding-top">
					<IonChip color={'primary'}>Type: {pet.breed}</IonChip>
					<IonChip color={'tertiary'}> Age: {pet.age}</IonChip>
					{pet.vaccines == 'Tam' ? <IonChip color={'success'}>Vaccines: Tam</IonChip> : <IonChip color={'danger'}>Vaccines: Eksik</IonChip>}
				</div>
			</IonCardContent>
		</IonCard>
	)
}

export default PetCard
