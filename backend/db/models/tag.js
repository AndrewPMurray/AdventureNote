'use strict';
module.exports = (sequelize, DataTypes) => {
	const Tag = sequelize.define(
		'Tag',
		{
			name: DataTypes.STRING(50),
			userId: DataTypes.INTEGER,
		},
		{}
	);
	Tag.associate = function (models) {
		Tag.belongsTo(models.User, { foreignKey: 'userId' });
		Tag.belongsToMany(models.Note, {
			through: 'NoteTag',
			as: 'NoteTags',
			foreignKey: 'tagId',
		});
	};
	return Tag;
};
