var assert = require('assert');
var urlPatterns = require('../src/urlPatterns.js');

describe("urlPatterns", function() {

	it('match /file/(int:id)/(slug:name).html', function(done) {

		var regex = urlPatterns.createRegex("/something/(int:id)/(slug:name).html")

		assert(regex.test("/something/1/test.html"))
		assert(regex.test("/something/-1/te-st.html"))
		assert(regex.test("/something/10/tae2s57t.html"))
		assert(!regex.test("/something/1b/test.html"))
		assert(!regex.test("/something/1/te st.html"))

		return done()
	})

	it('getUrl /file/(int:id)/(slug:name).html', function(done) {

		var getUrl = urlPatterns.createBuilder("/something/(int:id)/(slug:name).html")

		assert("/something/1/test.html"
			== getUrl({ id:1, name:'test' }))

		assert("/something/-1/te-st.html"
			== getUrl({ id:-1, name:'te-st' }))

		assert("/something/10/tae2s57t.html"
			== getUrl({ id:10, name:'tae2s57t' }))

		return done()
	})

	it('scrapeUrl /file/(int:id)/(slug:name).html', function(done) {

		var scrape = urlPatterns.createScraper("/something/(int:id)/(slug:name).html")

		assert(JSON.stringify({ id:'1', name:'test' })
			== JSON.stringify(scrape("/something/1/test.html")))

		assert(JSON.stringify({ id:'-1', name:'te-st' })
			== JSON.stringify(scrape("/something/-1/te-st.html")))

		assert(JSON.stringify({ id:'10', name:'tae2s57t' })
			== JSON.stringify(scrape("/something/10/tae2s57t.html")))

		return done()
	})
})