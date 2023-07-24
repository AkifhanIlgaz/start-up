import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonIcon } from '@ionic/react'
import React from 'react'
import { heartOutline } from 'ionicons/icons'

const PetCard = props => {
	return (
		<IonCard>
			<img src={props.imgUrl} alt="pet image" />
			<IonCardHeader>
				<IonCardTitle>
					{props.petName}
					<IonIcon icon={heartOutline}></IonIcon>
				</IonCardTitle>
				<IonCardSubtitle>{props.ownerName}</IonCardSubtitle>
			</IonCardHeader>
			<IonCardContent>
				{props.info}
				<IonChip>{props.type}</IonChip>
				<IonChip>{props.age}</IonChip>
				<IonChip>{props.vaccines}</IonChip>
			</IonCardContent>
		</IonCard>
	)
}

export default PetCard
