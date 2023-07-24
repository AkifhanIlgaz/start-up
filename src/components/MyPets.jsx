import { IonAvatar, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonList } from '@ionic/react'
import React from 'react'

const Options = () => {
	return (
		<IonItemOptions>
			<IonItemOption color={'primary'}>Info</IonItemOption>
			<IonItemOption color={'success'}>Edit</IonItemOption>
			<IonItemOption color={'danger'}>Delete</IonItemOption>
		</IonItemOptions>
	)
}

const PetCard = ({ pet }) => {
	console.log(pet)
	return (
		<IonItemSliding>
			<IonItem>
				<IonAvatar className="ion-no-padding">
					<img src={pet.imgUrl} alt="" />
				</IonAvatar>
				<span style={{ marginLeft: '1rem' }}>{pet.name}</span>
			</IonItem>
			<Options />
		</IonItemSliding>
	)
}

const MyPets = ({ pets }) => {
	return (
		<IonList>
			{pets.map(pet => (
				<PetCard key={pet.imgURL} pet={pet} />
			))}
		</IonList>
	)
}

export default MyPets
