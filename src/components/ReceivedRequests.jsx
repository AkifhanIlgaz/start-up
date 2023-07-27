import { IonActionSheet, IonAvatar, IonChip, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonList } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import userState from '../atoms/user'
import Request, { MatchRequestCollection } from '../api/request'
import { checkmarkOutline, closeOutline, heart } from 'ionicons/icons'

const ReceivedRequests = () => {
	const [user] = useRecoilState(userState)
	const [requests, setRequests] = useState([])
	const req = new Request()

	const acceptRequest = async requestId => {
		await req.updateDocument(MatchRequestCollection, requestId, { status: 'accepted' })
		setRequests(requests.filter(request => request.id != requestId))
		console.log('Accepted: ', requestId)
	}

	const rejectRequest = async requestId => {
		await req.updateDocument(MatchRequestCollection, requestId, { status: 'rejected' })
		setRequests(requests.filter(request => request.id != requestId))
		console.log('Rejected: ', requestId)
	}

	const fetchData = async () => {
		const matchRequests = await req.getReceivedMatchRequests(user.uid, 'pending')
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
								<IonAvatar>
									<img src={request.to.photoURL} alt="" />
								</IonAvatar>
								<IonIcon icon={heart}></IonIcon>
								<IonAvatar>
									<img src={request.from.photo} alt="" />
								</IonAvatar>
								<IonChip color="warning">{request.status}</IonChip>
								<IonChip>{request.id}</IonChip>
							</IonItem>

							<IonItemOptions side="end">
								<IonItemOption color={'danger'}>
									<IonIcon slot="icon-only" icon={closeOutline} onClick={() => rejectRequest(request.id)}></IonIcon>
								</IonItemOption>
								<IonItemOption color={'success'}>
									<IonIcon slot="icon-only" icon={checkmarkOutline} onClick={() => acceptRequest(request.id)}></IonIcon>
								</IonItemOption>
							</IonItemOptions>
						</IonItemSliding>
					</div>
				)
			})}
		</IonList>
	)
}

export default ReceivedRequests
