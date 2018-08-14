import props from './models/props'
import Config from './models/config/index'
import BandView from './views/band'
import createElement from './utils/create-element'
import { debounce, calcPixelsPerMillisecond } from './utils'
import { OrderedEvents, orderEvents } from './utils/events.worker'
import Api from './api'
import EventsBandView from './views/band/events'
import Canvas from './views/canvas'
import View from './views'
import Label from './views/label'
import Debug from './views/debug'
import MinimapBand from './models/band/minimap';
import EventsBand from './models/band/events';

export {
	Config as TimelineConfig,
	orderEvents,
	OrderedEvents,
	calcPixelsPerMillisecond,
	EventsBand,
	MinimapBand,
}

// TODO use available vertical space (not fixed to EVENT_HEIGHT), see examples/100m 
// TODO zoom in to milliseconds
// TODO add API to constrain by spacial data
// TODO Add open ranges (ie: people still alive)
// TODO If event granularity is equal to band granularity a point in time should be rendered as an interval (as unsure?)
// TODO flip PiT when on edge of timeline
// TODO Scroll vertical when events higher than viewportHeight
// TODO make it possible to have only minimap bands (see index.floods.html)
// TODO make indicator draggable
export default class Timeline extends Api {
	private bandViews: BandView[]
	private wrapper: HTMLElement

	constructor(protected config: Config, onChange?, private onSelect?) {
		super(config.rootElement, onChange)

		props.init(config)
		config.rootElement.appendChild(this.render())

		const debouncedResize = debounce(this.resize, 600)
		window.addEventListener('resize', debouncedResize)
	}

	private render() {
		this.wrapper = createElement(
			'div',
			'wrapper',
			[
				'box-sizing: border-box',
				'height: 100%',
				'overflow: hidden',
				'position: relative',
				'user-select: none',
				'width: 100%',
			]
		)

		// Render canvas
		this.appendToWrapper(new Canvas())

		// Render bands
		this.bandViews = props.bands.map(band =>
			(band instanceof EventsBand) ?
				new EventsBandView(band, this.onSelect) :
				new BandView(band)
		)
		this.bandViews.forEach(this.appendToWrapper)

		this.renderLabels()

		// @ts-ignore
		if (process.env.NODE_ENV === 'development') this.appendToWrapper(new Debug())

		const redLine = createElement('div', 'red-line', [
			'position: absolute',
			'width: 1px',
			'background-color: red',
			'left: calc(50% - 1px)',
			'top: 0',
			'bottom: 0',
		])

		this.wrapper.appendChild(redLine)

		return this.wrapper
	}

	private renderLabels() {
		props.bands
			.filter(band => band instanceof EventsBand && band.config.label != null)
			.map(band => new Label(band as EventsBand))
			.forEach(this.appendToWrapper)
	}

	private appendToWrapper = (child: View) => {
		let children = child.render()
		if (!Array.isArray(children)) children = [children]
		children.forEach(c => this.wrapper.appendChild(c))
	}

	reload = (config?: Config) => {
		if (config != null) props.init(config)
		this.resize()
	}

	resize = () => {
		props.dimensions = this.config.rootElement

		for (const band of props.bands) {
			band.zoomLevel = band.zoomLevel
		}

		for (const bandView of this.bandViews) {
			bandView.resize()
		}

		this.animator.play()
	}
}
