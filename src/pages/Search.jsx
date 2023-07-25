import { Geolocation } from '@capacitor/geolocation'
import { GoogleMap } from '@capacitor/google-maps'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../atoms/user'
import firebaseConfig from '../config'
import Authorized from '../layouts/Authorized'

export const Search = () => {
	const [user, setUser] = useRecoilState(userState)

	const [coordinate, setCoordinate] = useState({
		latitude: 38.9637,
		longitude: 35.2433
	})

	const mapRef = useRef()

	let newMap

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

	const markerClicked = e => {
		console.log(e)
	}

	useEffect(() => {
		const loadMap = async () => {
			const coordinates = await Geolocation.getCurrentPosition()
			console.log('Current position:', coordinates.coords)
			setCoordinate(coordinates.coords)
			newMap = await GoogleMap.create({
				id: 'map',
				element: mapRef.current,
				apiKey: firebaseConfig.apiKey,
				config: {
					center: {
						lat: coordinates.coords.latitude,
						lng: coordinates.coords.longitude
					},
					zoom: 12
				}
			})
			newMap.addMarkers([
				{
					coordinate: {
						lat: coordinates.coords.latitude,
						lng: coordinates.coords.longitude
					},
					title: 'BAŞLIK',
					snippet: 'AÇIKLAMA'
				},
				pets.map(pet => {
					return {
						coordinate: {
							lat: pet.lat,
							long: pet.long
						}
					}
				})
			])
			await newMap.setOnMarkerClickListener(e => {
				markerClicked(e)
			})
		}
		loadMap()
	}, [])

	return (
		<Authorized>
			<capacitor-google-map
				ref={mapRef}
				style={{
					display: 'inline-block',
					width: '100%',
					height: '100vh'
				}}
			></capacitor-google-map>
		</Authorized>
	)
}

export default Search
