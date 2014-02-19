hbs = require('hbs');

module.exports = function(core){
	hbs.registerPartials(core.get('views'));
}