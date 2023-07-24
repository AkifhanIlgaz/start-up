import { IonApp, IonButton, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route } from 'react-router-dom'

import '@ionic/react/css/core.css'
import '@ionic/react/css/display.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/padding.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/typography.css'

import './theme/style.scss'
import './theme/variables.css'

import { IonRouterOutlet } from '@ionic/react'
import React from 'react'
import Locales from './lang'
import Login from './pages/Login'
import Tabs from './pages/Tabs'

import { IntlProvider } from 'react-intl'

import { useRecoilState } from 'recoil'
import { userState } from './atoms/user'
import AddPet from './pages/AddPet'
import PasswordReset from './pages/PasswordReset'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Search from './pages/Search'
setupIonicReact()

const App = () => {
	const locale = Locales['tr']
	const [user, setUser] = useRecoilState(userState)

	const resetUser = () => {
		setUser({})
	}

	return (
		<IonApp>
			<IntlProvider locale={locale.code} messages={locale.messages} onError={error => error.code === 'MISSING_TRANSLATION'} defaultLocale="tr">
				<IonReactRouter>
					<IonRouterOutlet>
						<Route exact path="/">
							<Login />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route>
						<Route exact path="/password-reset">
							<PasswordReset />
						</Route>
						<Route exact path="/profile">
							<Profile />
						</Route>
						<Route exact path="/add-pet">
							<AddPet />
						</Route>
						<Route exact path="/search">
							<Search />
						</Route>
					</IonRouterOutlet>
					{user && <Tabs />}
				</IonReactRouter>
			</IntlProvider>
		</IonApp>
	)
}

export default App
