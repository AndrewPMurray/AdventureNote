'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'NoteTags',
			[
				{
					noteId: 1,
					tagId: 1,
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('NoteTags', null, {});
	},
};
