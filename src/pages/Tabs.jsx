import { IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { earth, homeOutline, notificationsOutline, personOutline } from 'ionicons/icons'
import React from 'react'
import { Route } from 'react-router-dom'
import Home from './Home'
import Search from './Search'
import { useRecoilState } from 'recoil'
import { userState } from '../atoms/user'
import UserProfile from './UserProfile'
import MyProfile from './MyProfile'
import Notifications from './Notifications'

const Tabs = () => {
	const [user, setUser] = useRecoilState(userState)
	return (
		user && (
			<IonTabs>
				<IonRouterOutlet>
					<Route path="/home" render={() => <Home />} exact={true} />
					<Route path="/search" render={() => <Search />} exact={true} />
					<Route path="/notifications" render={() => <Notifications />} exact={true} />
					<Route path="/me" render={() => <MyProfile />} exact={true} />
					<Route path="/users/:id" render={() => <UserProfile />} />
				</IonRouterOutlet>
				<IonTabBar color={'danger'} slot="bottom">
					<IonTabButton tab="home" href="/home">
						<IonIcon icon={homeOutline}></IonIcon>
					</IonTabButton>
					<IonTabButton tab="search" href="/search">
						<IonIcon icon={earth}></IonIcon>
					</IonTabButton>
					{/* Notifications && Messages */}
					<IonTabButton tab="notifications" href="/notifications">
						<IonIcon icon={notificationsOutline}></IonIcon>
					</IonTabButton>
					<IonTabButton tab="profile" href="/me">
						<IonIcon icon={personOutline}></IonIcon>
					</IonTabButton>
				</IonTabBar>
			</IonTabs>
		)
	)
}

export default Tabs
