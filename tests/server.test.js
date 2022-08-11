const request = require('supertest')
const server = require('../server')

describe('/', () => {
	test('loads correctly', () => {
		const expected = 200

		return request(server)
			.get('/')
			.then((resp) => {
				const actual = resp.status

				expect(actual).toBe(expected)
			})
	})

	test('home page shows four images', () => {
		return request(server)
			.get('/')
			.then((resp) => {
				document.body.innerHTML = resp.text
				const actual = document.querySelectorAll('img')
				expect(actual).toHaveLength(4)
			})
	})
})

describe('/students/1', () => {
	test('loads correctly', () => {
		const expected = 200

		return request(server)
			.get('/')
			.then((resp) => {
				const actual = resp.status

				expect(actual).toBe(expected)
			})
	})

	test('profile page shows have an image src', () => {
		return request(server)
			.get('/students/1')
			.then((resp) => {
				document.body.innerHTML = resp.text
				const actual = document.querySelectorImg('img').src
				expect(actual).toBeTruthy()
			})
	})

	test('profile page h2 contains Eamonn', () => {
		return request(server)
			.get('/students/4')
			.then((resp) => {
				document.body.innerHTML = resp.text
				const actual = document.querySelector('h2').innerHTML
				expect(actual).toContain('Eamonn')
			})
	})
})

describe('/students/edit', () => {
	test('loads correctly', () => {
		const expected = 200

		return request(server)
			.get('/students/edit')
			.then((resp) => {
				const actual = resp.status

				expect(actual).toBe(expected)
			})
	})

	test('edit includes an input', () => {
		return request(server)
			.get('/students/edit')
			.then((resp) => {
				document.body.innerHTML = resp.text
				const actual = document.querySelector('input')
				expect(actual).toBeTruthy()
			})
	})
})

describe('/students/add', () => {
	test('loads correctly', () => {
		const expected = 200

		return request(server)
			.get('/students/add')
			.then((resp) => {
				const actual = resp.status

				expect(actual).toBe(expected)
			})
	})

	test('add includes an input', () => {
		return request(server)
			.get('/students/add')
			.then((resp) => {
				document.body.innerHTML = resp.text
				const actual = document.querySelector('input')
				expect(actual).toBeTruthy()
			})
	})
})
