import { IonApp, IonButton, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'

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
import SignIn from './pages/SignIn'
import Tabs from './pages/Tabs'

import { IntlProvider } from 'react-intl'

import PasswordReset from './pages/PasswordReset'
import Search from './pages/Search'
import SignUp from './pages/SignUp'
import UserProfile from './pages/UserProfile'
import { useRecoilState } from 'recoil'
import userState from './atoms/user'
setupIonicReact()

const App = () => {
	const locale = Locales['tr']
	const [user, setUser] = useRecoilState(userState)

	return (
		<IonApp>
			<IntlProvider locale={locale.code} messages={locale.messages} onError={error => error.code === 'MISSING_TRANSLATION'} defaultLocale="tr">
				<IonReactRouter>
					<IonRouterOutlet>
						{user ? (
							<>
								<Route exact path="/">
									<Redirect to="/home"></Redirect>
								</Route>
								<Route path={['/signin', '/signup', '/password-reset']}>
									<Redirect to="/home"></Redirect>
								</Route>
							</>
						) : (
							<>
								<Route path="/">
									<Redirect to="/signin"></Redirect>
								</Route>
								<Route exact path="/signin">
									<SignIn />
								</Route>
								<Route exact path="/signup">
									<SignUp />
								</Route>
								<Route exact path="/password-reset">
									<PasswordReset />
								</Route>
							</>
						)}
					</IonRouterOutlet>
					<Tabs />
				</IonReactRouter>
			</IntlProvider>
		</IonApp>
	)
}

export default App
