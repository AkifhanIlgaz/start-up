import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route } from 'react-router-dom'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/padding.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'

/* Theme variables */
import { IntlProvider } from 'react-intl'
import Locales from './lang'
import Home from './pages/Home'
import Login from './pages/Login'
import './theme/variables.css'
setupIonicReact()

const App = () => {
	const locale = Locales['tr']

	return (
		<IonApp>
			<IntlProvider locale={locale.code} messages={locale.messages} onError={error => error.code === 'MISSING_TRANSLATION'} defaultLocale="tr">
				<IonReactRouter>
					<IonRouterOutlet>
						<Route exact path="/">
							<Login />
						</Route>
						<Route exact path="/home">
							<Home />
						</Route>
					</IonRouterOutlet>
				</IonReactRouter>
			</IntlProvider>
		</IonApp>
	)
}
export default App
