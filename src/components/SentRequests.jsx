import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import userState from '../atoms/user'
import Request, { MatchRequestCollection } from '../api/request'
import { IonAvatar, IonButton, IonChip, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from '@ionic/react'
import { heart, trash, warning } from 'ionicons/icons'

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

	const fetchData = async () => {
		const matchRequests = await req.getSentMatchRequests(user.uid, 'pending')
		console
		setRequests(matchRequests)
	}

	useEffect(() => {
		fetchData()
	}, [requests])

	return (
		<IonList>
			{requests.map(request => {
				return (
					<div key={request.id}>
						<IonItemSliding>
							<IonItem>
								<IonAvatar slot="start">
									<img src={request.from.photo} alt="" />
								</IonAvatar>
								<IonIcon icon={heart}></IonIcon>
								<IonAvatar>
									<img src={request.to.photo} alt="" />
								</IonAvatar>
								<IonChip color="warning">{request.status}</IonChip>
								<IonChip>{request.id}</IonChip>
							</IonItem>
							<IonItemOptions side="end">
								<IonItemOption color={'danger'}>
									<IonIcon slot="icon-only" icon={trash} onClick={() => deleteRequest(request.id)}></IonIcon>
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
