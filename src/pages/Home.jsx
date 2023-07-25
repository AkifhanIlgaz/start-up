import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonIcon } from '@ionic/react'
import Authorized from '../layouts/Authorized'
import { heartOutline } from 'ionicons/icons'
import PetCard from '../components/PetCard'
import Request from '../api/request'
import { useEffect, useState } from 'react'
import { Geolocation } from '@capacitor/geolocation'

function calcCrow(lat1, lon1, lat2, lon2) {
	var R = 6371 // km
	var dLat = toRad(lat2 - lat1)
	var dLon = toRad(lon2 - lon1)
	var lat1 = toRad(lat1)
	var lat2 = toRad(lat2)

	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	var d = R * c
	return d
}

function toRad(Value) {
	return (Value * Math.PI) / 180
}

export const Home = () => {
	const [pets, setPets] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const req = new Request()
			const pets = await req.getDocuments('pets')
			console.log(pets)
			const coordinates = await Geolocation.getCurrentPosition()
			pets.sort((a, b) => calcCrow(coordinates.latitude, coordinates.longitude, a.lat, a.long) - calcCrow(coordinates.latitude, coordinates.longitude, b.lat, b.long))
			setPets(pets)
			console.log(pets)
		}

		fetchData()
	}, [])

	return (
		<Authorized>
			{pets.map(pet => {
				return <PetCard key={pet.id} pet={pet} />
			})}
		</Authorized>
	)
}

export default Home
