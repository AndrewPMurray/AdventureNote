'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Tags',
			[
				{
					name: 'Characters',
					color: 'AA0000',
					userId: 1,
				},
				{
					name: 'Sessions',
					color: '0000AA',
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
