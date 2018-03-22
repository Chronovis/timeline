import Domain from '../../models/domain'
import props from '../../models/props'
import createElement from '../../utils/create-element'
import { CENTER_CHANGE_EVENT, ComponentType } from '../../constants'
import Sparkline from './sparkline'
import Rulers from './rulers'
import MiniMap from './minimap'
import EventsBand from './events'
import { AggregateEntry } from '../../models/config'
import DomainConfig from '../../models/domain.config'

export default class Band {
	domain: Domain
	private dragStart: number
	private dragOffset: number
	private rootElement: HTMLElement
	private eventsBand: EventsBand

	constructor(domainConfig: DomainConfig, private aggregate: AggregateEntry[]) {
		this.domain = new Domain(domainConfig)
		document.addEventListener(CENTER_CHANGE_EVENT, this.updateLeft)
	}

	remove() {
		document.removeEventListener(CENTER_CHANGE_EVENT, this.updateLeft)
		this.rootElement.removeEventListener('mousedown', this.onMouseDown)
		this.rootElement.removeEventListener('mousemove', this.onMouseMove)
		this.rootElement.removeEventListener('dblclick', this.onDblClick)
	}

	render() {
		this.rootElement = createElement(
			'div',
			'band-wrap',
			[
				'background-color: white',
				'position: absolute',
			],
			[
				`height: ${this.domain.config.heightRatio * 100}%`,
				`top: ${this.domain.config.topOffsetRatio * 100}%`,
				`transform: translate3d(${this.domain.left}px, 0, 0)`,
				`width: ${this.domain.width}px`,
			]
		)

		if (this.domain.config.components.has(ComponentType.Sparkline)) {
			const sparkline = new Sparkline(this.domain, this.aggregate)
			this.rootElement.appendChild(sparkline.render())
		}
		
		if (this.domain.config.components.has(ComponentType.Rulers) && !this.domain.config.components.has(ComponentType.Events)) {
			this.rootElement.appendChild(new Rulers(this.domain).render())
		}

		if (this.domain.config.components.has(ComponentType.MiniMap)) {
			const minimap = new MiniMap(this.domain)
			this.rootElement.appendChild(minimap.render())
		}

		if (this.domain.config.components.has(ComponentType.Events)) {
			this.eventsBand = new EventsBand(this.domain)
			this.rootElement.appendChild(this.eventsBand.render())
		}

		if (this.domain.config.visibleRatio < 1) {
			this.rootElement.addEventListener('mousedown', this.onMouseDown)
			this.rootElement.addEventListener('mousemove', this.onMouseMove)
		}
		this.rootElement.addEventListener('dblclick', this.onDblClick)

		return this.rootElement
	}

	private updateLeft = () => {
		this.rootElement.style.transform = `translate3d(${this.domain.updateLeft()}px, 0, 0)`
		if (this.eventsBand != null) this.eventsBand.renderChildren()
	}

	private onMouseDown = (ev) => {
		document.addEventListener('mouseup', this.onMouseUp)
		this.dragOffset = ev.clientX
		this.dragStart = this.domain.left
	}

	private onMouseMove = (ev) => {
		if (this.dragOffset) {
			const left = this.dragStart - (this.dragOffset - ev.clientX)
			props.center = left / (props.viewportWidth - this.domain.width)
		}
	}

	private onMouseUp = (ev) => {
		document.removeEventListener('mouseup', this.onMouseUp)
		// const shift = ev.clientX - this.dragOffset
		// let left = this.dragStart - (this.dragOffset - ev.clientX)
		// if (Math.abs(shift) > 300) {
		// 	let t = 0
		// 	const intervalId = setInterval(() => {
		// 		t += 50
		// 		if (t === 1000 || props.center === 0 || props.center === 1) return clearInterval(intervalId)

		// 		left += (shift / 100) * (-t/1000 + 1)
		// 		props.center = left / (this.domain.viewportWidth - this.domain.width)
		// 		console.log(t, -t/1000 + 1, left, props.center)
		// 	}, 50)
		// }
		this.dragOffset = null
	}

	private onDblClick = (ev) => {
		const rootLeft = this.rootElement.getBoundingClientRect().left
		const proportion = this.domain.proportionAtPosition(ev.clientX - rootLeft)
		props.center = proportion
	}
}