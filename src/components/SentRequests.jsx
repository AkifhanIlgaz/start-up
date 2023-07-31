import { IonAvatar, IonChip, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from '@ionic/react'
import { heart, trash } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Request, { MatchRequestCollection } from '../api/request'
import userState from '../atoms/user'

const SentRequests = () => {
	const [user] = useRecoilState(userState)
	const [requests, setRequests] = useState([])
	const req = new Request()

	const deleteRequest = async requestId => {
		try {
			await req.deleteDocument(MatchRequestCollection, requestId)
			setRequests(requests.filter(request => request.id != requestId))
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			const matchRequests = await req.getSentMatchRequests(user.uid, 'pending')
			setRequests(matchRequests)
		}
		fetchData()
	}, [requests])

	return (
		<IonList lines="full">
			{requests.map(request => {
				return (
					<IonItemSliding key={request.id} className="ion-padding-horizontal">
						<IonItem>
							<IonChip>
								<IonAvatar>
									<img src={request.from.photo} alt="" />
								</IonAvatar>
								<IonLabel>Pet name</IonLabel>
							</IonChip>
							<IonIcon icon={heart} className="ion-padding-start ion-padding-end" color="danger" size="large"></IonIcon>
							<IonChip>
								<IonAvatar>
									<img src={request.to.photo} alt="" />
								</IonAvatar>
								<IonLabel>Pet Name</IonLabel>
							</IonChip>
						</IonItem>
						<IonItemOptions side="end">
							<IonItemOption color={'danger'}>
								<IonIcon slot="icon-only" icon={trash} onClick={() => deleteRequest(request.id)}></IonIcon>
							</IonItemOption>
						</IonItemOptions>
					</IonItemSliding>
				)
			})}
		</IonList>
	)
}

export default SentRequests
