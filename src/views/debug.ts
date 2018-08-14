import animator from "../animator"
import View from "./index"
import createElement from "../utils/create-element";
import props from "../models/props";
import MinimapBand from "../models/band/minimap";

export default class Debug implements View {
	wrapper: HTMLDivElement

	constructor() {
		animator.registerView(this)
	}

	render() {
		this.wrapper = createElement('div', 'debug', [
			'background: black',
			'color: white',
			'font-size: .75em',
			'height: 640px',
			'padding: 1em',
			'position: absolute',
			'right: 0',
			'top: 200px',
			'width: 240px',
		])

		this.update()

		return this.wrapper
	}

	update() {
		this.wrapper.innerHTML = `
			${
				props.bands
					.map(band => `
						<table style="margin-bottom: 1em; border-collapse: collapse; border-spacing: 0;">
							<tr><td style="color: gray" width=40>type</td><td>${band instanceof MinimapBand ? 'minimap' : 'events'}</td></tr>
							<tr><td style="color: gray">zoom</td><td>${band.zoomLevel}</td></tr>
							<tr><td style="color: gray">px/ms</td><td>${band.pixelsPerMillisecond.toExponential(2)}</td></tr>
							<tr><td style="color: gray">left</td><td>${Math.round(band.left)}px</td></tr>
							<tr><td style="color: gray">width</td><td>${Math.round(band.width)}px</td></tr>
							<tr><td style="color: gray">from</td><td>${new Date(band.from).toUTCString()}</td></tr>
							<tr><td style="color: gray">to</td><td>${new Date(band.to).toUTCString()}</td></tr>
						</table>
					`)
					.join('')
			}
		`
	}
}
			// <h3 style="padding: 0; margin: 0">Events band</h3>
			// <div>left: ${Math.round(props.eventsBand.left)}px</div>
			// <div>width: ${Math.round(props.eventsBand.width)}px</div>
			// <div>px/ms: ${props.eventsBand.pixelsPerMillisecond}</div>
			// <div>from: ${new Date(props.eventsBand.from).toISOString()}</div>
			// <div>to: ${new Date(props.eventsBand.to).toISOString()}</div>
			// <h3 style="padding: 0; margin: 0; margin-top: 1em">Minimap bands</h3>