'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Notebooks', [{ title: 'test', userId: 1 }], {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Notebooks', null, {});
	},
};
