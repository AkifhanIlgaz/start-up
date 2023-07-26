import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonIcon } from '@ionic/react'
import Authorized from '../layouts/Authorized'
import { heartOutline } from 'ionicons/icons'
import PetCard from '../components/PetCard'
import Request from '../api/request'
import { useEffect, useState } from 'react'
import { Geolocation } from '@capacitor/geolocation'

function distance(lat1, lon1, lat2, lon2) {
	if (lat1 == lat2 && lon1 == lon2) {
		return 0
	} else {
		var radlat1 = (Math.PI * lat1) / 180
		var radlat2 = (Math.PI * lat2) / 180
		var theta = lon1 - lon2
		var radtheta = (Math.PI * theta) / 180
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
		if (dist > 1) {
			dist = 1
		}
		dist = Math.acos(dist)
		dist = (dist * 180) / Math.PI
		dist = dist * 60 * 1.1515
		return dist * 1.609344
	}
}

export const Home = () => {
	const [pets, setPets] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const req = new Request()
			const petsRes = await req.getDocuments('pets')
			const coordinates = await Geolocation.getCurrentPosition()

			petsRes.sort((a, b) => distance(coordinates.coords.latitude, coordinates.coords.longitude, a.lat, a.long) - distance(coordinates.coords.latitude, coordinates.coords.longitude, b.lat, b.long))
			petsRes.forEach(pet => {
				console.log(`Distance: ${distance(coordinates.coords.latitude, coordinates.coords.longitude, pet.lat, pet.long)}
				Pet: ${pet.name} `)
			})
			setPets(petsRes)
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
