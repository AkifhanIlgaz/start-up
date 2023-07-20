import { Geolocation } from '@capacitor/geolocation'
import { GoogleMap } from '@capacitor/google-maps'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { firebaseConfig } from '../api/request'
import { userState } from '../atoms/user'
import Authorized from '../layouts/Authorized'

export const Home = () => {
	const [user, setUser] = useRecoilState(userState)

	const [coordinate, setCoordinate] = useState({ latitude: 38.9637, longitude: 35.2433 })

	const mapRef = useRef()

	let newMap

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
			newMap.addMarkers([{ coordinate: { lat: coordinates.coords.latitude, lng: coordinates.coords.longitude }, title: 'BAŞLIK', snippet: 'AÇIKLAMA' }])
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

export default Home
