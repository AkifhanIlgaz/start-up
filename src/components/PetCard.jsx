import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonIcon, IonRow } from '@ionic/react'
import React from 'react'
import { heartOutline } from 'ionicons/icons'
import { useHistory } from 'react-router'

const PetCard = ({ pet }) => {
	const history = useHistory()

	const goProfile = userId => {
		history.push(`/profile/${userId}`)
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
					<IonButton color={'danger'} size="small">
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
