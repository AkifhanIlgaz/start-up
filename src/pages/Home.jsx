import { IonButton } from '@ionic/react'
import { useEffect, useState } from 'react'

export const Home = () => {
	const [data, setData] = useState(0)

	useEffect(() => {
		setData(100)
	}, [])

	return (
		<div>
			SAYAÇ: {data}
			<IonButton onclick={() => setData(data + 1)}>Tıkla</IonButton>
			<div>SAYAÇ: {data}</div>
			<div>SAYAÇ: {data}</div>
		</div>
	)
}

export default Home
