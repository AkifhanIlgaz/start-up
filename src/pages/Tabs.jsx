import { IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { earth, homeOutline, notificationsOutline, personOutline } from 'ionicons/icons'
import React from 'react'
import { Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Profile from './Profile'

const Tabs = () => {
	return (
		<IonTabs>
			<IonRouterOutlet>
				<Route path="/home" component={Home} exact={true} />
				<Route path="/match" component={Login} exact={true} />
				<Route path="/search" component={Home} exact={true} />
				<Route path="/profile" component={Profile} exact={true} />
			</IonRouterOutlet>
			<IonTabBar slot="bottom">
				<IonTabButton tab="home" href="/login">
					<IonIcon icon={homeOutline}></IonIcon>
				</IonTabButton>
				<IonTabButton tab="match" href="/home">
					<IonIcon icon={earth}></IonIcon>
				</IonTabButton>
				<IonTabButton tab="history" href="/history">
					<IonIcon icon={notificationsOutline}></IonIcon>
				</IonTabButton>
				<IonTabButton tab="profile" href="/profile">
					<IonIcon icon={personOutline}></IonIcon>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	)
}

export default Tabs
