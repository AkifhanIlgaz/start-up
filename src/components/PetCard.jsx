import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonIcon } from '@ionic/react'
import { heartOutline } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router'
import { useRecoilState } from 'recoil'
import Request, { MatchRequest, MatchRequestCollection } from '../api/request'
import userState from '../atoms/user'

const PetCard = ({ pet }) => {
	const history = useHistory()
	const [user] = useRecoilState(userState)

	const goProfile = userId => {
		history.push(`/users/${userId}`)
	}

	const sendMatchRequest = async () => {
		try {
			const req = new Request()
			const matchRequest = new MatchRequest(user.uid, user.photoURL, pet.ownerId, pet.photoURL, 'pending', '')
			const res = await req.addDocument(MatchRequestCollection, { ...matchRequest })
			matchRequest.id = res.id
			await req.setDocument(MatchRequestCollection, res.id, { ...matchRequest })
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
