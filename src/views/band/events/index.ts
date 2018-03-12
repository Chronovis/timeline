import Ev3nt from '../../../models/event'
import createElement from '../../../utils/create-element'
import props from '../../../models/props'
import Segment from './segment'
import Domain from '../../../models/domain'

const partition = (arr, filterFunc): [any, any] => {
	const matched = []
	const unmatched = []

	for (let i = 0; i < arr.length; i++) {
		const bool = filterFunc.call(arr, arr[i], i)
		if (bool) matched.push(arr[i])
		else unmatched.push(arr[i])
	}

	return [matched, unmatched];
};


export default class Events {
	private segments: Segment[]

	constructor(private domain: Domain, private events: Ev3nt[]) {
		this.segments = this.createSegments()
	}

	public render() {
		const segmentsWrap = createElement(
			'ul',
			'events-wrap',
			[
				'list-style: none',
				'margin: 0',
				'padding: 0',
				'width: 100%',
			],
			[
				`height: ${this.domain.height}px`,
			]
		)

		this.segments.forEach(s => segmentsWrap.appendChild(s.render()))
		this.renderChildren()

		return segmentsWrap
	}

	public renderChildren() {
		let index = Math.floor(this.segments.length * props.center)
		this.segments[index].renderChildren()
		for (let i = index - 2; i <= index + 2; i++) {
			if (i > 0 && i < this.segments.length && i !== index) this.segments[i].renderChildren()
		}
	}

	private createSegments(): Segment[] {
		const t0 = performance.now()
		const segments = []
		const ratios = []
		let lower = props.center
		let upper = props.center
		let i = 0

		let prevLower
		let prevUpper

		while (lower > 0) {
			if (i === 0) {
				lower = props.center - this.domain.config.visibleRatio * 1.5
				upper = props.center + this.domain.config.visibleRatio * 1.5
				ratios.push([lower, upper])
			}
			else {
				lower -= this.domain.config.visibleRatio
				upper += this.domain.config.visibleRatio

				if (lower > 0) ratios.push([lower, prevLower])
				else if (lower <= 0 && prevLower > 0) ratios.push([0, prevLower])
				if (upper < 1) ratios.push([prevUpper, upper])
				else if (upper >= 1 && prevUpper < 1) ratios.push([prevUpper, 1])
			}

			prevLower = lower
			prevUpper = upper

			i++
		}

		let evs = this.events
		for(let j = 0; j < ratios.length; j++) {
			const [lower, upper] = ratios[j]
			const part = partition(evs, (e) => {
				const curr = this.domain.proportionAtDate(e.date)
				if (curr >= lower && curr <= upper) return true			//      [  |--]----|
				else if (e.endDate != null) {
					const currEnd = this.domain.proportionAtDate(e.endDate)
					if (
						(currEnd >= lower && currEnd <= upper) ||			// |----[--|  ]
						(curr < lower && currEnd > upper)				// |----[-----]----|
					) return true
					else return false
				}
				return false	
			})	
			segments.push(new Segment(this.domain, part[0], lower, upper))
			evs = part[1]
		}

		segments.sort((a, b) => {
			if (a.fromRatio < b.fromRatio) return -1
			if (a.fromRatio > b.fromRatio) return 1
			return 0
		})
		const t1 = performance.now(); console.log('Performance: ', `${t1 - t0}ms`)

		return segments
	}
}