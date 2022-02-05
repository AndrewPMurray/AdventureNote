'use strict';
module.exports = (sequelize, DataTypes) => {
	const Notebook = sequelize.define(
		'Notebook',
		{
			title: DataTypes.STRING(100),
			userId: DataTypes.INTEGER,
		},
		{}
	);
	Notebook.associate = function (models) {
		Notebook.hasMany(models.Note, { foreignKey: 'notebookId' });
	};
	return Notebook;
};
