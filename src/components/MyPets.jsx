import { IonAvatar, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonList } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import Request from '../api/request'
import { useRecoilState } from 'recoil'
import userState from '../atoms/user'

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
	return (
		<IonItemSliding>
			<IonItem>
				<IonAvatar className="ion-no-padding">
					<img src={pet.photoURL} alt="" />
				</IonAvatar>
				<span style={{ marginLeft: '1rem' }}>{pet.name}</span>
			</IonItem>
			<Options />
		</IonItemSliding>
	)
}

const MyPets = () => {
	const [user, setUser] = useRecoilState(userState)
	const [pets, setPets] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const req = new Request()
				const res = await req.getPets(user.uid)
				setPets(res)
			} catch (error) {
				console.log(error)
			}
		}

		fetchData()
	}, [])

	return (
		<IonList>
			{pets.map(pet => (
				<PetCard key={pet.id} pet={pet} />
			))}
		</IonList>
	)
}

export default MyPets
