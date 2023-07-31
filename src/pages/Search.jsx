import { Geolocation } from '@capacitor/geolocation'
import { GoogleMap } from '@capacitor/google-maps'
import { useEffect, useRef, useState } from 'react'
import Request, { PetsCollection } from '../api/request'
import firebaseConfig from '../config'
import Authorized from '../layouts/Authorized'

export const Search = () => {
	const [coordinate, setCoordinate] = useState({
		latitude: 38.9637,
		longitude: 35.2433
	})

	const mapRef = useRef()

	useEffect(() => {
		const loadMap = async () => {
			const req = new Request()
			const pets = await req.getDocuments(PetsCollection)
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
				},
				...pets.map(pet => {
					const infoWindow = new google.maps.InfoWindow()
					const marker = new google.maps.Marker({
						position: new google.maps.LatLng({ lat: pet.lat, lng: pet.lng }),
						map: newMap,
						title: pet.name
					})

					marker.addListener('click', () => {
						infoWindow.open({
							anchor: marker,
							map: newMap
						})
					})
					return marker
				})
			]

			// TODO => Pop up info window on click marker
			await newMap.addMarkers(markers)
			await newMap.setOnMarkerClickListener(marker => {
				const infoWindow = new google.maps.InfoWindow({})
				infoWindow.open({
					map: newMap,
					anchor: marker
				})
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
					width: '100vh',
					height: '100vh'
				}}
			></capacitor-google-map>
		</Authorized>
	)
}

export default Search
