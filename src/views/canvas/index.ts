import createElement from '../../utils/create-element'
import props from '../../models/props'
import { EVENT_HEIGHT, PIXELS_PER_LETTER, DATE_BAR_HEIGHT } from '../../constants'
import { findClosestRulerDate } from '../../utils'
import { labelBody } from '../../utils/dates'
import MinimapBand from '../../models/band/minimap'
import animator from '../../animator'
import EventsBand from '../../models/band/events'
import View from '../index'

/**
 * The MiniMap is an abstract representation of the events on a band.
 * It gives an overview of densely (and scarcely) populated areas
 */
export default class Canvas implements View {
	private readonly font: string = "10px sans-serif"
	private canvas: HTMLCanvasElement
	private ctx: CanvasRenderingContext2D

	private indicatorsCanvas: HTMLCanvasElement
	private indicatorsCtx: CanvasRenderingContext2D
	private indicatorsDrawn: boolean = false

	constructor() {
		animator.registerView(this)
	}

	render() {
		this.canvas = createElement('canvas', 'minimap', [
			'position: absolute',
		])

		this.canvas.width = props.viewportWidth
		this.canvas.height = props.viewportHeight
		this.ctx = this.canvas.getContext('2d')
		this.ctx.font = this.font

		this.indicatorsCanvas = createElement('canvas', 'minimap', [
			'position: absolute',
		], [ 'z-index: 1' ])

		this.indicatorsCanvas.width = props.viewportWidth
		this.indicatorsCanvas.height = props.viewportHeight
		this.indicatorsCtx = this.indicatorsCanvas.getContext('2d')

		this.update()

		return [this.canvas, this.indicatorsCanvas]
	}

	private clear(band: MinimapBand | EventsBand) {
		this.ctx.clearRect(0, band.top, this.canvas.width, band.height)
	}

	update = () => {
		props.bands
			.forEach(band => {
				if (band instanceof EventsBand)
					this.drawEventsBand(band)
				else
					this.drawMinimapBand(band)
			})

		this.drawIndicators()
	}

	private drawEventsBand(band: EventsBand) {
		this.clear(band)
		this.drawRulers(band)

		this.ctx.beginPath()

		for (const event of band.visibleEvents) {
			// If point in time, draw circle
			if (!event.time) {
				this.ctx.moveTo(event.left, event.top + EVENT_HEIGHT/2)
				this.ctx.arc(event.left, event.top + EVENT_HEIGHT/2, EVENT_HEIGHT/3, 0, 2 * Math.PI)
			
			// Else if interval, draw rectangle
			} else {
				this.ctx.rect(event.left, event.top, event.width, EVENT_HEIGHT)
			}
		}

		this.ctx.fillStyle = `rgba(126, 0, 0, .3)`
		this.ctx.fill()

		this.drawEventsText(band)
	}

	private drawEventsText(band: EventsBand) {
		this.ctx.fillStyle = `rgb(126, 0, 0)`

		for (const event of band.visibleEvents) {
			let eventWidth = event.time === 0 ? event.padding : event.width
			let eventLeft = event.left

			if (event.left < 0 && event.time !== 0) {
				eventWidth = event.width + event.left
				eventLeft = 0
			}

			let eventLabelLength = event.label.length * PIXELS_PER_LETTER
			if (eventLabelLength <= eventWidth) {
				const paddingLeft = event.time ? 3 : 8
				this.ctx.fillText(event.label, eventLeft + paddingLeft, event.top + EVENT_HEIGHT - 3)
			}
		}
	}

	private drawMinimapBand(band: MinimapBand) {
		// Do not draw the minimap if left or zoom level have not changed
		if (band.isDrawn && band.prevLeft === band.left && band.prevZoomLevel === band.zoomLevel) return

		this.clear(band)
		this.drawRulers(band)

		const minimapCanvas = band.draw()
		this.ctx.drawImage(minimapCanvas, 0, band.top, props.viewportWidth, band.canvasHeight)

		band.isDrawn = true
	}

	private drawIndicators() {
		// The indicators only change when the zoomLevel is changed
		if (this.indicatorsDrawn && props.eventsBands.every(b => b.prevZoomLevel === b.zoomLevel)) return

		this.indicatorsCtx.clearRect(0, 0, props.viewportWidth, props.viewportHeight)
		this.indicatorsCtx.beginPath()

		for (const band of props.minimapBands) {
			const eventsBand = props.eventsBands[band.config.indicatorFor]

			// Left indicator
			const indicatorTOP = Math.round(band.config.topOffsetRatio * props.viewportHeight)
			const leftIndicatorRightX = band.positionAtTimestamp(eventsBand.from)
			this.indicatorsCtx.rect(0, indicatorTOP, leftIndicatorRightX, band.height)

			// Right indicator
			const rightIndicatorLeftX = band.positionAtTimestamp(eventsBand.to)
			this.indicatorsCtx.rect(rightIndicatorLeftX, indicatorTOP, props.viewportWidth, band.height)

			// Cover the DATE_BAR
			this.indicatorsCtx.rect(leftIndicatorRightX, indicatorTOP + band.height - DATE_BAR_HEIGHT, rightIndicatorLeftX - leftIndicatorRightX, DATE_BAR_HEIGHT)
		}

		this.indicatorsCtx.fillStyle = `rgba(0, 0, 0, .1)`
		this.indicatorsCtx.fill()

		this.indicatorsCtx.closePath()

		this.indicatorsDrawn = true
	}

	// TODO draw special dates in darker gray, add dates and specialDates to arrays in while loop,
	// 		to prevent to much change of strokeStyle
	private drawRulers(band: MinimapBand | EventsBand) {
		if (!band.config.rulers) return

		this.ctx.beginPath()
		this.ctx.fillStyle = `rgb(150, 150, 150)`

		let date = findClosestRulerDate(band.from, band.granularity)
		const y = band.config.topOffsetRatio * props.viewportHeight
		const height = band.config.heightRatio * props.viewportHeight

		while(date < band.to) {
			const left = band.positionAtTimestamp(date)
			this.ctx.moveTo(left, y)
			this.ctx.lineTo(left, y + height)
			if (band.config.rulerLabels) this.ctx.fillText(labelBody(date, band.granularity), left + 3, y + height - 3)
			date = band.nextDate(date)
		}

		this.ctx.strokeStyle = `rgb(200, 200, 200)`
		this.ctx.stroke()
	}
}
