// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// GoatCounter: https://www.goatcounter.com
// This file (and *only* this file) is released under the ISC license:
// https://opensource.org/licenses/ISC
export default (): void => {
	'use strict';

	if (window.goatcounter && window.goatcounter.vars)  // Compatibility
		window.goatcounter = window.goatcounter.vars
	else
		window.goatcounter = window.goatcounter || {}

	// Get all data we're going to send off to the counter endpoint.
	const get_data = function(vars) {
		const data = {
			p: (vars.path     === undefined ? goatcounter.path     : vars.path),
			r: (vars.referrer === undefined ? goatcounter.referrer : vars.referrer),
			t: (vars.title    === undefined ? goatcounter.title    : vars.title),
			e: !!(vars.event || goatcounter.event),
			s: [window.screen.width, window.screen.height, (window.devicePixelRatio || 1)],
			b: is_bot(),
			q: location.search,
		}

		let rcb, pcb, tcb  // Save callbacks to apply later.
		if (typeof(data.r) === 'function') rcb = data.r
		if (typeof(data.t) === 'function') tcb = data.t
		if (typeof(data.p) === 'function') pcb = data.p

		if (is_empty(data.r)) data.r = document.referrer
		if (is_empty(data.t)) data.t = document.title
		if (is_empty(data.p)) {
			let loc = location
            const c = document.querySelector('link[rel="canonical"][href]')
			if (c) {  // May be relative or point to different domain.
				const a = document.createElement('a')
				a.href = c.href
				if (a.hostname.replace(/^www\./, '') === location.hostname.replace(/^www\./, ''))
					loc = a
			}
			data.p = (loc.pathname + loc.search) || '/'
		}

		if (rcb) data.r = rcb(data.r)
		if (tcb) data.t = tcb(data.t)
		if (pcb) data.p = pcb(data.p)
		return data
	}

	// Check if a value is "empty" for the purpose of get_data().
	const is_empty = function(v) { return v === null || v === undefined || typeof(v) === 'function' }

	// See if this looks like a bot; there is some additional filtering on the
	// backend, but these properties can't be fetched from there.
	const is_bot = function() {
		// Headless browsers are probably a bot.
		if (window.callPhantom || window._phantom || window.phantom)
			return 150
		if (window.__nightmare)
			return 151
		if (document.__selenium_unwrapped || document.__webdriver_evaluate || document.__driver_evaluate)
			return 152
		if (navigator.webdriver)
			return 153
		return 0
	}

	// Object to urlencoded string, starting with a ?.
	const urlencode = function(obj) {
		const p = []
		for (const k in obj)
			if (obj[k] !== '' && obj[k] !== null && obj[k] !== undefined && obj[k] !== false)
				p.push(encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]))
		return '?' + p.join('&')
	}

	// Get the endpoint to send requests to.
	const get_endpoint = function() {
		const s = document.querySelector('script[data-goatcounter]');
		if (s && s.dataset.goatcounter)
			return s.dataset.goatcounter
		return (window.goatcounter.endpoint || window.counter)  // counter is for compat; don't use.
	}

	// Filter some requests that we (probably) don't want to count.
	window.goatcounter.filter = function() {
		if ('visibilityState' in document && (document.visibilityState === 'prerender' || document.visibilityState === 'hidden'))
			return 'visibilityState'
		if (!window.goatcounter.allow_frame && location !== parent.location)
			return 'frame'
		if (!window.goatcounter.allow_local && location.hostname.match(/(localhost$|^127\.|^10\.|^172\.(1[6-9]|2[0-9]|3[0-1])\.|^192\.168\.)/))
			return 'local'
		if (localStorage && localStorage.getItem('skipgc') === 't')
			return 'disabled with #toggle-goatcounter'
		return false
	}

	// Get URL to send to GoatCounter.
	window.goatcounter.url = function(vars) {
		const data = get_data(vars || {})
		if (data.p === null)  // null from user callback.
			return
		data.rnd = Math.random().toString(36).substr(2, 5)  // Browsers don't always listen to Cache-Control.

		const endpoint = get_endpoint()
		if (!endpoint) {
			if (console && 'warn' in console)
				console.warn('goatcounter: no endpoint found')
			return
		}

		return endpoint + urlencode(data)
	}

	// Count a hit.
	window.goatcounter.count = function(vars) {
		const f = window.goatcounter.filter()
		if (f) {
			if (console && 'log' in console)
				console.warn('goatcounter: not counting because of: ' + f)
			return
		}

		const url = window.goatcounter.url(vars)
		if (!url) {
			if (console && 'log' in console)
				console.warn('goatcounter: not counting because path callback returned null')
			return
		}

		const img = document.createElement('img')
		img.src = url
		img.style.position = 'absolute'  // Affect layout less.
		img.setAttribute('alt', '')
		img.setAttribute('aria-hidden', 'true')

		const rm = function() { if (img && img.parentNode) img.parentNode.removeChild(img) }
		setTimeout(rm, 3000)  // In case the onload isn't triggered.
		img.addEventListener('load', rm, false)
		document.body.appendChild(img)
	}

	// Get a query parameter.
	window.goatcounter.get_query = function(name) {
		const s = location.search.substr(1).split('&')
		for (const i = 0; i < s.length; i++)
			if (s[i].toLowerCase().indexOf(name.toLowerCase() + '=') === 0)
				return s[i].substr(name.length + 1)
	}

	// Track click events.
	window.goatcounter.bind_events = function() {
		if (!document.querySelectorAll)  // Just in case someone uses an ancient browser.
			return

		const send = function(elem) {
			return function() {
				window.goatcounter.count({
					event:    true,
					path:     (elem.dataset.goatcounterClick || elem.name || elem.id || ''),
					title:    (elem.dataset.goatcounterTitle || elem.title || (elem.innerHTML || '').substr(0, 200) || ''),
					referrer: (elem.dataset.goatcounterReferrer || elem.dataset.goatcounterReferral || ''),
				})
			}
		}

		Array.prototype.slice.call(document.querySelectorAll("*[data-goatcounter-click]")).forEach(function(elem) {
			if (elem.dataset.goatcounterBound)
				return
			const f = send(elem)
			elem.addEventListener('click', f, false)
			elem.addEventListener('auxclick', f, false)  // Middle click.
			elem.dataset.goatcounterBound = 'true'
		})
	}

	// Make it easy to skip your own views.
	if (location.hash === '#toggle-goatcounter')
		if (localStorage.getItem('skipgc') === 't') {
			localStorage.removeItem('skipgc', 't')
			alert('GoatCounter tracking is now ENABLED in this browser.')
		}
		else {
			localStorage.setItem('skipgc', 't')
			alert('GoatCounter tracking is now DISABLED in this browser until ' + location + ' is loaded again.')
		}

	if (!window.goatcounter.no_onload) {
		const go = function() {
			window.goatcounter.count()
			if (!window.goatcounter.no_events)
				window.goatcounter.bind_events()
		}

		if (document.body === null)
			document.addEventListener('DOMContentLoaded', function() { go() }, false)
		else
			go()
	}
};
