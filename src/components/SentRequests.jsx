import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import userState from '../atoms/user'
import Request from '../api/request'
import { IonAvatar, IonButton, IonChip, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from '@ionic/react'
import { heart, trash, warning } from 'ionicons/icons'

const SentRequests = () => {
	const [user] = useRecoilState(userState)
	const [requests, setRequests] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const req = new Request()
			const matchRequests = await req.getMatchRequests(user.uid, 'pending')
			console.log(matchRequests)
			setRequests(matchRequests)
		}

		fetchData()
	}, [])

	return (
		<IonList>
			{requests.map(request => {
				return (
					<div key={request.id}>
						<IonItemSliding>
							<IonItem>
								<IonAvatar slot="start">
									<img src={user.photoURL} alt="" />
								</IonAvatar>
								<IonIcon icon={heart}></IonIcon>
								<IonAvatar>
									<img src={user.photoURL} alt="" />
								</IonAvatar>
								<IonChip color="warning">{request.status}</IonChip>
							</IonItem>
							<IonItemOptions side="end">
								<IonItemOption color={'danger'}>
									<IonIcon slot="icon-only" icon={trash} onClick={() => console.log('delete request')}></IonIcon>
								</IonItemOption>
							</IonItemOptions>
						</IonItemSliding>
					</div>
				)
			})}
		</IonList>
	)
}

export default SentRequests
