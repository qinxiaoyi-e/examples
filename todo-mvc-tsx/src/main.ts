import global from '@dojo/framework/shim/global';
import { ProjectorMixin } from '@dojo/framework/widget-core/mixins/Projector';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';
import { reduxInjectorFactory } from '@dojo/interop/redux/ReduxInjector';
import { Registry } from '@dojo/framework/widget-core/Registry';

import { TodoAppContainer } from './containers/TodoAppContainer';
import { createStore } from 'redux';
import { todoReducer } from './reducers';

const defaultState = {
	todos: [],
	currentTodo: '',
	activeCount: 0,
	completedCount: 0
};

const registry = new Registry();
const store = createStore(todoReducer, defaultState, global.__REDUX_DEVTOOLS_EXTENSION__ && global.__REDUX_DEVTOOLS_EXTENSION__());
registry.defineInjector('application-state', reduxInjectorFactory(store));

const config = [
	{
		path: 'filter/{filter}',
		outlet: 'filter',
		defaultParams: {
			filter: 'all'
		},
		defaultRoute: true
	}
];

const router = registerRouterInjector(config, registry);
const Projector = ProjectorMixin(TodoAppContainer);
const projector = new Projector();
projector.setProperties({ registry });
projector.append();
