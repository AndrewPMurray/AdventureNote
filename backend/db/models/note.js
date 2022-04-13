'use strict';
module.exports = (sequelize, DataTypes) => {
	const Note = sequelize.define(
		'Note',
		{
			name: DataTypes.STRING(100),
			content: DataTypes.TEXT,
			userId: DataTypes.INTEGER,
			notebookId: DataTypes.INTEGER,
		},
		{}
	);
	Note.associate = function (models) {
		Note.belongsTo(models.User, { foreignKey: 'userId' });
		Note.belongsTo(models.Notebook, { foreignKey: 'notebookId' });
		Note.belongsToMany(models.Tag, {
			through: 'NoteTag',
			as: 'NoteTags',
			foreignKey: 'noteId',
		});
	};
	return Note;
};
