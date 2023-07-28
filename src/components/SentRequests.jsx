import { IonAvatar, IonChip, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonList } from '@ionic/react'
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
		<IonList>
			{requests.map(request => {
				return (
					<IonItemSliding key={request.id}>
						<IonItem>
							<IonAvatar slot="start">
								<img src={request.from.photo} alt="" />
							</IonAvatar>
							<IonIcon icon={heart}></IonIcon>
							<IonAvatar>
								<img src={request.to.photo} alt="" />
							</IonAvatar>
							<IonChip color="warning">{request.status}</IonChip>
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
