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
		// associations can be defined here
	};
	return NoteTag;
};
