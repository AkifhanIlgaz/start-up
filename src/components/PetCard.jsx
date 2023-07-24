import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonIcon, IonRow } from '@ionic/react'
import React from 'react'
import { heartOutline } from 'ionicons/icons'
import { useHistory } from 'react-router'

const PetCard = props => {
	const history = useHistory()

	const goProfile = userId => {
		history.push(`/profile/${userId}`)
	}

	return (
		<IonCard>
			<img src={props.imgUrl} alt="pet image" />
			<IonCardHeader className="ion-padding-bottom">
				<IonCardTitle
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<span>{props.petName}</span>
					<IonButton color={'danger'} size="small">
						<IonIcon icon={heartOutline}></IonIcon>
					</IonButton>
				</IonCardTitle>
				<IonCardSubtitle>
					<span onClick={() => goProfile(props.ownerId)}>{props.ownerName}</span>
				</IonCardSubtitle>
			</IonCardHeader>
			<IonCardContent>
				{props.info}
				<div className="ion-padding-top">
					<IonChip color={'primary'}>Type: {props.type}</IonChip>
					<IonChip color={'tertiary'}> Age: {props.age}</IonChip>
					{props.vaccines ? <IonChip color={'success'}>Vaccines: Tam</IonChip> : <IonChip color={'danger'}>Vaccines: Eksik</IonChip>}
				</div>
			</IonCardContent>
		</IonCard>
	)
}

export default PetCard
