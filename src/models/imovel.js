const imovel = (sequelize, DataTypes) => {
  const Imovel = sequelize.define('Imovel', {
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    iptu: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    tableName: 'imoveis'
  }
  )

  return Imovel
}

module.exports = imovel
