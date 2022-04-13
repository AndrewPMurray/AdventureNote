'use strict';
module.exports = (sequelize, DataTypes) => {
	const NoteTag = sequelize.define(
		'NoteTag',
		{
			noteId: DataTypes.INTEGER,
			tagId: DataTypes.INTEGER,
		},
		{}
	);
	NoteTag.associate = function (models) {
		NoteTag.belongsTo(models.Note, { foreignKey: 'noteId' });
		NoteTag.belongsTo(models.Tag, { foreignKey: 'tagId' });
	};
	return NoteTag;
};
