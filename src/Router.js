// import views
import homeView from './views/pages/home'
import fourOFourView from './views/pages/404'
import signinView from './views/pages/signin'
import signupView from './views/pages/signup'
import profileView from './views/pages/profile'
import editProfileView from './views/pages/editProfile'
import guideView from './views/pages/guide'
import registerView from './views/pages/registerGroup'
import messageBoardView from './views/pages/messageBoard'
import messageView from './views/pages/message'
import addMessageView from './views/pages/addMessage'
import TeamView from './views/pages/team'


// define routes
const routes = {
	'/': homeView,	
	'404' : fourOFourView,
	'/signin': signinView,
	'/signup': signupView,
	'/profile': profileView,
	'/editProfile': editProfileView,	
	'/guide': guideView,	
	'/registerGroup': registerView,	
	'/messageBoard': messageBoardView,
	'/message/:id': messageView,
	'/addMessage': addMessageView,
	'/team': TeamView
}

class Router {
	constructor(){
		this.routes = routes
	}
	
	init(){
		// initial call
		this.route(window.location.pathname)

		// on back/forward
		window.addEventListener('popstate', () => {
			this.route(window.location.pathname)
		})
	}
	
	route(fullPathname) {
		// extract path without params
		const pathname = fullPathname.split('?')[0];
		const parts = pathname.split('/');
		const routePath = parts[1];
		const id = parts[2];
	
		if (routePath === 'message' && id) {
		  // if the route is /message/:id, call the init function of messageView with the id parameter
		  this.routes['/message/:id'].init(id);
		} else {
		  // if route exists, run init() of the view
		  const route = this.routes[pathname];
		  if (route) {
			route.init();
		  } else {
			// show 404 view instead
			this.routes['404'].init();
		  }
		}

		
	  }

	  gotoRoute(pathname) {
		window.history.pushState({}, pathname, window.location.origin + pathname);
		this.route(pathname)
	  }
	}

// create appRouter instance and export
const AppRouter = new Router()
export default AppRouter


// programmatically load any route
export function gotoRoute(pathname){
	AppRouter.gotoRoute(pathname)
}


// allows anchor <a> links to load routes
export function anchorRoute(e){
	e.preventDefault()	
	const pathname = e.target.closest('a').pathname
	AppRouter.gotoRoute(pathname)
}
