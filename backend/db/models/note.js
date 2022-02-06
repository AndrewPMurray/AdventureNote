'use strict';
module.exports = (sequelize, DataTypes) => {
	const Note = sequelize.define(
		'Note',
		{
			name: {
				type: DataTypes.STRING(100),
				defaultValue: 'Untitled',
			},
			content: DataTypes.TEXT,
			userId: DataTypes.INTEGER,
			notebookId: DataTypes.INTEGER,
		},
		{}
	);
	Note.associate = function (models) {
		Note.belongsTo(models.User, { foreignKey: 'userId' });
		Note.belongsTo(models.Notebook, { foreignKey: 'notebookId' });
	};
	return Note;
};
