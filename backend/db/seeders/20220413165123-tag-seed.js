'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Tags',
			[
				{
					name: 'Characters',
					userId: 1,
				},
				{
					name: 'Sessions',
					userId: 1,
				},
				{
					name: 'Enemies',
					userId: 1,
				},
				{
					name: 'Items',
					userId: 1,
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Tags', null, {});
	},
};
