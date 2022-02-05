'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Notes',
			[
				{
					name: 'Campaign Notes - Session #1',
					content: 'Stuff happened, people died, mistakes were made',
					userId: 1,
				},
				{
					name: 'Character notes',
					content: 'Name: Uthgar the Mighty (likes pie)',
					userId: 1,
				},
				{
					name: 'Campaign Notes - Session #1',
					content:
						'Uthgar wanted pie and murdered innocents to make it happen. How embarassing...',
					userId: 2,
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Notes', null, {});
	},
};
