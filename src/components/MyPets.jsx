import { IonAvatar, IonButton, IonButtons, IonCol, IonGrid, IonHeader, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonList, IonModal, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import Request from '../api/request'
import { useRecoilState } from 'recoil'
import userState from '../atoms/user'
import PetCard from './PetCard'

const MyPets = () => {
	const [user, setUser] = useRecoilState(userState)
	const [pets, setPets] = useState([])
	const [isOpen, setIsOpen] = useState(false)

	const deletePet = async id => {
		const req = new Request()
		await req.deleteDocument('pets', id)
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const req = new Request()
				const res = await req.getPets(user.uid)
				console.log(res)
				setPets(res)
			} catch (error) {
				console.log(error)
			}
		}

		fetchData()
	}, [pets])

	return (
		<IonList>
			{pets.map(pet => (
				<div key={pet.id}>
					<IonItemSliding>
						<IonItem>
							<IonAvatar className="ion-no-padding">
								<img src={pet.photoURL} alt="" />
							</IonAvatar>
							<span style={{ marginLeft: '1rem' }}>{pet.name}</span>
						</IonItem>
						<IonItemOptions>
							<IonItemOption color={'primary'}>
								<IonButton onClick={() => setIsOpen(true)}>Info</IonButton>
								<IonModal isOpen={isOpen}>
									<IonHeader>
										<IonToolbar>
											<IonButtons slot="end">
												<IonTitle>{pet.name}</IonTitle>
												<IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
											</IonButtons>
										</IonToolbar>
									</IonHeader>
									<IonGrid className="ion-align-items-center ion-justify-content-center ion-height">
										<IonRow className="ion-align-items-center ion-justify-content-center ion-height ">
											<IonCol size="12" size-md="6" size-lg="4">
												<PetCard pet={pet} />
											</IonCol>
										</IonRow>
									</IonGrid>
								</IonModal>
							</IonItemOption>
							<IonItemOption color={'success'}>
								<IonButton onClick={() => console.log('edit pet')}>Edit</IonButton>
							</IonItemOption>
							<IonItemOption color={'danger'}>
								<IonButton onClick={() => deletePet(pet.id)}>Delete</IonButton>
							</IonItemOption>
						</IonItemOptions>
					</IonItemSliding>
				</div>
			))}
		</IonList>
	)
}

export default MyPets
