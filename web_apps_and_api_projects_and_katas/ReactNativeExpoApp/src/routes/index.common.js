import T from 'prop-types'
import { Auth } from 'components/views/auth'
import { Movement } from 'components/views/movement'

const routes = [
  {
    path: '/auth',
    View: Auth,
    menuIndex: 0,
    name: 'authView:title'
  },
  {
    path: '/accelerometer',
    View: Movement,
    menuIndex: 1,
    name: 'movementView:title'
  }
]

const defaultPath = routes[0].path

const routeShape = T.shape({
  path: T.string.isRequired,
  View: T.elementType,
  menuIndex: T.number,
  name: T.string
})

export default routes
export { defaultPath, routeShape }
