import { Geolocation } from '@capacitor/geolocation'
import { GoogleMap } from '@capacitor/google-maps'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../atoms/user'
import firebaseConfig from '../config'
import Authorized from '../layouts/Authorized'
import Request from '../api/request'
import { info } from 'sass'

export const Search = () => {
	const [user, setUser] = useRecoilState(userState)

	const [coordinate, setCoordinate] = useState({
		latitude: 38.9637,
		longitude: 35.2433
	})

	const mapRef = useRef()

	useEffect(() => {
		const loadMap = async () => {
			const req = new Request()
			const pets = await req.getDocuments('pets')
			const coordinates = await Geolocation.getCurrentPosition()
			setCoordinate(coordinates.coords)

			const newMap = await GoogleMap.create({
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
			const markers = [
				{
					coordinate: {
						lat: coordinates.coords.latitude,
						lng: coordinates.coords.longitude
					},
					title: 'Me'
				}
			]
			pets.forEach(pet => {
				markers.push({
					coordinate: {
						lat: pet.lat,
						lng: pet.long
					},
					title: pet.ownerName
				})
			})
			
			newMap.addMarkers(markers)
			await newMap.setOnMarkerClickListener(e => {
				
				// const infoWindow = new google.maps.InfoWindow({
				// 	content: e.title
				// })
				// infoWindow.open()
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
