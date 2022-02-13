'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Notebooks',
			[
				{ title: 'Campaign One: Vox Machina', userId: 1 },
				{ title: 'Campaign Two: The Mighty Neign', userId: 1 },
				{ title: 'Campaign Three', userId: 1 },
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Notebooks', null, {});
	},
};
