import { IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { earth, homeOutline, notificationsOutline, personOutline } from 'ionicons/icons'
import React from 'react'
import { Route } from 'react-router-dom'
import Home from './Home'
import Profile from './Profile'
import Search from './Search'
import { useRecoilState } from 'recoil'
import { userState } from '../atoms/user'

const Tabs = () => {
	const [user, setUser] = useRecoilState(userState)
	return (
		user && (
			<IonTabs>
				<IonRouterOutlet>
					<Route path="/home" render={() => <Home />} exact={true} />
					<Route path="/search" render={() => <Search />} exact={true} />
					<Route path="/history" render={() => <Profile />} exact={true} />
					<Route path="/profile" render={() => <Profile />} exact={true} />
					<Route path="/edit-pet" render={() => <Profile />} exact={true} />
				</IonRouterOutlet>
				<IonTabBar slot="bottom">
					<IonTabButton tab="home" href="/home">
						<IonIcon icon={homeOutline}></IonIcon>
					</IonTabButton>
					<IonTabButton tab="search" href="/search">
						<IonIcon icon={earth}></IonIcon>
					</IonTabButton>
					{/* Notifications && Messages */}
					<IonTabButton tab="history" href="/history">
						<IonIcon icon={notificationsOutline}></IonIcon>
					</IonTabButton>
					<IonTabButton tab="profile" href="/profile">
						<IonIcon icon={personOutline}></IonIcon>
					</IonTabButton>
				</IonTabBar>
			</IonTabs>
		)
	)
}

export default Tabs
