import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonIcon } from '@ionic/react'
import Authorized from '../layouts/Authorized'
import { heartOutline } from 'ionicons/icons'
import PetCard from '../components/PetCard'

const pet = {
	imgUrl: 'https://ionicframework.com/docs/img/demos/card-media.png',
	petName: 'Mırmır',
	ownerName: 'Jon',
	info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio placeat, tempora praesentium cumque alias quod!',
	type: 'Van',
	age: 2,
	vaccines: 'Tam'
}

export const Home = () => {
	return (
		<Authorized>
			<PetCard imgUrl={pet.imgUrl} petName={pet.petName} ownerName={pet.ownerName} info={pet.info} type={pet.type} age={pet.age} vaccines={pet.vaccines} />
		</Authorized>
	)
}

export default Home
