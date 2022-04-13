'use strict';
module.exports = (sequelize, DataTypes) => {
	const Tag = sequelize.define(
		'Tag',
		{
			name: DataTypes.STRING(50),
			color: DataTypes.STRING(10),
			userId: DataTypes.INTEGER,
		},
		{}
	);
	Tag.associate = function (models) {
		Tag.belongsTo(models.User, { foreignKey: 'userId' });
		Tag.belongsToMany(models.Note, {
			through: 'NoteTag',
			foreignKey: 'tagId',
		});
	};
	return Tag;
};
